# ChapterByEmm — developer notes

A complete, responsive storefront for **physical printed T-shirts**, built for the
Pakistani market (PKR, Cash on Delivery, nationwide delivery). Plain HTML, CSS and
JavaScript — no build step, no framework, no dependencies.

---

## 1. Run it locally

Double-clicking `index.html` works for a quick look, but product links use `?id=…`
query strings, so a tiny local server behaves best:

```bash
cd chapterbyemm
python3 -m http.server 8000
# then open http://localhost:8000
```

## 2. Files

```
chapterbyemm/
├── index.html               Homepage — hero, featured, New Chapters, collections,
│                             story teaser, reviews, journal preview, Etsy callout
├── shop.html                All T-shirts + collection/size/colour filters, sort, search
├── product.html             Product detail — links look like product.html?id=SLUG
├── collections.html         All seven collections
├── size-guide.html          Size chart + how-to-measure
├── journal.html             The Chapter Journal listing
├── journal-post.html        Single journal entry — journal-post.html?slug=SLUG
├── shipping.html            Shipping & delivery policy
├── returns-exchanges.html   Returns & exchanges policy
├── about.html                "Our Story" — the founder's story, verbatim
├── custom-designs.html      Custom T-shirt request form (WhatsApp, reference upload)
├── faq.html                 FAQ with live search
├── contact.html             Contact form + WhatsApp/email/social links
├── cart.html                 Full bag page
├── checkout.html            Pakistan address form, delivery method, payment method
├── wishlist.html            Saved items
├── privacy.html / terms.html  Legal page templates — [EDIT] before launch
├── robots.txt / sitemap.xml   ← replace the domain in both
└── assets/
    ├── css/styles.css       All styling. Design tokens (palette, type, radius) at the top.
    ├── js/data.js           ★ YOUR CONTENT — see below, this is almost everything
    ├── js/components.js     Header, nav, cart/search/account drawers, footer, product card
    ├── js/pages.js          Page behaviour — shop filters, PDP, cart, checkout, journal, FAQ
    ├── js/app.js            Cart/wishlist store, totals, toasts, image fallback, form handling
    └── img/
        ├── products/        ★ your product photos go here
        └── site/            logo.png + the "photo coming soon" fallback tiles
```

`assets/js/data.js` is where you'll live for day-to-day changes. Almost nothing
else needs editing.

---

## 3. What to replace before launch

### Products, prices, images → `assets/js/data.js`

```js
{
  id: "stress-never-heard-of-her-tee",   // used in the URL: product.html?id=…
  name: "Stress? Never Heard of Her Tee",
  price: 2400,                            // PKR, integer, no symbol or commas
  compareAt: null,                        // or a higher number for a strike-through
  categories: ["new-chapters", "bold"],   // any id(s) from COLLECTIONS
  images: ["assets/img/products/stress-never-heard-1.jpg", "…", "…"],
  colors: ["powder"],                     // keys from COLORS
  sizes: SIZES_ALL,
  soldOut: [],                            // e.g. ["XS"] — crossed out on the PDP
  badge: "New",                           // "New" / "Limited" / null
  description: "…",
  fabric: "…", fit: "…", care: "…",       // shown in "Made With Intention" on the PDP
  rating: 4.9, reviewCount: 41,
}
```

Copy a block, change the values, delete a block to remove a product.

### Brand + contact → the `SITE` object at the top of `data.js`
Email, WhatsApp number, studio location, social URLs (including `social.etsy` —
your digital shop, kept deliberately separate throughout the site), currency
settings, free-delivery threshold, and the announcement-bar text.

### Delivery → `SHIPPING_METHODS` in `data.js`
Drives the checkout radio buttons, the PDP shipping accordion, the cart's
"you're Rs. X away from free delivery" line, and `shipping.html`'s table —
all from one array.

### Payment → `PAYMENT_METHODS` in `data.js`
Cash on Delivery and Bank Transfer ship enabled. Online Payment is
`enabled: false` (shows "Coming Soon", radio disabled) until a gateway is
wired in — see §4.

### Pakistan address data → `PAKISTAN_PROVINCES` / `PAKISTAN_CITIES` in `data.js`
Populates the two `<select>` dropdowns on the checkout address form.

### Collections → `COLLECTIONS` in `data.js`
All seven ship live (`New Chapters`, `Everyday`, `Mama`, `Inspired`,
`Bold Statements`, `Limited Drops`, `Custom`). One with no products in its
`categories` shows a "new designs coming soon" message instead of an empty
grid — nothing needs to be commented in/out as you add products.

### Journal → `JOURNAL_POSTS` in `data.js`
Each entry has `slug`, `title`, `excerpt`, `image`, `date`, `body`. The
`journal-post.html?slug=…` template and the "keep reading" related-posts rail
are both driven from this one array.

### Promo codes → `PROMO_CODES` in `data.js`

### Navigation → `NAV` at the top of `assets/js/components.js`
One array, applied to the header, mobile menu, and (indirectly, via routes)
every page.

### Colours & fonts → design tokens at the top of `assets/css/styles.css`
The palette is drawn from the ChapterByEmm logo — ivory `--cream`, terracotta
`--clay`, muted teal `--sage`, deep navy `--ink`, soft sand `--sand`. Change
any token and the whole site re-skins. Type is `--font-display` (Fraunces, an
editorial serif) paired with `--font-body` (Inter), both loaded via Google
Fonts in each page's `<head>`. `--radius` / `--radius-lg` / `--radius-pill`
are intentionally small (2–8px) for the quiet-luxury look — the last one
isn't a true pill shape, it's a compressed rectangle; that was a deliberate
choice to avoid the generic-SaaS look, not an oversight.

### Domain → `robots.txt`, `sitemap.xml`, and `<link rel="canonical">` in every page
Search for `chapterbyemm.com` and replace with your real domain.

---

## 4. Connecting the things that need a backend

**1. Online payment gateway** — `checkout.html` (payment methods render from
`PAYMENT_METHODS`) and `assets/js/pages.js` → `initCheckout()`, marked
`CONNECT A PAKISTANI PAYMENT GATEWAY HERE`. Cash on Delivery and Bank Transfer
need no gateway — the order just needs to reach you, which it already does
(logged with `console.log("[order]", …)`, ready to wire into email/WhatsApp/a
sheet/a real backend). For online payment, integrate JazzCash, Easypaisa, or
a card processor, then flip `enabled: true` on the `online` entry in
`PAYMENT_METHODS`:

```js
const res = await fetch("/api/create-payment", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ items: Store.cart, customer: data }),
});
const { redirectUrl } = await res.json();
location.href = redirectUrl;
```

**2. Forms** (newsletter, contact, custom design) — `assets/js/app.js` →
`initForms()`. They validate and show a success message, logging to the
console. Point them at Formspree, Basin, Netlify Forms, or your CRM:

```js
fetch("https://formspree.io/f/YOUR_ID", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(data),
});
```

The custom-design form's reference-image `<input type="file">` is front-end
only — wire the same submit handler to upload it (e.g. to S3 or your form
provider) once you have a backend.

**3. Cart/wishlist storage** — `Store.read()` / `Store.write()` in `app.js`
use `localStorage`. Swap those two functions for API calls if you want a
cart to follow a logged-in customer across devices — which pairs with
building out the Account panel (`#account-panel` in `components.js`),
currently a "coming soon" placeholder.

---

## 5. The single-file preview build

`docs/build-single-page.py` bundles every page, all CSS/JS, and every image
in `assets/img/` into one self-contained `chapterbyemm-single-page.html` —
useful for sharing a single link or a quick local preview with no server.
Re-run it after any change to the multi-page site:

```bash
python3 docs/build-single-page.py
```

It's a client-side hash router (`#/shop.html?collection=mama`) built from the
same `assets/js/*.js` — the multi-page files stay the single source of
truth; never hand-edit the generated file.

---

## 6. Hosting

Static site — all of these are free and take minutes:

- **Netlify** — drag the `chapterbyemm` folder onto app.netlify.com/drop
- **Vercel** — `vercel deploy`
- **GitHub Pages** — push the folder, enable Pages in the repo settings
- **Cloudflare Pages** — connect the repo, no build command needed

Add your custom domain in the host's dashboard, then submit `sitemap.xml` to
Google Search Console.

---

## 7. What's already handled

- **Responsive** at every width, mobile treated as first-class — the header
  drops to 3 icons (wishlist/bag/menu) under 900px, with Search and Account
  moved into the mobile menu rather than crowding the header
- **Accessible** — skip link, focus rings, ARIA on nav/drawers/filters,
  keyboard-operable size/colour pickers, `Esc` closes any open panel,
  `prefers-reduced-motion` respected, labelled form fields
- **SEO** — unique title/description per page, canonical tags, Open Graph,
  semantic landmarks, descriptive alt text, `ClothingStore` + `Product` +
  `FAQPage` structured data, `robots.txt`, `sitemap.xml`, shareable filtered
  URLs (`shop.html?collection=mama`, `shop.html?q=terracotta`)
- **Fast** — no frameworks, lazy-loaded below-the-fold images, `width`/`height`
  set everywhere to prevent layout shift
- **Honest image fallback** — any `<img>` whose file hasn't been uploaded yet
  (static or dynamically rendered) swaps to a plain "Photo coming soon" tile
  instead of a broken-image icon; see `applyImageFallback()` in `app.js`
- **Physical-product, Pakistan-specific language throughout** — PKR pricing,
  Cash on Delivery, nationwide shipping, sizes, fit, care. Etsy is referenced
  only as the separate *digital* shop, never presented as part of checkout
- **Quick-add** — hovering (or tapping, on touch) a product card reveals a
  size picker that adds to the bag without leaving the shop grid

---

## 8. Quick tasks

| I want to… | Do this |
|---|---|
| Change a price | `data.js` → that product's `price` (PKR, integer) |
| Add a new tee | Copy a `PRODUCTS` block, change the values, list its collection id(s) |
| Mark something sold out | Add the size to that product's `soldOut` array |
| Add a journal post | Copy a `JOURNAL_POSTS` block, give it a unique `slug` |
| Change the announcement bar | `SITE.announcement` in `data.js` |
| Change free-delivery threshold | `SITE.freeShippingThreshold` in `data.js` |
| Enable online payment | Connect a gateway (§4), then flip `enabled: true` in `PAYMENT_METHODS` |
| Add a delivery city | `PAKISTAN_CITIES` in `data.js` |
| Edit an FAQ answer | `FAQ_GROUPS` in `data.js` |
| Edit customer reviews | `REVIEWS` in `data.js` |
| Change the nav links | `NAV` in `components.js` |
| Re-skin the colours | Design tokens at the top of `styles.css` |
