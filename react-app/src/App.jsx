import React, { useState, useEffect, useMemo } from 'react';
import { PRODUCTS_DATA } from './data/products.js';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import Categories from './components/Categories.jsx';
import ProductCard from './components/ProductCard.jsx';
import CategoryPage from './components/CategoryPage.jsx';
import ProductModal from './components/ProductModal.jsx';
import CartDrawer from './components/CartDrawer.jsx';
import SizeAdvisorModal from './components/SizeAdvisorModal.jsx';
import CheckoutModal from './components/CheckoutModal.jsx';
import OrderSuccessModal from './components/OrderSuccessModal.jsx';
import Footer from './components/Footer.jsx';

export default function App() {
  const [products] = useState(PRODUCTS_DATA);
  
  // Page Routing State: { type: 'home' } or { type: 'category', categoryId: 'panjabi' }
  const [currentPage, setCurrentPage] = useState({ type: 'home' });

  const [activeCategory, setActiveCategory] = useState('all');
  const [activeSort, setActiveSort] = useState('popular');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Right-to-Left Animated Slider vs Grid Mode
  const [displayMode, setDisplayMode] = useState('slider'); // 'slider' | 'grid'
  const [isAutoScrollPaused, setIsAutoScrollPaused] = useState(false);
  
  // Persistent Cart & Wishlist
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('abha_react_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('abha_react_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Modals Visibility
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSizeAdvisorOpen, setIsSizeAdvisorOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [completedOrder, setCompletedOrder] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    localStorage.setItem('abha_react_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('abha_react_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Scroll to top on page change
  const navigateToCategoryPage = (catId) => {
    setCurrentPage({ type: 'category', categoryId: catId });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToHome = () => {
    setCurrentPage({ type: 'home' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Cart Operations
  const handleAddToCart = (product, size, color, quantity = 1) => {
    const pSize = size || (product.sizes ? product.sizes[0] : 'Standard');
    const pColor = color || (product.colors && product.colors[0] ? product.colors[0].name : '');

    const existingIndex = cart.findIndex(
      (item) => item.id === product.id && item.size === pSize && item.color === pColor
    );

    if (existingIndex > -1) {
      const updated = [...cart];
      updated[existingIndex].quantity += quantity;
      setCart(updated);
    } else {
      setCart([
        ...cart,
        {
          id: product.id,
          nameBangla: product.nameBangla,
          nameEnglish: product.nameEnglish,
          price: product.price,
          image: product.image,
          size: pSize,
          color: pColor,
          quantity: quantity
        }
      ]);
    }

    showToast(`"${product.nameBangla}" কার্টে যুক্ত হয়েছে!`);
    setIsCartOpen(true);
    setSelectedProduct(null);
  };

  const handleUpdateQuantity = (index, delta) => {
    const updated = [...cart];
    updated[index].quantity += delta;
    if (updated[index].quantity <= 0) {
      updated.splice(index, 1);
    }
    setCart(updated);
  };

  const handleRemoveCartItem = (index) => {
    const updated = [...cart];
    updated.splice(index, 1);
    setCart(updated);
    showToast('আইটেমটি কার্ট থেকে সরানো হয়েছে');
  };

  const handleToggleWishlist = (productId) => {
    if (wishlist.includes(productId)) {
      setWishlist(wishlist.filter((id) => id !== productId));
      showToast('উইশলিস্ট থেকে সরানো হয়েছে');
    } else {
      setWishlist([...wishlist, productId]);
      showToast('উইশলিস্টে যুক্ত করা হয়েছে! ❤️');
    }
  };

  const handleBuyNowDirect = (product, size, color) => {
    handleAddToCart(product, size, color, 1);
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleConfirmOrder = (orderData) => {
    const orderId = 'ABHA-' + Math.floor(100000 + Math.random() * 900000);
    const finalOrder = { ...orderData, orderId };
    setCompletedOrder(finalOrder);
    setCart([]);
    setIsCheckoutOpen(false);
  };

  // Filter & Sort for Home Page
  const filteredProducts = useMemo(() => {
    let list = [...products];

    if (activeCategory !== 'all') {
      list = list.filter((p) => p.category === activeCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.nameBangla.toLowerCase().includes(q) ||
          p.nameEnglish.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.fabric.toLowerCase().includes(q)
      );
    }

    if (activeSort === 'low-high') {
      list.sort((a, b) => a.price - b.price);
    } else if (activeSort === 'high-low') {
      list.sort((a, b) => b.price - a.price);
    } else if (activeSort === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    } else if (activeSort === 'popular') {
      list.sort((a, b) => b.reviewsCount - a.reviewsCount);
    }

    return list;
  }, [products, activeCategory, searchQuery, activeSort]);

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-white text-stone-900 font-sans flex flex-col justify-between selection:bg-stone-200">
      
      {/* 1. Header with Page Routing */}
      <Navbar 
        cartCount={totalCartCount}
        wishlistCount={wishlist.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSizeAdvisor={() => setIsSizeAdvisorOpen(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSelectCategory={(cat) => {
          if (cat === 'all') {
            navigateToHome();
          } else {
            navigateToCategoryPage(cat);
          }
        }}
      />

      {/* 2. Main Body: Condition Render Home or Dedicated Category Page */}
      <main className="flex-1">
        {currentPage.type === 'category' ? (
          /* DEDICATED CATEGORY PAGE */
          <CategoryPage 
            categoryId={currentPage.categoryId}
            products={products}
            wishlist={wishlist}
            onToggleWishlist={handleToggleWishlist}
            onOpenDetails={(p) => setSelectedProduct(p)}
            onAddToCart={handleAddToCart}
            onBackToHome={navigateToHome}
            onSelectCategory={navigateToCategoryPage}
          />
        ) : (
          /* HOMEPAGE VIEW */
          <>
            {/* Hero Section */}
            <Hero 
              onExploreClick={() => document.getElementById('trending-now')?.scrollIntoView({ behavior: 'smooth' })}
              onAttarClick={() => navigateToCategoryPage('attar')}
            />

            {/* Shop By Category Cards -> Clicking any card opens dedicated Category Page */}
            <Categories 
              onSelectCategory={(cat) => navigateToCategoryPage(cat)}
            />

            {/* TRENDING NOW Section with Smooth Right-to-Left Product Animation */}
            <section id="trending-now" className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12 py-14 scroll-mt-20">
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-stone-100 text-stone-800 text-[10px] font-bold uppercase tracking-[0.2em] mb-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  LIVE SHOWCASE — ANIMATING RIGHT TO LEFT
                </div>
                <h2 className="text-xl sm:text-3xl font-bold font-sans tracking-[0.2em] text-stone-900 uppercase">
                  TRENDING NOW
                </h2>
                <div className="w-10 h-0.5 bg-stone-900 mx-auto mt-2"></div>
              </div>

              {/* Minimal Tab Filters, View Modes & Controls */}
              <div className="flex flex-col md:flex-row items-center justify-between gap-4 pb-6 border-b border-stone-200 mb-8">
                {/* Category Filter Tabs */}
                <div className="flex items-center gap-2 overflow-x-auto text-[11px] uppercase tracking-wider font-semibold w-full md:w-auto">
                  {[
                    { id: 'all', label: 'All Items' },
                    { id: 'panjabi', label: 'Panjabi' },
                    { id: 'jubbah', label: 'Jubbah' },
                    { id: 'attar', label: 'Attar & Oud' },
                    { id: 'tshirt', label: 'T-Shirts' },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveCategory(tab.id)}
                      className={`py-2 px-4 whitespace-nowrap transition-all rounded-none ${
                        activeCategory === tab.id
                          ? 'bg-black text-white font-bold'
                          : 'bg-stone-50 text-stone-600 hover:text-black hover:bg-stone-100'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Right Controls: Mode Toggle & Sort */}
                <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
                  
                  {/* Slider vs Grid Toggle */}
                  <div className="flex items-center border border-stone-200 bg-stone-50 p-0.5">
                    <button
                      onClick={() => setDisplayMode('slider')}
                      className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-1.5 ${
                        displayMode === 'slider' ? 'bg-black text-white' : 'text-stone-600 hover:text-black'
                      }`}
                      title="Continuous Right to Left Animation"
                    >
                      <span>▶ AUTO-SCROLL (RTL)</span>
                    </button>
                    <button
                      onClick={() => setDisplayMode('grid')}
                      className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-1.5 ${
                        displayMode === 'grid' ? 'bg-black text-white' : 'text-stone-600 hover:text-black'
                      }`}
                      title="Classic Grid View"
                    >
                      <span>▦ GRID VIEW</span>
                    </button>
                  </div>

                  {displayMode === 'slider' && (
                    <button
                      onClick={() => setIsAutoScrollPaused(!isAutoScrollPaused)}
                      className="text-xs px-2.5 py-1.5 border border-stone-200 hover:border-black font-semibold uppercase tracking-wider bg-white transition-colors"
                      title={isAutoScrollPaused ? 'Resume auto-scroll' : 'Pause auto-scroll'}
                    >
                      {isAutoScrollPaused ? '▶ PLAY' : '⏸ PAUSE'}
                    </button>
                  )}

                  <select
                    value={activeSort}
                    onChange={(e) => setActiveSort(e.target.value)}
                    className="bg-stone-50 border border-stone-200 text-stone-800 text-xs py-2 px-3 focus:outline-none focus:border-black cursor-pointer rounded-none"
                  >
                    <option value="popular">Popularity</option>
                    <option value="low-high">Price: Low to High</option>
                    <option value="high-low">Price: High to Low</option>
                    <option value="rating">Top Rated</option>
                  </select>
                </div>
              </div>

              {/* Mode 1: RIGHT-TO-LEFT ANIMATED MARQUEE / SLIDER */}
              {displayMode === 'slider' ? (
                <div className="relative overflow-hidden w-full py-4 group">
                  {/* Subtle fade edges for luxury feel */}
                  <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
                  <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

                  {/* Infinite Marquee Track Moving Right to Left */}
                  <div 
                    className="flex gap-6 w-max"
                    style={{
                      animation: isAutoScrollPaused ? 'none' : 'marqueeRTL 36s linear infinite'
                    }}
                  >
                    {/* Render duplicated list for continuous smooth looping */}
                    {[...filteredProducts, ...filteredProducts].map((product, idx) => (
                      <div 
                        key={`${product.id}-${idx}`} 
                        className="w-[270px] sm:w-[300px] lg:w-[320px] flex-shrink-0"
                      >
                        <ProductCard
                          product={product}
                          isWishlisted={wishlist.includes(product.id)}
                          onToggleWishlist={handleToggleWishlist}
                          onOpenDetails={(p) => setSelectedProduct(p)}
                          onAddToCart={handleAddToCart}
                        />
                      </div>
                    ))}
                  </div>

                  <p className="text-center text-xs text-stone-400 font-bangla mt-6 flex items-center justify-center gap-1.5">
                    <span>💡 মাউস কার্ডের ওপর নিলে অ্যানিমেশন থামবে, সহজে "ADD TO CART" করতে পারবেন।</span>
                  </p>
                </div>
              ) : (
                /* Mode 2: CLASSIC GRID VIEW */
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-6 lg:gap-8">
                  {filteredProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      isWishlisted={wishlist.includes(product.id)}
                      onToggleWishlist={handleToggleWishlist}
                      onOpenDetails={(p) => setSelectedProduct(p)}
                      onAddToCart={handleAddToCart}
                    />
                  ))}
                </div>
              )}
            </section>

            {/* 3-Box Promo Banner Section */}
            <section className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12 py-12">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Promo 1: New Drops */}
                <div className="relative bg-[#16171b] text-white p-6 sm:p-8 flex flex-col justify-between min-h-[220px] overflow-hidden group">
                  <div className="z-10">
                    <span className="text-[10px] tracking-[0.25em] text-stone-400 font-bold uppercase block mb-1">
                      NEW DROPS
                    </span>
                    <h3 className="text-xl font-bold font-sans tracking-wide mb-2 uppercase">
                      EVERY WEEK
                    </h3>
                    <p className="text-xs text-stone-400 font-bangla mb-4">
                      নতুন সব সুন্নাহ ও লাক্সারি কালেকশন
                    </p>
                  </div>
                  <div className="z-10">
                    <button 
                      onClick={() => navigateToCategoryPage('panjabi')}
                      className="bg-white text-black text-[11px] font-bold uppercase tracking-widest px-5 py-2.5 rounded-none hover:bg-stone-200 transition-colors"
                    >
                      EXPLORE PANJABI
                    </button>
                  </div>
                  <img 
                    src="assets/images/panjabi.jpg" 
                    alt="Panjabi Drops" 
                    className="absolute right-0 top-0 w-1/2 h-full object-cover opacity-20 group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Promo 2: Artisanal Oud */}
                <div className="relative bg-[#1d1e24] text-white p-6 sm:p-8 flex flex-col justify-between min-h-[220px] overflow-hidden group">
                  <div className="z-10">
                    <span className="text-[10px] tracking-[0.25em] text-[#c5a880] font-bold uppercase block mb-1">
                      ARTISANAL OUD
                    </span>
                    <h3 className="text-xl font-bold font-sans tracking-wide mb-2 uppercase">
                      PURE AGED EXTRACTS
                    </h3>
                    <p className="text-xs text-stone-400 font-bangla mb-4">
                      কম্বোডিয়ান আগরউড ও রাজকীয় মাস্ক
                    </p>
                  </div>
                  <div className="z-10">
                    <button 
                      onClick={() => navigateToCategoryPage('attar')}
                      className="bg-white text-black text-[11px] font-bold uppercase tracking-widest px-5 py-2.5 rounded-none hover:bg-stone-200 transition-colors"
                    >
                      EXPLORE OUD
                    </button>
                  </div>
                  <img 
                    src="https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=600&q=80" 
                    alt="Oud" 
                    className="absolute right-0 top-0 w-1/2 h-full object-cover opacity-25 group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Promo 3: Special Bundle Offer */}
                <div className="relative bg-[#111216] text-white p-6 sm:p-8 flex flex-col justify-between min-h-[220px] overflow-hidden group">
                  <div className="z-10">
                    <span className="text-[10px] tracking-[0.25em] text-red-400 font-bold uppercase block mb-1">
                      UP TO ৳১,৩০০ OFF
                    </span>
                    <h3 className="text-xl font-bold font-sans tracking-wide mb-2 uppercase">
                      JUMU'AH BUNDLE
                    </h3>
                    <p className="text-xs text-stone-400 font-bangla mb-4">
                      পাঞ্জাবি + পায়জামা + ৬মিলি উদ আতর সেট
                    </p>
                  </div>
                  <div className="z-10">
                    <button 
                      onClick={() => {
                        const pj = products.find(x => x.id === 'pj-01');
                        const at = products.find(x => x.id === 'at-01');
                        if (pj) handleAddToCart(pj, 'L (40)', 'Pure Ivory White');
                        if (at) handleAddToCart(at, '6ml', 'Golden Amber Essence');
                      }}
                      className="bg-white text-black text-[11px] font-bold uppercase tracking-widest px-5 py-2.5 rounded-none hover:bg-stone-200 transition-colors"
                    >
                      SHOP BUNDLE
                    </button>
                  </div>
                  <img 
                    src="assets/images/jubbah.jpg" 
                    alt="Sale" 
                    className="absolute right-0 top-0 w-1/2 h-full object-cover opacity-20 group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

              </div>
            </section>
          </>
        )}
      </main>

      {/* Modals & Cart Drawer */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        onBuyNowDirect={handleBuyNowDirect}
        onOpenSizeAdvisor={() => {
          setSelectedProduct(null);
          setIsSizeAdvisorOpen(true);
        }}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveCartItem}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      <SizeAdvisorModal
        isOpen={isSizeAdvisorOpen}
        onClose={() => setIsSizeAdvisorOpen(false)}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cart={cart}
        onConfirmOrder={handleConfirmOrder}
      />

      <OrderSuccessModal
        order={completedOrder}
        onClose={() => setCompletedOrder(null)}
      />

      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50">
          <div className="bg-black text-white text-xs py-3 px-4 shadow-2xl border-l-2 border-white flex items-center gap-2">
            <span>✓</span>
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Footer */}
      <Footer 
        onOpenSizeAdvisor={() => setIsSizeAdvisorOpen(true)}
        onSelectCategory={(cat) => {
          if (cat === 'all') navigateToHome();
          else navigateToCategoryPage(cat);
        }}
      />
    </div>
  );
}
