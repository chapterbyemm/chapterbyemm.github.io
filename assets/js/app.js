/* ==========================================================================
   ChapterByEmm — app core
   Cart + wishlist state, formatting, toasts, scroll reveals, form handling.
   You should not need to edit this file to change products or prices —
   see assets/js/data.js for that.
   ========================================================================== */

/* ---------- small helpers ------------------------------------------------ */
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

const money = (n) =>
  SITE.currencySymbol +
  Number(n).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const getProduct = (id) => PRODUCTS.find((p) => p.id === id);
const getCollection = (id) => COLLECTIONS.find((c) => c.id === id);
const colorOf = (key) => COLORS[key] || { label: key, hex: "#cccccc" };

const byCollection = (id) => PRODUCTS.filter((p) => p.categories.includes(id));

const escapeHtml = (str) =>
  String(str).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

const starsMarkup = (n) => "★".repeat(Math.round(n)) + "☆".repeat(5 - Math.round(n));

/* Query string helper — used by product.html?id=… and shop.html?collection=… */
const param = (key) =>
  window.__ROUTE__ ? window.__ROUTE__.query.get(key) : new URLSearchParams(location.search).get(key);

/* ---------- persistent store -------------------------------------------- */
/* Cart + wishlist live in localStorage so they survive a page refresh.
   When you connect a real backend, replace read()/write() with API calls. */
const Store = {
  CART_KEY: "cbe_cart_v1",
  WISH_KEY: "cbe_wishlist_v1",

  read(key, fallback) {
    try {
      return JSON.parse(localStorage.getItem(key)) ?? fallback;
    } catch (e) {
      return fallback;
    }
  },
  write(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      /* storage unavailable (private mode) — cart stays in memory only */
    }
  },

  /* --- cart --- */
  get cart() {
    return this.read(this.CART_KEY, []);
  },
  set cart(items) {
    this.write(this.CART_KEY, items);
    document.dispatchEvent(new CustomEvent("cart:change"));
  },

  lineKey: (id, size, color, note = "") => [id, size, color, note].join("|"),

  addToCart({ id, size, color, qty = 1, note = "" }) {
    const items = this.cart;
    const key = this.lineKey(id, size, color, note);
    const existing = items.find((i) => this.lineKey(i.id, i.size, i.color, i.note || "") === key);
    if (existing) existing.qty = Math.min(99, existing.qty + qty);
    else items.push({ id, size, color, qty, note });
    this.cart = items;
  },

  updateQty(index, qty) {
    const items = this.cart;
    if (!items[index]) return;
    if (qty <= 0) items.splice(index, 1);
    else items[index].qty = Math.min(99, qty);
    this.cart = items;
  },

  removeFromCart(index) {
    const items = this.cart;
    items.splice(index, 1);
    this.cart = items;
  },

  clearCart() {
    this.cart = [];
  },

  get cartCount() {
    return this.cart.reduce((n, i) => n + i.qty, 0);
  },

  get subtotal() {
    return this.cart.reduce((sum, i) => {
      const p = getProduct(i.id);
      return sum + (p ? p.price * i.qty : 0);
    }, 0);
  },

  /* --- wishlist --- */
  get wishlist() {
    return this.read(this.WISH_KEY, []);
  },
  set wishlist(ids) {
    this.write(this.WISH_KEY, ids);
    document.dispatchEvent(new CustomEvent("wishlist:change"));
  },
  isWished(id) {
    return this.wishlist.includes(id);
  },
  toggleWish(id) {
    const list = this.wishlist;
    const i = list.indexOf(id);
    if (i > -1) list.splice(i, 1);
    else list.push(id);
    this.wishlist = list;
    return this.isWished(id);
  },

  /* --- promo code --- */
  PROMO_KEY: "cbe_promo_v1",
  get promo() {
    return this.read(this.PROMO_KEY, null);
  },
  set promo(code) {
    this.write(this.PROMO_KEY, code);
    document.dispatchEvent(new CustomEvent("cart:change"));
  },
};

/* ---------- order totals ------------------------------------------------- */
/* Single source of truth for money maths, shared by the cart and checkout. */
function calcTotals(shippingId = "standard") {
  const subtotal = Store.subtotal;
  const method = SHIPPING_METHODS.find((m) => m.id === shippingId) || SHIPPING_METHODS[0];

  let shipping = method.price;
  if (method.id === "standard" && subtotal >= SITE.freeShippingThreshold) shipping = 0;

  let discount = 0;
  const promo = Store.promo;
  const rule = promo ? PROMO_CODES[promo] : null;
  if (rule) {
    if (rule.type === "percent") discount = subtotal * (rule.value / 100);
    else if (rule.type === "fixed") discount = Math.min(subtotal, rule.value);
    else if (rule.type === "shipping") shipping = 0;
  }

  const taxable = Math.max(0, subtotal - discount);
  const tax = taxable * SITE.taxRate;
  const total = taxable + tax + shipping;

  return { subtotal, discount, shipping, tax, total, method, promo, promoRule: rule };
}

/* ---------- toasts ------------------------------------------------------- */
function toast(message, actionLabel, actionHref) {
  let stack = $(".toast-stack");
  if (!stack) {
    stack = document.createElement("div");
    stack.className = "toast-stack";
    stack.setAttribute("role", "status");
    stack.setAttribute("aria-live", "polite");
    document.body.appendChild(stack);
  }
  const el = document.createElement("div");
  el.className = "toast";
  el.innerHTML =
    escapeHtml(message) +
    (actionLabel ? ` <a href="${actionHref}" style="color:var(--rose)">${escapeHtml(actionLabel)}</a>` : "");
  stack.appendChild(el);
  setTimeout(() => {
    el.style.transition = "opacity .4s, transform .4s";
    el.style.opacity = "0";
    el.style.transform = "translateY(8px)";
    setTimeout(() => el.remove(), 400);
  }, 3200);
}

/* ---------- scroll reveal ----------------------------------------------- */
function initReveal() {
  const targets = $$(".reveal");
  if (!targets.length) return;
  if (!("IntersectionObserver" in window)) {
    targets.forEach((t) => t.classList.add("is-in"));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (!entry.isIntersecting) return;
        setTimeout(() => entry.target.classList.add("is-in"), i * 70);
        io.unobserve(entry.target);
      });
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
  );
  targets.forEach((t) => io.observe(t));
}

/* ---------- sticky header shadow ---------------------------------------- */
function initStickyHeader() {
  const header = $(".site-header");
  if (!header) return;
  const onScroll = () => header.classList.toggle("is-stuck", window.scrollY > 8);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

/* ---------- forms -------------------------------------------------------- */
/* Front-end only: validates, then shows a success message.
   TO GO LIVE: post `data` to your email service / form endpoint below. */
function initForms() {
  $$("form[data-form]").forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      const data = Object.fromEntries(new FormData(form).entries());

      /* ---- REPLACE THIS BLOCK with your real submission ----------------
         Example:
           fetch("https://formspree.io/f/YOUR_ID", {
             method: "POST",
             headers: { "Content-Type": "application/json" },
             body: JSON.stringify(data),
           });
      ------------------------------------------------------------------- */
      console.log(`[${form.dataset.form}] submission`, data);

      const status = $(".form-status", form);
      if (status) {
        status.textContent = form.dataset.success || "Thank you — we’ve received your message.";
        status.classList.add("is-visible");
      } else {
        toast(form.dataset.success || "Thank you — we’ve received your message.");
      }
      form.reset();
    });
  });
}

/* ---------- wishlist buttons (delegated) -------------------------------- */
/* Call syncWishUI() directly after re-rendering markup. Only real *state
   changes* should dispatch wishlist:change — dispatching it from inside a
   render function would re-trigger any render that listens for it. */
function syncWishUI() {
  $$("[data-wish]").forEach((b) => b.setAttribute("aria-pressed", String(Store.isWished(b.dataset.wish))));
  $$("[data-wish-count]").forEach((el) => {
    el.textContent = Store.wishlist.length;
    el.dataset.empty = String(Store.wishlist.length === 0);
  });
}

function initWishlistButtons() {
  document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-wish]");
    if (!btn) return;
    e.preventDefault();
    const id = btn.dataset.wish;
    const on = Store.toggleWish(id);
    const product = getProduct(id);
    toast(on ? `Saved ${product ? product.name : "item"} to your wishlist.` : "Removed from your wishlist.");
  });

  document.addEventListener("wishlist:change", syncWishUI);
}

/* ---------- boot --------------------------------------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  renderLayout();       // components.js
  initStickyHeader();
  initWishlistButtons();
  initCartUI();         // components.js
  initPage();           // pages.js
  initForms();
  initReveal();
  syncWishUI();
  document.dispatchEvent(new CustomEvent("cart:change"));
});
