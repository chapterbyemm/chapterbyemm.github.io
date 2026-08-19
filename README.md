# ChapterByEmm — how to finish setting up your site

**You do not need to know any code for most of this.** Everything below happens
on GitHub, in your browser. The one exception (connecting a payment gateway) is
called out clearly so you know to hire help for just that part.

---

## Step 1 — Upload your logo

Save a **square crop of just the circular mark** (no text underneath) as
`logo.png`, then:

1. Click this folder: **[assets/img/site](assets/img/site)**
2. Green **Add file** button → **Upload files**
3. Drag `logo.png` in → **Commit changes**

It appears in the header next to the brand name, in the footer, and as the
browser-tab icon. Until you upload it, the site just shows the brand name in
type — nothing looks broken.

---

## Step 2 — Upload the T-shirt photos

Rename each photo to the exact filename in the table below, then upload them
all at once to **[assets/img/products](assets/img/products)** (same steps as
above — you can drag all 10 in together).

### Stress? Never Heard of Her Tee — powder blue, black cat

| Your photo | Save it as |
|---|---|
| Close-up on the mannequin, print filling the frame | `stress-never-heard-1.jpg` |
| Full outfit with the black cap and shoulder bag | `stress-never-heard-2.jpg` |
| The other full-length outfit shot | `stress-never-heard-3.jpg` |

### I'm Doing My Best Tee — terracotta, tulips

| Your photo | Save it as |
|---|---|
| Close-up with the pearl and chain necklaces | `doing-my-best-1.jpg` |
| Flat lay on the sofa with the jeans and jewellery | `doing-my-best-2.jpg` |
| Full outfit with the cap and cargo jeans | `doing-my-best-3.jpg` |

### Keep Showing Up Tee — washed black, script

| Your photo | Save it as |
|---|---|
| Close-up with the gold chains | `keep-showing-up-1.jpg` |
| Full outfit with the cream linen trousers | `keep-showing-up-2.jpg` |

### Calm Is a Superpower Tee — kelly green, florals

| Your photo | Save it as |
|---|---|
| Close-up with the gold chain | `calm-superpower-1.jpg` |
| Full outfit with the jeans and white trainers | `calm-superpower-2.jpg` |

**Photo 1 of each tee is the main one** shown on the shop grid. The others
appear on that T-shirt's own page, and customers can click to zoom on them.

Those 10 files fill the whole website — the homepage hero, the "Our Story"
photos, collection covers and Instagram tiles all reuse them automatically.

> **Filenames must match exactly** — all lowercase, ending in `.jpg`, no
> spaces. `Stress-Never-Heard-1.JPG` will not work; `stress-never-heard-1.jpg`
> will. If a photo is `.png` or `.heic`, save it as `.jpg` first.

Until a photo is uploaded, its spot shows a plain "Photo coming soon" tile —
nothing looks broken while you work through the list. Wait about a minute
after committing, then refresh the site.

---

## Step 3 — Fill in your real contact details

Open **[assets/js/data.js](assets/js/data.js)**, click the pencil icon, and
find the `SITE` block near the top. Replace these placeholders:

| Field | What it controls |
|---|---|
| `email` | Every "email us" link and address on the site |
| `whatsapp` | Digits only, with country code, no `+` or spaces — e.g. `923001234567` |
| `whatsappDisplay` | The human-readable version shown next to it — e.g. `+92 300 1234567` |
| `location` | Shown in the footer and shipping copy — e.g. `Karachi, Pakistan` |
| `social.instagram` / `pinterest` / `facebook` | Your real profile URLs |
| `social.etsy` | **Your Etsy shop URL** — powers every "Explore Our Etsy Shop" button and the footer's "Digital Studio" link |

---

## Step 4 — Confirm your delivery and payment setup

Still in `data.js`:

- **`SHIPPING_METHODS`** — your real courier names, delivery estimates and
  charges (currently Rs. 250 standard / Rs. 450 express — placeholders).
- **`PAYMENT_METHODS`** — Cash on Delivery and Bank Transfer are on by
  default. Online Payment shows as "Coming Soon" (`enabled: false`) until you
  connect a gateway — see the note in Step 6.
- **`PAKISTAN_CITIES`** / **`PAKISTAN_PROVINCES`** — the dropdowns on the
  checkout address form. Add or remove cities as needed.
- If you enable Bank Transfer, open **[checkout.html](checkout.html)** and
  search for `[EDIT]` to add your account title, number and branch — it's
  shown to customers who choose that payment method after they place an order.

---

## What's in the shop right now

| T-shirt | Colour | Price |
|---|---|---|
| Stress? Never Heard of Her Tee | Powder Blue | Rs. 2,400 |
| I'm Doing My Best Tee | Terracotta | Rs. 2,400 |
| Keep Showing Up Tee | Washed Black | Rs. 2,600 |
| Calm Is a Superpower Tee | Kelly Green | Rs. 2,200 |

All four sit in **New Chapters**. **Everyday**, **Mama** and **Custom** are
live collections with no products in them yet — their shop pages show a warm
"new designs coming soon" message instead of an empty grid, so nothing looks
broken. Add a product to one (see below) and it fills in automatically.

---

## Change a price, name or description

1. Open **[assets/js/data.js](assets/js/data.js)**, click the pencil icon.
2. Ctrl+F (Cmd+F on a Mac) to find the tee.
3. Change the number after `price:` — e.g. `price: 2400` to `price: 2600`.
4. Scroll down, click **Commit changes**.

Only change words **inside the quote marks** and numbers after `price:`.
Leave the commas, quotes and curly brackets exactly as they are. Every
`fabric:`, `fit:` and `care:` line is marked `[EDIT]` — replace those with
your actual fabric composition, GSM and wash instructions once confirmed;
don't leave invented specifics in place.

### Adding a new T-shirt

Copy one whole product block — from its `{` to its `},` — paste it
underneath, and change the id, name, price, description, colours and image
filenames. Then upload photos matching those new filenames. Give it a
`categories` array using any collection id from `COLLECTIONS` (e.g. `"mama"`,
`"everyday"`, `"limited"`) and it appears there automatically.

---

## Step 5 — Content that needs your real answers

A few pages are built but intentionally left as honest placeholders where I
don't have your real information — search each file for `[EDIT]` to find
every spot:

- **[faq.html](faq.html)'s answers** live in `FAQ_GROUPS` in `data.js` —
  fabric, print method, wash care, tracking and return-window answers.
- **[shipping.html](shipping.html)** — tracking process and delivery
  exceptions.
- **[returns-exchanges.html](returns-exchanges.html)** — your actual return
  window and refund process.
- **[privacy.html](privacy.html)** and **[terms.html](terms.html)** are
  starting templates — have them reviewed before launch.

---

## Step 6 — Connecting real payments (needs a developer)

Cash on Delivery and Bank Transfer work today with no setup — orders placed
that way just need to reach you, which they already do (the order details are
ready to wire into email/WhatsApp/a spreadsheet).

Online Payment is a placeholder until a gateway (JazzCash, Easypaisa, or a
card processor) is connected. The exact spot to wire one in is marked with a
comment in **[assets/js/pages.js](assets/js/pages.js)** — search for
`CONNECT A PAKISTANI PAYMENT GATEWAY HERE`. Once connected, set
`enabled: true` on the `online` entry in `PAYMENT_METHODS` in `data.js`.

---

## The Chapter Journal

Blog-style posts live in `JOURNAL_POSTS` in `data.js` — each one has a title,
excerpt, image and body paragraph. Add a new entry by copying a block and
changing its `slug` (used in the URL), then write real content once you have
it — the two draft entries are marked `[EDIT]`.

---

## Something broke?

Nothing is ever lost. Every change is saved as its own version:

1. Click **Commits** (above the file list).
2. Find the change you want to undo.
3. Click it, then click **Revert**.

---

*Editing the code, the design system, or the single-file preview build? See
[docs/DEVELOPER-NOTES.md](docs/DEVELOPER-NOTES.md).*
