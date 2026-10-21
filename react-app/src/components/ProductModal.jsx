import React, { useState } from 'react';

export default function ProductModal({
  product,
  onClose,
  onAddToCart,
  onBuyNowDirect,
  onOpenSizeAdvisor
}) {
  if (!product) return null;

  const [selectedSize, setSelectedSize] = useState(product.sizes ? product.sizes[0] : 'Standard');
  const [selectedColor, setSelectedColor] = useState(product.colors && product.colors[0] ? product.colors[0].name : '');

  const hasFragrance = product.category === 'attar';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal Dialog */}
      <div className="relative bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8 z-10 font-bangla">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-stone-400 hover:text-stone-700 p-2 text-xl font-bold z-20"
        >
          ✕
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {/* Left: Product Image */}
          <div className="relative rounded-2xl overflow-hidden bg-stone-100 aspect-[4/5] max-h-[480px]">
            <img 
              src={product.image} 
              alt={product.nameBangla} 
              className="w-full h-full object-cover" 
            />
            <span className="absolute top-4 left-4 bg-stone-900/90 text-[#c5a880] text-xs font-semibold px-3 py-1 rounded-full">
              {product.badge}
            </span>
          </div>

          {/* Right: Product Details & Controls */}
          <div className="flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-amber-100 text-amber-900 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                  {product.category === 'panjabi' ? 'লাক্সারি পাঞ্জাবি' : product.category === 'jubbah' ? 'প্রিমিয়াম জুব্বা' : product.category === 'attar' ? 'বিশুদ্ধ আতর' : 'টি-শার্ট'}
                </span>
                <div className="flex items-center gap-1 text-amber-500 text-xs">
                  <span>★</span>
                  <span className="font-bold text-stone-800">{product.rating}</span>
                  <span className="text-stone-400">({product.reviewsCount} টি রিভিউ)</span>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-stone-900 leading-snug mb-1">
                {product.nameBangla}
              </h2>
              <p className="text-sm text-stone-400 font-serif italic mb-3">
                {product.nameEnglish}
              </p>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-4 pb-4 border-b border-stone-200">
                <span className="text-2xl font-bold text-stone-900">
                  ৳{product.price.toLocaleString('bn-BD')}
                </span>
                {product.originalPrice && (
                  <span className="text-base text-stone-400 line-through">
                    ৳{product.originalPrice.toLocaleString('bn-BD')}
                  </span>
                )}
                {product.discountPercentage && (
                  <span className="text-xs bg-red-100 text-red-700 font-bold px-2 py-0.5 rounded">
                    {product.discountPercentage}% ছাড়
                  </span>
                )}
              </div>

              <p className="text-stone-600 text-sm leading-relaxed mb-4">
                {product.description}
              </p>

              {/* Fragrance Notes Breakdown */}
              {hasFragrance ? (
                <div className="mb-5 p-4 rounded-xl bg-gradient-to-br from-amber-50 to-stone-50 border border-amber-200/60">
                  <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                    <span>✨</span>
                    <span>সুগন্ধির নোটস ও ক্যারেক্টার</span>
                  </h4>
                  <div className="space-y-1.5 text-xs">
                    <div className="flex items-start gap-2">
                      <span className="font-semibold text-stone-700 min-w-[70px]">টপ নোট:</span>
                      <span className="text-stone-600">{product.fragranceNotes.top}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="font-semibold text-stone-700 min-w-[70px]">হার্ট নোট:</span>
                      <span className="text-stone-600">{product.fragranceNotes.heart}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="font-semibold text-stone-700 min-w-[70px]">বেস নোট:</span>
                      <span className="text-stone-600">{product.fragranceNotes.base}</span>
                    </div>
                    <div className="pt-2 mt-2 border-t border-amber-200/50 flex flex-wrap gap-4 text-amber-950 font-medium">
                      <span>⏱️ স্থায়িত্ব: <strong>{product.fragranceNotes.longevity}</strong></span>
                      <span>✨ প্রজেকশন: <strong>{product.fragranceNotes.projection}</strong></span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="mb-4 text-xs text-stone-700 flex items-center gap-2 bg-stone-100 py-2 px-3 rounded-lg">
                  <span className="text-[#a28359]">🪡</span>
                  <span><strong>ফেব্রিক:</strong> {product.fabric}</span>
                </div>
              )}

              {/* Size Selector */}
              {product.sizes && (
                <div className="mb-5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-stone-800 uppercase">
                      {hasFragrance ? 'পরিমাণ নির্বাচন করুন:' : 'সাইজ নির্বাচন করুন:'}
                    </span>
                    {!hasFragrance && (
                      <button 
                        onClick={onOpenSizeAdvisor}
                        className="text-xs text-[#a28359] hover:underline font-semibold flex items-center gap-1"
                      >
                        <span>📏 স্মার্ট সাইজ গাইড</span>
                      </button>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((s) => (
                      <button
                        key={s}
                        onClick={() => setSelectedSize(s)}
                        className={`text-xs py-2 px-3.5 rounded-lg border transition-all ${
                          selectedSize === s
                            ? 'border-stone-900 bg-stone-900 text-white font-semibold shadow-sm'
                            : 'border-stone-200 bg-white text-stone-700 hover:border-stone-400'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Color Selector */}
              {product.colors && product.colors.length > 0 && (
                <div className="mb-5">
                  <span className="text-xs font-bold text-stone-800 uppercase block mb-2">কালার:</span>
                  <div className="flex items-center gap-2">
                    {product.colors.map((c) => (
                      <button
                        key={c.name}
                        onClick={() => setSelectedColor(c.name)}
                        title={c.name}
                        style={{ backgroundColor: c.code }}
                        className={`w-7 h-7 rounded-full border-2 transition-transform ${
                          selectedColor === c.name
                            ? 'ring-2 ring-stone-900 scale-110 shadow'
                            : 'border-stone-300 hover:scale-105'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="pt-4 border-t border-stone-200 flex flex-col sm:flex-row gap-3">
              <button 
                onClick={() => onAddToCart(product, selectedSize, selectedColor)}
                className="flex-1 bg-stone-900 hover:bg-stone-800 text-white font-semibold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95 shadow"
              >
                <span className="text-[#c5a880]">🛍️</span>
                <span>কার্টে যোগ করুন</span>
              </button>
              <button 
                onClick={() => onBuyNowDirect(product, selectedSize, selectedColor)}
                className="flex-1 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-semibold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95 shadow"
              >
                <span>⚡ ১-ক্লিকে সরাসরি কিনুন</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
