import React from 'react';

export default function OrderSuccessModal({ order, onClose }) {
  if (!order) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 font-bangla">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm"></div>

      {/* Dialog */}
      <div className="relative bg-white rounded-3xl max-w-md w-full shadow-2xl p-6 sm:p-8 z-10 text-center animate-fade-in">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4 text-2xl font-bold animate-bounce">
          ✓
        </div>

        <h3 className="font-bold text-stone-900 text-xl mb-1">
          আলহামদুলিল্লাহ! আপনার অর্ডার সফল হয়েছে
        </h3>
        <p className="text-xs text-stone-500 mb-5">
          আমাদের কাস্টমার কেয়ার টিম শীঘ্রই ফোন করে অর্ডারটি ভেরিফাই করবেন।
        </p>

        <div className="bg-stone-50 p-4 rounded-xl text-left text-xs space-y-1.5 border border-stone-200 mb-5">
          <div className="flex justify-between">
            <strong>অর্ডার নম্বর:</strong> 
            <span className="font-mono text-stone-800 font-bold">#{order.orderId}</span>
          </div>
          <div className="flex justify-between">
            <strong>গ্রাহক:</strong> 
            <span>{order.name}</span>
          </div>
          <div className="flex justify-between">
            <strong>মোবাইল:</strong> 
            <span>{order.phone}</span>
          </div>
          <div className="flex justify-between">
            <strong>পেমেন্ট মেথড:</strong> 
            <span>{order.paymentMethod === 'cod' ? 'ক্যাশ অন ডেলিভারি' : 'বিকাশ / নগদ'}</span>
          </div>
          <div className="flex justify-between text-sm font-bold text-stone-900 pt-2 border-t border-stone-200">
            <span>মোট বিল:</span> 
            <span>৳{order.grandTotal.toLocaleString('bn-BD')}</span>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <a 
            href="https://wa.me/8801700000000" 
            target="_blank" 
            rel="noreferrer"
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow"
          >
            <span>💬 হোয়াটসঅ্যাপে দ্রুত আপডেট নিন</span>
          </a>

          <button 
            onClick={onClose}
            className="bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold text-xs py-2.5 px-4 rounded-xl"
          >
            আরও কেনাকাটা করুন
          </button>
        </div>
      </div>
    </div>
  );
}
