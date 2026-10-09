"""Build a public-only static site. Run: python3 tools/build_site.py.

No dependencies; originals are preserved. Publish dist, never the project root.
"""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit
import json
import re
import shutil

ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "dist"
ALLOWED = {"styles", "scripts", "Images", "assets", 'empresasfots-section class="testimonials section"'}
HEADERS = {
    "Content-Security-Policy": "default-src 'none'; script-src 'self'; style-src 'self'; img-src 'self'; font-src 'self'; connect-src 'none'; object-src 'none'; base-uri 'none'; form-action 'none'; frame-ancestors 'none'",
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "DENY",
    "Referrer-Policy": "no-referrer",
    "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
    "Cross-Origin-Opener-Policy": "same-origin-allow-popups",
    # Revalidate filenames that are not fingerprinted; avoid stale HTML/JS.
    "Cache-Control": "no-cache",
}


class References(HTMLParser):
    def __init__(self):
        super().__init__()
        self.urls = []

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        for key in ("src", "href", "poster"):
            if attrs.get(key):
                self.urls.append(attrs[key])
        if "srcset" in attrs:
            self.urls.extend(item.strip().split()[0] for item in attrs["srcset"].split(","))


def resolve(url, parent):
    parts = urlsplit(url)
    if parts.scheme or parts.netloc or not parts.path:
        return None
    path = (ROOT / unquote(parts.path).lstrip("/") if parts.path.startswith("/")
            else parent / unquote(parts.path)).resolve()
    if not path.is_relative_to(ROOT):
        raise ValueError(f"Reference outside the project: {url}")
    relative = path.relative_to(ROOT)
    if path != ROOT / "index.html" and (relative.parts[0] not in ALLOWED or path.suffix.lower() not in {".css", ".js", ".jpg", ".jpeg", ".png", ".svg", ".webp", ".avif", ".woff2", ".pdf", ".mp3", ".ogg"}):
        raise ValueError(f"Not a public asset: {relative}")
    if path.is_symlink() or not path.is_file():
        raise ValueError(f"Missing public asset: {relative}")
    return path


def build():
    # Validate the full graph before replacing a previous generated build.
    pending = [ROOT / "index.html"]
    # Font redistribution must include its licenses even without HTML links.
    files = set((ROOT / "assets/fonts").glob("*-OFL.txt"))
    while pending:
        path = pending.pop()
        if path in files:
            continue
        files.add(path)
        urls = []
        if path.suffix == ".html":
            parser = References()
            parser.feed(path.read_text())
            urls = parser.urls
        elif path.suffix == ".css":
            urls = re.findall(r"url\(\s*['\"]?([^)'\"]+)['\"]?\s*\)", path.read_text())
        elif path.suffix == ".js":
            urls = re.findall(r"\b(?:import|export)\s+(?:[^;]*?\s+from\s+)?['\"]([^'\"]+)['\"]", path.read_text())
        for url in urls:
            dependency = resolve(url, path.parent)
            if dependency:
                pending.append(dependency)
    if OUTPUT.is_symlink():
        raise ValueError("dist must not be a symbolic link")
    if OUTPUT.exists():
        shutil.rmtree(OUTPUT)
    OUTPUT.mkdir()
    for path in sorted(files):
        destination = OUTPUT / path.relative_to(ROOT)
        destination.parent.mkdir(parents=True, exist_ok=True)
        shutil.copyfile(path, destination)
    # Common static-host format; verify support on the chosen hosting provider.
    (OUTPUT / "_headers").write_text("/*\n" + "".join(f"  {key}: {value}\n" for key, value in HEADERS.items()))
    print(json.dumps({"files": len(files), "bytes": sum(path.stat().st_size for path in files), "output": str(OUTPUT)}, indent=2))


if __name__ == "__main__":
    build()
