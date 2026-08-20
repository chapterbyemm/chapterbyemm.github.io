/* ==========================================================================
   ChapterByEmm — page controllers
   Each page sets <body data-page="…"> and the matching function runs.
   ========================================================================== */

function initPage() {
  const page = document.body.dataset.page;
  const routes = {
    home: initHome,
    shop: initShop,
    product: initProduct,
    collections: initCollections,
    cart: initCartPage,
    checkout: initCheckout,
    wishlist: initWishlistPage,
    faq: initFaq,
    custom: initCustomPage,
    "size-guide": initSizeGuide,
    journal: initJournal,
    "journal-post": initJournalPost,
  };
  if (routes[page]) routes[page]();
  renderReviewRails();
}

/* Shared: any container with data-reviews gets the review cards */
function renderReviewRails() {
  $$("[data-reviews]").forEach((el) => {
    const limit = Number(el.dataset.reviews) || REVIEWS.length;
    el.innerHTML = REVIEWS.slice(0, limit)
      .map(
        (r) => `
        <figure class="review reveal">
          <div class="stars" aria-label="${r.stars} out of 5 stars">${starsMarkup(r.stars)}</div>
          <blockquote>“${escapeHtml(r.text)}”</blockquote>
          <figcaption><cite>${escapeHtml(r.name)}</cite><br><span class="muted" style="font-size:var(--step--1)">${escapeHtml(r.detail)}</span></figcaption>
        </figure>`
      )
      .join("");
  });
}

/* ==========================================================================
   HOME
   ========================================================================== */
function initHome() {
  /* Featured = highest rated first. Swap for a hand-picked list if you prefer:
     const featured = ["stress-never-heard-of-her-tee"].map(getProduct); */
  const featured = PRODUCTS.slice()
    .sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount)
    .slice(0, 4);
  renderProducts($("[data-featured]"), featured, { eagerFirst: true });
  renderProducts($("[data-new-arrivals]"), byCollection("new-chapters").slice(0, 4));

  const colWrap = $("[data-collections-home]");
  if (colWrap) {
    /* the five shown on the homepage rail, in this order */
    const HOME_COLLECTIONS = ["new-chapters", "mama", "inspired", "bold", "custom"];
    colWrap.innerHTML = HOME_COLLECTIONS.map((id) => COLLECTIONS.find((c) => c.id === id))
      .filter(Boolean)
      .map(
        (c) => `
        <a class="collection-card reveal" href="shop.html?collection=${c.id}">
          <span class="collection-card__media">
            <img src="${c.image}" alt="${escapeHtml(c.name)} — printed T-shirts by ChapterByEmm" width="900" height="1100" loading="lazy" decoding="async">
            <span class="collection-card__go" aria-hidden="true">→</span>
          </span>
          <span class="collection-card__label">
            <strong>${escapeHtml(c.name)}</strong>
            <span>${escapeHtml(c.blurb)}</span>
          </span>
        </a>`
      )
      .join("");
  }

  const journalWrap = $("[data-journal-home]");
  if (journalWrap) journalWrap.innerHTML = JOURNAL_POSTS.slice(0, 3).map(journalCard).join("");

  const igHandle = $("[data-ig-handle]");
  if (igHandle) igHandle.textContent = SITE.social.instagramHandle;
}

/* ==========================================================================
   SHOP  — filters, sorting, search
   ========================================================================== */
function initShop() {
  const grid = $("[data-shop-grid]");
  if (!grid) return;

  const state = {
    collection: param("collection") || "all",
    size: "all",
    color: "all",
    sort: param("sort") || "featured",
    q: param("q") || "",
  };

  /* build the filter chips from COLLECTIONS */
  const chipWrap = $("[data-collection-chips]");
  if (chipWrap) {
    chipWrap.innerHTML =
      `<button class="chip" type="button" data-filter-collection="all">All T-Shirts</button>` +
      COLLECTIONS.map(
        (c) => `<button class="chip" type="button" data-filter-collection="${c.id}">${c.name}</button>`
      ).join("");
  }

  const sizeWrap = $("[data-size-chips]");
  if (sizeWrap) {
    sizeWrap.innerHTML =
      `<button class="chip" type="button" data-filter-size="all">Any size</button>` +
      SIZES_ALL.map((s) => `<button class="chip" type="button" data-filter-size="${s}">${s}</button>`).join("");
  }

  const colorWrap = $("[data-color-chips]");
  if (colorWrap) {
    colorWrap.innerHTML =
      `<button class="chip" type="button" data-filter-color="all">Any colour</button>` +
      Object.keys(COLORS)
        .map(
          (k) =>
            `<button class="chip" type="button" data-filter-color="${k}"><span class="swatch" style="background:${COLORS[k].hex};vertical-align:-3px;margin-right:.4rem"></span>${COLORS[k].label}</button>`
        )
        .join("");
  }

  const searchInput = $("[data-shop-search]");
  if (searchInput) searchInput.value = state.q;
  const sortSelInit = $("[data-sort]");
  if (sortSelInit) sortSelInit.value = state.sort;

  function apply() {
    let list = PRODUCTS.slice();

    if (state.collection !== "all") list = list.filter((p) => p.categories.includes(state.collection));
    if (state.size !== "all") list = list.filter((p) => p.sizes.includes(state.size) && !(p.soldOut || []).includes(state.size));
    if (state.color !== "all") list = list.filter((p) => p.colors.includes(state.color));
    if (state.q) {
      const q = state.q.toLowerCase();
      list = list.filter((p) => (p.name + " " + p.description).toLowerCase().includes(q));
    }

    const sorters = {
      "price-asc": (a, b) => a.price - b.price,
      "price-desc": (a, b) => b.price - a.price,
      "name-asc": (a, b) => a.name.localeCompare(b.name),
      rating: (a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount,
      newest: (a, b) => Number(b.categories.includes("new-chapters")) - Number(a.categories.includes("new-chapters")),
    };
    if (sorters[state.sort]) list.sort(sorters[state.sort]);

    const col = getCollection(state.collection);
    renderProducts(grid, list, {
      eagerFirst: true,
      emptyMessage: state.q
        ? `Nothing matched “${state.q}” — try a different word, or explore the full shop.`
        : col
        ? `New pieces for the ${col.name} collection are on the way. ${col.blurb}`
        : undefined,
    });

    /* reflect state in the UI */
    $$("[data-filter-collection]").forEach((b) =>
      b.setAttribute("aria-pressed", String(b.dataset.filterCollection === state.collection))
    );
    $$("[data-filter-size]").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.filterSize === state.size)));
    $$("[data-filter-color]").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.filterColor === state.color)));

    const count = $("[data-result-count]");
    if (count) count.textContent = `${list.length} ${list.length === 1 ? "T-Shirt" : "T-Shirts"}`;

    const title = $("[data-shop-title]");
    const blurb = $("[data-shop-blurb]");
    if (title) title.textContent = col ? col.name : "All T-Shirts";
    if (blurb) blurb.textContent = col ? col.blurb : "Every ChapterByEmm design — printed to order and shipped across Pakistan.";

    /* keep the URL shareable */
    const url = new URL(location.href);
    if (state.collection === "all") url.searchParams.delete("collection");
    else url.searchParams.set("collection", state.collection);
    if (state.q) url.searchParams.set("q", state.q);
    else url.searchParams.delete("q");
    history.replaceState(null, "", url);
  }

  const root = grid.closest("main") || document;
  root.addEventListener("click", (e) => {
    const c = e.target.closest("[data-filter-collection]");
    if (c) {
      state.collection = c.dataset.filterCollection;
      apply();
      return;
    }
    const s = e.target.closest("[data-filter-size]");
    if (s) {
      state.size = s.dataset.filterSize;
      apply();
      return;
    }
    const col = e.target.closest("[data-filter-color]");
    if (col) {
      state.color = col.dataset.filterColor;
      apply();
      return;
    }
    if (e.target.closest("[data-clear-filters]")) {
      state.collection = state.size = state.color = "all";
      state.q = "";
      if (searchInput) searchInput.value = "";
      apply();
    }
  });

  const sortSel = $("[data-sort]");
  if (sortSel) sortSel.addEventListener("change", () => ((state.sort = sortSel.value), apply()));

  if (searchInput) searchInput.addEventListener("input", () => ((state.q = searchInput.value.trim()), apply()));

  /* the header search panel can submit into an already-open shop page */
  document.addEventListener("site-search", (e) => {
    state.q = e.detail.q || "";
    if (searchInput) searchInput.value = state.q;
    apply();
  });

  apply();
}

/* ==========================================================================
   COLLECTIONS
   ========================================================================== */
function initCollections() {
  const wrap = $("[data-collections-all]");
  if (!wrap) return;
  wrap.innerHTML = COLLECTIONS.map((c) => {
    const n = byCollection(c.id).length;
    return `
      <a class="collection-card reveal" href="shop.html?collection=${c.id}">
        <img src="${c.image}" alt="${escapeHtml(c.name)} — printed T-shirts by ChapterByEmm" width="900" height="1100" loading="lazy" decoding="async">
        <div class="overlay-text">
          <h3>${escapeHtml(c.name)}</h3>
          <p>${escapeHtml(c.blurb)}</p>
          <p style="margin-top:.5rem;letter-spacing:.14em;text-transform:uppercase;font-size:.7rem">${n ? `${n} ${n === 1 ? "design" : "designs"}` : "Coming soon"}</p>
        </div>
      </a>`;
  }).join("");
}

/* ==========================================================================
   PRODUCT DETAIL
   ========================================================================== */
function initProduct() {
  const id = param("id");
  const p = getProduct(id) || PRODUCTS[0];
  const root = $("[data-pdp]");
  if (!root || !p) return;

  /* SEO: title, description and canonical reflect the product */
  document.title = `${p.name} — Printed Cotton T-Shirt | ${SITE.name}`;
  const meta = $('meta[name="description"]');
  if (meta) meta.setAttribute("content", p.description);

  const selected = {
    size: p.sizes.find((s) => !(p.soldOut || []).includes(s)),
    color: p.colors[0],
    qty: 1,
    image: 0,
  };

  const cat = getCollection(p.categories[0]);

  root.innerHTML = `
    <nav class="breadcrumbs" aria-label="Breadcrumb">
      <a href="index.html">Home</a> / <a href="shop.html">Shop</a> /
      <a href="shop.html?collection=${p.categories[0]}">${cat ? cat.name : "T-Shirts"}</a> /
      <span aria-current="page">${escapeHtml(p.name)}</span>
    </nav>

    <div class="pdp">
      <div class="gallery">
        <div class="gallery-main" data-zoom>
          <img src="${p.images[0]}" alt="${escapeHtml(p.name)} — printed cotton T-shirt, front view" width="900" height="1100" decoding="async">
          <span class="zoom-hint">Click to zoom</span>
        </div>
        <div class="thumbs" role="group" aria-label="Product images">
          ${p.images
            .map(
              (src, i) => `
            <button type="button" data-thumb="${i}" aria-current="${i === 0}" aria-label="View image ${i + 1}">
              <img src="${src}" alt="" width="200" height="200" loading="lazy">
            </button>`
            )
            .join("")}
        </div>
      </div>

      <div class="pdp-info">
        <p class="eyebrow" style="margin-bottom:.5rem">${cat ? cat.name : "T-Shirt"}</p>
        <h1 style="font-size:var(--step-3)">${escapeHtml(p.name)}</h1>
        <p style="margin-bottom:.75rem">
          <span class="stars" aria-label="${p.rating} out of 5 stars">${starsMarkup(p.rating)}</span>
          <span class="muted" style="font-size:var(--step--1)"> ${p.rating.toFixed(1)} · ${p.reviewCount} reviews</span>
        </p>
        <div class="price-row">
          <span class="price">${money(p.price)}</span>
          ${p.compareAt ? `<span class="compare">${money(p.compareAt)}</span>` : ""}
        </div>
        <p class="muted" style="font-size:var(--step--1);margin-top:-.5rem">Physical T-shirt, printed to order and shipped across Pakistan.</p>
        <p>${escapeHtml(p.description)}</p>

        <div class="option-group">
          <div class="option-label"><span>Colour: <strong data-color-label>${colorOf(selected.color).label}</strong></span></div>
          <div class="color-list">
            ${p.colors
              .map(
                (c) => `
              <button class="color-opt" type="button" data-color="${c}" aria-pressed="${c === selected.color}">
                <span class="swatch" style="background:${colorOf(c).hex}"></span>${colorOf(c).label}
              </button>`
              )
              .join("")}
          </div>
        </div>

        <div class="option-group">
          <div class="option-label">
            <span>Size: <strong data-size-label>${selected.size || "—"}</strong></span>
            <a href="size-guide.html">Size guide</a>
          </div>
          <div class="size-list">
            ${p.sizes
              .map((s) => {
                const out = (p.soldOut || []).includes(s);
                return `<button class="size-opt" type="button" data-size="${s}" aria-pressed="${s === selected.size}" ${out ? "disabled title='Sold out'" : ""}>${s}</button>`;
              })
              .join("")}
          </div>
          ${(p.soldOut || []).length ? `<p class="hint">Crossed-out sizes are temporarily sold out.</p>` : ""}
        </div>

        <div class="option-group">
          <div class="option-label"><span>Quantity</span></div>
          <span class="qty">
            <button type="button" data-qty-step="-1" aria-label="Decrease quantity">−</button>
            <input type="text" value="1" data-qty readonly aria-label="Quantity">
            <button type="button" data-qty-step="1" aria-label="Increase quantity">+</button>
          </span>
        </div>

        <div class="pdp-actions">
          <button class="btn" type="button" data-add-to-cart>Add to Bag</button>
          <button class="btn btn--ghost" type="button" data-buy-now>Buy Now</button>
          <button class="icon-btn wish-btn-pdp" type="button" data-wish="${p.id}" aria-pressed="false" aria-label="Add to wishlist">${ICONS.heart}</button>
        </div>

        <p class="pdp-statement">Made to be worn. Made to be part of your chapter.</p>

        <ul class="trust-list">
          <li>Printed to order in ${SITE.location} — dispatched in 2–4 business days</li>
          <li>Free standard delivery on orders over ${money(SITE.freeShippingThreshold)}</li>
          <li>Cash on Delivery available nationwide</li>
        </ul>

        <div class="accordion">
          <p class="eyebrow" style="margin:1.5rem 0 .25rem">Made With Intention</p>
          <details open>
            <summary>Fabric &amp; Material</summary>
            <div class="panel"><p>${escapeHtml(p.fabric)}</p></div>
          </details>
          <details>
            <summary>Fit &amp; Sizing</summary>
            <div class="panel">
              <p>${escapeHtml(p.fit)}</p>
              <div class="table-wrap" style="margin-top:1rem">
                <table>
                  <caption class="visually-hidden">Size chart in inches</caption>
                  <thead><tr><th>Size</th><th>Chest (in)</th><th>Body length (in)</th><th>Sleeve (in)</th></tr></thead>
                  <tbody>${SIZE_CHART.map((r) => `<tr><td>${r.size}</td><td>${r.chest}</td><td>${r.length}</td><td>${r.sleeve}</td></tr>`).join("")}</tbody>
                </table>
              </div>
            </div>
          </details>
          <details>
            <summary>Care</summary>
            <div class="panel"><p>${escapeHtml(p.care)}</p></div>
          </details>
          <details>
            <summary>Shipping</summary>
            <div class="panel">
              <ul>
                ${SHIPPING_METHODS.map((m) => `<li><strong>${m.label}</strong> — ${m.eta} · ${m.price === 0 ? "Free" : money(m.price)}</li>`).join("")}
                <li>Free standard delivery over ${money(SITE.freeShippingThreshold)}</li>
                <li>Cash on Delivery, Bank Transfer available. <a href="shipping.html">Full shipping details</a></li>
              </ul>
            </div>
          </details>
          <details>
            <summary>Returns &amp; Exchanges</summary>
            <div class="panel"><p>See our <a href="returns-exchanges.html">Returns &amp; Exchanges policy</a> for eligibility and how to start a return.</p></div>
          </details>
        </div>
      </div>
    </div>`;

  /* --- gallery --- */
  const mainImg = $(".gallery-main img", root);
  $$("[data-thumb]", root).forEach((btn) => {
    btn.addEventListener("click", () => {
      selected.image = Number(btn.dataset.thumb);
      mainImg.src = p.images[selected.image];
      $$("[data-thumb]", root).forEach((b) => b.setAttribute("aria-current", String(b === btn)));
    });
  });

  const zoomBox = $("[data-zoom]", root);
  zoomBox.addEventListener("click", () => zoomBox.classList.toggle("is-zoomed"));
  zoomBox.addEventListener("mousemove", (e) => {
    if (!zoomBox.classList.contains("is-zoomed")) return;
    const r = zoomBox.getBoundingClientRect();
    mainImg.style.transformOrigin = `${((e.clientX - r.left) / r.width) * 100}% ${((e.clientY - r.top) / r.height) * 100}%`;
  });

  /* --- options --- */
  $$("[data-color]", root).forEach((btn) =>
    btn.addEventListener("click", () => {
      selected.color = btn.dataset.color;
      $$("[data-color]", root).forEach((b) => b.setAttribute("aria-pressed", String(b === btn)));
      $("[data-color-label]", root).textContent = colorOf(selected.color).label;
    })
  );

  $$("[data-size]", root).forEach((btn) =>
    btn.addEventListener("click", () => {
      selected.size = btn.dataset.size;
      $$("[data-size]", root).forEach((b) => b.setAttribute("aria-pressed", String(b === btn)));
      $("[data-size-label]", root).textContent = selected.size;
    })
  );

  const qtyInput = $("[data-qty]", root);
  $$("[data-qty-step]", root).forEach((btn) =>
    btn.addEventListener("click", () => {
      selected.qty = Math.max(1, Math.min(99, selected.qty + Number(btn.dataset.qtyStep)));
      qtyInput.value = selected.qty;
    })
  );

  /* --- add to bag / buy now --- */
  function addCurrentToCart() {
    if (!selected.size) {
      toast("Please choose a size first.");
      return false;
    }
    Store.addToCart({ id: p.id, size: selected.size, color: selected.color, qty: selected.qty });
    return true;
  }

  $("[data-add-to-cart]", root).addEventListener("click", () => {
    if (!addCurrentToCart()) return;
    showDrawerConfirm();
    openPanel("#cart-drawer", "[data-open-cart]");
  });

  $("[data-buy-now]", root).addEventListener("click", () => {
    if (!addCurrentToCart()) return;
    location.href = "checkout.html";
  });

  /* --- related products --- */
  const related = PRODUCTS.filter((x) => x.id !== p.id && x.categories.some((c) => p.categories.includes(c))).slice(0, 4);
  renderProducts($("[data-related]"), related.length ? related : PRODUCTS.slice(0, 4));

  syncWishUI();

  /* --- structured data for search engines --- */
  const ld = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.name,
    image: p.images,
    description: p.description,
    category: cat ? cat.name : "T-Shirts",
    brand: { "@type": "Brand", name: SITE.name },
    offers: {
      "@type": "Offer",
      price: String(p.price),
      priceCurrency: SITE.currency,
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
    },
    aggregateRating: { "@type": "AggregateRating", ratingValue: p.rating, reviewCount: p.reviewCount },
  };
  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.textContent = JSON.stringify(ld);
  document.head.appendChild(script);
}

/* ==========================================================================
   CART PAGE
   ========================================================================== */
function initCartPage() {
  const wrap = $("[data-cart-page]");
  if (!wrap) return;

  function render() {
    if (!wrap.isConnected) return;
    const items = Store.cart;

    if (!items.length) {
      wrap.innerHTML = `
        <div class="empty-state" style="padding:4rem 1rem">
          <h2>Your bag is empty</h2>
          <p>Every order is a physical T-shirt, printed just for you.</p>
          <a class="btn" href="shop.html">Shop T-Shirts</a>
        </div>`;
      const sum = $("[data-cart-summary]");
      if (sum) sum.style.display = "none";
      return;
    }

    wrap.innerHTML = items
      .map((item, i) => {
        const p = getProduct(item.id);
        if (!p) return "";
        return `
          <div class="line-item">
            <a href="product.html?id=${p.id}"><img src="${p.images[0]}" alt="${escapeHtml(p.name)}" width="120" height="150" loading="lazy"></a>
            <div>
              <h3><a href="product.html?id=${p.id}">${escapeHtml(p.name)}</a></h3>
              <p class="meta">${escapeHtml(colorOf(item.color).label)} · Size ${escapeHtml(item.size)}</p>
              <div class="li-actions">
                <span class="qty">
                  <button type="button" data-step="-1" data-index="${i}" aria-label="Decrease quantity">−</button>
                  <input type="text" value="${item.qty}" readonly aria-label="Quantity for ${escapeHtml(p.name)}">
                  <button type="button" data-step="1" data-index="${i}" aria-label="Increase quantity">+</button>
                </span>
                <button class="remove" type="button" data-remove="${i}">Remove</button>
                <button class="remove" type="button" data-wish="${p.id}" aria-pressed="false">Save for later</button>
              </div>
            </div>
            <div class="li-price">
              <strong>${money(p.price * item.qty)}</strong>
              <p class="meta">${money(p.price)} each</p>
            </div>
          </div>`;
      })
      .join("");

    renderSummary("[data-cart-summary]");
    syncWishUI();
  }

  wrap.addEventListener("click", (e) => {
    const step = e.target.closest("[data-step]");
    if (step) {
      const i = Number(step.dataset.index);
      Store.updateQty(i, Store.cart[i].qty + Number(step.dataset.step));
      return;
    }
    const rm = e.target.closest("[data-remove]");
    if (rm) {
      Store.removeFromCart(Number(rm.dataset.remove));
      toast("Removed from your bag.");
    }
  });

  document.addEventListener("cart:change", render);
  initPromoForm();
  render();

  const trust = $("[data-cart-trust]");
  if (trust) {
    trust.innerHTML = `
      <li>Printed &amp; dispatched in 2–4 business days</li>
      <li>Free standard delivery over ${money(SITE.freeShippingThreshold)}</li>
      <li>Cash on Delivery available nationwide</li>`;
  }
}

/* Order summary block, shared by cart + checkout */
function renderSummary(selector, shippingId = "standard") {
  const box = document.querySelector(selector);
  if (!box) return;
  const t = calcTotals(shippingId);
  box.style.display = "";

  const rows = $("[data-summary-rows]", box);
  if (!rows) return;
  rows.innerHTML = `
    <div class="summary-row"><span>Subtotal (${Store.cartCount} ${Store.cartCount === 1 ? "item" : "items"})</span><span>${money(t.subtotal)}</span></div>
    ${t.discount ? `<div class="summary-row" style="color:var(--success)"><span>Discount (${escapeHtml(t.promo)})</span><span>−${money(t.discount)}</span></div>` : ""}
    <div class="summary-row"><span>${t.method.label}</span><span>${t.shipping === 0 ? "Free" : money(t.shipping)}</span></div>
    ${t.tax > 0 ? `<div class="summary-row"><span>Estimated tax</span><span>${money(t.tax)}</span></div>` : ""}
    <div class="summary-row summary-row--total"><span>Total</span><span>${money(t.total)}</span></div>`;

  const progress = $("[data-ship-progress]", box);
  if (progress) {
    const left = SITE.freeShippingThreshold - t.subtotal;
    progress.textContent =
      left > 0
        ? `You are ${money(left)} away from free standard delivery.`
        : "Nice — standard delivery is free on this order.";
  }
}

/* Promo code form (cart + checkout) */
function initPromoForm() {
  const form = $("[data-promo-form]");
  if (!form) return;
  const status = $("[data-promo-status]", form.parentElement) || $("[data-promo-status]");

  const show = (msg, ok) => {
    if (!status) return toast(msg);
    status.textContent = msg;
    status.style.color = ok ? "var(--success)" : "var(--error)";
    status.style.display = "block";
  };

  if (Store.promo && PROMO_CODES[Store.promo]) {
    show(`${Store.promo} applied — ${PROMO_CODES[Store.promo].label}.`, true);
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const input = $("input", form);
    const code = input.value.trim().toUpperCase();
    if (!code) return;
    if (PROMO_CODES[code]) {
      Store.promo = code;
      show(`${code} applied — ${PROMO_CODES[code].label}.`, true);
      input.value = "";
    } else {
      Store.promo = null;
      show(`“${code}” is not a valid code.`, false);
    }
  });
}

/* ==========================================================================
   CHECKOUT
   ========================================================================== */
function initCheckout() {
  const form = $("[data-checkout-form]");
  if (!form) return;

  /* delivery method radios from SHIPPING_METHODS */
  const shipWrap = $("[data-shipping-methods]");
  if (shipWrap) {
    shipWrap.innerHTML = SHIPPING_METHODS.map(
      (m, i) => `
      <label class="radio-card">
        <input type="radio" name="shipping" value="${m.id}" ${i === 0 ? "checked" : ""}>
        <span class="rc-body"><strong>${m.label}</strong><small>${m.eta}</small></span>
        <span class="rc-price">${m.price === 0 ? "Free" : money(m.price)}</span>
      </label>`
    ).join("");
  }

  /* payment method radios from PAYMENT_METHODS */
  const payWrap = $("[data-payment-methods]");
  if (payWrap) {
    payWrap.innerHTML = PAYMENT_METHODS.map(
      (m, i) => `
      <label class="radio-card${m.enabled ? "" : " radio-card--disabled"}">
        <input type="radio" name="payMethod" value="${m.id}" ${!m.enabled ? "disabled" : i === 0 ? "checked" : ""}>
        <span class="rc-body"><strong>${m.label}${!m.enabled ? " — Coming Soon" : ""}</strong><small>${m.detail}</small></span>
      </label>`
    ).join("");
  }

  /* Pakistan province / city selects from PAKISTAN_PROVINCES / PAKISTAN_CITIES */
  const provinceSel = $("[data-checkout-provinces]");
  if (provinceSel) {
    provinceSel.innerHTML =
      `<option value="">Select province…</option>` + PAKISTAN_PROVINCES.map((p) => `<option>${p}</option>`).join("");
  }
  const citySel = $("[data-checkout-cities]");
  if (citySel) {
    citySel.innerHTML = `<option value="">Select city…</option>` + PAKISTAN_CITIES.map((c) => `<option>${c}</option>`).join("");
  }

  const currentShipping = () => (form.querySelector('input[name="shipping"]:checked') || { value: "standard" }).value;
  const currentPayment = () => (form.querySelector('input[name="payMethod"]:checked') || { value: "cod" }).value;

  /* items in the summary panel */
  function renderItems() {
    const list = $("[data-checkout-items]");
    if (!list) return;
    list.innerHTML = Store.cart
      .map((item) => {
        const p = getProduct(item.id);
        if (!p) return "";
        return `
          <div class="mini-item">
            <img src="${p.images[0]}" alt="${escapeHtml(p.name)}" width="78" height="98" loading="lazy">
            <div>
              <h3 style="font-size:1rem">${escapeHtml(p.name)}</h3>
              <p class="meta">${escapeHtml(colorOf(item.color).label)} · ${escapeHtml(item.size)} · Qty ${item.qty}</p>
            </div>
            <span class="price">${money(p.price * item.qty)}</span>
          </div>`;
      })
      .join("");
  }

  function refresh() {
    if (!form.isConnected) return;
    renderItems();
    renderSummary("[data-checkout-summary]", currentShipping());
  }

  form.addEventListener("change", (e) => {
    if (e.target.name === "shipping") refresh();
  });
  document.addEventListener("cart:change", refresh);
  initPromoForm();
  refresh();

  if (!Store.cart.length) {
    const notice = $("[data-empty-checkout]");
    if (notice) notice.style.display = "block";
  }

  /* place order — front-end only. See the payment note in the markup. */
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!Store.cart.length) return toast("Your bag is empty.");
    if (!form.checkValidity()) return form.reportValidity();

    const data = Object.fromEntries(new FormData(form).entries());
    const t = calcTotals(currentShipping());
    const orderNo = "CBE-" + Date.now().toString().slice(-6);
    const payMethod = PAYMENT_METHODS.find((m) => m.id === currentPayment()) || PAYMENT_METHODS[0];

    /* ---- CONNECT A PAKISTANI PAYMENT GATEWAY HERE ----------------------
       For Cash on Delivery / Bank Transfer, no gateway is needed — the
       order simply needs to reach you (email/WhatsApp/sheet/backend).
       For Online Payment, integrate JazzCash, Easypaisa, or a card
       processor here before showing the confirmation screen:
         const res = await fetch("/api/create-payment", {
           method: "POST",
           headers: { "Content-Type": "application/json" },
           body: JSON.stringify({ items: Store.cart, customer: data }),
         });
         const { redirectUrl } = await res.json();
         location.href = redirectUrl;
    --------------------------------------------------------------------- */
    console.log("[order]", { orderNo, customer: data, items: Store.cart, totals: t, payMethod: payMethod.id });

    const method = SHIPPING_METHODS.find((m) => m.id === currentShipping());
    const bankNote =
      payMethod.id === "bank"
        ? `<p class="lede" style="margin-top:1rem">[EDIT] Add your bank account title, number and branch here so customers know where to transfer. We'll also confirm these details on WhatsApp.</p>`
        : "";

    $("[data-checkout-shell]").innerHTML = `
      <div class="confirmation">
        <p class="eyebrow">Order Received</p>
        <h1 style="font-size:var(--step-3)">Thank you, ${escapeHtml(data.fullName ? data.fullName.split(" ")[0] : "friend")}.</h1>
        <p class="lede">Your order <strong>${orderNo}</strong> is confirmed. We'll reach out on WhatsApp or email with a receipt, then a tracking update as soon as your T-shirt ships.</p>
        ${bankNote}
        <div class="summary" style="text-align:left;margin-top:2rem">
          <h2>Order Summary</h2>
          <div class="summary-row"><span>Items</span><span>${Store.cartCount}</span></div>
          <div class="summary-row"><span>${method.label}</span><span>${t.shipping === 0 ? "Free" : money(t.shipping)}</span></div>
          <div class="summary-row"><span>Delivery estimate</span><span>${method.eta}</span></div>
          <div class="summary-row"><span>Payment method</span><span>${payMethod.label.split("(")[0].trim()}</span></div>
          <div class="summary-row summary-row--total"><span>Total</span><span>${money(t.total)}</span></div>
        </div>
        <p style="margin-top:1.5rem"><a class="btn" href="shop.html">Continue Shopping</a></p>
      </div>`;
    Store.clearCart();
    Store.promo = null;
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

/* ==========================================================================
   WISHLIST
   ========================================================================== */
function initWishlistPage() {
  const grid = $("[data-wishlist-grid]");
  if (!grid) return;

  function render() {
    if (!grid.isConnected) return;
    const items = Store.wishlist.map(getProduct).filter(Boolean);
    if (!items.length) {
      grid.innerHTML = `
        <div class="empty-state" style="grid-column:1/-1;padding:3rem 1rem">
          <h2>Nothing saved yet</h2>
          <p>Tap the heart on any T-shirt to keep it here for later.</p>
          <a class="btn" href="shop.html">Browse T-Shirts</a>
        </div>`;
      return;
    }
    renderProducts(grid, items);
  }

  document.addEventListener("wishlist:change", render);
  render();
}

/* ==========================================================================
   FAQ — rendered from FAQ_GROUPS in data.js, with live search
   ========================================================================== */
function initFaq() {
  const wrap = $("[data-faq]");
  if (!wrap) return;

  const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

  wrap.innerHTML = FAQ_GROUPS.map(
    (g) => `
    <section class="faq-group reveal" id="${slug(g.title)}">
      <h2>${escapeHtml(g.title)}</h2>
      <div class="accordion">
        ${g.items
          .map(
            (it) => `
          <details data-faq-item>
            <summary>${escapeHtml(it.q)}</summary>
            <div class="panel"><p>${escapeHtml(it.a)}</p></div>
          </details>`
          )
          .join("")}
      </div>
    </section>`
  ).join("");

  /* live search across questions + answers */
  const search = $("[data-faq-search]");
  const empty = $(".faq-empty");
  if (search) {
    search.addEventListener("input", () => {
      const q = search.value.trim().toLowerCase();
      let hits = 0;
      $$("[data-faq-item]", wrap).forEach((d) => {
        const match = !q || d.textContent.toLowerCase().includes(q);
        d.style.display = match ? "" : "none";
        if (match) hits++;
        d.open = Boolean(q) && match;
      });
      $$(".faq-group", wrap).forEach((g) => {
        const visible = $$("[data-faq-item]", g).some((d) => d.style.display !== "none");
        g.style.display = visible ? "" : "none";
      });
      if (empty) empty.style.display = hits ? "none" : "block";
    });
  }

  /* FAQPage structured data */
  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.textContent = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_GROUPS.flatMap((g) =>
      g.items.map((it) => ({
        "@type": "Question",
        name: it.q,
        acceptedAnswer: { "@type": "Answer", text: it.a },
      }))
    ),
  });
  document.head.appendChild(script);

  if (location.hash) {
    const target = document.getElementById(location.hash.slice(1));
    if (target) target.scrollIntoView({ behavior: "smooth" });
  }
}

/* ==========================================================================
   CUSTOM DESIGNS — populate size/colour selects from data.js
   ========================================================================== */
function initCustomPage() {
  const sizeSel = $("[data-custom-sizes]");
  if (sizeSel) sizeSel.innerHTML = SIZES_ALL.map((s) => `<option value="${s}">${s}</option>`).join("");

  const colorSel = $("[data-custom-colors]");
  if (colorSel)
    colorSel.innerHTML = Object.entries(COLORS)
      .map(([k, v]) => `<option value="${k}">${v.label}</option>`)
      .join("");
}

/* ==========================================================================
   SIZE GUIDE — table rendered from SIZE_CHART in data.js
   ========================================================================== */
function initSizeGuide() {
  const wrap = $("[data-size-chart]");
  if (!wrap) return;
  wrap.innerHTML = `
    <table>
      <caption class="visually-hidden">ChapterByEmm size chart, measurements in inches</caption>
      <thead><tr><th>Size</th><th>Chest (in)</th><th>Body Length (in)</th><th>Sleeve (in)</th></tr></thead>
      <tbody>${SIZE_CHART.map((r) => `<tr><td>${r.size}</td><td>${r.chest}</td><td>${r.length}</td><td>${r.sleeve}</td></tr>`).join("")}</tbody>
    </table>`;
}

/* ==========================================================================
   THE CHAPTER JOURNAL
   ========================================================================== */
function journalCard(post) {
  return `
    <a class="journal-card reveal" href="journal-post.html?slug=${post.slug}">
      <img src="${post.image}" alt="" width="900" height="700" loading="lazy" decoding="async">
      <div class="journal-card-body">
        <p class="eyebrow">${escapeHtml(post.date)}</p>
        <h3>${escapeHtml(post.title)}</h3>
        <p>${escapeHtml(post.excerpt)}</p>
        <span class="link-arrow">Read the Entry <span aria-hidden="true">→</span></span>
      </div>
    </a>`;
}

function initJournal() {
  const grid = $("[data-journal-grid]");
  if (!grid) return;
  grid.innerHTML = JOURNAL_POSTS.map(journalCard).join("");
  initReveal();
}

function initJournalPost() {
  const slug = param("slug");
  const post = JOURNAL_POSTS.find((p) => p.slug === slug) || JOURNAL_POSTS[0];
  const root = $("[data-journal-post]");
  if (!root || !post) return;

  document.title = `${post.title} — The Chapter Journal | ${SITE.name}`;
  const meta = $('meta[name="description"]');
  if (meta) meta.setAttribute("content", post.excerpt);

  root.innerHTML = `
    <nav class="breadcrumbs" aria-label="Breadcrumb">
      <a href="index.html">Home</a> / <a href="journal.html">Journal</a> / <span aria-current="page">${escapeHtml(post.title)}</span>
    </nav>
    <p class="eyebrow">${escapeHtml(post.date)}</p>
    <h1>${escapeHtml(post.title)}</h1>
    <img src="${post.image}" alt="" width="1200" height="800" style="border-radius:var(--radius-lg);margin-block:2rem" decoding="async">
    <div class="prose">
      <p>${escapeHtml(post.body)}</p>
    </div>`;

  const others = JOURNAL_POSTS.filter((p) => p.slug !== post.slug).slice(0, 3);
  const relatedWrap = $("[data-journal-related]");
  if (relatedWrap) relatedWrap.innerHTML = others.map(journalCard).join("");
}
