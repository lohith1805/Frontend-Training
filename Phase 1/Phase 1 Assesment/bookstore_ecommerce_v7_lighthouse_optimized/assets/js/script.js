
const STORAGE_VERSION = 'bookly-v7-light-cherry-reset';
(function resetOldDemoDataOnce() {
  try {
    if (localStorage.getItem('bookstoreStorageVersion') !== STORAGE_VERSION) {
      ['bookstoreCart','bookstoreWishlist','bookstoreAddress','recentlyViewed'].forEach(key => localStorage.removeItem(key));
      localStorage.setItem('bookstoreStorageVersion', STORAGE_VERSION);
    }
  } catch {}
})();

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const money = n => '₹' + Number(n || 0).toLocaleString('en-IN');
const safeGet = (key, fallback = []) => {
  try { return JSON.parse(localStorage.getItem(key) || JSON.stringify(fallback)); }
  catch { return fallback; }
};
const safeSet = (key, value) => {
  try { localStorage.setItem(key, JSON.stringify(value)); }
  catch {}
};
const BOOKS=[
{id:'atomic-habits',title:'Atomic Habits',author:'James Clear',price:399,oldPrice:699,rating:4.8,category:'Self Help',image:'assets/images/product-item1.webp',available:true,description:'A practical guide to building better habits through small daily improvements. Clear explains how tiny choices compound into major results over time.',specs:{Language:'English',Pages:'320',Publisher:'Random House Business',Published:'October 2018',ISBN:'9781847941831',Format:'Paperback',Dimensions:'19.8 x 12.9 cm'}},
{id:'midnight-library',title:'The Midnight Library',author:'Matt Haig',price:329,oldPrice:499,rating:4.4,category:'Fiction',image:'assets/images/product-item2.webp',available:true,description:'A thoughtful novel about choices, regrets and the lives we imagine we could have lived. Warm, readable and emotionally direct.',specs:{Language:'English',Pages:'304',Publisher:'Canongate Books',Published:'August 2020',ISBN:'9781786892737',Format:'Paperback',Dimensions:'19.8 x 12.9 cm'}},
{id:'ikigai',title:'Ikigai',author:'Héctor García',price:299,oldPrice:499,rating:4.5,category:'Self Help',image:'assets/images/product-item3.webp',available:true,description:'A calm and inspiring read about purpose, daily rhythm and long-term wellbeing. It introduces simple ideas from Japanese lifestyle and longevity practices.',specs:{Language:'English',Pages:'208',Publisher:'Penguin Life',Published:'September 2017',ISBN:'9781786330895',Format:'Hardcover',Dimensions:'18.4 x 13.6 cm'}},
{id:'deep-work',title:'Deep Work',author:'Cal Newport',price:449,oldPrice:799,rating:4.6,category:'Technology',image:'assets/images/product-item4.webp',available:true,description:'A focused productivity book for readers who want to build concentration in a noisy world. It gives practical rules for serious learning and meaningful work.',specs:{Language:'English',Pages:'304',Publisher:'Piatkus',Published:'January 2016',ISBN:'9780349413686',Format:'Paperback',Dimensions:'19.6 x 12.8 cm'}},
{id:'zero-to-one',title:'Zero to One',author:'Peter Thiel',price:389,oldPrice:650,rating:4.3,category:'Business',image:'assets/images/product-item5.webp',available:true,description:'A sharp business book about startups, monopoly thinking and creating something new. Useful for founders, students and anyone curious about building companies.',specs:{Language:'English',Pages:'224',Publisher:'Virgin Books',Published:'September 2014',ISBN:'9780753555194',Format:'Paperback',Dimensions:'19.8 x 12.9 cm'}},
{id:'alchemist',title:'The Alchemist',author:'Paulo Coelho',price:249,oldPrice:399,rating:4.7,category:'Fiction',image:'assets/images/product-item6.webp',available:true,description:'A modern classic about dreams, courage and the journey toward a personal legend. Simple, memorable and widely loved by readers of all ages.',specs:{Language:'English',Pages:'172',Publisher:'HarperCollins',Published:'May 1993',ISBN:'9780062315007',Format:'Paperback',Dimensions:'17.8 x 11.1 cm'}},
{id:'psychology-money',title:'The Psychology of Money',author:'Morgan Housel',price:349,oldPrice:599,rating:4.6,category:'Business',image:'assets/images/product-item7.webp',available:true,description:'A clear book about how people think, behave and make mistakes with money. It focuses less on formulas and more on judgement, patience and risk.',specs:{Language:'English',Pages:'256',Publisher:'Harriman House',Published:'September 2020',ISBN:'9780857197689',Format:'Paperback',Dimensions:'19.8 x 12.9 cm'}},
{id:'clean-code',title:'Clean Code',author:'Robert C. Martin',price:649,oldPrice:999,rating:4.5,category:'Technology',image:'assets/images/product-item8.webp',available:false,description:'A developer-focused book about writing readable, maintainable software. It is useful for learners who want to move beyond code that only works.',specs:{Language:'English',Pages:'464',Publisher:'Pearson',Published:'August 2008',ISBN:'9780132350884',Format:'Paperback',Dimensions:'23.3 x 17.8 cm'}},
{id:'harry-potter',title:'Harry Potter and the Philosopher’s Stone',author:'J.K. Rowling',price:379,oldPrice:599,rating:4.8,category:'Children',image:'assets/images/product-item9.webp',available:true,description:'A magical adventure that introduces Hogwarts, friendship and courage. A strong pick for young readers and fantasy fans.',specs:{Language:'English',Pages:'352',Publisher:'Bloomsbury',Published:'June 1997',ISBN:'9781408855652',Format:'Paperback',Dimensions:'19.8 x 12.9 cm'}},
{id:'brief-history-time',title:'A Brief History of Time',author:'Stephen Hawking',price:299,oldPrice:499,rating:4.4,category:'Academic',image:'assets/images/product-item10.webp',available:true,description:'An accessible introduction to big questions about the universe, time and black holes. It is concise, ambitious and rewarding for curious readers.',specs:{Language:'English',Pages:'256',Publisher:'Bantam Books',Published:'April 1988',ISBN:'9780553380163',Format:'Paperback',Dimensions:'19.8 x 12.9 cm'}},
{id:'think-grow-rich',title:'Think and Grow Rich',author:'Napoleon Hill',price:199,oldPrice:350,rating:4.2,category:'Self Help',image:'assets/images/product-item11.webp',available:false,description:'A classic personal development title about goals, persistence and disciplined thinking. Best read as a motivational framework, not a financial shortcut.',specs:{Language:'English',Pages:'240',Publisher:'Fingerprint Publishing',Published:'March 2019',ISBN:'9789387779460',Format:'Paperback',Dimensions:'19.6 x 12.7 cm'}},
{id:'rich-dad-poor-dad',title:'Rich Dad Poor Dad',author:'Robert T. Kiyosaki',price:309,oldPrice:499,rating:4.4,category:'Business',image:'assets/images/product-item12.webp',available:false,description:'A popular book on financial mindset, assets and money habits. It is simple to read and often used as a first step into personal finance.',specs:{Language:'English',Pages:'336',Publisher:'Plata Publishing',Published:'April 2017',ISBN:'9781612680194',Format:'Paperback',Dimensions:'19.8 x 12.9 cm'}}
];
function toast(message) {
  const el = $('#toast');
  if (!el) return;
  el.textContent = message;
  el.classList.add('show');
  clearTimeout(window.__booklyToast);
  window.__booklyToast = setTimeout(() => el.classList.remove('show'), 2200);
}
function bounce(el) {
  if (!el) return;
  el.classList.remove('bounce');
  void el.offsetWidth;
  el.classList.add('bounce');
}
function getBook(id) { return BOOKS.find(b => b.id === id); }
function cartItems() { return safeGet('bookstoreCart', []); }
function wishItems() { return safeGet('bookstoreWishlist', []); }
function saveCart(items) { safeSet('bookstoreCart', items); }
function saveWish(items) { safeSet('bookstoreWishlist', items); }
function updateBadges() {
  const cartCount = cartItems().reduce((sum, item) => sum + Number(item.qty || 1), 0);
  const wishCount = wishItems().length;
  const cartBadge = $('#cartBadge');
  const wishBadge = $('#wishBadge');
  if (cartBadge) {
    cartBadge.textContent = cartCount;
    cartBadge.classList.toggle('visible', cartCount > 0);
  }
  if (wishBadge) {
    wishBadge.textContent = wishCount;
    wishBadge.classList.toggle('visible', wishCount > 0);
  }
}
function addToCart(id, qty = 1, format = 'Paperback') {
  const book = getBook(id);
  if (!book) { toast('Book not found'); return false; }
  if (!book.available) { toast('This book is currently sold out'); return false; }
  const cart = cartItems();
  const existing = cart.find(item => item.id === id && (item.format || 'Paperback') === format);
  if (existing) existing.qty = Number(existing.qty || 1) + Number(qty || 1);
  else cart.unshift({ id, qty: Number(qty || 1), format });
  saveCart(cart);
  updateBadges();
  bounce($('#cartIcon'));
  bounce($(`[data-add="${id}"]`));
  toast('Added to cart');
  return true;
}
function addToWishlist(id) {
  const book = getBook(id);
  if (!book) { toast('Book not found'); return false; }
  const wish = wishItems();
  if (!wish.includes(id)) wish.unshift(id);
  saveWish(wish);
  updateBadges();
  bounce($('#wishIcon'));
  bounce($(`[data-wish="${id}"]`));
  toast('Added to wishlist');
  return true;
}
function removeFromCart(id, format = null) {
  let cart = cartItems();
  cart = cart.filter(item => !(item.id === id && (!format || (item.format || 'Paperback') === format)));
  saveCart(cart);
  updateBadges();
  renderCart();
  toast('Removed from cart');
}
function removeFromWishlist(id) {
  saveWish(wishItems().filter(item => item !== id));
  updateBadges();
  renderWishlist();
  toast('Removed from wishlist');
}
function moveToWishlist(id) {
  const cart = cartItems().filter(item => item.id !== id);
  saveCart(cart);
  const wish = wishItems();
  if (!wish.includes(id)) wish.unshift(id);
  saveWish(wish);
  updateBadges();
  renderCart();
  toast('Moved to wishlist');
}
function moveToCart(id) {
  const added = addToCart(id, 1);
  if (added) {
    saveWish(wishItems().filter(item => item !== id));
    updateBadges();
    renderWishlist();
  }
}
function productCard(book) {
  if (!book) return '';
  return `<article class="product-card" data-id="${book.id}">
    <div class="product-media">
      ${!book.available ? '<span class="badge">Sold Out</span>' : ''}
      <a href="product.html?id=${book.id}" aria-label="View ${book.title}">
        <img loading="lazy" decoding="async" width="434" height="620" src="${book.image}" alt="${book.title} book cover">
      </a>
      <div class="quick-actions">
        <button type="button" class="btn btn-primary" data-add="${book.id}" ${!book.available ? 'disabled aria-disabled="true"' : ''}>Add to Cart</button>
        <button type="button" class="btn btn-secondary wish" data-wish="${book.id}" aria-label="Add ${book.title} to wishlist">♡</button>
      </div>
    </div>
    <div class="product-content">
      <h3><a href="product.html?id=${book.id}">${book.title}</a></h3>
      <p class="author">${book.author} · ${book.category}</p>
      <div class="rating">★ ${book.rating}</div>
      <div class="product-price"><span>${money(book.price)}</span><span class="old">${money(book.oldPrice)}</span></div>
    </div>
  </article>`;
}
function bindGlobalActions() {
  document.addEventListener('click', event => {
    const addBtn = event.target.closest('[data-add]');
    const wishBtn = event.target.closest('[data-wish]');
    if (addBtn) {
      event.preventDefault();
      event.stopPropagation();
      if (!addBtn.disabled) addToCart(addBtn.dataset.add);
    }
    if (wishBtn) {
      event.preventDefault();
      event.stopPropagation();
      addToWishlist(wishBtn.dataset.wish);
    }
  });
}
function updateActiveLinks() {
  const page = location.pathname.split('/').pop() || 'index.html';
  $$('.nav-center a, .mobile-nav a').forEach(a => {
    const href = a.getAttribute('href');
    const active = href === page || (page === 'index.html' && href === 'index.html') || (page === 'product.html' && href.includes('#books'));
    a.classList.toggle('active', active);
  });
}
function updateUser() {
  const user = safeGet('bookstoreUser', null);
  const btn = $('#loginBtn');
  const chip = $('#userChip');
  const name = $('#userName');
  if (user && btn && chip && name) {
    btn.style.display = 'none';
    chip.style.display = 'flex';
    name.textContent = String(user.name || 'User').split(' ')[0];
  }
}
function initNav() {
  updateActiveLinks();
  updateBadges();
  updateUser();
  const search = $('#searchPanel');
  const input = $('#searchInput');
  const modal = $('#loginModal');
  const mobile = $('#mobileNav');
  $('#searchBtn')?.addEventListener('click', () => {
    search?.classList.toggle('open');
    if (search?.classList.contains('open')) setTimeout(() => input?.focus(), 40);
  });
  input?.addEventListener('input', e => {
    const q = e.target.value.trim().toLowerCase();
    const grid = $('#productGrid');
    if (!grid) return;
    const result = BOOKS.filter(b => `${b.title} ${b.author} ${b.category}`.toLowerCase().includes(q));
    grid.innerHTML = result.length ? result.map(productCard).join('') : '<div class="empty-state">No books found.</div>';
  });
  $('#menuBtn')?.addEventListener('click', () => mobile?.classList.toggle('open'));
  $('#loginBtn')?.addEventListener('click', () => modal?.classList.add('open'));
  $('#footerLogin')?.addEventListener('click', e => { e.preventDefault(); modal?.classList.add('open'); });
  $('#closeLogin')?.addEventListener('click', () => modal?.classList.remove('open'));
  modal?.addEventListener('click', e => { if (e.target === e.currentTarget) modal.classList.remove('open'); });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      modal?.classList.remove('open');
      search?.classList.remove('open');
    }
  });
  $('#loginForm')?.addEventListener('submit', e => {
    e.preventDefault();
    const name = $('#loginName')?.value.trim();
    const mobileNo = $('#loginMobile')?.value.trim();
    if (!name || !/^\d{10,}$/.test(mobileNo || '')) {
      toast('Enter name and valid mobile number');
      return;
    }
    safeSet('bookstoreUser', { name, mobile: mobileNo });
    modal?.classList.remove('open');
    updateUser();
    toast('OTP requested');
  });
}
function initHero() {
  const slides = $$('.slide');
  const dots = $$('.dot');
  if (!slides.length) return;
  let index = slides.findIndex(s => s.classList.contains('active'));
  if (index < 0) index = 0;
  let timer = null;
  const show = next => {
    index = (next + slides.length) % slides.length;
    slides.forEach((slide, i) => slide.classList.toggle('active', i === index));
    dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
  };
  const restart = () => {
    clearInterval(timer);
    timer = setInterval(() => show(index + 1), 4800);
  };
  $('#heroNext')?.addEventListener('click', () => { show(index + 1); restart(); });
  $('#heroPrev')?.addEventListener('click', () => { show(index - 1); restart(); });
  dots.forEach((dot, i) => dot.addEventListener('click', () => { show(i); restart(); }));
  restart();
}
function initHome() {
  const grid = $('#productGrid');
  if (grid) grid.innerHTML = BOOKS.map(productCard).join('');
  renderRecent();
}
function saveRecent(id) {
  let ids = safeGet('bookstoreRecent', []).filter(item => item !== id);
  ids.unshift(id);
  safeSet('bookstoreRecent', ids.slice(0, 6));
}
function renderRecent() {
  const section = $('#recentSection');
  const list = $('#recentList');
  if (!section || !list) return;
  const ids = safeGet('bookstoreRecent', []);
  section.classList.toggle('empty', ids.length === 0);
  list.innerHTML = ids.length ? ids.map(id => productCard(getBook(id))).join('') : '<p class="empty-note">Browse books to see your recently viewed titles here.</p>';
}
function initProduct() {
  const id = new URLSearchParams(location.search).get('id') || BOOKS[0].id;
  const book = getBook(id) || BOOKS[0];
  saveRecent(book.id);
  document.title = `${book.title} | Bookly Store`;
  const meta = $('meta[name="description"]');
  if (meta) meta.content = book.description;
  const og = $('meta[property="og:image"]');
  if (og) og.content = book.image;
  const jsonld = $('script[type="application/ld+json"]');
  if (jsonld) jsonld.textContent = JSON.stringify({ '@context':'https://schema.org', '@type':'Product', name:book.title, image:book.image, description:book.description, brand:{'@type':'Brand',name:'Bookly Store'}, offers:{'@type':'Offer',priceCurrency:'INR',price:book.price,availability:book.available?'https://schema.org/InStock':'https://schema.org/OutOfStock'} });
  const el = $('#productDetail');
  if (!el) return;
  const thumbs = [book.image, 'assets/images/banner-image.webp', 'assets/images/banner-image1.webp'];
  el.innerHTML = `<div class="gallery">
    <div class="thumbs" aria-label="Book cover gallery">${thumbs.map((src, i) => `<button type="button" class="${i===0?'active':''}" data-src="${src}" aria-label="View image ${i+1}"><img src="${src}" alt="${book.title} preview ${i+1}" width="120" height="160" loading="lazy" decoding="async"></button>`).join('')}</div>
    <div class="main-cover"><img id="mainCover" src="${book.image}" alt="${book.title} book cover" width="434" height="620" decoding="async" fetchpriority="high"></div>
  </div>
  <div class="detail-panel">
    <span class="eyebrow">${book.category}</span>
    <h1>${book.title}</h1>
    <p class="muted">by <strong>${book.author}</strong></p>
    <div class="rating">★★★★★ <span class="muted">${book.rating} · 214 reviews</span></div>
    <div class="product-price" style="font-size:1.55rem"><span>${money(book.price)}</span><span class="old">${money(book.oldPrice)}</span></div>
    <p>${book.description}</p>
    <p><strong>Availability:</strong> ${book.available ? 'In stock' : 'Sold out'}</p>
    <h3>Choose format</h3>
    <div class="format-options"><button type="button" class="active" data-format="Paperback">Paperback</button><button type="button" data-format="Hardcover">Hardcover</button><button type="button" data-format="eBook">eBook</button></div>
    <h3>Quantity</h3>
    <div class="qty"><button type="button" id="minusQty" aria-label="Decrease quantity">−</button><span id="qtyValue">1</span><button type="button" id="plusQty" aria-label="Increase quantity">+</button></div>
    <div class="detail-actions"><button type="button" class="btn btn-primary" id="productAdd" ${!book.available?'disabled':''}>Add to Cart</button><button type="button" class="btn btn-secondary" id="productWish">Wishlist</button><button type="button" class="btn btn-primary" id="buyNow" ${!book.available?'disabled':''}>Buy Now</button></div>
  </div>`;
  let selectedFormat = 'Paperback';
  $$('.format-options button').forEach(btn => btn.addEventListener('click', () => {
    $$('.format-options button').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    selectedFormat = btn.dataset.format || 'Paperback';
  }));
  let qty = 1;
  $('#minusQty')?.addEventListener('click', () => { qty = Math.max(1, qty - 1); $('#qtyValue').textContent = qty; });
  $('#plusQty')?.addEventListener('click', () => { qty += 1; $('#qtyValue').textContent = qty; });
  $('#productAdd')?.addEventListener('click', () => addToCart(book.id, qty, selectedFormat));
  $('#productWish')?.addEventListener('click', () => addToWishlist(book.id));
  $('#buyNow')?.addEventListener('click', () => { if (addToCart(book.id, qty, selectedFormat)) location.href = 'cart.html'; });
  $$('.thumbs button').forEach(btn => btn.addEventListener('click', () => {
    $$('.thumbs button').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    $('#mainCover').src = btn.dataset.src;
  }));
  $('#mainCover')?.addEventListener('click', () => $('#mainCover').classList.toggle('zoomed'));
  if ($('#descriptionText')) $('#descriptionText').textContent = book.description;
  if ($('#specTable')) $('#specTable').innerHTML = Object.entries(book.specs).map(([key, value]) => `<tr><td>${key}</td><td>${value}</td></tr>`).join('');
  if ($('#relatedBooks')) {
    const related = [...BOOKS.filter(b => b.category === book.category && b.id !== book.id), ...BOOKS.filter(b => b.category !== book.category)].slice(0, 8);
    $('#relatedBooks').innerHTML = related.map(productCard).join('');
  }
  if ($('#stickyTitle')) $('#stickyTitle').textContent = book.title;
  if ($('#stickyPrice')) $('#stickyPrice').textContent = money(book.price);
  $('#stickyBuy')?.addEventListener('click', () => { if (addToCart(book.id, 1, selectedFormat)) location.href = 'cart.html'; });
  if ('IntersectionObserver' in window && $('#stickyBar')) {
    const obs = new IntersectionObserver(([entry]) => $('#stickyBar')?.classList.toggle('visible', !entry.isIntersecting), { threshold: .1 });
    obs.observe(el);
  }
  initReviews();
}
function initReviews() {
  const list = $('#reviewList');
  const reviews = [
    ['★★★★★','Priya S.','March 2025','Clear details and a smooth buying flow. The format selector made checkout easier.'],
    ['★★★★☆','Arjun M.','February 2025','Good book selection and the related books section helped me find another title.'],
    ['★★★★★','Meera K.','January 2025','The page feels clean on mobile and the wishlist works exactly as expected.']
  ];
  if (list) list.innerHTML = reviews.map(r => `<div class="review-card"><div class="rating">${r[0]}</div><strong>${r[1]}</strong><p class="muted">${r[2]}</p><p>${r[3]}</p></div>`).join('');
  $$('.star-input button').forEach((btn, i) => {
    btn.setAttribute('aria-label', `Rate ${i + 1} stars`);
    btn.addEventListener('click', () => {
      $('#reviewRating').value = i + 1;
      $('#reviewError').textContent = '';
      $$('.star-input button').forEach((b, j) => b.classList.toggle('active', j <= i));
    });
  });
  $('#reviewForm')?.addEventListener('submit', e => {
    e.preventDefault();
    const rating = Number($('#reviewRating').value);
    if (!rating) { $('#reviewError').textContent = 'Please select a star rating before submitting.'; return; }
    const name = $('#reviewName').value.trim();
    const text = $('#reviewText').value.trim();
    list?.insertAdjacentHTML('afterbegin', `<div class="review-card"><div class="rating">${'★'.repeat(rating)}${'☆'.repeat(5-rating)}</div><strong>${name}</strong><p class="muted">Just now</p><p>${text}</p></div>`);
    e.target.reset();
    $('#reviewRating').value = '';
    $$('.star-input button').forEach(b => b.classList.remove('active'));
    toast('Review submitted. Thank you!');
  });
}
function renderWishlist() {
  const wrap = $('#wishlistItems');
  if (!wrap) return;
  const ids = wishItems();
  if (!ids.length) {
    wrap.innerHTML = '<div class="empty-state"><p style="font-size:1.2rem">No books saved yet.</p><a href="index.html#books" class="btn btn-primary">Discover Books</a></div>';
    return;
  }
  wrap.innerHTML = ids.map(id => {
    const b = getBook(id);
    if (!b) return '';
    return `<article class="wishlist-item"><img src="${b.image}" alt="${b.title}" width="120" height="150" loading="lazy" decoding="async"><div><h3>${b.title}</h3><p class="muted">${b.author} · ${b.category}</p><div class="product-price"><span>${money(b.price)}</span><span class="old">${money(b.oldPrice)}</span></div><p><button type="button" class="btn btn-primary" onclick="moveToCart('${b.id}')">Move to Cart</button> <button type="button" class="btn btn-secondary" onclick="removeFromWishlist('${b.id}')">Remove</button></p></div></article>`;
  }).join('');
}
function renderCart() {
  const wrap = $('#cartItems');
  const summary = $('#cartSummary');
  if (!wrap) return;
  const cart = cartItems();
  if (!cart.length) {
    wrap.innerHTML = '<div class="empty-state"><p>Your cart is empty.</p><a href="index.html#books" class="btn btn-primary">Browse Books</a></div>';
    if (summary) summary.style.display = 'none';
    return;
  }
  if (summary) summary.style.display = 'block';
  let subtotal = 0;
  wrap.innerHTML = cart.map(item => {
    const b = getBook(item.id);
    if (!b) return '';
    const qty = Number(item.qty || 1);
    subtotal += b.price * qty;
    const format = item.format || 'Paperback';
    return `<article class="cart-item"><img src="${b.image}" alt="${b.title}" width="120" height="150" loading="lazy" decoding="async"><div><h3>${b.title}</h3><p class="muted">${b.author} · ${format}</p><div class="product-price"><span>${money(b.price)}</span><span class="old">${money(b.oldPrice)}</span></div><div class="qty" style="margin:10px 0"><button type="button" aria-label="Decrease" onclick="changeQty('${b.id}','${format}',-1)">−</button><span>${qty}</span><button type="button" aria-label="Increase" onclick="changeQty('${b.id}','${format}',1)">+</button></div><button type="button" class="btn btn-secondary" onclick="moveToWishlist('${b.id}')">Save for later</button> <button type="button" class="btn btn-secondary" onclick="removeFromCart('${b.id}','${format}')">Remove</button></div></article>`;
  }).join('');
  const discount = Math.round(subtotal * .10);
  const delivery = subtotal > 499 ? 0 : 49;
  const total = subtotal - discount + delivery;
  if (summary) summary.innerHTML = `<h2>Price Details</h2><div class="summary-row"><span>Subtotal</span><strong>${money(subtotal)}</strong></div><div class="summary-row"><span>Discount</span><strong>- ${money(discount)}</strong></div><div class="summary-row"><span>Delivery</span><strong>${delivery ? money(delivery) : 'Free'}</strong></div><div class="summary-row total"><span>Order Total</span><span>${money(total)}</span></div><p class="muted">Free delivery on orders above ₹499.</p><button type="button" class="btn btn-primary" style="width:100%;justify-content:center" id="placeOrder">Place Order</button>`;
  $('#placeOrder')?.addEventListener('click', () => toast('Add delivery address to continue'));
}
function changeQty(id, format, delta) {
  const cart = cartItems();
  const item = cart.find(i => i.id === id && (i.format || 'Paperback') === format);
  if (!item) return;
  item.qty = Math.max(1, Number(item.qty || 1) + Number(delta || 0));
  saveCart(cart);
  updateBadges();
  renderCart();
}
function initCart() {
  renderCart();
  const box = $('#addressBox');
  const form = $('#addressForm');
  const toggle = $('#addressToggle');
  const note = $('#savedAddressNote');
  const showSaved = address => {
    if (!note) return;
    note.innerHTML = `Delivering to: ${address.firstName} ${address.lastName}, ${address.address}, ${address.city}, ${address.state} ${address.pin}, ${address.country} — ${address.phone} <button type="button" id="editAddress">Edit</button>`;
    note.classList.add('show');
    $('#editAddress')?.addEventListener('click', () => {
      form?.classList.add('open');
      box?.classList.add('open');
      toggle?.setAttribute('aria-expanded', 'true');
    });
  };
  const saved = safeGet('bookstoreAddress', null);
  if (saved) showSaved(saved);
  toggle?.addEventListener('click', () => {
    const open = !form?.classList.contains('open');
    form?.classList.toggle('open', open);
    box?.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  form?.addEventListener('submit', e => {
    e.preventDefault();
    const data = {
      country: $('#country').value,
      firstName: $('#firstName').value.trim(),
      lastName: $('#lastName').value.trim(),
      address: $('#address').value.trim(),
      city: $('#city').value.trim(),
      state: $('#state').value.trim(),
      pin: $('#pin').value.trim(),
      phone: $('#phone').value.trim()
    };
    safeSet('bookstoreAddress', data);
    showSaved(data);
    form.classList.remove('open');
    box?.classList.remove('open');
    toggle?.setAttribute('aria-expanded', 'false');
    toast('Address saved');
  });
}
window.removeFromCart = removeFromCart;
window.removeFromWishlist = removeFromWishlist;
window.moveToWishlist = moveToWishlist;
window.moveToCart = moveToCart;
window.changeQty = changeQty;

document.addEventListener('DOMContentLoaded', () => {
  bindGlobalActions();
  initNav();
  initHero();
  const page = document.body.dataset.page;
  if (page === 'home') initHome();
  if (page === 'product') initProduct();
  if (page === 'wishlist') renderWishlist();
  if (page === 'cart') initCart();
});
