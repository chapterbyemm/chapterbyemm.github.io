/* ==========================================================================
   ChapterByEmm — shared components
   Header, mobile nav, cart drawer, footer and the product card.
   Edit the NAV array below to change the navigation on EVERY page at once.
   ========================================================================== */

/* Main navigation — one place, applies site-wide */
const NAV = [
  { label: "Home", href: "index.html" },
  { label: "Shop", href: "shop.html" },
  { label: "Collections", href: "collections.html" },
  { label: "About", href: "about.html" },
  { label: "Custom Designs", href: "custom-designs.html" },
  { label: "FAQ", href: "faq.html" },
  { label: "Contact", href: "contact.html" },
];

const ICONS = {
  heart:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M12 20.5S3.5 15 3.5 9.2A4.7 4.7 0 0 1 12 6.6a4.7 4.7 0 0 1 8.5 2.6c0 5.8-8.5 11.3-8.5 11.3Z"/></svg>',
  bag:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M5.5 8h13l1 12h-15l1-12Z"/><path d="M9 8V6.2A3 3 0 0 1 15 6.2V8"/></svg>',
  menu:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
  close:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>',
};

/* ---------- header + footer + drawer ------------------------------------ */
function renderLayout() {
  const current = window.__ROUTE__
    ? window.__ROUTE__.page
    : location.pathname.split("/").pop() || "index.html";

  const navLinks = (cls = "") =>
    NAV.map(
      (n) =>
        `<a href="${n.href}"${n.href === current ? ' aria-current="page"' : ""} class="${cls}">${n.label}</a>`
    ).join("");

  /* ---- announcement bar + header ---- */
  const header = document.querySelector("[data-site-header]");
  if (header) {
    header.innerHTML = `
      <div class="announce">${SITE.announcement}</div>
      <div class="site-header">
        <div class="shell header-inner">
          <a class="brand" href="index.html">
            ${SITE.name.replace("ByEmm", "ByEmm")}
            <small>Printed tees</small>
          </a>
          <nav class="nav" aria-label="Main navigation">${navLinks()}</nav>
          <div class="header-actions">
            <a class="btn btn--sm" href="shop.html">Shop Now</a>
            <a class="icon-btn" href="wishlist.html" aria-label="Wishlist">
              ${ICONS.heart}<span class="count-bubble" data-wish-count data-empty="true">0</span>
            </a>
            <button class="icon-btn" type="button" data-open-cart aria-label="Open shopping cart" aria-expanded="false">
              ${ICONS.bag}<span class="count-bubble" data-cart-count data-empty="true">0</span>
            </button>
            <button class="icon-btn nav-toggle" type="button" data-open-nav aria-label="Open menu" aria-expanded="false">
              ${ICONS.menu}
            </button>
          </div>
        </div>
      </div>`;
  }

  /* ---- mobile nav + cart drawer + overlay (appended once) ---- */
  if (!document.querySelector(".mobile-nav")) {
    const extras = document.createElement("div");
    extras.innerHTML = `
      <div class="overlay" data-overlay></div>

      <nav class="mobile-nav" id="mobile-nav" aria-label="Mobile navigation" aria-hidden="true">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem">
          <span class="eyebrow" style="margin:0">Menu</span>
          <button class="icon-btn" type="button" data-close-nav aria-label="Close menu">${ICONS.close}</button>
        </div>
        ${navLinks()}
        <a class="btn" href="shop.html">Shop Now</a>
        <a class="btn btn--ghost" href="wishlist.html">Wishlist (<span data-wish-count>0</span>)</a>
      </nav>

      <aside class="drawer" id="cart-drawer" aria-label="Shopping cart" aria-hidden="true">
        <div class="drawer-head">
          <h2>Your cart (<span data-cart-count>0</span>)</h2>
          <button class="icon-btn" type="button" data-close-cart aria-label="Close cart">${ICONS.close}</button>
        </div>
        <div class="drawer-body" data-cart-lines></div>
        <div class="drawer-foot">
          <div class="summary-row summary-row--total"><span>Subtotal</span><span data-cart-subtotal>${money(0)}</span></div>
          <p class="form-note" style="margin:.4rem 0 1rem">Taxes and shipping calculated at checkout. Free standard shipping over ${money(
            SITE.freeShippingThreshold
          )}.</p>
          <a class="btn btn--block" href="checkout.html">Checkout</a>
          <a class="btn btn--ghost btn--block" href="cart.html" style="margin-top:.5rem">View cart</a>
        </div>
      </aside>`;
    document.body.appendChild(extras);
  }

  /* ---- footer ---- */
  const footer = document.querySelector("[data-site-footer]");
  if (footer) {
    const shopLinks = COLLECTIONS.slice(0, 5)
      .map((c) => `<li><a href="shop.html?collection=${c.id}">${c.name}</a></li>`)
      .join("");

    footer.innerHTML = `
      <footer class="site-footer">
        <div class="shell">
          <div class="footer-grid">
            <div class="footer-brand">
              <p class="brand">${SITE.name}</p>
              <p style="max-width:32ch">${SITE.tagline} Physical printed T-shirts, made to order in ${SITE.location}.</p>
              <p style="margin-top:1rem"><a href="mailto:${SITE.email}">${SITE.email}</a></p>
            </div>
            <div>
              <h3>Shop</h3>
              <ul>${shopLinks}<li><a href="shop.html">All T-shirts</a></li></ul>
            </div>
            <div>
              <h3>Help</h3>
              <ul>
                <li><a href="faq.html">FAQ</a></li>
                <li><a href="faq.html#shipping-delivery">Shipping &amp; delivery</a></li>
                <li><a href="faq.html#returns-exchanges">Returns &amp; exchanges</a></li>
                <li><a href="faq.html#washing-care">Care instructions</a></li>
                <li><a href="contact.html">Contact us</a></li>
              </ul>
            </div>
            <div>
              <h3>Follow</h3>
              <ul>
                <li><a href="${SITE.social.instagram}" rel="noopener">Instagram</a></li>
                <li><a href="${SITE.social.tiktok}" rel="noopener">TikTok</a></li>
                <li><a href="${SITE.social.pinterest}" rel="noopener">Pinterest</a></li>
                <li><a href="${SITE.social.facebook}" rel="noopener">Facebook</a></li>
                <li><a href="custom-designs.html">Custom designs</a></li>
              </ul>
            </div>
          </div>
          <div class="footer-bottom">
            <p>© ${new Date().getFullYear()} ${SITE.name}. All rights reserved.</p>
            <div class="pay-row" aria-label="Accepted payment methods">
              <span>VISA</span><span>MASTERCARD</span><span>AMEX</span><span>PAYPAL</span><span>APPLE PAY</span>
            </div>
          </div>
        </div>
      </footer>`;
  }
}

/* ---------- panel open/close -------------------------------------------- */
function openPanel(selector, triggerSelector) {
  const panel = document.querySelector(selector);
  if (!panel) return;
  panel.classList.add("is-open");
  panel.setAttribute("aria-hidden", "false");
  document.querySelector("[data-overlay]").classList.add("is-open");
  document.body.classList.add("no-scroll");
  const trigger = document.querySelector(triggerSelector);
  if (trigger) trigger.setAttribute("aria-expanded", "true");
  const focusable = panel.querySelector("button, a, input");
  if (focusable) focusable.focus();
}

function closePanels() {
  $$(".drawer, .mobile-nav").forEach((p) => {
    p.classList.remove("is-open");
    p.setAttribute("aria-hidden", "true");
  });
  const overlay = document.querySelector("[data-overlay]");
  if (overlay) overlay.classList.remove("is-open");
  document.body.classList.remove("no-scroll");
  $$("[data-open-cart], [data-open-nav]").forEach((b) => b.setAttribute("aria-expanded", "false"));
}

/* ---------- cart UI (drawer contents + counters) ------------------------ */
function initCartUI() {
  document.addEventListener("click", (e) => {
    if (e.target.closest("[data-open-cart]")) return openPanel("#cart-drawer", "[data-open-cart]");
    if (e.target.closest("[data-open-nav]")) return openPanel(".mobile-nav", "[data-open-nav]");
    if (e.target.closest("[data-close-cart], [data-close-nav], [data-overlay]")) return closePanels();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closePanels();
  });

  /* quantity + remove inside the drawer */
  document.addEventListener("click", (e) => {
    const step = e.target.closest("[data-drawer-step]");
    if (step) {
      const i = Number(step.dataset.index);
      const delta = Number(step.dataset.drawerStep);
      const item = Store.cart[i];
      if (item) Store.updateQty(i, item.qty + delta);
      return;
    }
    const rm = e.target.closest("[data-drawer-remove]");
    if (rm) {
      Store.removeFromCart(Number(rm.dataset.drawerRemove));
      toast("Removed from your cart.");
    }
  });

  document.addEventListener("cart:change", renderCartUI);
  renderCartUI();
}

function renderCartUI() {
  const count = Store.cartCount;

  $$("[data-cart-count]").forEach((el) => {
    el.textContent = count;
    el.dataset.empty = String(count === 0);
  });
  $$("[data-cart-subtotal]").forEach((el) => (el.textContent = money(Store.subtotal)));

  const lines = document.querySelector("[data-cart-lines]");
  if (!lines) return;

  if (!Store.cart.length) {
    lines.innerHTML = `
      <div class="empty-state">
        <p>Your cart is empty.</p>
        <a class="btn btn--ghost btn--sm" href="shop.html">Browse T-shirts</a>
      </div>`;
    return;
  }

  lines.innerHTML = Store.cart
    .map((item, i) => {
      const p = getProduct(item.id);
      if (!p) return "";
      return `
        <div class="mini-item">
          <img src="${p.images[0]}" alt="${escapeHtml(p.name)}" width="78" height="98" loading="lazy">
          <div>
            <h3><a href="product.html?id=${p.id}">${escapeHtml(p.name)}</a></h3>
            <p class="meta">${escapeHtml(colorOf(item.color).label)} · Size ${escapeHtml(item.size)}</p>
            ${item.note ? `<p class="meta">“${escapeHtml(item.note)}”</p>` : ""}
            <div style="display:flex;align-items:center;gap:.6rem;margin-top:.5rem">
              <span class="qty">
                <button type="button" data-drawer-step="-1" data-index="${i}" aria-label="Decrease quantity">−</button>
                <input type="text" value="${item.qty}" readonly aria-label="Quantity">
                <button type="button" data-drawer-step="1" data-index="${i}" aria-label="Increase quantity">+</button>
              </span>
              <button class="remove" type="button" data-drawer-remove="${i}" style="border:0;background:none;text-decoration:underline;cursor:pointer;font:inherit;font-size:var(--step--1);color:var(--muted)">Remove</button>
            </div>
          </div>
          <span class="price">${money(p.price * item.qty)}</span>
        </div>`;
    })
    .join("");
}

/* ---------- product card ------------------------------------------------- */
/* Used on the homepage, shop, collections and related-products rails. */
function productCard(p, { eager = false } = {}) {
  const cat = getCollection(p.categories[0]);
  const swatches = p.colors
    .map((c) => `<span class="swatch" style="background:${colorOf(c).hex}" title="${colorOf(c).label}"></span>`)
    .join("");

  return `
    <article class="product-card reveal">
      <div class="media">
        ${p.badge ? `<div class="card-badges"><span class="badge${p.badge === "New" ? " badge--sage" : p.badge === "Personalized" ? " badge--clay" : ""}">${p.badge}</span></div>` : ""}
        <button class="wish-btn" type="button" data-wish="${p.id}" aria-pressed="false"
                aria-label="Add ${escapeHtml(p.name)} to wishlist">${ICONS.heart}</button>
        <a href="product.html?id=${p.id}" aria-label="View ${escapeHtml(p.name)}">
          <img src="${p.images[0]}" alt="${escapeHtml(p.name)} — printed cotton T-shirt, front view"
               width="900" height="1100" ${eager ? '' : 'loading="lazy"'} decoding="async">
          ${p.images[1] ? `<img class="alt-img" src="${p.images[1]}" alt="" width="900" height="1100" loading="lazy" aria-hidden="true">` : ""}
        </a>
      </div>
      <div class="body">
        <p class="cat">${cat ? cat.name : "T-shirt"}</p>
        <h3><a href="product.html?id=${p.id}">${escapeHtml(p.name)}</a></h3>
        <p class="price">${money(p.price)} ${p.compareAt ? `<span class="muted" style="text-decoration:line-through;font-size:.85em">${money(p.compareAt)}</span>` : ""}</p>
        <p class="desc">${escapeHtml(p.description.slice(0, 92))}…</p>
        <div class="swatches" aria-label="Available colours">${swatches}</div>
        <div class="card-actions">
          <a class="btn btn--sm" href="product.html?id=${p.id}">Choose size</a>
        </div>
      </div>
    </article>`;
}

/* Render a list of products into a container */
function renderProducts(container, list, opts = {}) {
  if (!container) return;
  if (!list.length) {
    container.innerHTML = `<p class="empty-state">No T-shirts match those filters yet — try clearing one.</p>`;
    return;
  }
  container.innerHTML = list.map((p, i) => productCard(p, { eager: i < 4 && opts.eagerFirst })).join("");
  initReveal();
  syncWishUI();
}
