/* ==========================================================================
   ChapterByEmm — shared components
   Header, mobile nav, cart drawer, search panel, footer and the product card.
   Edit the NAV array below to change the main navigation on EVERY page at once.
   ========================================================================== */

/* Main navigation — one place, applies site-wide */
const NAV = [
  { label: "Shop", href: "shop.html" },
  { label: "Collections", href: "collections.html" },
  { label: "Our Story", href: "about.html" },
  { label: "Custom", href: "custom-designs.html" },
  { label: "Journal", href: "journal.html" },
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
  search:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>',
  user:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><circle cx="12" cy="8" r="3.6"/><path d="M4.5 20c1.6-3.8 5-5.5 7.5-5.5s5.9 1.7 7.5 5.5"/></svg>',
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
      <div class="announce"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 6a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v1h2.6a1 1 0 0 1 .8.4l2.4 3.2a1 1 0 0 1 .2.6V16a1 1 0 0 1-1 1h-1a2.5 2.5 0 0 1-5 0H9.5a2.5 2.5 0 0 1-5 0H4a1 1 0 0 1-1-1V6Zm13 3v2h3.3L17.8 9H16ZM7 15.5a1 1 0 1 0 2 0 1 1 0 0 0-2 0Zm8 0a1 1 0 1 0 2 0 1 1 0 0 0-2 0Z"/></svg>${SITE.announcement}</div>
      <div class="site-header">
        <div class="shell header-inner">
          <a class="brand" href="index.html">
            ${SITE.logo ? `<img class="brand-mark" src="${SITE.logo}" alt="" width="44" height="44" data-nofallback>` : ""}
            <span class="brand-text">${SITE.name}<small>${SITE.tagline}</small></span>
          </a>
          <nav class="nav" aria-label="Main navigation">${navLinks()}</nav>
          <div class="header-actions">
            <button class="icon-btn" type="button" data-open-search aria-label="Search" aria-expanded="false">
              ${ICONS.search}
            </button>
            <button class="icon-btn" type="button" data-open-account aria-label="Account" aria-expanded="false">
              ${ICONS.user}
            </button>
            <a class="icon-btn" href="wishlist.html" aria-label="Wishlist">
              ${ICONS.heart}<span class="count-bubble" data-wish-count data-empty="true">0</span>
            </a>
            <button class="icon-btn" type="button" data-open-cart aria-label="Open shopping bag" aria-expanded="false">
              ${ICONS.bag}<span class="count-bubble" data-cart-count data-empty="true">0</span>
            </button>
            <button class="icon-btn nav-toggle" type="button" data-open-nav aria-label="Open menu" aria-expanded="false">
              ${ICONS.menu}
            </button>
          </div>
        </div>
      </div>`;
  }

  /* ---- mobile nav + cart drawer + search + account panel (appended once) ---- */
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
        <a class="btn" href="shop.html">Shop The Collection</a>
        <div class="mobile-nav-utility">
          <button type="button" data-open-search>Search</button>
          <button type="button" data-open-account>Account</button>
          <a href="wishlist.html">Wishlist (<span data-wish-count>0</span>)</a>
          <a href="faq.html">FAQ</a>
          <a href="contact.html">Contact</a>
        </div>
      </nav>

      <aside class="drawer" id="cart-drawer" aria-label="Shopping bag" aria-hidden="true">
        <div class="drawer-head">
          <h2>Your Bag (<span data-cart-count>0</span>)</h2>
          <button class="icon-btn" type="button" data-close-cart aria-label="Close bag">${ICONS.close}</button>
        </div>
        <p class="drawer-confirm" data-drawer-confirm hidden>Added to your chapter 🤍</p>
        <div class="drawer-body" data-cart-lines></div>
        <div class="drawer-foot">
          <div class="summary-row summary-row--total"><span>Subtotal</span><span data-cart-subtotal>${money(0)}</span></div>
          <p class="form-note" style="margin:.4rem 0 1rem">Delivery calculated at checkout. Free standard delivery over ${money(
            SITE.freeShippingThreshold
          )}.</p>
          <a class="btn btn--block" href="checkout.html">View Bag &amp; Checkout</a>
          <button type="button" class="btn btn--ghost btn--block" data-close-cart style="margin-top:.5rem">Continue Shopping</button>
        </div>
      </aside>

      <aside class="drawer drawer--search" id="search-panel" aria-label="Search" aria-hidden="true">
        <div class="drawer-head">
          <h2>Search</h2>
          <button class="icon-btn" type="button" data-close-search aria-label="Close search">${ICONS.close}</button>
        </div>
        <form class="drawer-body search-form" data-site-search-form>
          <label class="visually-hidden" for="site-search-input">Search T-shirts</label>
          <input id="site-search-input" type="search" name="q" placeholder="Search designs, e.g. “terracotta”…" autocomplete="off">
          <button class="btn btn--block" type="submit">Search</button>
          <p class="form-note" style="margin-top:1rem">Searches across every T-shirt name and description.</p>
        </form>
      </aside>

      <aside class="drawer" id="account-panel" aria-label="Account" aria-hidden="true">
        <div class="drawer-head">
          <h2>Account</h2>
          <button class="icon-btn" type="button" data-close-account aria-label="Close account panel">${ICONS.close}</button>
        </div>
        <div class="drawer-body">
          <p class="eyebrow">Coming soon</p>
          <p>Customer accounts — order history, saved addresses and faster checkout — are on the way.</p>
          <p class="form-note" style="margin-top:1rem">For now, every order confirmation is sent to your email, and you can always reach us directly.</p>
          <a class="btn btn--ghost btn--block" href="contact.html" style="margin-top:1.25rem">Contact Us</a>
          <a class="btn btn--block" href="mailto:${SITE.email}" style="margin-top:.6rem">Email ${SITE.name}</a>
        </div>
      </aside>`;
    document.body.appendChild(extras);
  }

  /* ---- footer ---- */
  const footer = document.querySelector("[data-site-footer]");
  if (footer) {
    footer.innerHTML = `
      <footer class="site-footer">
        <div class="shell">
          <div class="footer-grid">
            <div class="footer-brand">
              <p class="brand">${SITE.logo ? `<img class="brand-mark brand-mark--footer" src="${SITE.logo}" alt="" width="52" height="52" data-nofallback>` : ""}<span class="brand-text">${SITE.name}</span></p>
              <p class="footer-tagline">${SITE.tagline}</p>
              <p style="max-width:32ch">Physical printed T-shirts, made to order and shipped across ${SITE.location.split(",").pop().trim()}.</p>
              <p style="margin-top:1rem"><a href="mailto:${SITE.email}">${SITE.email}</a></p>
              <p><a href="https://wa.me/${SITE.whatsapp}" rel="noopener">WhatsApp ${SITE.whatsappDisplay}</a></p>
            </div>
            <div>
              <h3>Shop</h3>
              <ul>
                <li><a href="shop.html?collection=new-chapters">New Arrivals</a></li>
                <li><a href="shop.html?sort=rating">Best Sellers</a></li>
                <li><a href="shop.html">All T-Shirts</a></li>
                <li><a href="collections.html">Collections</a></li>
              </ul>
            </div>
            <div>
              <h3>About</h3>
              <ul>
                <li><a href="about.html">Our Story</a></li>
                <li><a href="journal.html">Journal</a></li>
                <li><a href="custom-designs.html">Custom Designs</a></li>
              </ul>
            </div>
            <div>
              <h3>Help</h3>
              <ul>
                <li><a href="faq.html">FAQ</a></li>
                <li><a href="size-guide.html">Size Guide</a></li>
                <li><a href="shipping.html">Shipping &amp; Delivery</a></li>
                <li><a href="returns-exchanges.html">Returns &amp; Exchanges</a></li>
                <li><a href="contact.html">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3>Explore</h3>
              <ul>
                <li><a href="${SITE.social.instagram}" rel="noopener">Instagram</a></li>
                <li><a href="${SITE.social.pinterest}" rel="noopener">Pinterest</a></li>
                <li><a href="${SITE.social.facebook}" rel="noopener">Facebook</a></li>
                <li><a href="${SITE.social.etsy}" rel="noopener" class="footer-etsy">Digital Studio — Etsy</a></li>
              </ul>
            </div>
          </div>

          <div class="footer-newsletter">
            <div>
              <h3>Join the Chapter</h3>
              <p>New prints, restock notes and the occasional story from the studio.</p>
            </div>
            <form data-form="newsletter" data-success="Welcome — check your inbox for a note from Emm." novalidate>
              <label class="visually-hidden" for="footer-news-email">Email address</label>
              <input id="footer-news-email" name="email" type="email" placeholder="you@email.com" required autocomplete="email">
              <button class="btn btn--light" type="submit">Subscribe</button>
              <p class="form-status" role="status"></p>
            </form>
          </div>

          <div class="footer-bottom">
            <p>© ${new Date().getFullYear()} ${SITE.name}. All rights reserved.</p>
            <nav aria-label="Legal">
              <a href="privacy.html">Privacy Policy</a>
              <a href="terms.html">Terms &amp; Conditions</a>
            </nav>
            <div class="pay-row" aria-label="Accepted payment methods">
              ${PAYMENT_METHODS.map((m) => `<span${m.enabled ? "" : ' class="pay-soon"'}>${m.label.split("(")[0].trim()}</span>`).join("")}
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
  /* only one drawer/panel at a time — e.g. opening Search from inside the
     mobile menu shouldn't leave both stacked open */
  $$(".drawer, .mobile-nav").forEach((p) => {
    if (p !== panel) { p.classList.remove("is-open"); p.setAttribute("aria-hidden", "true"); }
  });
  panel.classList.add("is-open");
  panel.setAttribute("aria-hidden", "false");
  document.querySelector("[data-overlay]").classList.add("is-open");
  document.body.classList.add("no-scroll");
  const trigger = document.querySelector(triggerSelector);
  if (trigger) trigger.setAttribute("aria-expanded", "true");
  const focusable = panel.querySelector("input, button, a");
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
  $$("[data-open-cart], [data-open-nav], [data-open-search], [data-open-account]").forEach((b) =>
    b.setAttribute("aria-expanded", "false")
  );
}

/* ---------- cart UI (drawer contents + counters) ------------------------ */
function initCartUI() {
  document.addEventListener("click", (e) => {
    if (e.target.closest("[data-open-cart]")) return openPanel("#cart-drawer", "[data-open-cart]");
    if (e.target.closest("[data-open-nav]")) return openPanel(".mobile-nav", "[data-open-nav]");
    if (e.target.closest("[data-open-search]")) return openPanel("#search-panel", "[data-open-search]");
    if (e.target.closest("[data-open-account]")) return openPanel("#account-panel", "[data-open-account]");
    if (e.target.closest("[data-close-cart], [data-close-nav], [data-close-search], [data-close-account], [data-overlay]"))
      return closePanels();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closePanels();
  });

  const searchForm = document.querySelector("[data-site-search-form]");
  if (searchForm) {
    searchForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const q = new FormData(searchForm).get("q") || "";
      closePanels();
      const target = `shop.html${q ? `?q=${encodeURIComponent(q)}` : ""}`;
      if (target.split("?")[0] === (window.__ROUTE__ ? window.__ROUTE__.page : location.pathname.split("/").pop())) {
        document.dispatchEvent(new CustomEvent("site-search", { detail: { q } }));
      } else {
        location.href = target;
      }
    });
  }

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
      toast("Removed from your bag.");
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
        <p>Your bag is empty.</p>
        <a class="btn btn--ghost btn--sm" href="shop.html">Browse T-Shirts</a>
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
              <button class="remove" type="button" data-drawer-remove="${i}">Remove</button>
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
        ${p.badge ? `<div class="card-badges"><span class="badge${p.badge === "New" ? " badge--sage" : p.badge === "Limited" ? " badge--clay" : ""}">${p.badge}</span></div>` : ""}
        <button class="wish-btn" type="button" data-wish="${p.id}" aria-pressed="false"
                aria-label="Add ${escapeHtml(p.name)} to wishlist">${ICONS.heart}</button>
        <a href="product.html?id=${p.id}" aria-label="View ${escapeHtml(p.name)}">
          <img src="${p.images[0]}" alt="${escapeHtml(p.name)} — printed cotton T-shirt"
               width="900" height="1100" ${eager ? '' : 'loading="lazy"'} decoding="async">
          ${p.images[1] ? `<img class="alt-img" src="${p.images[1]}" alt="" width="900" height="1100" loading="lazy" aria-hidden="true">` : ""}
        </a>
        <button class="quick-add" type="button" data-quick-add="${p.id}">Quick Add</button>
      </div>
      <div class="body">
        <p class="cat">${cat ? cat.name : "T-Shirt"}</p>
        <h3><a href="product.html?id=${p.id}">${escapeHtml(p.name)}</a></h3>
        <p class="price">${money(p.price)} ${p.compareAt ? `<span class="muted" style="text-decoration:line-through;font-size:.85em">${money(p.compareAt)}</span>` : ""}</p>
        <div class="swatches" aria-label="Available colours">${swatches}</div>
      </div>
    </article>`;
}

/* Render a list of products into a container */
function renderProducts(container, list, opts = {}) {
  if (!container) return;
  if (!list.length) {
    container.innerHTML = `
      <div class="empty-collection">
        <p class="eyebrow">New Chapter, Coming Soon</p>
        <p>${opts.emptyMessage || "We're still designing this collection. Explore what's already printing while you wait."}</p>
        <a class="btn btn--ghost btn--sm" href="shop.html">Shop All T-Shirts</a>
      </div>`;
    return;
  }
  container.innerHTML = list.map((p, i) => productCard(p, { eager: i < 4 && opts.eagerFirst })).join("");
  initReveal();
  syncWishUI();
}
