import React, { useState } from 'react';

export default function Navbar({
  cartCount = 0,
  wishlistCount = 0,
  onOpenCart,
  onOpenSizeAdvisor,
  searchQuery,
  setSearchQuery,
  onSelectCategory
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
      {/* Main Minimalist Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-100 transition-all">
        <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12 h-20 flex items-center justify-between gap-4">
          
          {/* Brand Logo - ABHA (The Glow of New Trends) */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 text-stone-900 hover:bg-stone-100 rounded-lg"
              aria-label="Toggle Navigation"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            <a href="#" onClick={(e) => { e.preventDefault(); onSelectCategory('all'); }} className="flex flex-col items-start group">
              <span className="font-serif text-2xl sm:text-3xl font-bold tracking-[0.18em] text-[#222429] leading-none uppercase">
                ABHA
              </span>
              <span className="text-[8px] sm:text-[9px] tracking-[0.28em] text-stone-500 font-medium uppercase mt-1 leading-none">
                THE GLOW OF NEW TRENDS
              </span>
            </a>
          </div>

          {/* Center Navigation Links - Styled like the NEON reference */}
          <nav className="hidden lg:flex items-center gap-8 text-[12px] uppercase tracking-widest font-semibold text-stone-700">
            <button 
              onClick={() => onSelectCategory('all')} 
              className="hover:text-black transition-colors py-1 hover:border-b-2 hover:border-black"
            >
              HOME
            </button>

            {/* COLLECTIONS Dropdown Menu */}
            <div className="relative group py-1">
              <button 
                onClick={() => {
                  onSelectCategory('all');
                  setTimeout(() => {
                    document.getElementById('shop-by-category')?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }} 
                className="hover:text-black transition-colors flex items-center gap-1 group-hover:border-b-2 group-hover:border-black pb-0.5 cursor-pointer"
              >
                <span>COLLECTIONS</span>
                <svg className="w-3.5 h-3.5 text-stone-400 group-hover:text-black transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              <div className="absolute left-0 top-full mt-2 w-52 bg-white border border-stone-200 shadow-xl py-2 z-50 hidden group-hover:block transition-all">
                <button 
                  onClick={() => onSelectCategory('panjabi')} 
                  className="w-full text-left px-4 py-2.5 text-xs hover:bg-stone-50 text-stone-700 hover:text-black font-semibold flex items-center justify-between"
                >
                  <span>PANJABI & KABLI</span>
                  <span className="text-[10px] text-stone-400">→</span>
                </button>
                <button 
                  onClick={() => onSelectCategory('jubbah')} 
                  className="w-full text-left px-4 py-2.5 text-xs hover:bg-stone-50 text-stone-700 hover:text-black font-semibold flex items-center justify-between"
                >
                  <span>ARABIAN JUBBAH</span>
                  <span className="text-[10px] text-stone-400">→</span>
                </button>
                <button 
                  onClick={() => onSelectCategory('attar')} 
                  className="w-full text-left px-4 py-2.5 text-xs hover:bg-stone-50 text-stone-700 hover:text-black font-semibold flex items-center justify-between"
                >
                  <span>ARTISANAL ATTAR & OUD</span>
                  <span className="text-[10px] text-stone-400">→</span>
                </button>
                <button 
                  onClick={() => onSelectCategory('tshirt')} 
                  className="w-full text-left px-4 py-2.5 text-xs hover:bg-stone-50 text-stone-700 hover:text-black font-semibold flex items-center justify-between"
                >
                  <span>MINIMAL T-SHIRTS</span>
                  <span className="text-[10px] text-stone-400">→</span>
                </button>
                <div className="border-t border-stone-100 mt-1 pt-1">
                  <button 
                    onClick={() => {
                      onSelectCategory('all');
                      setTimeout(() => {
                        document.getElementById('shop-by-category')?.scrollIntoView({ behavior: 'smooth' });
                      }, 100);
                    }} 
                    className="w-full text-left px-4 py-2 text-[11px] font-bold text-black hover:bg-stone-100 uppercase"
                  >
                    VIEW ALL COLLECTIONS →
                  </button>
                </div>
              </div>
            </div>

            <button 
              onClick={() => onSelectCategory('panjabi')} 
              className="hover:text-black transition-colors py-1 hover:border-b-2 hover:border-black"
            >
              PANJABI
            </button>
            <button 
              onClick={() => onSelectCategory('jubbah')} 
              className="hover:text-black transition-colors py-1 hover:border-b-2 hover:border-black"
            >
              JUBBAH
            </button>
            <button 
              onClick={() => onSelectCategory('attar')} 
              className="hover:text-black transition-colors py-1 hover:border-b-2 hover:border-black flex items-center gap-1.5"
            >
              <span>ATTAR & OUD</span>
            </button>
            <button 
              onClick={() => onSelectCategory('tshirt')} 
              className="hover:text-black transition-colors py-1 hover:border-b-2 hover:border-black"
            >
              T-SHIRTS
            </button>
            <button 
              onClick={onOpenSizeAdvisor} 
              className="hover:text-black transition-colors py-1 text-stone-500 hover:border-b-2 hover:border-black"
            >
              SIZE GUIDE
            </button>
          </nav>

          {/* Right Action Icons (Search, Account, Wishlist, Cart Bag) */}
          <div className="flex items-center gap-3 sm:gap-4 text-stone-800">
            {/* Search Toggle */}
            <div className="relative">
              {searchOpen ? (
                <div className="flex items-center bg-stone-100 rounded-full px-3 py-1.5">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search collection..."
                    autoFocus
                    className="bg-transparent text-xs w-36 sm:w-48 outline-none text-stone-900 placeholder:text-stone-400"
                  />
                  <button onClick={() => setSearchOpen(false)} className="text-stone-400 hover:text-stone-900 text-xs ml-1 font-bold">✕</button>
                </div>
              ) : (
                <button 
                  onClick={() => setSearchOpen(true)}
                  className="p-2 hover:bg-stone-100 rounded-full transition-colors"
                  title="Search"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              )}
            </div>

            {/* User Account Icon */}
            <button 
              onClick={() => alert('Customer Account & Profile login coming soon!')}
              className="p-2 hover:bg-stone-100 rounded-full transition-colors hidden sm:block" 
              title="Account"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </button>

            {/* Wishlist Icon */}
            <div className="relative p-2 hover:bg-stone-100 rounded-full cursor-pointer transition-colors" title="Wishlist">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 bg-stone-900 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </div>

            {/* Cart Bag Icon with Black Count Badge (Exactly like NEON reference) */}
            <button 
              onClick={onOpenCart}
              className="relative p-2 hover:bg-stone-100 rounded-full transition-colors"
              title="Shopping Cart"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <span className="absolute top-1 right-1 bg-stone-950 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          ></div>
          <div className="relative w-full max-w-xs bg-white h-full shadow-2xl p-6 flex flex-col justify-between z-10 font-bangla">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-stone-100">
                <div>
                  <span className="font-serif text-2xl font-bold tracking-[0.18em] text-[#222429] uppercase">ABHA</span>
                  <p className="text-[8px] tracking-[0.2em] text-stone-500 uppercase">THE GLOW OF NEW TRENDS</p>
                </div>
                <button onClick={() => setMobileMenuOpen(false)} className="text-stone-500 text-xl font-bold p-1">✕</button>
              </div>

              <div className="py-6 space-y-4 text-xs font-semibold uppercase tracking-widest text-stone-800">
                <button 
                  onClick={() => { onSelectCategory('all'); setMobileMenuOpen(false); }} 
                  className="w-full text-left py-2 border-b border-stone-100"
                >
                  ALL COLLECTIONS
                </button>
                <button 
                  onClick={() => { onSelectCategory('panjabi'); setMobileMenuOpen(false); }} 
                  className="w-full text-left py-2 border-b border-stone-100"
                >
                  PANJABI & KABLI
                </button>
                <button 
                  onClick={() => { onSelectCategory('jubbah'); setMobileMenuOpen(false); }} 
                  className="w-full text-left py-2 border-b border-stone-100"
                >
                  ARABIAN JUBBAH
                </button>
                <button 
                  onClick={() => { onSelectCategory('attar'); setMobileMenuOpen(false); }} 
                  className="w-full text-left py-2 border-b border-stone-100 text-amber-800"
                >
                  PURE ATTAR & OUD
                </button>
                <button 
                  onClick={() => { onSelectCategory('tshirt'); setMobileMenuOpen(false); }} 
                  className="w-full text-left py-2 border-b border-stone-100"
                >
                  MINIMAL T-SHIRTS
                </button>
                <button 
                  onClick={() => { onOpenSizeAdvisor(); setMobileMenuOpen(false); }} 
                  className="w-full text-left py-2 text-stone-500"
                >
                  📏 SMART SIZE GUIDE
                </button>
              </div>
            </div>

            <div className="text-xs text-stone-500 border-t border-stone-100 pt-4">
              <p>📞 Helpline: 01700-000000</p>
              <p className="mt-1">🚚 Cash On Delivery Bangladesh</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
