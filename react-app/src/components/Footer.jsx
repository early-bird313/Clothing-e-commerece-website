import React from 'react';

export default function Footer({ onOpenSizeAdvisor, onSelectCategory }) {
  return (
    <footer className="bg-white text-stone-700 pt-16 pb-8 border-t border-stone-200">
      <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12">
        
        {/* Main 5-Column Grid matching NEON reference */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-14 border-b border-stone-200 text-left">
          
          {/* 1. Brand Info */}
          <div className="lg:col-span-1">
            <span className="font-serif text-2xl font-bold tracking-[0.18em] text-[#222429] uppercase block mb-1">
              ABHA
            </span>
            <span className="text-[8px] tracking-[0.25em] text-stone-400 font-semibold uppercase block mb-3">
              THE GLOW OF NEW TRENDS
            </span>
            <p className="text-xs text-stone-500 leading-relaxed mb-6 font-bangla">
              আধুনিক রুচিশীল পুরুষদের জন্য নিখুঁত কাটিংয়ের পাঞ্জাবি, অ্যারাবিয়ান জুব্বা এবং শতভাগ খাঁটি সুবাসের রাজকীয় সম্ভার।
            </p>
            <div className="flex items-center gap-3 text-stone-900">
              <a href="#" className="w-8 h-8 rounded-full bg-stone-100 hover:bg-black hover:text-white flex items-center justify-center transition-colors text-xs font-bold">IG</a>
              <a href="#" className="w-8 h-8 rounded-full bg-stone-100 hover:bg-black hover:text-white flex items-center justify-center transition-colors text-xs font-bold">FB</a>
              <a href="https://wa.me/8801700000000" className="w-8 h-8 rounded-full bg-stone-100 hover:bg-black hover:text-white flex items-center justify-center transition-colors text-xs font-bold">WA</a>
            </div>
          </div>

          {/* 2. Shop Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-black mb-4">SHOP</h4>
            <ul className="space-y-2.5 text-xs text-stone-600">
              <li>
                <button onClick={() => onSelectCategory('all')} className="hover:text-black transition-colors uppercase">
                  All Products
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('panjabi')} className="hover:text-black transition-colors uppercase">
                  Panjabi & Kabli
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('jubbah')} className="hover:text-black transition-colors uppercase">
                  Arabian Jubbah
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('attar')} className="hover:text-black transition-colors uppercase">
                  Pure Attar & Oud
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('tshirt')} className="hover:text-black transition-colors uppercase">
                  Minimal T-Shirts
                </button>
              </li>
            </ul>
          </div>

          {/* 3. Company Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-black mb-4">COMPANY</h4>
            <ul className="space-y-2.5 text-xs text-stone-600">
              <li><a href="#" className="hover:text-black transition-colors uppercase">About Us</a></li>
              <li><a href="#" className="hover:text-black transition-colors uppercase">Contact Us</a></li>
              <li><a href="#" className="hover:text-black transition-colors uppercase">Shipping & Delivery</a></li>
              <li><a href="#" className="hover:text-black transition-colors uppercase">Returns & Refunds</a></li>
              <li><a href="#" className="hover:text-black transition-colors uppercase">Privacy Policy</a></li>
            </ul>
          </div>

          {/* 4. Help & Support */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-black mb-4">HELP</h4>
            <ul className="space-y-2.5 text-xs text-stone-600">
              <li><a href="#" className="hover:text-black transition-colors uppercase">FAQs</a></li>
              <li><a href="#" className="hover:text-black transition-colors uppercase">Track Your Order</a></li>
              <li>
                <button onClick={onOpenSizeAdvisor} className="hover:text-black transition-colors uppercase">
                  Size Guide
                </button>
              </li>
              <li><a href="#" className="hover:text-black transition-colors uppercase">Terms & Conditions</a></li>
            </ul>
          </div>

          {/* 5. Newsletter Sign Up (Exactly like NEON reference) */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-black mb-4">NEWSLETTER</h4>
            <p className="text-xs text-stone-500 mb-3 leading-relaxed">
              Get exclusive updates on new drops and private offers.
            </p>
            <form onSubmit={(e) => { e.preventDefault(); alert('Thank you for subscribing to ABHA newsletter!'); }} className="flex items-center">
              <input 
                type="email" 
                required 
                placeholder="Enter your email" 
                className="w-full bg-stone-50 border border-stone-200 text-xs px-3 py-2.5 outline-none focus:border-black rounded-none"
              />
              <button 
                type="submit" 
                className="bg-black hover:bg-stone-800 text-white px-4 py-2.5 text-xs font-bold uppercase rounded-none transition-colors"
              >
                ➔
              </button>
            </form>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
          <p>© 2026 ABHA. The Glow of New Trends. All rights reserved.</p>
          <div className="flex items-center gap-3">
            <span className="text-stone-700 font-bold">bKash</span>
            <span>•</span>
            <span className="text-stone-700 font-bold">Nagad</span>
            <span>•</span>
            <span className="text-stone-700 font-bold">Cash on Delivery</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
