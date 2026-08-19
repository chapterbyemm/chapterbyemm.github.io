/* ==========================================================================
   ChapterByEmm — SITE DATA
   --------------------------------------------------------------------------
   THIS IS THE MAIN FILE YOU EDIT.
   Everything below drives the whole website: products, prices, images,
   collections, shipping rates, promo codes, payment methods, your contact
   details and social/Etsy links. Nothing here requires a build step — save
   the file and refresh the page.
   ========================================================================== */

/* --------------------------------------------------------------------------
   1. BRAND / CONTACT SETTINGS  ←  REPLACE THESE PLACEHOLDERS
   -------------------------------------------------------------------------- */
const SITE = {
  name: "ChapterByEmm",
  tagline: "Every Design Begins a New Chapter.",
  intro: "Thoughtfully created T-shirts for the moments, moods and chapters that make you, you.",

  // Your logo. Upload a square crop of the circular mark (no text) as this
  // exact filename. If the file is missing, the site falls back to the
  // wordmark in type — nothing looks broken while you're setting up.
  logo: "assets/img/site/logo.png",

  // REPLACE: your real business email
  email: "hello@chapterbyemm.com",
  // REPLACE: your WhatsApp number, digits only with country code (used for
  // both the tel: link and the wa.me custom-order link)
  whatsapp: "923000000000",
  whatsappDisplay: "+92 300 0000000",
  // REPLACE: your studio city — shown in the footer and shipping copy
  location: "Lahore, Pakistan",

  // REPLACE: your social profiles. `etsy` is your DIGITAL shop — kept
  // clearly separate from this physical-tee storefront everywhere it appears.
  social: {
    instagram: "https://instagram.com/chapterbyemm",
    instagramHandle: "@chapterbyemm",
    pinterest: "https://pinterest.com/chapterbyemm",
    facebook: "https://facebook.com/chapterbyemm",
    etsy: "https://etsy.com/shop/chapterbyemm",
  },

  // Currency + store settings — Pakistan-first: PKR, no decimals shown.
  currency: "PKR",
  currencySymbol: "Rs. ",
  taxRate: 0, // set a decimal (e.g. 0.05) if you ever need to add tax at checkout
  freeShippingThreshold: 4000, // free standard delivery over this amount (PKR)

  // Shown in the announcement bar above the header on every page.
  announcement: "Free shipping across Pakistan on orders above Rs. 4,000 · Cash on Delivery available",

  // Default checkout country. Pakistan-only for now — see PAKISTAN_LOCATIONS
  // below for the province/city lists used in the address form.
  defaultCountry: "Pakistan",
};

/* --------------------------------------------------------------------------
   2. DELIVERY OPTIONS  ←  REPLACE with your real courier rates once set
   -------------------------------------------------------------------------- */
const SHIPPING_METHODS = [
  { id: "standard", label: "Standard Delivery", eta: "3–6 business days, nationwide", price: 250 },
  { id: "express", label: "Express Delivery", eta: "1–2 business days, major cities only", price: 450 },
];

/* --------------------------------------------------------------------------
   3. PAYMENT METHODS  ←  configure which of these you currently accept
   -------------------------------------------------------------------------- */
/*  `enabled: false` keeps a method visible but marked "coming soon" instead
    of removing it — useful for Online Payment until a gateway is connected.
    See the payment-placeholder note in checkout.html / initCheckout() in
    assets/js/pages.js for where to wire up a real gateway (JazzCash, Easypaisa,
    Stripe, etc). Nothing here processes a real payment yet. */
const PAYMENT_METHODS = [
  {
    id: "cod",
    label: "Cash on Delivery",
    detail: "Pay in cash when your order arrives.",
    enabled: true,
  },
  {
    id: "bank",
    label: "Bank Transfer",
    detail: "Transfer to our account and send a screenshot on WhatsApp — details shown after you place your order.",
    enabled: true,
  },
  {
    id: "online",
    label: "Online Payment (Card / JazzCash / Easypaisa)",
    detail: "Coming soon — a secure payment gateway is being connected.",
    enabled: false,
  },
];

/* --------------------------------------------------------------------------
   4. PAKISTAN LOCATIONS — used by the checkout address form
   -------------------------------------------------------------------------- */
const PAKISTAN_PROVINCES = [
  "Punjab",
  "Sindh",
  "Khyber Pakhtunkhwa",
  "Balochistan",
  "Islamabad Capital Territory",
  "Gilgit-Baltistan",
  "Azad Jammu & Kashmir",
];

const PAKISTAN_CITIES = [
  "Karachi", "Lahore", "Islamabad", "Rawalpindi", "Faisalabad", "Multan",
  "Peshawar", "Quetta", "Sialkot", "Gujranwala", "Hyderabad", "Bahawalpur",
  "Sargodha", "Sukkur", "Abbottabad", "Mardan", "Other",
];

/* --------------------------------------------------------------------------
   5. PROMO CODES  ←  add / remove your own codes
   -------------------------------------------------------------------------- */
const PROMO_CODES = {
  NEWCHAPTER10: { type: "percent", value: 10, label: "10% off — welcome code" },
  EMM15: { type: "percent", value: 15, label: "15% off — community code" },
  FREESHIP: { type: "shipping", value: 100, label: "Free standard delivery" },
};

/* --------------------------------------------------------------------------
   6. COLOURS AVAILABLE FOR PRINTING
   `hex` is only used for the little swatch dots in the UI.
   -------------------------------------------------------------------------- */
const COLORS = {
  powder: { label: "Powder Blue", hex: "#cfdde9" },
  terracotta: { label: "Terracotta", hex: "#c65440" },
  kelly: { label: "Kelly Green", hex: "#2f9c4f" },
  charcoal: { label: "Washed Black", hex: "#2c2c2a" },
  cream: { label: "Cream", hex: "#f3efe6" },
  sand: { label: "Soft Sand", hex: "#ddba8a" },
  navy: { label: "Deep Navy", hex: "#173e47" },
  white: { label: "White", hex: "#ffffff" },
};

/* --------------------------------------------------------------------------
   7. COLLECTIONS / CATEGORIES
   `id` is what each product references in its `categories` array. All seven
   are shown in the shop filters and on the Collections page even before they
   hold products — an empty one shows a warm "new designs coming soon"
   message instead of an empty grid, per the brand's editorial framing.
   -------------------------------------------------------------------------- */
const COLLECTIONS = [
  {
    id: "new-chapters",
    name: "New Chapters",
    blurb: "The newest prints, fresh off the press.",
    image: "assets/img/products/doing-my-best-3.jpg",
  },
  {
    id: "everyday",
    name: "Everyday",
    blurb: "Quiet, versatile pieces you'll reach for on repeat.",
    image: "assets/img/site/photo-coming-soon.jpg",
  },
  {
    id: "mama",
    name: "Mama",
    blurb: "For every stage of motherhood — soft, honest, wearable every day.",
    image: "assets/img/site/photo-coming-soon.jpg",
  },
  {
    id: "inspired",
    name: "Inspired",
    blurb: "Gentle reminders you can wear on the days you need them most.",
    image: "assets/img/products/calm-superpower-2.jpg",
  },
  {
    id: "bold",
    name: "Bold Statements",
    blurb: "Say it louder. Statement prints for the confident chapters.",
    image: "assets/img/products/keep-showing-up-2.jpg",
  },
  {
    id: "limited",
    name: "Limited Drops",
    blurb: "Small-batch prints, gone once they're gone.",
    image: "assets/img/products/stress-never-heard-2.jpg",
  },
  {
    id: "custom",
    name: "Custom",
    blurb: "Your words, your idea, printed on our blanks.",
    image: "assets/img/site/photo-coming-soon.jpg",
  },
];

/* --------------------------------------------------------------------------
   8. PRODUCTS  ←  REPLACE with your real T-shirts and PKR prices
   -------------------------------------------------------------------------- */
/*  HOW TO ADD A PRODUCT
    ---------------------
    id          : unique url-safe slug (used in the product page link)
    name        : product title
    price       : number in PKR, no currency symbol or commas
    compareAt   : optional original price (shows as a strike-through) or null
    categories  : any ids from COLLECTIONS above
    images      : 1–4 image paths. Put your photos in assets/img/products/
                  and point to them here (.jpg / .webp / .png all fine).
    colors      : keys from COLORS above
    sizes       : available sizes; put a size in `soldOut` to cross it out
    badge       : "New", "Best Seller", "Limited" … or null
    description : short paragraph shown on the card + product page

    fabric / fit / care : shown in the "Made With Intention" section on the
    product page. Written here as honest placeholders — replace each with
    your exact fabric composition, GSM, print method and care instructions
    once confirmed. Do not leave invented specifics (like "100% organic
    cotton") unless that is actually true of your blanks.

    rating / reviewCount: shown under the title
*/
const SIZES_ALL = ["XS", "S", "M", "L", "XL", "XXL"];

const PRODUCTS = [
  {
    id: "stress-never-heard-of-her-tee",
    name: "Stress? Never Heard of Her Tee",
    price: 2400,
    compareAt: null,
    categories: ["new-chapters", "bold"],
    images: [
      "assets/img/products/stress-never-heard-1.jpg",
      "assets/img/products/stress-never-heard-2.jpg",
      "assets/img/products/stress-never-heard-3.jpg",
    ],
    colors: ["powder"],
    sizes: SIZES_ALL,
    soldOut: [],
    badge: "New",
    description:
      "An unbothered little cat and a very big mood, printed on a soft powder-blue oversized tee. The one people stop you about.",
    fabric: "[EDIT] Add your exact fabric composition and GSM here — e.g. 100% cotton, 200 gsm.",
    fit: "Oversized fit with a dropped shoulder and wide sleeve, styled here tucked at the front. [EDIT] Confirm true-to-size guidance once you have customer feedback.",
    care: "[EDIT] Add your confirmed wash and care instructions here.",
    rating: 4.9,
    reviewCount: 41,
  },
  {
    id: "im-doing-my-best-tee",
    name: "I'm Doing My Best Tee",
    price: 2400,
    compareAt: null,
    categories: ["new-chapters", "inspired"],
    images: [
      "assets/img/products/doing-my-best-1.jpg",
      "assets/img/products/doing-my-best-2.jpg",
      "assets/img/products/doing-my-best-3.jpg",
    ],
    colors: ["terracotta"],
    sizes: SIZES_ALL,
    soldOut: [],
    badge: "New",
    description:
      "A retro tulip square in butter and cream on warm terracotta — a quiet, generous permission slip for the days that ask a lot of you.",
    fabric: "[EDIT] Add your exact fabric composition and GSM here.",
    fit: "Relaxed oversized fit with a straight body and short dropped sleeve. [EDIT] Confirm true-to-size guidance.",
    care: "[EDIT] Add your confirmed wash and care instructions here.",
    rating: 5.0,
    reviewCount: 33,
  },
  {
    id: "keep-showing-up-tee",
    name: "Keep Showing Up Tee",
    price: 2600,
    compareAt: null,
    categories: ["new-chapters", "inspired", "bold"],
    images: [
      "assets/img/products/keep-showing-up-1.jpg",
      "assets/img/products/keep-showing-up-2.jpg",
    ],
    colors: ["charcoal"],
    sizes: SIZES_ALL,
    soldOut: [],
    badge: "New",
    description:
      "Ornate cream lettering on a washed black blank — the most-worn thing in the studio. Reads as smart with linen, easy with denim.",
    fabric: "[EDIT] Add your exact fabric composition and GSM here.",
    fit: "Relaxed oversized fit with a dropped shoulder, true to size for the look pictured. [EDIT] Confirm sizing guidance.",
    care: "[EDIT] Add your confirmed wash and care instructions here.",
    rating: 4.9,
    reviewCount: 27,
  },
  {
    id: "calm-is-a-superpower-tee",
    name: "Calm Is a Superpower Tee",
    price: 2200,
    compareAt: null,
    categories: ["new-chapters", "inspired"],
    images: [
      "assets/img/products/calm-superpower-1.jpg",
      "assets/img/products/calm-superpower-2.jpg",
    ],
    colors: ["kelly"],
    sizes: SIZES_ALL,
    soldOut: [],
    badge: "New",
    description:
      "Hand-lettered script inside a ring of red and marigold florals, printed on true kelly green. The brightest thing in the collection, and the calmest sentiment.",
    fabric: "[EDIT] Add your exact fabric composition and GSM here.",
    fit: "Our most fitted cut — a classic straight fit with a set-in sleeve. [EDIT] Confirm true-to-size guidance.",
    care: "[EDIT] Add your confirmed wash and care instructions here.",
    rating: 4.8,
    reviewCount: 19,
  },
];

/* --------------------------------------------------------------------------
   9. CUSTOMER REVIEWS (homepage + product pages)
   Replace these with real reviews as they come in — keep the tone specific
   and low-key rather than generic, so they read as authentic.
   -------------------------------------------------------------------------- */
const REVIEWS = [
  {
    stars: 5,
    text: "The fabric is so much nicer than I expected, and the print still looks brand new after several washes.",
    name: "Amara K.",
    detail: "Stress? Never Heard of Her Tee · Size M",
  },
  {
    stars: 5,
    text: "The terracotta is exactly like the photos, which never happens. I've worn it three times in one week.",
    name: "Jaweria R.",
    detail: "I'm Doing My Best Tee · Size L",
  },
  {
    stars: 5,
    text: "Arrived beautifully packaged and the lettering is so crisp. Genuinely thoughtful service from a small brand.",
    name: "Priya S.",
    detail: "Keep Showing Up Tee · Size S",
  },
  {
    stars: 4,
    text: "Runs oversized exactly as described. I sized down and it's now my every-weekend tee.",
    name: "Danya M.",
    detail: "I'm Doing My Best Tee · Size M",
  },
];

/* --------------------------------------------------------------------------
   10. SIZE GUIDE (body measurements, in inches) — used by size-guide.html
   and the "Size Guide" link on each product page.
   -------------------------------------------------------------------------- */
const SIZE_CHART = [
  { size: "XS", chest: "32–34", length: "26", sleeve: "7.5" },
  { size: "S", chest: "34–36", length: "27", sleeve: "8" },
  { size: "M", chest: "38–40", length: "28", sleeve: "8.5" },
  { size: "L", chest: "42–44", length: "29", sleeve: "9" },
  { size: "XL", chest: "46–48", length: "30", sleeve: "9.5" },
  { size: "XXL", chest: "50–52", length: "31", sleeve: "10" },
];

/* --------------------------------------------------------------------------
   11. THE CHAPTER JOURNAL — editorial posts shown on journal.html
   -------------------------------------------------------------------------- */
const JOURNAL_POSTS = [
  {
    slug: "how-it-started",
    title: "How ChapterByEmm Started",
    excerpt: "A women's health physiotherapist by day, and how a quiet love for art turned into a small creative business.",
    image: "assets/img/products/doing-my-best-2.jpg",
    date: "2025",
    body:
      "Every chapter in life begins with a small step, and this is mine. ChapterByEmm grew out of a quiet, long-held love for art and painting that stayed in the background for years — until one day I decided to give it a space of its own. This journal is where I'll share the thinking behind new designs, what a piece is meant to say, and the small, ordinary parts of building something from scratch.",
  },
  {
    slug: "styling-oversized-tees",
    title: "Styling an Oversized Tee, Three Ways",
    excerpt: "Notes on wearing the drop-shoulder fit — tucked, layered, and on its own.",
    image: "assets/img/products/stress-never-heard-3.jpg",
    date: "2025",
    body:
      "[EDIT] Replace this with your own styling notes and photos once you have them. A few starting angles: tucked into wide-leg jeans with a low bun, layered under an open shirt for cooler weather, or worn oversized with straight trousers and trainers for an easy everyday look.",
  },
  {
    slug: "behind-the-print",
    title: "Behind the Print: I'm Doing My Best",
    excerpt: "Where the tulip motif came from, and why terracotta felt like the right colour for this one.",
    image: "assets/img/products/doing-my-best-1.jpg",
    date: "2025",
    body:
      "[EDIT] Replace this with the real story behind this design — the sketch it started as, why you chose this palette, and what you hope someone feels wearing it.",
  },
];

/* --------------------------------------------------------------------------
   12. FAQ CONTENT (used by faq.html)
   -------------------------------------------------------------------------- */
const FAQ_GROUPS = [
  {
    title: "Sizing & fit",
    items: [
      {
        q: "How do your T-shirts fit?",
        a: "Most of our tees are a relaxed or oversized unisex fit and run true to size. The oversized styles are intentionally roomy — size down one if you prefer a standard fit. The Calm Is a Superpower Tee is our most fitted cut. Full body measurements for every size are on the Size Guide page and under “Size & fit” on each product page.",
      },
      {
        q: "I'm between two sizes — which should I choose?",
        a: "Size up for a looser, more draped look, or size down for a closer fit. If you're unsure, message us on WhatsApp with your usual size and height and we'll recommend the best option for that specific style.",
      },
      {
        q: "Do you offer plus sizes?",
        a: "Our current range runs XS to XXL. We're actively working on extending the range — message us to be told first when larger sizes arrive.",
      },
    ],
  },
  {
    title: "Fabric & print quality",
    items: [
      {
        q: "What fabric are the T-shirts made from?",
        a: "[EDIT] Add your confirmed fabric composition and weight here. Every product page also lists the fabric for that specific style once confirmed.",
      },
      {
        q: "How are the designs printed?",
        a: "[EDIT] Add your confirmed print method here (e.g. DTG, screen print, vinyl) so customers know exactly what they're buying.",
      },
      {
        q: "Will the print fade?",
        a: "[EDIT] Add your guidance here once you've confirmed how the print holds up with normal washing.",
      },
    ],
  },
  {
    title: "Washing & care",
    items: [
      {
        q: "How should I wash my tee?",
        a: "[EDIT] Add your confirmed washing and care instructions here — this should match the care label on your actual blanks.",
      },
      {
        q: "Will it shrink?",
        a: "[EDIT] Add your guidance here once confirmed with your fabric supplier.",
      },
    ],
  },
  {
    title: "Shipping & delivery",
    items: [
      {
        q: "Do you deliver across Pakistan?",
        a: "Yes — we ship nationwide. Standard delivery typically takes 3–6 business days depending on your city; express delivery (1–2 business days) is available for major cities. See the Shipping & Delivery page for full details.",
      },
      {
        q: "How much is delivery?",
        a: "Standard delivery is Rs. 250 and express is Rs. 450. Standard delivery is free on orders above Rs. 4,000. [EDIT] Confirm these rates once you've finalised a courier.",
      },
      {
        q: "Can I pay Cash on Delivery?",
        a: "Yes — Cash on Delivery is available nationwide. Bank Transfer is also accepted; online card/wallet payment is coming soon.",
      },
      {
        q: "Can I track my order?",
        a: "[EDIT] Add your tracking process here once you've confirmed it with your courier.",
      },
    ],
  },
  {
    title: "Returns & exchanges",
    items: [
      {
        q: "What is your returns policy?",
        a: "[EDIT] Add your confirmed return window and conditions here. See the Returns & Exchanges page for the full policy.",
      },
      {
        q: "Can I exchange for a different size?",
        a: "[EDIT] Add your confirmed size-exchange process here.",
      },
      {
        q: "Are custom tees returnable?",
        a: "Because custom tees are printed to your exact request, they can only be returned if there's a fault or a printing error on our side — which is why we confirm every design with you before printing.",
      },
    ],
  },
  {
    title: "Custom orders",
    items: [
      {
        q: "Can you print my own idea?",
        a: "Yes — that's what the Custom page is for. Send us your idea, wording, preferred style, size and colour and we'll reply on WhatsApp or email with a mock-up and a quote.",
      },
      {
        q: "Do you take bulk or group orders?",
        a: "We do — family occasions, small businesses and group gifts. Tell us your quantity on the Custom form and we'll send tiered pricing.",
      },
    ],
  },
  {
    title: "Order issues",
    items: [
      {
        q: "My order arrived damaged or incorrect — what now?",
        a: "We're sorry. Message us a photo on WhatsApp or email within 7 days of delivery and we'll sort out a reprint or replacement at no extra cost.",
      },
      {
        q: "Can I change or cancel my order?",
        a: "If your tee hasn't gone to print yet, yes — message us as soon as possible with your order details.",
      },
    ],
  },
];
