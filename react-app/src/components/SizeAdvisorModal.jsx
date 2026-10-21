import React, { useState } from 'react';

export default function SizeAdvisorModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const [feet, setFeet] = useState(5);
  const [inches, setInches] = useState(8);
  const [weightKg, setWeightKg] = useState(68);
  const [result, setResult] = useState(null);

  const calculateSize = (e) => {
    e.preventDefault();
    const totalInches = (parseInt(feet) * 12) + parseInt(inches);
    const w = parseInt(weightKg);

    let size = 'L (40)';
    let note = 'আপনার উচ্চতা ও ওজনের জন্য পারফেক্ট সাইজ এল (৪০)। এটি স্মার্ট ও এলিগ্যান্ট ফিটিং দেবে।';

    if (w < 60 || totalInches < 65) {
      size = 'M (38)';
      note = 'আপনার বডি স্ট্রাকচার অনুযায়ী রেগুলার ফিট এম (৩৮) সবচেয়ে সুন্দরভাবে মানাবে।';
    } else if (w <= 74 && totalInches <= 69) {
      size = 'L (40)';
      note = 'আপনার উচ্চতা ও ওজনের জন্য পারফেক্ট সাইজ এল (৪০)। এটি স্মার্ট ও এলিগ্যান্ট ফিটিং দেবে।';
    } else if (w <= 86) {
      size = 'XL (42)';
      note = 'আপনার চেস্ট ও শোল্ডার আরামদায়ক রাখতে এক্সএল (৪২) বেছে নিন।';
    } else {
      size = 'XXL (44)';
      note = 'আপনার জন্য ডাবল এক্সএল (৪৪) সবচেয়ে উপযুক্ত এবং ব্রিদেবল হবে।';
    }

    setResult({ size, note });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal Dialog */}
      <div className="relative bg-white rounded-3xl max-w-md w-full shadow-2xl p-6 sm:p-8 z-10 font-bangla">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-stone-400 hover:text-stone-700 text-xl font-bold p-1"
        >
          ✕
        </button>

        <div className="flex items-center gap-2 mb-2 text-[#a28359]">
          <span className="text-xl">📏</span>
          <h3 className="font-bold text-stone-900 text-lg">স্মার্ট সাইজ সহায়ক (React)</h3>
        </div>
        <p className="text-xs text-stone-500 mb-5">
          আপনার উচ্চতা ও আনুমানিক ওজন দিলে আমাদের অ্যালগরিদম আপনার জন্য সেরা ফিটিং সাইজ নির্ধারণ করে দেবে।
        </p>

        <form onSubmit={calculateSize} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-stone-700 mb-1">উচ্চতা (ফুট ও ইঞ্চি):</label>
            <div className="grid grid-cols-2 gap-2">
              <select 
                value={feet} 
                onChange={(e) => setFeet(e.target.value)}
                className="bg-stone-50 border border-stone-200 rounded-xl p-2.5 text-stone-800"
              >
                <option value={5}>৫ ফুট</option>
                <option value={6}>৬ ফুট</option>
              </select>
              <select 
                value={inches} 
                onChange={(e) => setInches(e.target.value)}
                className="bg-stone-50 border border-stone-200 rounded-xl p-2.5 text-stone-800"
              >
                <option value={4}>৪ ইঞ্চি</option>
                <option value={5}>৫ ইঞ্চি</option>
                <option value={6}>৬ ইঞ্চি</option>
                <option value={7}>৭ ইঞ্চি</option>
                <option value={8}>৮ ইঞ্চি</option>
                <option value={9}>৯ ইঞ্চি</option>
                <option value={10}>১০ ইঞ্চি</option>
                <option value={11}>১১ ইঞ্চি</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-semibold text-stone-700 mb-1">ওজন (কেজি):</label>
            <input 
              type="number" 
              value={weightKg}
              onChange={(e) => setWeightKg(e.target.value)}
              min="45" 
              max="120"
              className="w-full bg-stone-50 border border-stone-200 rounded-xl p-2.5 text-stone-800"
            />
          </div>

          <button 
            type="submit"
            className="w-full bg-stone-900 hover:bg-stone-800 text-white font-bold py-3 rounded-xl transition-all shadow"
          >
            সাইজ চেক করুন
          </button>
        </form>

        {result && (
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl mt-4 animate-fade-in">
            <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm mb-1">
              <span>✓ আপনার প্রস্তাবিত সাইজ:</span>
              <span className="bg-emerald-600 text-white px-2.5 py-0.5 rounded text-xs font-bold">
                {result.size}
              </span>
            </div>
            <p className="text-xs text-emerald-700 leading-relaxed">
              {result.note}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
