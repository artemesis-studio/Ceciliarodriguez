"""Regression checks for resource names on macOS and Linux."""
import tempfile
import unittest
from pathlib import Path
from unittest.mock import patch

import build_site


class PortableAssetTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.root = Path(self.temp.name).resolve()
        self.images = self.root / "Images"
        self.images.mkdir()
        (self.images / "Fotografía.jpg").write_bytes(b"fixture")
        self.scope = patch.multiple(build_site, ROOT=self.root, OUTPUT=self.root / "dist")
        self.scope.start()
        self.addCleanup(self.scope.stop)

    def test_nfc_url_matches_resource(self):
        self.assertTrue(build_site.resolve("Images/Fotograf%C3%ADa.jpg", self.root).is_file())

    def test_decomposed_accent_is_rejected(self):
        with self.assertRaisesRegex(ValueError, "NFC"):
            build_site.resolve("Images/Fotografi%CC%81a.jpg", self.root)

    def test_wrong_case_is_rejected(self):
        with self.assertRaises(ValueError):
            build_site.resolve("Images/fotograf%C3%ADa.jpg", self.root)

    def test_build_uses_portable_names(self):
        (self.root / "index.html").write_text('<img src="Images/Fotograf%C3%ADa.jpg">')
        build_site.build()
        self.assertTrue((self.root / "dist/Images/Fotografía.jpg").is_file())
        self.assertEqual((self.root / "dist/Images/Fotografía.jpg").read_bytes(), b"fixture")


if __name__ == "__main__":
    unittest.main()
