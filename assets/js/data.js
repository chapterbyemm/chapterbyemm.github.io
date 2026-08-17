/* ==========================================================================
   ChapterByEmm — SITE DATA
   --------------------------------------------------------------------------
   THIS IS THE MAIN FILE YOU EDIT.
   Everything below drives the whole website: products, prices, images,
   collections, shipping rates, promo codes, your email and social links.
   Nothing here requires a build step — save the file and refresh the page.
   ========================================================================== */

/* --------------------------------------------------------------------------
   1. BRAND / CONTACT SETTINGS  ←  REPLACE THESE PLACEHOLDERS
   -------------------------------------------------------------------------- */
const SITE = {
  name: "ChapterByEmm",
  tagline: "Designs for every new chapter.",
  intro: "Thoughtfully designed T-shirts for every chapter, mood, and moment.",

  // REPLACE: your real business email
  email: "hello@chapterbyemm.com",
  // REPLACE: your customer-service phone (or delete the line and the Contact page block)
  phone: "+1 (000) 000-0000",
  // REPLACE: your studio location / shipping origin
  location: "Toronto, Canada",

  // REPLACE: your social profiles
  social: {
    instagram: "https://instagram.com/chapterbyemm",
    instagramHandle: "@chapterbyemm",
    tiktok: "https://tiktok.com/@chapterbyemm",
    pinterest: "https://pinterest.com/chapterbyemm",
    facebook: "https://facebook.com/chapterbyemm",
  },

  // Currency + store settings
  currency: "USD",
  currencySymbol: "$",
  taxRate: 0.13,            // 13% — set to 0 if you do not charge tax at checkout
  freeShippingThreshold: 75, // free standard shipping over this amount

  announcement: "Free shipping on orders over $75 · Printed & shipped in 2–4 business days",
};

/* --------------------------------------------------------------------------
   2. SHIPPING OPTIONS  ←  REPLACE with your real carrier rates
   -------------------------------------------------------------------------- */
const SHIPPING_METHODS = [
  { id: "standard", label: "Standard shipping", eta: "5–8 business days after printing", price: 6.5 },
  { id: "express", label: "Express shipping", eta: "2–3 business days after printing", price: 14.0 },
  { id: "pickup", label: "Local pickup", eta: "Ready in 2–4 business days", price: 0 },
];

/* --------------------------------------------------------------------------
   3. PROMO CODES  ←  add / remove your own codes
   -------------------------------------------------------------------------- */
const PROMO_CODES = {
  NEWCHAPTER10: { type: "percent", value: 10, label: "10% off — welcome code" },
  EMM15: { type: "percent", value: 15, label: "15% off — community code" },
  FREESHIP: { type: "shipping", value: 100, label: "Free standard shipping" },
};

/* --------------------------------------------------------------------------
   4. COLOURS AVAILABLE FOR PRINTING
   `hex` is only used for the little swatch dots in the UI.
   -------------------------------------------------------------------------- */
const COLORS = {
  cream: { label: "Cream", hex: "#f4ede4" },
  sand: { label: "Sand", hex: "#e0d0ba" },
  black: { label: "Black", hex: "#221f1d" },
  sage: { label: "Sage", hex: "#a9b6a3" },
  clay: { label: "Clay", hex: "#c9a294" },
  white: { label: "White", hex: "#ffffff" },
};

/* --------------------------------------------------------------------------
   5. COLLECTIONS / CATEGORIES
   `id` is what each product references in its `categories` array.
   -------------------------------------------------------------------------- */
const COLLECTIONS = [
  {
    id: "new-arrivals",
    name: "New Arrivals",
    blurb: "The newest prints, fresh off the press.",
    image: "assets/img/site/col-everyday.svg",
  },
  {
    id: "best-sellers",
    name: "Best Sellers",
    blurb: "The tees our community keeps coming back for.",
    image: "assets/img/site/col-bold.svg",
  },
  {
    id: "mama",
    name: "Mama Collection",
    blurb: "For every stage of motherhood — soft, honest, wearable every day.",
    image: "assets/img/site/col-mama.svg",
  },
  {
    id: "inspirational",
    name: "Inspirational Collection",
    blurb: "Gentle reminders you can wear on the days you need them most.",
    image: "assets/img/site/col-inspirational.svg",
  },
  {
    id: "everyday",
    name: "Everyday Collection",
    blurb: "Quiet, versatile basics with a small detail that feels like you.",
    image: "assets/img/site/col-everyday.svg",
  },
  {
    id: "bold",
    name: "Bold / Statement Collection",
    blurb: "Say it louder. Statement prints for the confident chapters.",
    image: "assets/img/site/col-bold.svg",
  },
  {
    id: "custom",
    name: "Personalized / Custom T-Shirts",
    blurb: "Your words, names or dates printed on our premium blanks.",
    image: "assets/img/site/col-custom.svg",
  },
];

/* --------------------------------------------------------------------------
   6. PRODUCTS  ←  REPLACE with your real T-shirts
   -------------------------------------------------------------------------- */
/*  HOW TO ADD A PRODUCT
    ---------------------
    id          : unique url-safe slug (used in the product page link)
    name        : product title
    price       : number, no currency symbol
    compareAt   : optional original price (shows as a strike-through) or null
    categories  : any ids from COLLECTIONS above
    images      : 1–4 image paths. Put your photos in assets/img/products/
                  and point to them here (.jpg / .webp / .png all fine).
    colors      : keys from COLORS above
    sizes       : available sizes; put a size in `soldOut` to cross it out
    badge       : "New", "Best seller", "Limited" … or null
    description : short paragraph shown on the card + product page
    fabric / fit / care : shown in the product page accordions
    rating / reviewCount: shown under the title
*/
const SIZES_ALL = ["XS", "S", "M", "L", "XL", "XXL"];

const PRODUCTS = [
  {
    id: "every-new-chapter-tee",
    name: "Every New Chapter Tee",
    price: 34,
    compareAt: null,
    categories: ["new-arrivals", "best-sellers", "inspirational"],
    images: [
      "assets/img/products/every-new-chapter-1.svg",
      "assets/img/products/every-new-chapter-2.svg",
      "assets/img/products/every-new-chapter-3.svg",
    ],
    colors: ["cream", "sand", "black"],
    sizes: SIZES_ALL,
    soldOut: [],
    badge: "Best seller",
    description:
      "The tee that started it all. A soft, relaxed crewneck printed with a quiet reminder that every ending is also a beginning.",
    fabric: "100% combed ring-spun cotton, 180 gsm. Pre-shrunk, medium weight with a soft hand-feel.",
    fit: "Relaxed unisex fit with a straight hem and ribbed collar. Sits true to size — size down for a closer fit.",
    care: "Machine wash cold inside out with like colours. Tumble dry low or hang to dry. Warm iron on the reverse only. Do not iron directly on the print. Do not bleach or dry clean.",
    rating: 4.9,
    reviewCount: 128,
  },
  {
    id: "mama-est-always-tee",
    name: "Mama, Est. Always Tee",
    price: 36,
    compareAt: 42,
    categories: ["new-arrivals", "best-sellers", "mama"],
    images: [
      "assets/img/products/mama-est-always-1.svg",
      "assets/img/products/mama-est-always-2.svg",
      "assets/img/products/mama-est-always-3.svg",
    ],
    colors: ["sand", "cream", "clay"],
    sizes: SIZES_ALL,
    soldOut: ["XS"],
    badge: "Best seller",
    description:
      "A warm, understated tribute to motherhood — printed in a soft serif on our most-loved sand blank. A favourite baby-shower gift.",
    fabric: "100% organic combed cotton, 185 gsm. Breathable, opaque and beautifully soft after the first wash.",
    fit: "Classic straight fit through the body with a slightly dropped shoulder. True to size.",
    care: "Machine wash cold inside out. Hang to dry to protect the print. Warm iron on the reverse. No bleach, no dry cleaning.",
    rating: 5.0,
    reviewCount: 96,
  },
  {
    id: "soft-heart-loud-mind-tee",
    name: "Soft Heart, Loud Mind Tee",
    price: 35,
    compareAt: null,
    categories: ["new-arrivals", "bold"],
    images: [
      "assets/img/products/soft-heart-1.svg",
      "assets/img/products/soft-heart-2.svg",
      "assets/img/products/soft-heart-3.svg",
    ],
    colors: ["black", "cream"],
    sizes: SIZES_ALL,
    soldOut: [],
    badge: "New",
    description:
      "High-contrast print on a heavyweight black blank. For the chapter where you stop apologising for taking up space.",
    fabric: "100% cotton, 220 gsm heavyweight jersey with a structured drape that holds its shape.",
    fit: "Boxy oversized fit with wide sleeves. Size down for a standard fit.",
    care: "Machine wash cold inside out. Tumble dry low. Do not iron the print directly.",
    rating: 4.8,
    reviewCount: 54,
  },
  {
    id: "everyday-essential-tee",
    name: "Everyday Essential Tee",
    price: 29,
    compareAt: null,
    categories: ["everyday", "best-sellers"],
    images: [
      "assets/img/products/everyday-essential-1.svg",
      "assets/img/products/everyday-essential-2.svg",
      "assets/img/products/everyday-essential-3.svg",
    ],
    colors: ["cream", "white", "sage", "black"],
    sizes: SIZES_ALL,
    soldOut: [],
    badge: null,
    description:
      "The small-print tee you will reach for on repeat. Minimal lowercase lettering, printed centre-chest on a lightweight blank.",
    fabric: "Cotton-modal blend, 160 gsm. Lightweight with a subtle sheen and excellent drape.",
    fit: "Semi-fitted with a slightly tapered waist and shorter sleeve. True to size.",
    care: "Machine wash cold. Hang to dry. Warm iron on the reverse.",
    rating: 4.7,
    reviewCount: 211,
  },
  {
    id: "bloom-slowly-tee",
    name: "Bloom Slowly Tee",
    price: 34,
    compareAt: null,
    categories: ["new-arrivals", "inspirational"],
    images: [
      "assets/img/products/bloom-slowly-1.svg",
      "assets/img/products/bloom-slowly-2.svg",
      "assets/img/products/bloom-slowly-3.svg",
    ],
    colors: ["sage", "cream", "sand"],
    sizes: SIZES_ALL,
    soldOut: ["XXL"],
    badge: "New",
    description:
      "A muted sage tee with a hand-lettered reminder that growth is not a race. Printed with soft water-based ink.",
    fabric: "100% combed ring-spun cotton, 180 gsm, garment-dyed for a lived-in colour.",
    fit: "Relaxed unisex fit. Size down if you prefer a closer silhouette.",
    care: "Wash cold inside out with like colours — garment-dyed cotton may soften in tone over time. Hang to dry.",
    rating: 4.9,
    reviewCount: 73,
  },
  {
    id: "mama-mode-on-tee",
    name: "Mama Mode: On Tee",
    price: 34,
    compareAt: null,
    categories: ["mama", "bold"],
    images: [
      "assets/img/products/mama-mode-on-1.svg",
      "assets/img/products/mama-mode-on-2.svg",
      "assets/img/products/mama-mode-on-3.svg",
    ],
    colors: ["clay", "cream", "black"],
    sizes: SIZES_ALL,
    soldOut: [],
    badge: null,
    description:
      "Playful, a little bit tired, entirely honest. Printed on a warm clay blank that hides the realities of snack time.",
    fabric: "100% cotton, 190 gsm. Soft, opaque and durable through repeated washing.",
    fit: "Relaxed fit with a curved hem that sits well over leggings and jeans alike.",
    care: "Machine wash cold inside out. Tumble dry low. Do not bleach.",
    rating: 4.8,
    reviewCount: 61,
  },
  {
    id: "she-chose-herself-tee",
    name: "She Chose Herself Tee",
    price: 36,
    compareAt: null,
    categories: ["bold", "best-sellers"],
    images: [
      "assets/img/products/she-chose-herself-1.svg",
      "assets/img/products/she-chose-herself-2.svg",
      "assets/img/products/she-chose-herself-3.svg",
    ],
    colors: ["black", "cream", "clay"],
    sizes: SIZES_ALL,
    soldOut: [],
    badge: "Best seller",
    description:
      "For the chapter you wrote for yourself. Bold serif print with a small lowercase detail beneath — quietly triumphant.",
    fabric: "100% cotton, 220 gsm heavyweight jersey with reinforced shoulder seams.",
    fit: "Oversized drop-shoulder fit. Wear as-is or tuck at the front.",
    care: "Machine wash cold inside out. Hang to dry. Warm iron on the reverse only.",
    rating: 4.9,
    reviewCount: 142,
  },
  {
    id: "quiet-mornings-tee",
    name: "Quiet Mornings Tee",
    price: 31,
    compareAt: null,
    categories: ["everyday", "new-arrivals"],
    images: [
      "assets/img/products/quiet-mornings-1.svg",
      "assets/img/products/quiet-mornings-2.svg",
      "assets/img/products/quiet-mornings-3.svg",
    ],
    colors: ["cream", "sage", "white"],
    sizes: SIZES_ALL,
    soldOut: [],
    badge: "New",
    description:
      "Small lowercase print, generous body, endlessly wearable. Made for slow coffee and unhurried starts.",
    fabric: "Cotton-modal blend, 165 gsm. Lightweight and breathable with a fluid drape.",
    fit: "Relaxed straight fit with a mid-length sleeve. True to size.",
    care: "Machine wash cold. Hang to dry. Cool iron on the reverse.",
    rating: 4.7,
    reviewCount: 48,
  },
  {
    id: "chapter-one-oversized-tee",
    name: "Chapter One Oversized Tee",
    price: 38,
    compareAt: null,
    categories: ["best-sellers", "inspirational"],
    images: [
      "assets/img/products/chapter-one-1.svg",
      "assets/img/products/chapter-one-2.svg",
      "assets/img/products/chapter-one-3.svg",
    ],
    colors: ["sand", "cream", "black"],
    sizes: SIZES_ALL,
    soldOut: ["S"],
    badge: "Limited",
    description:
      "Our most generous silhouette, printed with a single quiet line. The tee people ask about in the grocery store.",
    fabric: "100% cotton, 230 gsm boxy heavyweight jersey. Substantial without being stiff.",
    fit: "True oversized fit with a wide body and dropped sleeve. Size down one for a relaxed-normal fit.",
    care: "Machine wash cold inside out. Tumble dry low or hang to dry. Do not iron directly on the print.",
    rating: 5.0,
    reviewCount: 89,
  },
  {
    id: "grace-over-grind-tee",
    name: "Grace Over Grind Tee",
    price: 34,
    compareAt: null,
    categories: ["inspirational", "everyday"],
    images: [
      "assets/img/products/grace-over-grind-1.svg",
      "assets/img/products/grace-over-grind-2.svg",
      "assets/img/products/grace-over-grind-3.svg",
    ],
    colors: ["cream", "sand", "sage"],
    sizes: SIZES_ALL,
    soldOut: [],
    badge: null,
    description:
      "A soft answer to hustle culture, printed in a delicate serif. One of our most-gifted designs.",
    fabric: "100% combed ring-spun cotton, 180 gsm. Pre-shrunk and pleasantly soft from the first wear.",
    fit: "Classic unisex fit. True to size.",
    care: "Machine wash cold inside out. Hang to dry. Warm iron on the reverse.",
    rating: 4.8,
    reviewCount: 77,
  },
  {
    id: "mama-of-littles-custom-tee",
    name: "Mama of Littles — Personalized Tee",
    price: 42,
    compareAt: null,
    categories: ["custom", "mama"],
    images: [
      "assets/img/products/mama-of-littles-1.svg",
      "assets/img/products/mama-of-littles-2.svg",
      "assets/img/products/mama-of-littles-3.svg",
    ],
    colors: ["sage", "cream", "sand", "black"],
    sizes: SIZES_ALL,
    soldOut: [],
    badge: "Personalized",
    description:
      "Add your children's names beneath the print. We set the type by hand and send you a proof before we print.",
    fabric: "100% organic combed cotton, 185 gsm. Soft, opaque and built to last.",
    fit: "Relaxed unisex fit with a straight hem. True to size.",
    care: "Machine wash cold inside out. Hang to dry to protect the personalised print. Warm iron on the reverse.",
    rating: 5.0,
    reviewCount: 34,
    personalized: true,
    personalizationLabel: "Names to print (separate with commas)",
  },
  {
    id: "your-words-custom-tee",
    name: "Your Words — Custom Printed Tee",
    price: 44,
    compareAt: null,
    categories: ["custom"],
    images: [
      "assets/img/products/your-words-custom-1.svg",
      "assets/img/products/your-words-custom-2.svg",
      "assets/img/products/your-words-custom-3.svg",
    ],
    colors: ["cream", "black", "sand", "clay"],
    sizes: SIZES_ALL,
    soldOut: [],
    badge: "Personalized",
    description:
      "Your own line of text, set in one of our signature typefaces and printed on a premium blank. Proof approved by you before printing.",
    fabric: "100% combed ring-spun cotton, 180 gsm. Pre-shrunk medium weight.",
    fit: "Relaxed unisex fit. True to size.",
    care: "Machine wash cold inside out. Hang to dry. Do not iron directly on the print.",
    rating: 4.9,
    reviewCount: 27,
    personalized: true,
    personalizationLabel: "Text to print (up to 30 characters)",
  },
];

/* --------------------------------------------------------------------------
   7. CUSTOMER REVIEWS (homepage + product pages)
   -------------------------------------------------------------------------- */
const REVIEWS = [
  {
    stars: 5,
    text: "The fabric is so much nicer than I expected — thick, soft and the print still looks brand new after a dozen washes.",
    name: "Amara O.",
    detail: "Every New Chapter Tee · Size M",
  },
  {
    stars: 5,
    text: "Bought the Mama tee for my sister and immediately ordered one for myself. The colour is exactly like the photos.",
    name: "Jess R.",
    detail: "Mama, Est. Always Tee · Size L",
  },
  {
    stars: 5,
    text: "Emm sent me a proof of my custom text within a day and it arrived beautifully packaged. Genuinely thoughtful service.",
    name: "Priya S.",
    detail: "Your Words Custom Tee · Size S",
  },
  {
    stars: 4,
    text: "Fits oversized exactly as described. I sized down and it is now the tee I wear every single weekend.",
    name: "Danielle K.",
    detail: "Chapter One Oversized Tee · Size M",
  },
];

/* --------------------------------------------------------------------------
   8. SIZE CHART (body measurements, in inches)
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
   9. FAQ CONTENT (used by faq.html)
   -------------------------------------------------------------------------- */
const FAQ_GROUPS = [
  {
    title: "Sizing & fit",
    items: [
      {
        q: "How do your T-shirts fit?",
        a: "Most of our tees are a relaxed unisex fit and run true to size. Styles marked oversized (like the Chapter One Oversized Tee) are intentionally roomy — size down one if you prefer a standard fit. Every product page lists the exact fit for that style, and the full size chart in body measurements is on each product page under “Size & fit”.",
      },
      {
        q: "I'm between two sizes — which should I choose?",
        a: "Size up for a looser, more draped look, or size down for a closer fit. If you are unsure, email us your usual size and height and we will recommend the best option for that specific style.",
      },
      {
        q: "Do you offer plus sizes?",
        a: "Our current range runs XS to XXL. We are actively working on extending the range and you can email us to be told first when larger sizes arrive.",
      },
    ],
  },
  {
    title: "Fabric & print quality",
    items: [
      {
        q: "What fabric are the T-shirts made from?",
        a: "Depending on the style, we print on 100% combed ring-spun cotton (160–230 gsm) or a cotton-modal blend. Every product page lists the exact fabric, weight and feel so you know precisely what you are buying.",
      },
      {
        q: "How are the designs printed?",
        a: "Every tee is printed with professional-grade water-based and DTG inks that sit into the fabric rather than on top of it. The result is a soft print with no plasticky feel that will not crack or peel with proper care.",
      },
      {
        q: "Will the print fade?",
        a: "Not with normal care. Wash cold, inside out, and hang to dry and your print will stay crisp for years. The most common cause of fading is a hot dryer.",
      },
    ],
  },
  {
    title: "Washing & care",
    items: [
      {
        q: "How should I wash my tee?",
        a: "Machine wash cold, inside out, with like colours. Tumble dry low or hang to dry. Warm iron on the reverse only, never directly on the print. No bleach and no dry cleaning.",
      },
      {
        q: "Will it shrink?",
        a: "Our cotton blanks are pre-shrunk, so expect minimal shrinkage. Washing cold and avoiding a hot dryer keeps the fit exactly as it arrived.",
      },
    ],
  },
  {
    title: "Shipping & delivery",
    items: [
      {
        q: "How long until my order ships?",
        a: "Each tee is printed to order. Printing and quality-checking takes 2–4 business days, then your parcel is handed to the carrier. Personalised orders take 3–5 business days because we send you a proof first.",
      },
      {
        q: "What are your delivery times?",
        a: "Standard shipping arrives 5–8 business days after printing; express arrives in 2–3 business days. Local pickup is ready as soon as printing is complete. International delivery typically takes 10–20 business days depending on customs.",
      },
      {
        q: "How much is shipping?",
        a: "Standard shipping is a flat $6.50 and express is $14.00. Standard shipping is free on all orders over $75. Any customs duties on international parcels are the responsibility of the recipient.",
      },
      {
        q: "Can I track my parcel?",
        a: "Yes. As soon as your order leaves the studio you will receive an email with a tracking number and a link to follow it.",
      },
    ],
  },
  {
    title: "Returns & exchanges",
    items: [
      {
        q: "What is your returns policy?",
        a: "Unworn, unwashed tees in their original condition can be returned within 30 days of delivery. Email us with your order number and we will send return instructions. Return shipping is covered by the customer unless the item arrived damaged or incorrect.",
      },
      {
        q: "Can I exchange for a different size?",
        a: "Absolutely. Email us within 30 days and we will reserve your new size while your original tee is on its way back to us.",
      },
      {
        q: "Are personalised tees returnable?",
        a: "Because personalised tees are printed with your specific text, they can only be returned if there is a fault or a printing error on our side — which is exactly why we send you a proof to approve before printing.",
      },
    ],
  },
  {
    title: "Custom & personalised orders",
    items: [
      {
        q: "Can you print my own idea?",
        a: "Yes — that is what our Custom Designs page is for. Send us your idea, wording, preferred style, size and colour, and we will reply within 1–2 business days with a mock-up and a quote.",
      },
      {
        q: "Do you take bulk or group orders?",
        a: "We do: family reunions, baby showers, small businesses and team gifts. Tell us your quantity on the Custom Designs form and we will send you tiered pricing.",
      },
    ],
  },
  {
    title: "Order issues",
    items: [
      {
        q: "My order arrived damaged or incorrect — what now?",
        a: "We are sorry. Email us a photo within 7 days of delivery and we will reprint and reship your tee at no cost to you.",
      },
      {
        q: "Can I change or cancel my order?",
        a: "If your tee has not gone to print yet, yes. Email us as soon as possible with your order number — most changes are possible within the first 24 hours.",
      },
      {
        q: "I never received an order confirmation.",
        a: "Check your spam folder first, then email us with the name and address you used and we will resend it.",
      },
    ],
  },
];
