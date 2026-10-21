import React from 'react';

export default function Categories({ onSelectCategory }) {
  const categories = [
    {
      id: 'panjabi',
      title: 'PANJABI',
      bangla: 'পাঞ্জাবি ও কাবলি',
      image: 'assets/images/panjabi.jpg'
    },
    {
      id: 'jubbah',
      title: 'JUBBAH',
      bangla: 'অ্যারাবিয়ান জুব্বা',
      image: 'assets/images/jubbah.jpg'
    },
    {
      id: 'attar',
      title: 'ATTAR & OUD',
      bangla: 'খাঁটি আতর ও সুবাস',
      image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'tshirt',
      title: 'T-SHIRTS',
      bangla: 'মিনিমাল টি-শার্ট',
      image: 'assets/images/tshirt.jpg'
    }
  ];

  return (
    <section id="shop-by-category" className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12 py-16 scroll-mt-20">
      {/* Centered Heading exactly matching NEON reference */}
      <div className="text-center mb-10">
        <h2 className="text-xl sm:text-2xl font-bold font-sans tracking-[0.2em] text-stone-900 uppercase">
          SHOP BY CATEGORY
        </h2>
        <div className="w-10 h-0.5 bg-stone-900 mx-auto mt-2"></div>
      </div>

      {/* Grid matching the NEON category strip - Wide screen filling */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
        {categories.map((cat) => (
          <div 
            key={cat.id}
            onClick={() => onSelectCategory(cat.id)}
            className="group relative rounded-none overflow-hidden aspect-[3/4] bg-stone-900 cursor-pointer shadow-sm hover:shadow-md transition-all"
          >
            {/* Real User Reference Images */}
            <img 
              src={cat.image} 
              alt={cat.title} 
              className="w-full h-full object-cover object-top opacity-90 group-hover:scale-105 group-hover:opacity-80 transition-all duration-500" 
            />

            {/* Dark aesthetic overlay */}
            <div className="absolute inset-0 bg-black/35 group-hover:bg-black/45 transition-colors flex flex-col items-center justify-center p-4 text-center">
              <h3 className="text-sm sm:text-base font-bold text-white tracking-[0.2em] uppercase font-sans mb-1 drop-shadow-sm">
                {cat.title}
              </h3>
              <p className="text-[11px] text-stone-200 font-bangla mb-3 opacity-95">
                {cat.bangla}
              </p>
              
              <span className="text-[10px] tracking-[0.2em] font-bold text-white uppercase border-b border-white pb-0.5 group-hover:text-amber-200 group-hover:border-amber-200 transition-colors">
                SHOP NOW
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
