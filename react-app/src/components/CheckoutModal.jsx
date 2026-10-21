import React, { useState } from 'react';

export default function CheckoutModal({
  isOpen,
  onClose,
  cart = [],
  onConfirmOrder
}) {
  if (!isOpen) return null;

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [deliveryArea, setDeliveryArea] = useState('inside'); // 'inside' or 'outside'
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [error, setError] = useState('');

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const isFreeDelivery = subtotal >= 3000;
  const deliveryFee = isFreeDelivery ? 0 : (deliveryArea === 'inside' ? 70 : 130);
  const grandTotal = subtotal + deliveryFee;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !address.trim()) {
      setError('অনুগ্রহ করে নাম, ফোন নম্বর এবং সম্পূর্ণ ঠিকানা পূরণ করুন।');
      return;
    }

    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length < 11) {
      setError('সঠিক ১১ ডিজিটের মোবাইল নম্বর দিন (যেমন: 017XXXXXXXX)।');
      return;
    }

    setError('');
    onConfirmOrder({
      name,
      phone,
      address,
      deliveryArea,
      paymentMethod,
      subtotal,
      deliveryFee,
      grandTotal,
      cart
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 font-bangla">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal Dialog */}
      <div className="relative bg-white rounded-3xl max-w-lg w-full max-h-[95vh] overflow-y-auto shadow-2xl p-6 sm:p-8 z-10">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-stone-400 hover:text-stone-700 text-xl font-bold p-1"
        >
          ✕
        </button>

        <div className="flex items-center gap-2 mb-1 text-[#a28359]">
          <span className="text-xl">⚡</span>
          <h3 className="font-bold text-stone-900 text-lg">১-ক্লিক দ্রুত অর্ডার (React)</h3>
        </div>
        <p className="text-xs text-stone-500 mb-4">
          কোনো পাসওয়ার্ড ছাড়াই শুধু ডেলিভারির তথ্য দিয়ে অর্ডার নিশ্চিত করুন।
        </p>

        {/* Order Summary Box */}
        <div className="bg-stone-50 border border-stone-200 p-3.5 rounded-2xl mb-4 text-xs">
          <div className="space-y-1.5 mb-2 max-h-32 overflow-y-auto pr-1">
            {cart.map((item) => (
              <div key={`${item.id}-${item.size}`} className="flex justify-between py-1 border-b border-stone-100 last:border-b-0 text-stone-700">
                <span className="truncate max-w-[220px]">
                  {item.nameBangla} ({item.size}) × {item.quantity}
                </span>
                <span className="font-bold text-stone-900">
                  ৳{(item.price * item.quantity).toLocaleString('bn-BD')}
                </span>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-stone-200 space-y-1">
            <div className="flex justify-between text-stone-500">
              <span>সাব-টোটাল:</span>
              <span>৳{subtotal.toLocaleString('bn-BD')}</span>
            </div>
            <div className="flex justify-between text-stone-500">
              <span>ডেলিভারি চার্জ:</span>
              <span className={isFreeDelivery ? 'text-emerald-600 font-bold' : ''}>
                {isFreeDelivery ? 'ফ্রি' : `৳${deliveryFee.toLocaleString('bn-BD')}`}
              </span>
            </div>
            <div className="flex justify-between text-sm font-bold text-stone-900 pt-1.5 border-t border-stone-200">
              <span>সর্বমোট প্রদেয়:</span>
              <span className="text-[#a28359]">৳{grandTotal.toLocaleString('bn-BD')}</span>
            </div>
          </div>
        </div>

        {error && (
          <div className="p-3 mb-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs font-semibold">
            ⚠️ {error}
          </div>
        )}

        {/* Checkout Form */}
        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          <div>
            <label className="block font-semibold text-stone-700 mb-1">আপনার পূর্ণ নাম *</label>
            <input 
              type="text" 
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="উদা: আব্দুল্লাহ আল মামুন" 
              className="w-full bg-stone-50 border border-stone-200 rounded-xl p-2.5 focus:border-[#c5a880] focus:bg-white focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-semibold text-stone-700 mb-1">মোবাইল নম্বর (১১ ডিজিট) *</label>
            <input 
              type="tel" 
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="01XXXXXXXXX" 
              className="w-full bg-stone-50 border border-stone-200 rounded-xl p-2.5 focus:border-[#c5a880] focus:bg-white focus:outline-none font-mono"
            />
          </div>

          <div>
            <label className="block font-semibold text-stone-700 mb-1">সম্পূর্ণ ঠিকানা *</label>
            <textarea 
              rows="2" 
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="উদা: বাড়ি #১২, রোড #০৫, ব্লক সি, বনশ্রী, ঢাকা" 
              className="w-full bg-stone-50 border border-stone-200 rounded-xl p-2.5 focus:border-[#c5a880] focus:bg-white focus:outline-none"
            />
          </div>

          {/* Location Area Selection */}
          <div>
            <label className="block font-semibold text-stone-700 mb-1.5">ডেলিভারি লোকেশন:</label>
            <div className="grid grid-cols-2 gap-3">
              <label 
                className={`flex items-center gap-2 p-2.5 border rounded-xl cursor-pointer transition-all ${
                  deliveryArea === 'inside' ? 'border-stone-900 bg-stone-50' : 'border-stone-200'
                }`}
              >
                <input 
                  type="radio" 
                  name="delivery-area" 
                  checked={deliveryArea === 'inside'} 
                  onChange={() => setDeliveryArea('inside')} 
                />
                <div>
                  <span className="font-bold text-stone-800 block">ঢাকার ভিতরে</span>
                  <span className="text-[10px] text-stone-500">চার্জ: ৳৭০</span>
                </div>
              </label>

              <label 
                className={`flex items-center gap-2 p-2.5 border rounded-xl cursor-pointer transition-all ${
                  deliveryArea === 'outside' ? 'border-stone-900 bg-stone-50' : 'border-stone-200'
                }`}
              >
                <input 
                  type="radio" 
                  name="delivery-area" 
                  checked={deliveryArea === 'outside'} 
                  onChange={() => setDeliveryArea('outside')} 
                />
                <div>
                  <span className="font-bold text-stone-800 block">ঢাকার বাইরে</span>
                  <span className="text-[10px] text-stone-500">চার্জ: ৳১৩০</span>
                </div>
              </label>
            </div>
          </div>

          {/* Payment Method */}
          <div>
            <label className="block font-semibold text-stone-700 mb-1.5">পেমেন্ট মেথড:</label>
            <div className="space-y-2">
              <label className="flex items-center justify-between p-2.5 border border-stone-300 bg-amber-50/50 rounded-xl cursor-pointer">
                <div className="flex items-center gap-2">
                  <input 
                    type="radio" 
                    name="payment" 
                    checked={paymentMethod === 'cod'} 
                    onChange={() => setPaymentMethod('cod')} 
                  />
                  <span className="font-bold text-stone-900">ক্যাশ অন ডেলিভারি (পণ্য পেয়ে টাকা দিন)</span>
                </div>
                <span>💵</span>
              </label>
              <label className="flex items-center justify-between p-2.5 border border-stone-200 rounded-xl cursor-pointer">
                <div className="flex items-center gap-2">
                  <input 
                    type="radio" 
                    name="payment" 
                    checked={paymentMethod === 'bkash'} 
                    onChange={() => setPaymentMethod('bkash')} 
                  />
                  <span className="font-semibold text-stone-700">বিকাশ / নগদ (অনলাইন পেমেন্ট)</span>
                </div>
                <span className="text-[10px] bg-pink-100 text-pink-700 font-bold px-2 py-0.5 rounded">bKash</span>
              </label>
            </div>
          </div>

          <button 
            type="submit"
            className="w-full bg-stone-900 hover:bg-stone-800 text-white font-bold text-sm py-3.5 px-4 rounded-xl shadow-lg transition-transform active:scale-95 flex items-center justify-center gap-2 mt-2"
          >
            <span>✓ অর্ডার নিশ্চিত করুন</span>
          </button>
        </form>
      </div>
    </div>
  );
}
