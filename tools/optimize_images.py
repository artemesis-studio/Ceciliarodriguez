"""Create responsive WebP/AVIF copies and add progressive image sources."""
from html import unescape
from pathlib import Path
from urllib.parse import unquote, quote
from PIL import Image
import re
import unicodedata

ROOT = Path(__file__).resolve().parents[1]
HTML = ROOT / "index.html"
WIDTHS = (480, 800, 1200, 1600)


def encoded(path: Path) -> str:
    return quote(unicodedata.normalize("NFC", str(path.relative_to(ROOT)).replace("\\", "/")), safe="/:%()")


def variants(source: str, width: int | None = None):
    path = (ROOT / unquote(source).lstrip("/")).resolve()
    if not path.is_file() or path.suffix.lower() not in {".jpg", ".jpeg", ".png"}:
        return []
    with Image.open(path) as image:
        original_width, original_height = image.size
        targets = [w for w in WIDTHS if w < original_width]
        if not targets:
            targets = [original_width]
        elif original_width not in targets:
            targets.append(original_width)
        result = []
        for target in sorted(set(targets)):
            stem = path.with_suffix("")
            ratio = target / original_width
            height = max(1, round(original_height * ratio))
            for extension, options in (("webp", {"quality": 82, "method": 6}), ("avif", {"quality": 55, "speed": 6})):
                destination = stem.parent / f"{stem.name}-{target}w.{extension}"
                if not destination.exists() or destination.stat().st_mtime < path.stat().st_mtime:
                    resized = image.resize((target, height), Image.Resampling.LANCZOS) if target != original_width else image.copy()
                    if extension == "webp" and resized.mode not in {"RGB", "RGBA"}:
                        resized = resized.convert("RGBA" if "A" in resized.getbands() else "RGB")
                    resized.save(destination, extension.upper(), **options)
                result.append((target, encoded(destination)))
        return result


def sizes_for(source: str) -> str:
    path = (ROOT / unquote(source).lstrip("/")).resolve()
    name = path.name.lower()
    if "logo" in name or "empresas" in str(path).lower():
        return "(max-width: 600px) 30vw, (max-width: 1000px) 16vw, 10rem"
    if "header" in name:
        return "(max-width: 800px) 100vw, 50vw"
    if "sobre-mi" in name:
        return "(max-width: 800px) 100vw, 42vw"
    return "(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"


def rewrite(match):
    tag = match.group(0)
    source_match = re.search(r'\bsrc="([^"]+)"', tag)
    if not source_match or "data-responsive" in tag:
        return tag
    source = source_match.group(1)
    items = variants(source)
    if not items:
        return tag
    webp = [(w, p.replace(f"-{w}w.webp", f"-{w}w.webp")) for w, p in items if p.endswith(".webp")]
    avif = [(w, p) for w, p in items if p.endswith(".avif")]
    srcset = ", ".join(f"{p} {w}w" for w, p in webp)
    tag = tag.replace(" />", f' data-responsive="true" srcset="{srcset}" sizes="{sizes_for(source)}" />')
    avif_set = ", ".join(f"{p} {w}w" for w, p in avif)
    webp_source = f'<source type="image/avif" srcset="{avif_set}" sizes="{sizes_for(source)}" />\n          <source type="image/webp" srcset="{srcset}" sizes="{sizes_for(source)}" />\n          '
    return f"<picture>\n          {webp_source}{tag}\n        </picture>"


def main():
    html = HTML.read_text()
    rewritten = re.sub(r"<img\b[^>]*?/>", rewrite, html)
    HTML.write_text(rewritten)
    print("responsive image sources added")


if __name__ == "__main__":
    main()
