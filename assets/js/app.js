// App State Management
const STATE = {
  products: PRODUCTS_DATA,
  filteredProducts: [...PRODUCTS_DATA],
  activeCategory: 'all',
  activeSort: 'popular',
  searchQuery: '',
  cart: JSON.parse(localStorage.getItem('al_suunah_cart')) || [],
  wishlist: JSON.parse(localStorage.getItem('al_suunah_wishlist')) || [],
  selectedDeliveryArea: 'inside', // 'inside' = 70 BDT, 'outside' = 130 BDT
  freeShippingThreshold: 3000
};

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
  initLucideIcons();
  setupEventListeners();
  renderProducts();
  updateCartUI();
  updateWishlistUI();
});

function initLucideIcons() {
  if (window.lucide) {
    lucide.createIcons();
  }
}

// Event Listeners Setup
function setupEventListeners() {
  // Category tabs
  document.querySelectorAll('[data-category-tab]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('[data-category-tab]').forEach(b => {
        b.classList.remove('bg-stone-900', 'text-white', 'shadow-md');
        b.classList.add('bg-white', 'text-stone-700', 'border', 'border-stone-200');
      });
      btn.classList.add('bg-stone-900', 'text-white', 'shadow-md');
      btn.classList.remove('bg-white', 'text-stone-700', 'border', 'border-stone-200');
      
      const cat = btn.getAttribute('data-category-tab');
      STATE.activeCategory = cat;
      filterAndRenderProducts();
    });
  });

  // Sort dropdown
  const sortSelect = document.getElementById('sort-select');
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      STATE.activeSort = e.target.value;
      filterAndRenderProducts();
    });
  }

  // Live Search
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      STATE.searchQuery = e.target.value.toLowerCase().trim();
      filterAndRenderProducts();
    });
  }

  // Cart Drawer open/close
  const cartTrigger = document.getElementById('cart-drawer-trigger');
  const cartClose = document.getElementById('cart-close-btn');
  const cartBackdrop = document.getElementById('cart-backdrop');

  if (cartTrigger) cartTrigger.addEventListener('click', openCartDrawer);
  if (cartClose) cartClose.addEventListener('click', closeCartDrawer);
  if (cartBackdrop) cartBackdrop.addEventListener('click', closeCartDrawer);

  // Mobile Menu Drawer open/close
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenuClose = document.getElementById('mobile-menu-close');
  const mobileMenuBackdrop = document.getElementById('mobile-menu-backdrop');

  if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', openMobileMenu);
  if (mobileMenuClose) mobileMenuClose.addEventListener('click', closeMobileMenu);
  if (mobileMenuBackdrop) mobileMenuBackdrop.addEventListener('click', closeMobileMenu);

  // Close Modals on backdrop click
  document.querySelectorAll('.modal-backdrop').forEach(backdrop => {
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) {
        closeAllModals();
      }
    });
  });
}

// Mobile Menu Controls
function openMobileMenu() {
  const drawer = document.getElementById('mobile-menu-drawer');
  const backdrop = document.getElementById('mobile-menu-backdrop');
  if (drawer && backdrop) {
    backdrop.classList.remove('opacity-0', 'pointer-events-none');
    backdrop.classList.add('opacity-100', 'pointer-events-auto');
    drawer.classList.remove('-translate-x-full');
    drawer.classList.add('translate-x-0');
  }
}

function closeMobileMenu() {
  const drawer = document.getElementById('mobile-menu-drawer');
  const backdrop = document.getElementById('mobile-menu-backdrop');
  if (drawer && backdrop) {
    backdrop.classList.add('opacity-0', 'pointer-events-none');
    backdrop.classList.remove('opacity-100', 'pointer-events-auto');
    drawer.classList.add('-translate-x-full');
    drawer.classList.remove('translate-x-0');
  }
}

// Filter and Render Products
function filterAndRenderProducts() {
  let list = [...STATE.products];

  // Category filter
  if (STATE.activeCategory !== 'all') {
    list = list.filter(item => item.category === STATE.activeCategory);
  }

  // Search filter
  if (STATE.searchQuery) {
    list = list.filter(item => 
      item.nameBangla.toLowerCase().includes(STATE.searchQuery) ||
      item.nameEnglish.toLowerCase().includes(STATE.searchQuery) ||
      item.description.toLowerCase().includes(STATE.searchQuery) ||
      item.fabric.toLowerCase().includes(STATE.searchQuery)
    );
  }

  // Sort
  if (STATE.activeSort === 'low-high') {
    list.sort((a, b) => a.price - b.price);
  } else if (STATE.activeSort === 'high-low') {
    list.sort((a, b) => b.price - a.price);
  } else if (STATE.activeSort === 'rating') {
    list.sort((a, b) => b.rating - a.rating);
  } else if (STATE.activeSort === 'popular') {
    list.sort((a, b) => b.reviewsCount - a.reviewsCount);
  }

  STATE.filteredProducts = list;
  renderProducts();
}

// Render Product Cards
function renderProducts() {
  const container = document.getElementById('products-grid');
  if (!container) return;

  if (STATE.filteredProducts.length === 0) {
    container.innerHTML = `
      <div class="col-span-full py-16 text-center">
        <i data-lucide="package-search" class="w-16 h-16 mx-auto text-stone-300 mb-4"></i>
        <h3 class="text-xl font-bold text-stone-700 font-bangla">কোনো পণ্য পাওয়া যায়নি</h3>
        <p class="text-stone-500 font-bangla text-sm mt-1">অন্য কোনো কিওয়ার্ড বা ক্যাটাগরি দিয়ে চেষ্টা করুন।</p>
      </div>
    `;
    initLucideIcons();
    return;
  }

  container.innerHTML = STATE.filteredProducts.map(product => {
    const isWishlisted = STATE.wishlist.includes(product.id);
    const hasFragrance = product.category === 'attar';

    return `
      <div class="product-card group bg-white rounded-2xl border border-stone-100 overflow-hidden shadow-sm flex flex-col justify-between">
        <div>
          <!-- Image Section -->
          <div class="product-image-container relative aspect-[4/5] bg-stone-100 cursor-pointer" onclick="openProductModal('${product.id}')">
            <img 
              src="${product.image}" 
              alt="${product.nameBangla}" 
              class="w-full h-full object-cover object-top"
              loading="lazy"
            />
            
            <!-- Badge -->
            <div class="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
              <span class="bg-stone-900/90 text-[#c5a880] text-xs font-semibold px-2.5 py-1 rounded-full backdrop-blur-md font-bangla shadow-sm">
                ${product.badge}
              </span>
              ${product.discountPercentage ? `
                <span class="bg-amber-600 text-white text-[11px] font-bold px-2 py-0.5 rounded-full font-bangla shadow-sm">
                  ${product.discountPercentage}% ছাড়
                </span>
              ` : ''}
            </div>

            <!-- Wishlist Button -->
            <button 
              onclick="event.stopPropagation(); toggleWishlist('${product.id}')"
              class="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-stone-700 hover:text-red-500 hover:bg-white shadow-md transition-all z-10"
              title="উইশলিস্টে যুক্ত করুন"
            >
              <i data-lucide="heart" class="w-4 h-4 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}"></i>
            </button>

            <!-- Quick View Hover Overlay -->
            <div class="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <button 
                onclick="event.stopPropagation(); openProductModal('${product.id}')"
                class="w-full bg-white/95 backdrop-blur text-stone-900 text-xs font-semibold py-2.5 px-4 rounded-xl shadow-lg hover:bg-white font-bangla flex items-center justify-center gap-1.5 transition-transform active:scale-95"
              >
                <i data-lucide="eye" class="w-3.5 h-3.5"></i>
                বিস্তারিত দেখুন
              </button>
            </div>
          </div>

          <!-- Product Details -->
          <div class="p-4 sm:p-5">
            <!-- Rating & Category -->
            <div class="flex items-center justify-between text-xs text-stone-500 mb-1.5 font-bangla">
              <span class="uppercase tracking-wider text-[11px] font-semibold text-[#a28359]">
                ${product.category === 'panjabi' ? 'পাঞ্জাবি' : product.category === 'jubbah' ? 'জুব্বা' : product.category === 'attar' ? 'খাঁটি আতর' : 'টি-শার্ট'}
              </span>
              <div class="flex items-center gap-1 text-amber-500">
                <i data-lucide="star" class="w-3.5 h-3.5 fill-amber-400 text-amber-400"></i>
                <span class="font-semibold text-stone-700">${product.rating}</span>
                <span class="text-stone-400">(${product.reviewsCount})</span>
              </div>
            </div>

            <!-- Title -->
            <h3 
              onclick="openProductModal('${product.id}')"
              class="font-bangla font-semibold text-stone-900 text-base leading-snug hover:text-[#a28359] cursor-pointer transition-colors line-clamp-1"
              title="${product.nameBangla}"
            >
              ${product.nameBangla}
            </h3>
            <p class="text-xs text-stone-400 font-serif-luxury italic mb-2 line-clamp-1">${product.nameEnglish}</p>

            ${hasFragrance ? `
              <div class="mb-3 py-1.5 px-2.5 bg-amber-50/80 border border-amber-200/50 rounded-lg text-xs font-bangla text-amber-900 flex items-center gap-2">
                <i data-lucide="sparkles" class="w-3.5 h-3.5 text-amber-600 flex-shrink-0"></i>
                <span class="truncate">নোট: ${product.fragranceNotes.heart}</span>
              </div>
            ` : `
              <p class="text-xs text-stone-500 font-bangla mb-3 line-clamp-1">
                <i data-lucide="check" class="w-3 h-3 inline text-emerald-600 mr-1"></i>${product.fabric}
              </p>
            `}

            <!-- Price -->
            <div class="flex items-baseline gap-2 mb-4">
              <span class="text-lg font-bold text-stone-900 font-bangla">৳${product.price.toLocaleString('bn-BD')}</span>
              ${product.originalPrice ? `
                <span class="text-xs text-stone-400 line-through font-bangla">৳${product.originalPrice.toLocaleString('bn-BD')}</span>
              ` : ''}
            </div>
          </div>
        </div>

        <!-- Add To Cart & Quick Action -->
        <div class="p-4 sm:p-5 pt-0">
          <button 
            onclick="quickAddToCart('${product.id}')"
            class="w-full bg-stone-900 hover:bg-stone-800 text-white font-bangla text-sm font-semibold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95 shadow-sm hover:shadow"
          >
            <i data-lucide="shopping-bag" class="w-4 h-4 text-[#c5a880]"></i>
            কার্টে যোগ করুন
          </button>
        </div>
      </div>
    `;
  }).join('');

  initLucideIcons();
}

// Quick Add to Cart (Default first size and color)
function quickAddToCart(productId) {
  const product = STATE.products.find(p => p.id === productId);
  if (!product) return;

  const defaultSize = product.sizes ? product.sizes[0] : 'Standard';
  const defaultColor = product.colors && product.colors[0] ? product.colors[0].name : '';

  addToCart(product.id, defaultSize, defaultColor, 1);
  showToast(`"${product.nameBangla}" কার্টে যুক্ত হয়েছে!`, 'success');
  openCartDrawer();
}

// Add To Cart Core Function
function addToCart(productId, size, color, quantity = 1) {
  const product = STATE.products.find(p => p.id === productId);
  if (!product) return;

  const existingIndex = STATE.cart.findIndex(
    item => item.id === productId && item.size === size && item.color === color
  );

  if (existingIndex > -1) {
    STATE.cart[existingIndex].quantity += quantity;
  } else {
    STATE.cart.push({
      id: product.id,
      nameBangla: product.nameBangla,
      nameEnglish: product.nameEnglish,
      price: product.price,
      image: product.image,
      size: size,
      color: color,
      quantity: quantity
    });
  }

  saveCart();
  updateCartUI();
}

// Update Cart Quantity
function updateCartQty(index, delta) {
  if (!STATE.cart[index]) return;
  STATE.cart[index].quantity += delta;
  if (STATE.cart[index].quantity <= 0) {
    STATE.cart.splice(index, 1);
  }
  saveCart();
  updateCartUI();
}

// Remove from Cart
function removeCartItem(index) {
  STATE.cart.splice(index, 1);
  saveCart();
  updateCartUI();
  showToast('আইটেমটি কার্ট থেকে সরানো হয়েছে', 'info');
}

// Save Cart to LocalStorage
function saveCart() {
  localStorage.setItem('al_suunah_cart', JSON.stringify(STATE.cart));
}

// Update Cart UI, Badges, Free Shipping Bar
function updateCartUI() {
  const badge = document.getElementById('cart-badge');
  const count = STATE.cart.reduce((sum, item) => sum + item.quantity, 0);
  
  if (badge) {
    badge.innerText = count;
    badge.classList.toggle('hidden', count === 0);
  }

  const container = document.getElementById('cart-items-container');
  const emptyState = document.getElementById('cart-empty-state');
  const footer = document.getElementById('cart-footer');
  const subtotalEl = document.getElementById('cart-subtotal');
  const shippingBar = document.getElementById('shipping-progress-bar');
  const shippingText = document.getElementById('shipping-progress-text');

  const subtotal = STATE.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (subtotalEl) {
    subtotalEl.innerText = `৳${subtotal.toLocaleString('bn-BD')}`;
  }

  // Free shipping calculation
  if (shippingBar && shippingText) {
    const diff = STATE.freeShippingThreshold - subtotal;
    const percentage = Math.min(100, Math.round((subtotal / STATE.freeShippingThreshold) * 100));
    shippingBar.style.width = `${percentage}%`;

    if (diff <= 0 && subtotal > 0) {
      shippingText.innerHTML = `🎉 অভিনন্দন! আপনি <strong>ফ্রি ডেলিভারি</strong> উপভোগ করছেন!`;
    } else {
      shippingText.innerHTML = `আর মাত্র <strong>৳${Math.max(0, diff).toLocaleString('bn-BD')}</strong> টাকার কেনাকাটা করলে <strong>ফ্রি ডেলিভারি!</strong>`;
    }
  }

  if (STATE.cart.length === 0) {
    if (emptyState) emptyState.classList.remove('hidden');
    if (container) container.innerHTML = '';
    if (footer) footer.classList.add('hidden');
    return;
  }

  if (emptyState) emptyState.classList.add('hidden');
  if (footer) footer.classList.remove('hidden');

  if (container) {
    container.innerHTML = STATE.cart.map((item, index) => `
      <div class="flex gap-3 py-3 border-b border-stone-100 last:border-b-0">
        <img src="${item.image}" alt="${item.nameBangla}" class="w-16 h-20 object-cover rounded-lg bg-stone-100 flex-shrink-0" />
        <div class="flex-1 flex flex-col justify-between">
          <div>
            <div class="flex items-start justify-between gap-2">
              <h4 class="font-bangla font-semibold text-stone-900 text-sm line-clamp-1">${item.nameBangla}</h4>
              <button onclick="removeCartItem(${index})" class="text-stone-400 hover:text-red-500 transition-colors p-1">
                <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
              </button>
            </div>
            <p class="text-xs text-stone-500 font-bangla mt-0.5">সাইজ: ${item.size} ${item.color ? `| ${item.color}` : ''}</p>
          </div>

          <div class="flex items-center justify-between mt-2">
            <span class="text-sm font-bold text-stone-900 font-bangla">৳${(item.price * item.quantity).toLocaleString('bn-BD')}</span>
            <div class="flex items-center border border-stone-200 rounded-lg overflow-hidden bg-white">
              <button onclick="updateCartQty(${index}, -1)" class="w-7 h-7 flex items-center justify-center text-stone-600 hover:bg-stone-100 font-bold text-sm">-</button>
              <span class="w-7 text-center text-xs font-semibold text-stone-800 font-bangla">${item.quantity}</span>
              <button onclick="updateCartQty(${index}, 1)" class="w-7 h-7 flex items-center justify-center text-stone-600 hover:bg-stone-100 font-bold text-sm">+</button>
            </div>
          </div>
        </div>
      </div>
    `).join('');
    initLucideIcons();
  }
}

// Drawer Controls
function openCartDrawer() {
  const drawer = document.getElementById('cart-drawer');
  const backdrop = document.getElementById('cart-backdrop');
  if (drawer && backdrop) {
    backdrop.classList.remove('opacity-0', 'pointer-events-none');
    backdrop.classList.add('opacity-100', 'pointer-events-auto');
    drawer.classList.remove('translate-x-full');
    drawer.classList.add('translate-x-0');
  }
}

function closeCartDrawer() {
  const drawer = document.getElementById('cart-drawer');
  const backdrop = document.getElementById('cart-backdrop');
  if (drawer && backdrop) {
    backdrop.classList.add('opacity-0', 'pointer-events-none');
    backdrop.classList.remove('opacity-100', 'pointer-events-auto');
    drawer.classList.add('translate-x-full');
    drawer.classList.remove('translate-x-0');
  }
}

// Wishlist Functionality
function toggleWishlist(productId) {
  const index = STATE.wishlist.indexOf(productId);
  if (index > -1) {
    STATE.wishlist.splice(index, 1);
    showToast('উইশলিস্ট থেকে সরানো হয়েছে', 'info');
  } else {
    STATE.wishlist.push(productId);
    showToast('উইশলিস্টে যুক্ত করা হয়েছে ❤️', 'success');
  }
  localStorage.setItem('al_suunah_wishlist', JSON.stringify(STATE.wishlist));
  updateWishlistUI();
  renderProducts();
}

function updateWishlistUI() {
  const badge = document.getElementById('wishlist-badge');
  if (badge) {
    badge.innerText = STATE.wishlist.length;
    badge.classList.toggle('hidden', STATE.wishlist.length === 0);
  }
}

// Product Details Modal
let currentModalProductId = null;
let selectedModalSize = null;
let selectedModalColor = null;

function openProductModal(productId) {
  const product = STATE.products.find(p => p.id === productId);
  if (!product) return;

  currentModalProductId = productId;
  selectedModalSize = product.sizes ? product.sizes[0] : 'Standard';
  selectedModalColor = product.colors && product.colors[0] ? product.colors[0].name : '';

  const modal = document.getElementById('product-detail-modal');
  const modalBody = document.getElementById('product-detail-modal-body');

  const hasFragrance = product.category === 'attar';

  modalBody.innerHTML = `
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
      <!-- Left: Image Gallery -->
      <div class="relative rounded-2xl overflow-hidden bg-stone-100 aspect-[4/5] max-h-[500px]">
        <img src="${product.image}" alt="${product.nameBangla}" class="w-full h-full object-cover" />
        <span class="absolute top-4 left-4 bg-stone-900/90 text-[#c5a880] text-xs font-semibold px-3 py-1 rounded-full font-bangla">
          ${product.badge}
        </span>
      </div>

      <!-- Right: Product Info -->
      <div class="flex flex-col justify-between">
        <div>
          <div class="flex items-center gap-2 mb-2">
            <span class="bg-amber-100 text-amber-900 text-xs font-semibold px-2.5 py-0.5 rounded-full font-bangla">
              ${product.category === 'panjabi' ? 'লাক্সারি পাঞ্জাবি' : product.category === 'jubbah' ? 'প্রিমিয়াম জুব্বা' : product.category === 'attar' ? 'বিশুদ্ধ আতর' : 'টি-শার্ট'}
            </span>
            <div class="flex items-center gap-1 text-amber-500 text-xs">
              <i data-lucide="star" class="w-3.5 h-3.5 fill-amber-400"></i>
              <span class="font-bold text-stone-800">${product.rating}</span>
              <span class="text-stone-400 font-bangla">(${product.reviewsCount} টি রিভিউ)</span>
            </div>
          </div>

          <h2 class="text-2xl font-bold font-bangla text-stone-900 leading-snug mb-1">
            ${product.nameBangla}
          </h2>
          <p class="text-sm text-stone-400 font-serif-luxury italic mb-3">${product.nameEnglish}</p>

          <!-- Price -->
          <div class="flex items-baseline gap-3 mb-4 pb-4 border-b border-stone-200">
            <span class="text-2xl font-bold text-stone-900 font-bangla">৳${product.price.toLocaleString('bn-BD')}</span>
            ${product.originalPrice ? `
              <span class="text-base text-stone-400 line-through font-bangla">৳${product.originalPrice.toLocaleString('bn-BD')}</span>
              <span class="text-xs bg-red-100 text-red-700 font-bold px-2 py-0.5 rounded font-bangla">
                ${product.discountPercentage}% ছাড়
              </span>
            ` : ''}
          </div>

          <!-- Description -->
          <p class="text-stone-600 text-sm font-bangla leading-relaxed mb-4">
            ${product.description}
          </p>

          ${hasFragrance ? `
            <!-- Atar Fragrance Notes Breakdown -->
            <div class="mb-5 p-4 rounded-xl bg-gradient-to-br from-amber-50 to-stone-50 border border-amber-200/60">
              <h4 class="text-xs font-bold text-amber-900 uppercase tracking-wider mb-2.5 flex items-center gap-1.5 font-bangla">
                <i data-lucide="sparkles" class="w-4 h-4 text-amber-600"></i>
                সুগন্ধির নোটস ও ক্যারেক্টার
              </h4>
              <div class="space-y-2 text-xs font-bangla">
                <div class="flex items-start gap-2">
                  <span class="font-semibold text-stone-700 min-w-[70px]">টপ নোট:</span>
                  <span class="text-stone-600">${product.fragranceNotes.top}</span>
                </div>
                <div class="flex items-start gap-2">
                  <span class="font-semibold text-stone-700 min-w-[70px]">হার্ট নোট:</span>
                  <span class="text-stone-600">${product.fragranceNotes.heart}</span>
                </div>
                <div class="flex items-start gap-2">
                  <span class="font-semibold text-stone-700 min-w-[70px]">বেস নোট:</span>
                  <span class="text-stone-600">${product.fragranceNotes.base}</span>
                </div>
                <div class="pt-2 mt-2 border-t border-amber-200/50 flex flex-wrap gap-4 text-amber-950 font-medium">
                  <span>⏱️ স্থায়িত্ব: <strong>${product.fragranceNotes.longevity}</strong></span>
                  <span>✨ প্রজেকশন: <strong>${product.fragranceNotes.projection}</strong></span>
                </div>
              </div>
            </div>
          ` : `
            <!-- Fabric Specification -->
            <div class="mb-4 text-xs font-bangla text-stone-700 flex items-center gap-2 bg-stone-100 py-2 px-3 rounded-lg">
              <i data-lucide="feather" class="w-4 h-4 text-[#a28359]"></i>
              <span><strong>ফেব্রিক:</strong> ${product.fabric}</span>
            </div>
          `}

          <!-- Size Selector -->
          ${product.sizes ? `
            <div class="mb-5">
              <div class="flex items-center justify-between mb-2">
                <span class="text-xs font-bold text-stone-800 font-bangla uppercase">
                  ${hasFragrance ? 'পরিমাণ (ভলিউম) নির্বাচন করুন:' : 'সাইজ নির্বাচন করুন:'}
                </span>
                ${!hasFragrance ? `
                  <button onclick="openSizeRecommender()" class="text-xs text-[#a28359] hover:underline font-bangla font-semibold flex items-center gap-1">
                    <i data-lucide="ruler" class="w-3.5 h-3.5"></i>
                    স্মার্ট সাইজ গাইড
                  </button>
                ` : ''}
              </div>
              <div class="flex flex-wrap gap-2" id="modal-size-container">
                ${product.sizes.map((s, idx) => `
                  <button 
                    onclick="selectModalSize('${s}', this)" 
                    class="size-pill text-xs font-bangla py-2 px-3.5 rounded-lg border transition-all ${idx === 0 ? 'border-stone-900 bg-stone-900 text-white font-semibold' : 'border-stone-200 bg-white text-stone-700 hover:border-stone-400'}"
                  >
                    ${s}
                  </button>
                `).join('')}
              </div>
            </div>
          ` : ''}

          <!-- Color Selector -->
          ${product.colors && product.colors.length > 0 ? `
            <div class="mb-5">
              <span class="text-xs font-bold text-stone-800 font-bangla uppercase block mb-2">কালার:</span>
              <div class="flex items-center gap-2">
                ${product.colors.map((c, idx) => `
                  <button 
                    onclick="selectModalColor('${c.name}', this)"
                    title="${c.name}"
                    style="background-color: ${c.code}"
                    class="color-pill w-7 h-7 rounded-full border-2 transition-transform ${idx === 0 ? 'ring-2 ring-stone-900 scale-110' : 'border-stone-300 hover:scale-105'}"
                  ></button>
                `).join('')}
              </div>
            </div>
          ` : ''}
        </div>

        <!-- Action Buttons -->
        <div class="pt-4 border-t border-stone-200 flex flex-col sm:flex-row gap-3">
          <button 
            onclick="addModalProductToCart()"
            class="flex-1 bg-stone-900 hover:bg-stone-800 text-white font-bangla font-semibold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95 shadow"
          >
            <i data-lucide="shopping-bag" class="w-4 h-4 text-[#c5a880]"></i>
            কার্টে যোগ করুন
          </button>
          <button 
            onclick="buyNowDirect('${product.id}')"
            class="flex-1 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-bangla font-semibold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95 shadow"
          >
            <i data-lucide="zap" class="w-4 h-4"></i>
            ১-ক্লিকে সরাসরি কিনুন
          </button>
        </div>
      </div>
    </div>
  `;

  modal.classList.remove('hidden');
  initLucideIcons();
}

function selectModalSize(size, btnEl) {
  selectedModalSize = size;
  const container = document.getElementById('modal-size-container');
  if (!container) return;
  container.querySelectorAll('.size-pill').forEach(b => {
    b.classList.remove('border-stone-900', 'bg-stone-900', 'text-white', 'font-semibold');
    b.classList.add('border-stone-200', 'bg-white', 'text-stone-700');
  });
  btnEl.classList.add('border-stone-900', 'bg-stone-900', 'text-white', 'font-semibold');
  btnEl.classList.remove('border-stone-200', 'bg-white', 'text-stone-700');
}

function selectModalColor(colorName, btnEl) {
  selectedModalColor = colorName;
  document.querySelectorAll('.color-pill').forEach(b => {
    b.classList.remove('ring-2', 'ring-stone-900', 'scale-110');
  });
  btnEl.classList.add('ring-2', 'ring-stone-900', 'scale-110');
}

function addModalProductToCart() {
  if (!currentModalProductId) return;
  addToCart(currentModalProductId, selectedModalSize, selectedModalColor, 1);
  closeAllModals();
  openCartDrawer();
  showToast('পণ্যটি সফলভাবে কার্টে যুক্ত হয়েছে!', 'success');
}

function buyNowDirect(productId) {
  addModalProductToCart();
  setTimeout(() => {
    openQuickCheckoutModal();
  }, 200);
}

function closeAllModals() {
  document.querySelectorAll('.modal-root').forEach(m => m.classList.add('hidden'));
}

// Interactive Size Recommender Calculator
function openSizeRecommender() {
  const modal = document.getElementById('size-guide-modal');
  if (modal) modal.classList.remove('hidden');
  initLucideIcons();
}

function calculateRecommendedSize() {
  const heightFeet = parseInt(document.getElementById('size-height-feet').value) || 5;
  const heightInches = parseInt(document.getElementById('size-height-inches').value) || 8;
  const weightKg = parseInt(document.getElementById('size-weight-kg').value) || 68;

  const totalInches = (heightFeet * 12) + heightInches;
  let recommendedSize = 'L (40)';
  let advice = '';

  if (weightKg < 60 || totalInches < 65) {
    recommendedSize = 'M (38)';
    advice = 'আপনার বডি স্ট্রাকচার অনুযায়ী রেগুলার ফিট এম (৩৮) সবচেয়ে সুন্দরভাবে মানাবে।';
  } else if (weightKg <= 74 && totalInches <= 69) {
    recommendedSize = 'L (40)';
    advice = 'আপনার উচ্চতা ও ওজনের জন্য পারফেক্ট সাইজ এল (৪০)। এটি স্মার্ট ও এলিগ্যান্ট ফিটিং দেবে।';
  } else if (weightKg <= 86) {
    recommendedSize = 'XL (42)';
    advice = 'আপনার চেস্ট ও শোল্ডার আরামদায়ক রাখতে এক্সএল (৪২) বেছে নিন।';
  } else {
    recommendedSize = 'XXL (44)';
    advice = 'আপনার জন্য ডাবল এক্সএল (৪৪) সবচেয়ে উপযুক্ত এবং ব্রিদেবল হবে।';
  }

  const resultBox = document.getElementById('size-recommendation-result');
  resultBox.innerHTML = `
    <div class="p-4 bg-emerald-50 border border-emerald-200 rounded-xl mt-4">
      <div class="flex items-center gap-2 text-emerald-800 font-bangla font-bold text-base mb-1">
        <i data-lucide="check-circle" class="w-5 h-5 text-emerald-600"></i>
        আপনার প্রস্তাবিত সাইজ: <span class="bg-emerald-600 text-white px-2.5 py-0.5 rounded text-sm">${recommendedSize}</span>
      </div>
      <p class="text-xs text-emerald-700 font-bangla">${advice}</p>
    </div>
  `;
  initLucideIcons();
}

// 1-Click Fast Checkout Modal
function openQuickCheckoutModal() {
  closeCartDrawer();
  if (STATE.cart.length === 0) {
    showToast('আপনার কার্ট খালি! অনুগ্রহ করে আগে পণ্য নির্বাচন করুন।', 'warning');
    return;
  }

  const modal = document.getElementById('checkout-modal');
  renderCheckoutSummary();
  if (modal) modal.classList.remove('hidden');
  initLucideIcons();
}

function updateDeliveryArea(area) {
  STATE.selectedDeliveryArea = area;
  renderCheckoutSummary();
}

function renderCheckoutSummary() {
  const subtotal = STATE.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const isFreeDelivery = subtotal >= STATE.freeShippingThreshold;
  
  let deliveryFee = 0;
  if (!isFreeDelivery) {
    deliveryFee = STATE.selectedDeliveryArea === 'inside' ? 70 : 130;
  }

  const grandTotal = subtotal + deliveryFee;

  const summaryEl = document.getElementById('checkout-order-summary');
  if (summaryEl) {
    summaryEl.innerHTML = `
      <div class="space-y-2 text-xs font-bangla text-stone-600 mb-3 max-h-36 overflow-y-auto pr-1">
        ${STATE.cart.map(item => `
          <div class="flex justify-between py-1 border-b border-stone-100">
            <span class="truncate max-w-[200px]">${item.nameBangla} (${item.size}) × ${item.quantity}</span>
            <span class="font-bold text-stone-800">৳${(item.price * item.quantity).toLocaleString('bn-BD')}</span>
          </div>
        `).join('')}
      </div>

      <div class="space-y-1.5 text-xs font-bangla pt-2 border-t border-stone-200">
        <div class="flex justify-between text-stone-600">
          <span>সাব-টোটাল:</span>
          <span>৳${subtotal.toLocaleString('bn-BD')}</span>
        </div>
        <div class="flex justify-between text-stone-600">
          <span>ডেলিভারি চার্জ:</span>
          <span class="${isFreeDelivery ? 'text-emerald-600 font-bold' : ''}">
            ${isFreeDelivery ? 'ফ্রি' : `৳${deliveryFee.toLocaleString('bn-BD')}`}
          </span>
        </div>
        <div class="flex justify-between text-base font-bold text-stone-900 pt-2 border-t border-stone-200">
          <span>সর্বমোট প্রদেয়:</span>
          <span class="text-[#a28359]">৳${grandTotal.toLocaleString('bn-BD')}</span>
        </div>
      </div>
    `;
  }
}

// Confirm Order Submission
function confirmOrderSubmit(e) {
  e.preventDefault();

  const name = document.getElementById('order-name').value.trim();
  const phone = document.getElementById('order-phone').value.trim();
  const address = document.getElementById('order-address').value.trim();
  const paymentMethod = document.querySelector('input[name="payment-method"]:checked')?.value || 'cod';

  if (!name || !phone || !address) {
    showToast('অনুগ্রহ করে নাম, ফোন নম্বর এবং সম্পূর্ণ ঠিকানা পূরণ করুন', 'warning');
    return;
  }

  // Validate Bangladesh phone number (minimum 11 digits)
  const phoneClean = phone.replace(/\D/g, '');
  if (phoneClean.length < 11) {
    showToast('অনুগ্রহ করে সঠিক ১১ ডিজিটের মোবাইল নম্বর প্রদান করুন', 'warning');
    return;
  }

  const orderId = 'AS-' + Math.floor(100000 + Math.random() * 900000);
  const subtotal = STATE.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const isFreeDelivery = subtotal >= STATE.freeShippingThreshold;
  const deliveryFee = isFreeDelivery ? 0 : (STATE.selectedDeliveryArea === 'inside' ? 70 : 130);
  const total = subtotal + deliveryFee;

  // Clear Cart
  STATE.cart = [];
  saveCart();
  updateCartUI();

  // Close Checkout Modal & Open Success Modal
  document.getElementById('checkout-modal').classList.add('hidden');
  
  const successModal = document.getElementById('order-success-modal');
  const detailsEl = document.getElementById('success-order-details');

  if (detailsEl) {
    detailsEl.innerHTML = `
      <div class="bg-stone-50 p-4 rounded-xl text-left font-bangla text-xs space-y-1.5 border border-stone-200">
        <div class="flex justify-between"><strong>অর্ডার নম্বর:</strong> <span class="font-mono text-stone-800 font-bold">#${orderId}</span></div>
        <div class="flex justify-between"><strong>গ্রাহক:</strong> <span>${name}</span></div>
        <div class="flex justify-between"><strong>মোবাইল:</strong> <span>${phone}</span></div>
        <div class="flex justify-between"><strong>পেমেন্ট মেথড:</strong> <span>${paymentMethod === 'cod' ? 'ক্যাশ অন ডেলিভারি (COD)' : 'বিকাশ / নগদ'}</span></div>
        <div class="flex justify-between text-sm font-bold text-stone-900 pt-2 border-t border-stone-200">
          <span>মোট বিল:</span> <span>৳${total.toLocaleString('bn-BD')}</span>
        </div>
      </div>
    `;
  }

  if (successModal) successModal.classList.remove('hidden');
  initLucideIcons();
}

// Toast Alert
function showToast(message, type = 'info') {
  const toastContainer = document.getElementById('toast-container');
  if (!toastContainer) return;

  const toast = document.createElement('div');
  const bgColor = type === 'success' ? 'bg-stone-900 border-emerald-500' : type === 'warning' ? 'bg-amber-900 border-amber-500' : 'bg-stone-900 border-stone-700';

  toast.className = `flex items-center gap-2 text-white font-bangla text-xs py-3 px-4 rounded-xl shadow-2xl border-l-4 transition-all duration-300 transform translate-y-3 opacity-0 ${bgColor}`;
  toast.innerHTML = `
    <i data-lucide="${type === 'success' ? 'check-circle' : type === 'warning' ? 'alert-triangle' : 'info'}" class="w-4 h-4 text-[#c5a880] flex-shrink-0"></i>
    <span>${message}</span>
  `;

  toastContainer.appendChild(toast);
  initLucideIcons();

  requestAnimationFrame(() => {
    toast.classList.remove('translate-y-3', 'opacity-0');
    toast.classList.add('translate-y-0', 'opacity-100');
  });

  setTimeout(() => {
    toast.classList.remove('translate-y-0', 'opacity-100');
    toast.classList.add('translate-y-3', 'opacity-0');
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}
