import React, { useState, useMemo } from 'react';
import ProductCard from './ProductCard.jsx';

export default function CategoryPage({
  categoryId,
  products = [],
  wishlist = [],
  onToggleWishlist,
  onOpenDetails,
  onAddToCart,
  onBackToHome,
  onSelectCategory
}) {
  const [sortBy, setSortBy] = useState('popular');
  const [selectedSize, setSelectedSize] = useState('all');

  // Category Meta details
  const categoryMeta = {
    panjabi: {
      title: 'PANJABI & KABLI',
      subtitle: 'পাঞ্জাবি ও কাবলি কালেকশন',
      desc: 'ঐতিহ্যবাহী নিখুঁত হ্যান্ডলুম, প্রিমিয়াম জ্যাকোয়ার্ড ও খাঁটি মিসরীয় সুতির রাজকীয় পাঞ্জাবি সম্ভার।'
    },
    jubbah: {
      title: 'ARABIAN JUBBAH & THOBE',
      subtitle: 'অ্যারাবিয়ান জুব্বা কালেকশন',
      desc: 'সংযুক্ত আরব আমিরাত ও মরক্কোর ঐতিহ্যবাহী রিংকেল-ফ্রি প্রিমিয়াম সিল্কি ম্যাট ফেব্রিকের তৈরি জুব্বা।'
    },
    attar: {
      title: 'ARTISANAL ATTAR & OUD',
      subtitle: 'খাঁটি আতর ও উদ কালেকশন',
      desc: '১০০% অ্যালকোহল-মুক্ত বন্য কম্বোডিয়ান আগরউড, রয়্যাল হোয়াইট মাস্ক ও তায়েফি গোলাপের বিশুদ্ধ সুবাস।'
    },
    tshirt: {
      title: 'MINIMAL STREETWEAR T-SHIRTS',
      subtitle: 'মিনিমালিস্ট টি-শার্ট কালেকশন',
      desc: '২৪০ জিএসএম ড্রপ-শোল্ডার কম্বড সুপীমা কটন ও ক্লাসিক পোলো—দৈনন্দিন আরামের আধুনিক সঙ্গী।'
    }
  };

  const currentMeta = categoryMeta[categoryId] || {
    title: 'COLLECTION',
    subtitle: 'কালেকশন',
    desc: 'ABHA-র এক্সক্লুসিভ লাইফস্টাইল কালেকশন।'
  };

  // Filter and Sort category items
  const categoryProducts = useMemo(() => {
    let list = products.filter((p) => p.category === categoryId);

    if (selectedSize !== 'all') {
      list = list.filter((p) => p.sizes && p.sizes.some((s) => s.includes(selectedSize)));
    }

    if (sortBy === 'low-high') list.sort((a, b) => a.price - b.price);
    else if (sortBy === 'high-low') list.sort((a, b) => b.price - a.price);
    else if (sortBy === 'rating') list.sort((a, b) => b.rating - a.rating);
    else if (sortBy === 'popular') list.sort((a, b) => b.reviewsCount - a.reviewsCount);

    return list;
  }, [products, categoryId, sortBy, selectedSize]);

  return (
    <div className="bg-white min-h-screen text-stone-900 pb-20">
      
      {/* 1. Breadcrumbs */}
      <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12 pt-6 pb-4">
        <nav className="flex items-center gap-2 text-xs text-stone-400 font-sans uppercase tracking-widest">
          <button 
            onClick={onBackToHome}
            className="hover:text-black transition-colors"
          >
            HOME
          </button>
          <span>/</span>
          
          {/* Clickable COLLECTIONS with dropdown & direct navigation to category showcase */}
          <div className="relative group inline-block">
            <button 
              onClick={() => {
                onBackToHome();
                setTimeout(() => {
                  document.getElementById('shop-by-category')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
              className="text-stone-600 hover:text-black hover:underline transition-colors flex items-center gap-1 font-semibold cursor-pointer"
              title="View all collections"
            >
              <span>COLLECTIONS</span>
              <svg className="w-3.5 h-3.5 text-stone-400 group-hover:text-black transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Dropdown Menu on hover to quickly switch collections */}
            <div className="absolute left-0 top-full mt-1.5 w-52 bg-white border border-stone-200 shadow-xl py-2 z-50 hidden group-hover:block transition-all">
              <div className="px-3 py-1.5 text-[10px] text-stone-400 font-bold uppercase tracking-widest border-b border-stone-100">
                ALL COLLECTIONS
              </div>
              <button 
                onClick={() => onSelectCategory('panjabi')}
                className={`w-full text-left px-3 py-2 text-xs hover:bg-stone-50 flex items-center justify-between transition-colors ${categoryId === 'panjabi' ? 'font-bold text-black bg-stone-50' : 'text-stone-700'}`}
              >
                <span>PANJABI & KABLI</span>
                {categoryId === 'panjabi' && <span className="text-black text-xs font-bold">✓</span>}
              </button>
              <button 
                onClick={() => onSelectCategory('jubbah')}
                className={`w-full text-left px-3 py-2 text-xs hover:bg-stone-50 flex items-center justify-between transition-colors ${categoryId === 'jubbah' ? 'font-bold text-black bg-stone-50' : 'text-stone-700'}`}
              >
                <span>ARABIAN JUBBAH</span>
                {categoryId === 'jubbah' && <span className="text-black text-xs font-bold">✓</span>}
              </button>
              <button 
                onClick={() => onSelectCategory('attar')}
                className={`w-full text-left px-3 py-2 text-xs hover:bg-stone-50 flex items-center justify-between transition-colors ${categoryId === 'attar' ? 'font-bold text-black bg-stone-50' : 'text-stone-700'}`}
              >
                <span>ARTISANAL ATTAR & OUD</span>
                {categoryId === 'attar' && <span className="text-black text-xs font-bold">✓</span>}
              </button>
              <button 
                onClick={() => onSelectCategory('tshirt')}
                className={`w-full text-left px-3 py-2 text-xs hover:bg-stone-50 flex items-center justify-between transition-colors ${categoryId === 'tshirt' ? 'font-bold text-black bg-stone-50' : 'text-stone-700'}`}
              >
                <span>MINIMAL T-SHIRTS</span>
                {categoryId === 'tshirt' && <span className="text-black text-xs font-bold">✓</span>}
              </button>
              <div className="border-t border-stone-100 mt-1 pt-1">
                <button 
                  onClick={() => {
                    onBackToHome();
                    setTimeout(() => {
                      document.getElementById('shop-by-category')?.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }}
                  className="w-full text-left px-3 py-1.5 text-[11px] font-bold text-black hover:bg-stone-100 uppercase"
                >
                  VIEW OVERVIEW →
                </button>
              </div>
            </div>
          </div>

          <span>/</span>
          <span className="text-black font-bold">{currentMeta.title}</span>
        </nav>
      </div>

      {/* 2. Category Editorial Header */}
      <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12 py-8 border-b border-stone-200">
        <div className="max-w-3xl">
          <span className="text-[10px] tracking-[0.3em] font-bold text-stone-400 uppercase block mb-2">
            OFFICIAL COLLECTION
          </span>
          <h1 className="text-3xl sm:text-5xl font-black font-sans tracking-tight text-stone-950 uppercase mb-3">
            {currentMeta.title}
          </h1>
          <p className="text-sm font-bangla text-stone-600 leading-relaxed">
            {currentMeta.desc}
          </p>
        </div>
      </div>

      {/* 3. Filter & Sort Toolbar */}
      <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-stone-100">
          
          {/* Items Counter */}
          <div className="text-xs text-stone-500 font-sans tracking-wider uppercase font-semibold">
            SHOWING <strong className="text-black">{categoryProducts.length}</strong> PRODUCTS
          </div>

          {/* Controls: Size Filter & Sort */}
          <div className="flex items-center gap-4">
            {categoryId !== 'attar' && (
              <div className="flex items-center gap-1 text-xs">
                <span className="text-stone-400 uppercase tracking-wider text-[11px] mr-1">SIZE:</span>
                {['all', 'M', 'L', 'XL', 'XXL'].map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`px-2.5 py-1 text-xs uppercase font-bold border transition-colors ${
                      selectedSize === sz
                        ? 'border-black bg-black text-white'
                        : 'border-stone-200 bg-white text-stone-600 hover:border-black'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            )}

            {/* Sort Select */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-stone-50 border border-stone-200 text-stone-800 text-xs py-2 px-3 focus:outline-none focus:border-black cursor-pointer rounded-none"
            >
              <option value="popular">Popularity</option>
              <option value="low-high">Price: Low to High</option>
              <option value="high-low">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>

        </div>

        {/* 4. Product Grid - Screen filling modern grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-6 lg:gap-8 mt-8">
          {categoryProducts.length === 0 ? (
            <div className="col-span-full py-20 text-center text-stone-400">
              <span className="text-4xl block mb-2">🛍️</span>
              <h3 className="text-lg font-bold text-stone-800 font-bangla">এই ফিল্টারে কোনো পণ্য পাওয়া যায়নি</h3>
              <p className="text-xs text-stone-500 font-bangla mt-1">সব সাইজ দেখতে "ALL" সিলেক্ট করুন।</p>
              <button 
                onClick={() => setSelectedSize('all')}
                className="mt-4 bg-black text-white text-xs uppercase tracking-wider font-bold px-6 py-2.5 rounded-none"
              >
                RESET FILTERS
              </button>
            </div>
          ) : (
            categoryProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isWishlisted={wishlist.includes(product.id)}
                onToggleWishlist={onToggleWishlist}
                onOpenDetails={onOpenDetails}
                onAddToCart={onAddToCart}
              />
            ))
          )}
        </div>

        {/* 5. Back to Home Navigation Action */}
        <div className="mt-16 pt-8 border-t border-stone-200 text-center">
          <button 
            onClick={onBackToHome}
            className="border border-stone-300 hover:border-black text-black text-xs font-bold uppercase tracking-widest px-8 py-3.5 rounded-none transition-colors"
          >
            ← BACK TO HOME
          </button>
        </div>

      </div>

    </div>
  );
}
