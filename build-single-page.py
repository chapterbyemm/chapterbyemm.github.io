#!/usr/bin/env python3
"""
Builds `chapterbyemm-single-page.html` — the whole site as ONE self-contained
file (CSS, JS and images all inlined), for previewing or sharing a link.

Run it any time you change the site:

    python3 build-single-page.py

The multi-page version in this folder stays the source of truth — edit that,
then re-run this script. Nothing here changes the multi-page files.
"""
import base64
import pathlib
import re
import json

ROOT = pathlib.Path(__file__).parent
OUT = ROOT / "chapterbyemm-single-page.html"

PAGES = [
    ("index.html", "home"),
    ("shop.html", "shop"),
    ("product.html", "product"),
    ("collections.html", "collections"),
    ("about.html", "about"),
    ("custom-designs.html", "custom"),
    ("faq.html", "faq"),
    ("contact.html", "contact"),
    ("cart.html", "cart"),
    ("checkout.html", "checkout"),
    ("wishlist.html", "wishlist"),
]


def data_uri(path: pathlib.Path) -> str:
    raw = path.read_bytes()
    b64 = base64.b64encode(raw).decode("ascii")
    return f"data:image/svg+xml;base64,{b64}"


# ---- 1. build the image map so every asset path becomes an inline data URI ---
IMG = {}
for p in sorted((ROOT / "assets" / "img").rglob("*.svg")):
    IMG[str(p.relative_to(ROOT)).replace("\\", "/")] = data_uri(p)


def inline_images(text: str) -> str:
    for rel, uri in IMG.items():
        text = text.replace(rel, uri)
    return text


# ---- 2. collect each page's <main> plus its title / description -------------
views, meta = {}, {}
for filename, page_key in PAGES:
    html = (ROOT / filename).read_text()
    main = re.search(r"<main id=\"main\">(.*?)</main>", html, re.S)
    if not main:
        raise SystemExit(f"no <main> found in {filename}")
    views[filename] = main.group(1).strip()
    title = re.search(r"<title>(.*?)</title>", html, re.S)
    desc = re.search(r'<meta name="description" content="(.*?)"', html, re.S)
    meta[filename] = {
        "page": page_key,
        "title": title.group(1).strip() if title else "ChapterByEmm",
        "desc": desc.group(1).strip() if desc else "",
    }

# the custom-designs page has a small inline script; fold it into the router
CUSTOM_EXTRA = """
  if (page === "custom-designs.html") {
    renderProducts(document.querySelector("[data-related]"), byCollection("custom"));
  }"""

css = (ROOT / "assets" / "css" / "styles.css").read_text()
js = "\n".join(
    (ROOT / "assets" / "js" / f).read_text() for f in ["data.js", "components.js", "pages.js", "app.js"]
)

# the multi-page boot block is replaced by the router below
js = js.split("/* ---------- boot ---------")[0]

router = """
/* ==========================================================================
   SINGLE-FILE ROUTER
   Only present in the single-page build. Each "page" is a template string
   swapped into #app, so selectors never collide between pages.
   ========================================================================== */
const VIEWS = __VIEWS__;
const META = __META__;

window.__ROUTE__ = { page: "index.html", query: new URLSearchParams("") };

function go(target, push = true) {
  const [page, qs] = String(target).split("?");
  const file = VIEWS[page] !== undefined ? page : "index.html";

  window.__ROUTE__ = { page: file, query: new URLSearchParams(qs || "") };
  document.body.dataset.page = META[file].page;
  document.title = META[file].title;
  const md = document.querySelector('meta[name="description"]');
  if (md) md.setAttribute("content", META[file].desc);

  const app = document.getElementById("app");
  app.innerHTML = '<main id="main">' + VIEWS[file] + "</main>";

  renderLayout();
  initPage();
  initForms();
  initReveal();
  syncWishUI();
  renderCartUI();
__CUSTOM_EXTRA__

  if (push) {
    const hash = "#/" + (file === "index.html" ? "" : file + (qs ? "?" + qs : ""));
    if (location.hash !== hash) history.pushState({ target }, "", hash);
  }
  window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
}

function routeFromHash() {
  const h = location.hash.replace(/^#\\/?/, "");
  return h || "index.html";
}

document.addEventListener("click", (e) => {
  const a = e.target.closest("a[href]");
  if (!a) return;
  const href = a.getAttribute("href");
  if (!href || /^(https?:|mailto:|tel:)/.test(href)) return;
  if (href.startsWith("#")) return;
  const [page, rest] = href.split("?");
  if (!page.endsWith(".html")) return;
  e.preventDefault();
  closePanels();
  const [qs, frag] = (rest || "").split("#");
  go(page + (qs ? "?" + qs : ""));
  if (frag) {
    const el = document.getElementById(frag);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }
});

window.addEventListener("popstate", () => go(routeFromHash(), false));

document.addEventListener("DOMContentLoaded", () => {
  initStickyHeader();
  initWishlistButtons();
  initCartUI();
  go(routeFromHash(), false);
  document.dispatchEvent(new CustomEvent("cart:change"));
});
"""

router = (
    router.replace("__VIEWS__", json.dumps({k: inline_images(v) for k, v in views.items()}))
    .replace("__META__", json.dumps(meta))
    .replace("__CUSTOM_EXTRA__", CUSTOM_EXTRA)
)

favicon = data_uri(ROOT / "assets" / "img" / "site" / "favicon.svg")

OUT.write_text(f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>ChapterByEmm — Printed Cotton T-Shirts | Designs for Every New Chapter</title>
<meta name="description" content="ChapterByEmm designs and prints premium cotton T-shirts for every chapter, mood and moment.">
<meta name="theme-color" content="#fbf8f4">
<link rel="icon" href="{favicon}" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Inter:wght@400;500&display=swap" rel="stylesheet">
<style>
{inline_images(css)}
</style>
</head>
<body data-page="home">
<a class="skip-link" href="#main">Skip to content</a>
<div data-site-header></div>
<div id="app"></div>
<div data-site-footer></div>
<script>
{inline_images(js)}
{router}
</script>
</body>
</html>
""")

kb = OUT.stat().st_size / 1024
print(f"wrote {OUT.name} ({kb:.0f} KB, {len(views)} pages, {len(IMG)} images inlined)")
