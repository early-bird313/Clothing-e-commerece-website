import React, { useState, useEffect } from 'react';

export default function Hero({ onExploreClick }) {
  const [activeLook, setActiveLook] = useState(0);

  const heroLooks = [
    {
      id: 'panjabi',
      tag: 'SIGNATURE SUUNAH COLLECTION',
      title: 'TIMELESS',
      accent: 'Glow.',
      titleEnd: 'CURATED LUXURY',
      descBangla: 'ঐতিহ্যের রাজকীয় আভিজাত্য ও আধুনিক কাটিং—প্রিমিয়াম হ্যান্ডলুম ও জ্যাকোয়ার্ড সুতির নিখুঁত পাঞ্জাবি সম্ভার।',
      descEnglish: 'Pure Egyptian Jacquard & Handcrafted Embroidery. Made for the Modern Gentleman.',
      image: 'assets/images/panjabi.jpg',
      modelName: 'Royal Jacquard Ivory Panjabi',
      categoryTarget: 'panjabi'
    },
    {
      id: 'jubbah',
      tag: 'ARABIAN HERITAGE THOBE',
      title: 'DIGNIFIED',
      accent: 'Thobe.',
      titleEnd: 'SILKY MATTE',
      descBangla: 'সংযুক্ত আরব আমিরাত ও মরক্কোর ঐতিহ্যবাহী রিংকেল-ফ্রি প্রিমিয়াম সিল্কি ম্যাট ফেব্রিকের তৈরি জুব্বা।',
      descEnglish: 'Wrinkle-Free Breathable Fabric tailored for Jumu\'ah, Umrah & Daily Elegance.',
      image: 'assets/images/jubbah.jpg',
      modelName: 'Emirati Silky White Jubbah',
      categoryTarget: 'jubbah'
    },
    {
      id: 'tshirt',
      tag: 'MINIMAL STREETWEAR TEE',
      title: 'OVERSIZED',
      accent: 'Minimal.',
      titleEnd: 'HEAVYWEIGHT TEE',
      descBangla: '২৪০ জিএসএম ড্রপ-শোল্ডার কম্বড সুপীমা কটন—দৈনন্দিন আরাম ও রুচিশীল আধুনিক আউটলুক।',
      descEnglish: '240 GSM Combed Ring-Spun Cotton with High-Density Ribbed Collar.',
      image: 'assets/images/tshirt.jpg',
      modelName: 'Mocha Heavyweight Oversized Tee',
      categoryTarget: 'tshirt'
    }
  ];

  // Automatic slide transition every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveLook((prev) => (prev + 1) % heroLooks.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroLooks.length]);

  const current = heroLooks[activeLook];

  return (
    <>
      {/* Hero Section - High-Fashion Editorial Luxury */}
      <section className="relative bg-[#090a0d] text-white overflow-hidden border-b border-stone-800">
        
        {/* Subtle Ambient Radial Glow for High-Fashion Atmosphere */}
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[450px] h-[450px] bg-stone-700/10 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center min-h-[580px] lg:min-h-[640px] py-12 lg:py-8">
            
            {/* Left Content Column: Editorial Typography */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              
              {/* High-Fashion Editorial Headline */}
              <h1 className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-black uppercase tracking-tight text-white leading-[0.98] mb-5">
                {current.title} <span className="font-serif italic font-normal text-amber-200/90 lowercase">{current.accent}</span><br />
                <span className="tracking-tighter bg-gradient-to-r from-white via-stone-200 to-stone-400 bg-clip-text text-transparent">
                  {current.titleEnd}
                </span>
              </h1>

              {/* Sub-Headline: Bengali & English Elegance */}
              <div className="space-y-1.5 max-w-xl mb-8">
                <p className="text-stone-300 text-xs sm:text-sm font-bangla leading-relaxed">
                  {current.descBangla}
                </p>
                <p className="text-stone-400 text-[11px] sm:text-xs font-sans tracking-wide uppercase">
                  {current.descEnglish}
                </p>
              </div>

              {/* Single Clean Action Button */}
              <div className="mb-8">
                <button 
                  onClick={onExploreClick}
                  className="bg-white hover:bg-stone-200 text-black font-black text-xs uppercase tracking-[0.2em] px-8 py-4 shadow-xl transition-all hover:shadow-2xl hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2 group"
                >
                  <span>SHOP THE COLLECTION</span>
                  <span className="group-hover:translate-x-1 transition-transform">➔</span>
                </button>
              </div>

              {/* Trust Badges Strip */}
              <div className="flex flex-wrap items-center gap-6 pt-5 border-t border-stone-800/80 text-[11px] text-stone-400 font-bangla">
                <div className="flex items-center gap-1.5">
                  <span className="text-amber-400 font-bold">✓</span>
                  <span>সারা বাংলাদেশে ক্যাশ অন ডেলিভারি</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-amber-400 font-bold">✓</span>
                  <span>৭ দিনের সহজ রিটার্ন ও এক্সচেঞ্জ</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-amber-400 font-bold">✓</span>
                  <span>১০০% খাঁটি লাক্সারি ফেব্রিক গ্যারান্টি</span>
                </div>
              </div>

            </div>

            {/* Right Visual Column: Frameless Male Model Showcase (Blends seamlessly into hero) */}
            <div className="lg:col-span-5 relative flex items-center justify-center lg:justify-end">
              
              {/* Frameless Container - No border, no box shadow, no frame */}
              <div className="relative w-full max-w-sm sm:max-w-md aspect-[3/4] sm:aspect-[4/5] flex items-center justify-center">
                
                {heroLooks.map((look, idx) => (
                  <div 
                    key={look.id}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                      activeLook === idx ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                    }`}
                  >
                    <img 
                      src={look.image} 
                      alt={look.modelName} 
                      className="w-full h-full object-cover object-top filter contrast-[1.04] brightness-[1.02]"
                    />
                    
                    {/* Seamless edge blending gradients: melts image borders into the dark hero background */}
                    <div className="absolute inset-y-0 left-0 w-24 sm:w-36 bg-gradient-to-r from-[#090a0d] via-[#090a0d]/60 to-transparent pointer-events-none"></div>
                    <div className="absolute inset-x-0 bottom-0 h-28 sm:h-36 bg-gradient-to-t from-[#090a0d] via-[#090a0d]/70 to-transparent pointer-events-none"></div>
                    <div className="absolute inset-x-0 top-0 h-16 sm:h-20 bg-gradient-to-b from-[#090a0d] to-transparent pointer-events-none"></div>
                    <div className="absolute inset-y-0 right-0 w-16 sm:w-20 bg-gradient-to-l from-[#090a0d] via-[#090a0d]/40 to-transparent pointer-events-none"></div>
                  </div>
                ))}

                {/* Minimal 5-second slide indicator bars */}
                <div className="absolute bottom-2 z-20 flex items-center gap-2">
                  {heroLooks.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveLook(idx)}
                      className={`h-1 transition-all duration-500 rounded-full ${
                        activeLook === idx ? 'w-8 bg-amber-400' : 'w-2 bg-white/30 hover:bg-white/60'
                      }`}
                      aria-label={`Slide ${idx + 1}`}
                    />
                  ))}
                </div>

              </div>

            </div>

          </div>
      </section>

      {/* 4-Item Feature Strip - Exact Minimal Line Icon Styling from NEON Reference (No Emojis, No AI Vibe) */}
      <section className="bg-white border-b border-stone-200 py-6">
        <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            
            {/* 1. Free Shipping */}
            <div className="flex items-center gap-3.5">
              <svg className="w-6 h-6 text-stone-900 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 3H1v13h15V3zM16 8h4.5l2.5 3v5h-7V8z" />
                <circle cx="5.5" cy="18.5" r="2.5" />
                <circle cx="18.5" cy="18.5" r="2.5" />
              </svg>
              <div>
                <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider">FREE SHIPPING</h4>
                <p className="text-[11px] text-stone-500 font-sans">On all orders above ৳3,000</p>
              </div>
            </div>

            {/* 2. Premium Quality */}
            <div className="flex items-center gap-3.5">
              <svg className="w-6 h-6 text-stone-900 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.3">
                <circle cx="12" cy="9" r="6" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l2 2 4-4M8.5 14.5L7 22l5-2.5 5 2.5-1.5-7.5" />
              </svg>
              <div>
                <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider">PREMIUM QUALITY</h4>
                <p className="text-[11px] text-stone-500 font-sans">Handpicked & quality checked</p>
              </div>
            </div>

            {/* 3. Easy Returns */}
            <div className="flex items-center gap-3.5">
              <svg className="w-6 h-6 text-stone-900 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h5M20 20v-5h-5M4 9a8 8 0 0113.65-4.65L20 7M20 15a8 8 0 01-13.65 4.65L4 17" />
              </svg>
              <div>
                <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider">EASY RETURNS</h4>
                <p className="text-[11px] text-stone-500 font-sans">Hassle free 7-day exchange</p>
              </div>
            </div>

            {/* 4. 24/7 Support */}
            <div className="flex items-center gap-3.5">
              <svg className="w-6 h-6 text-stone-900 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 18v-6a9 9 0 0118 0v6M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3v5zM3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3v5z" />
              </svg>
              <div>
                <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider">24/7 SUPPORT</h4>
                <p className="text-[11px] text-stone-500 font-sans">We're here to help anytime</p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
