import React from 'react';

export default function CartDrawer({
  isOpen,
  onClose,
  cart = [],
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout
}) {
  if (!isOpen) return null;

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const freeShippingThreshold = 3000;
  const diff = freeShippingThreshold - subtotal;
  const progressPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  return (
    <div className="fixed inset-0 z-50 flex justify-end font-bangla">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Drawer */}
      <aside className="relative w-full max-w-md bg-white h-full shadow-2xl z-10 flex flex-col justify-between transform transition-transform duration-300">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-stone-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-[#a28359] text-lg">🛍️</span>
              <h3 className="font-bold text-stone-900 text-base">শপিং ব্যাগ</h3>
              <span className="text-xs bg-stone-100 text-stone-600 px-2 py-0.5 rounded-full font-bold">
                {cart.reduce((sum, item) => sum + item.quantity, 0)} টি আইটেম
              </span>
            </div>
            <button 
              onClick={onClose}
              className="p-2 text-stone-400 hover:text-stone-700 text-lg font-bold"
            >
              ✕
            </button>
          </div>

          {/* Free Shipping Bar */}
          <div className="mt-4 bg-amber-50 border border-amber-200/60 p-3 rounded-xl">
            <p className="text-xs text-amber-950 mb-2">
              {diff <= 0 ? (
                <span>🎉 অভিনন্দন! আপনি <strong>ফ্রি ডেলিভারি</strong> উপভোগ করছেন!</span>
              ) : (
                <span>আর মাত্র <strong>৳{diff.toLocaleString('bn-BD')}</strong> টাকার কেনাকাটায় <strong>ফ্রি ডেলিভারি!</strong></span>
              )}
            </p>
            <div className="w-full bg-stone-200 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-gradient-to-r from-amber-500 to-[#c5a880] h-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5">
          {cart.length === 0 ? (
            <div className="py-16 text-center">
              <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center mx-auto text-stone-400 mb-3 text-2xl">
                🛒
              </div>
              <h4 className="font-semibold text-stone-700 text-sm">আপনার ব্যাগ খালি</h4>
              <p className="text-xs text-stone-400 mt-1 mb-4">কালেকশন থেকে পছন্দসই পণ্য যোগ করুন।</p>
              <button 
                onClick={onClose}
                className="bg-stone-900 text-white text-xs py-2 px-5 rounded-xl font-semibold"
              >
                কেনাকাটা চালিয়ে যান
              </button>
            </div>
          ) : (
            <div className="divide-y divide-stone-100">
              {cart.map((item, index) => (
                <div key={`${item.id}-${item.size}-${item.color}`} className="flex gap-3 py-3.5">
                  <img 
                    src={item.image} 
                    alt={item.nameBangla} 
                    className="w-16 h-20 object-cover rounded-lg bg-stone-100 flex-shrink-0"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-semibold text-stone-900 text-sm line-clamp-1">{item.nameBangla}</h4>
                        <button 
                          onClick={() => onRemoveItem(index)}
                          className="text-stone-400 hover:text-red-500 transition-colors p-1 text-xs"
                          title="সরিয়ে ফেলুন"
                        >
                          🗑️
                        </button>
                      </div>
                      <p className="text-xs text-stone-500 mt-0.5">
                        সাইজ: {item.size} {item.color ? `| ${item.color}` : ''}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <span className="text-sm font-bold text-stone-900">
                        ৳{(item.price * item.quantity).toLocaleString('bn-BD')}
                      </span>
                      <div className="flex items-center border border-stone-200 rounded-lg overflow-hidden bg-white">
                        <button 
                          onClick={() => onUpdateQuantity(index, -1)}
                          className="w-7 h-7 flex items-center justify-center text-stone-600 hover:bg-stone-100 font-bold text-sm"
                        >
                          -
                        </button>
                        <span className="w-7 text-center text-xs font-semibold text-stone-800">
                          {item.quantity}
                        </span>
                        <button 
                          onClick={() => onUpdateQuantity(index, 1)}
                          className="w-7 h-7 flex items-center justify-center text-stone-600 hover:bg-stone-100 font-bold text-sm"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer & Proceed */}
        {cart.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-stone-200 bg-stone-50">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-stone-600">সাব-টোটাল:</span>
              <span className="text-lg font-bold text-stone-900">
                ৳{subtotal.toLocaleString('bn-BD')}
              </span>
            </div>
            <p className="text-[11px] text-stone-400 mb-4">
              * ডেলিভারি চার্জ চেকআউটের সময় নির্ধারণ করা হবে।
            </p>

            <button 
              onClick={onProceedToCheckout}
              className="w-full bg-stone-900 hover:bg-stone-800 text-white text-sm font-bold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow-lg transition-transform active:scale-95"
            >
              <span>⚡ ১-ক্লিকে দ্রুত চেকআউট করুন</span>
            </button>
          </div>
        )}
      </aside>
    </div>
  );
}
