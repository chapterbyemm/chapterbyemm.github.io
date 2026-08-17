# ChapterByEmm — website

A complete, responsive storefront for **physical printed T-shirts**. Plain HTML, CSS and
JavaScript — no build step, no dependencies. Open `index.html` in a browser and it works.

---

## 1. Run it locally

Double-clicking `index.html` works, but product links use `?id=…`, so a tiny local server
behaves best:

```bash
cd chapterbyemm
python3 -m http.server 8000
# then open http://localhost:8000
```

## 2. Files

```
chapterbyemm/
├── index.html            Homepage (hero, featured, new arrivals, collections,
│                         best sellers, story, reviews, Instagram, newsletter)
├── shop.html             All T-shirts + collection / size / colour filters, sort, search
├── product.html          Product detail page — links look like product.html?id=PRODUCT_ID
├── collections.html      All seven collections
├── cart.html             Full cart page
├── checkout.html         Shipping address, delivery, promo code, payment placeholder
├── wishlist.html         Saved items
├── about.html            About ChapterByEmm
├── custom-designs.html   Custom / personalised request form
├── faq.html              FAQ with live search
├── contact.html          Contact form + email + social links
├── robots.txt            ← replace the domain
├── sitemap.xml           ← replace the domain
└── assets/
    ├── css/styles.css    All styling. Colours + fonts are at the very top.
    ├── js/data.js        ★ YOUR CONTENT: products, prices, images, shipping, promo codes
    ├── js/components.js  Header, nav, cart drawer, footer, product card
    ├── js/pages.js       Page behaviour (shop filters, product page, cart, checkout, FAQ)
    ├── js/app.js         Cart/wishlist storage, totals, toasts, form handling
    └── img/
        ├── products/     ★ REPLACE with your product photos
        └── site/         ★ REPLACE hero, story, collection and Instagram images
```

`data.js` is the file you'll live in. Nothing else needs editing for day-to-day changes.

---

## 3. What to replace before launch

### Products, prices, images → `assets/js/data.js`
Each product looks like this:

```js
{
  id: "every-new-chapter-tee",        // used in the URL: product.html?id=…
  name: "Every New Chapter Tee",
  price: 34,                          // number only, no $
  compareAt: null,                    // or 42 to show a strike-through price
  categories: ["new-arrivals", "best-sellers", "inspirational"],
  images: [                           // 1–4 images; first one is the card image
    "assets/img/products/every-new-chapter-1.svg",
    "assets/img/products/every-new-chapter-2.svg",
  ],
  colors: ["cream", "sand", "black"],  // keys from the COLORS list above it
  sizes: ["XS","S","M","L","XL","XXL"],
  soldOut: ["XS"],                     // crossed out on the product page
  badge: "Best seller",                // or "New" / "Limited" / null
  description: "…",                    // card + product page
  fabric: "…", fit: "…", care: "…",    // product page accordions
  rating: 4.9, reviewCount: 128,
  personalized: true,                  // optional: adds a "text to print" field
  personalizationLabel: "Names to print",
}
```

Copy a block, change the values, done. Delete a block to remove a product.

### Product photos → `assets/img/products/`
The placeholders are `.svg` mock-ups. Drop your real photos in the same folder and point
each product's `images` array at them. `.webp` is ideal, `.jpg` is fine.
**Recommended: 900 × 1100 px (4:5 portrait)**, all products shot the same way so the grid
looks even. Keep files under ~200 KB each.

Site imagery lives in `assets/img/site/` — `hero.svg`, `story.svg`, `about-hero.svg`,
`custom-hero.svg`, `col-*.svg` (collection covers) and `ig-1…6.svg` (Instagram tiles).

### Brand email, phone, socials → top of `assets/js/data.js` (the `SITE` object)
Also hard-coded in two spots for SEO reasons — search for `hello@chapterbyemm.com` and
`instagram.com/chapterbyemm` in `contact.html` and `index.html` and swap them.

### Shipping rates → `SHIPPING_METHODS` in `data.js`
Change the labels, delivery estimates and prices. `SITE.freeShippingThreshold` sets the
free-shipping cut-off and `SITE.taxRate` sets the estimated tax (use `0` to hide tax).

### Promo codes → `PROMO_CODES` in `data.js`
```js
NEWCHAPTER10: { type: "percent", value: 10, label: "10% off — welcome code" },
SAVE5:        { type: "fixed",   value: 5,  label: "$5 off" },
FREESHIP:     { type: "shipping", value: 100, label: "Free standard shipping" },
```

### Collections → `COLLECTIONS` in `data.js`
Add or rename edits here and the shop filters, collections page, homepage and footer all
update themselves.

### Navigation → `NAV` at the top of `assets/js/components.js`
One array, applied to every page's header, mobile menu and footer.

### Colours & fonts → top of `assets/css/styles.css`
Every colour is a CSS variable in `:root`. Change `--clay` and `--sand` and the whole site
re-skins. Fonts are `--font-display` (Cormorant Garamond) and `--font-body` (Inter), both
loaded from Google Fonts in each page's `<head>`.

### Domain → `robots.txt`, `sitemap.xml`, and the `<link rel="canonical">` in each page
Search for `chapterbyemm.com` and replace with your real domain.

---

## 4. Connecting the things that need a backend

Three places are deliberately left as placeholders. Each one is marked with a comment.

**1. Payments** — `checkout.html` (the `PAYMENT INTEGRATION PLACEHOLDER` block) and
`assets/js/pages.js` → `initCheckout()` (the `CONNECT YOUR PAYMENT PROVIDER HERE` block).
Right now "Place order" validates the form and shows a confirmation screen without
charging anything. To go live, use a hosted checkout so you never touch raw card numbers:

```js
const res = await fetch("/api/create-checkout-session", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ items: Store.cart, email: data.email }),
});
const { url } = await res.json();
location.href = url;   // Stripe / PayPal hosted page
```

Easiest options: **Stripe Checkout**, **PayPal Smart Buttons**, or **Snipcart / Shopify
Buy Buttons** if you'd rather not run a server at all.

**2. Forms** (newsletter, contact, custom design) — `assets/js/app.js` → `initForms()`.
They currently validate and show a success message, logging the data to the browser
console. Point them at Formspree, Basin, Netlify Forms, Mailchimp or Klaviyo:

```js
fetch("https://formspree.io/f/YOUR_ID", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(data),
});
```

**3. Cart storage** — `Store.read()` / `Store.write()` in `app.js` use `localStorage`, so
carts survive a refresh on the same device. Swap those two functions for API calls if you
later want carts to follow a logged-in customer.

---

## 5. Hosting

It's a static site, so all of these are free and take minutes:

- **Netlify** — drag the `chapterbyemm` folder onto app.netlify.com/drop
- **Vercel** — `vercel deploy`
- **GitHub Pages** — push the folder, enable Pages in the repo settings
- **Cloudflare Pages** — connect the repo, no build command needed

Add your custom domain in the host's dashboard, then submit `sitemap.xml` to Google
Search Console.

---

## 6. What's already handled

- **Responsive** at every width — single-column phone, two-up tablet, four-up desktop
- **Accessible** — skip link, focus rings, ARIA on nav/cart/filters, keyboard-operable
  size and colour pickers, `Esc` closes the cart and menu, respects
  `prefers-reduced-motion`, real labels on every field
- **SEO** — unique title and meta description per page, canonical tags, Open Graph tags,
  semantic landmarks, descriptive alt text, `ClothingStore` + `Product` + `FAQPage`
  structured data, `robots.txt`, `sitemap.xml`, clean shareable URLs
  (`shop.html?collection=mama`)
- **Fast** — no frameworks, SVG placeholders, lazy-loaded images below the fold,
  `width`/`height` on images to prevent layout shift
- **Physical-product language throughout** — sizes, fabric weights, fit, care, printing
  time, shipping and returns. No digital-download wording anywhere.

---

## 7. Quick tasks

| I want to… | Do this |
|---|---|
| Change a price | `data.js` → that product's `price` |
| Add a new tee | Copy a `PRODUCTS` block in `data.js`, change the values |
| Mark something sold out | Add the size to that product's `soldOut` array |
| Add a collection | Add to `COLLECTIONS`, then list its `id` in each product's `categories` |
| Change the announcement bar | `SITE.announcement` in `data.js` |
| Change free-shipping threshold | `SITE.freeShippingThreshold` in `data.js` |
| Turn off tax at checkout | Set `SITE.taxRate: 0` in `data.js` |
| Edit an FAQ answer | `FAQ_GROUPS` in `data.js` |
| Edit customer reviews | `REVIEWS` in `data.js` |
| Change the nav links | `NAV` in `components.js` |
| Re-skin the colours | `:root` at the top of `styles.css` |
