const PRODUCTS_DATA = [
  {
    id: 'pj-01',
    nameBangla: 'রয়্যাল অ্যারাবিয়ান জ্যাকোয়ার্ড পাঞ্জাবি',
    nameEnglish: 'Royal Arabian Jacquard Panjabi',
    category: 'panjabi',
    price: 2950,
    originalPrice: 3450,
    discountPercentage: 15,
    image: 'https://images.unsplash.com/photo-1597983073493-88cd35cf93b0?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviewsCount: 128,
    badge: 'সেরা বিক্রীত',
    fabric: '১০০% প্রিমিয়াম লাক্সারি জ্যাকোয়ার্ড কটন',
    description: 'আধুনিক নিখুঁত কাটিং এবং সূক্ষ্ম টেক্সচারযুক্ত জ্যাকোয়ার্ড ফেব্রিকে প্রস্তুতকৃত এই পাঞ্জাবিটি জুম\'আ কিংবা যেকোনো বিশেষ উৎসবে আপনাকে এনে দেবে রাজকীয় স্নিগ্ধতা।',
    sizes: ['M (38)', 'L (40)', 'XL (42)', 'XXL (44)'],
    colors: [
      { name: 'Pure Ivory White', code: '#fcfbf7' },
      { name: 'Royal Olive', code: '#4b5320' },
      { name: 'Midnight Charcoal', code: '#212529' }
    ],
    inStock: true
  },
  {
    id: 'pj-02',
    nameBangla: 'প্রিমিয়াম ইজিপশিয়ান কটন কাবলি সেট',
    nameEnglish: 'Egyptian Cotton Kabli Suit Set',
    category: 'panjabi',
    price: 3650,
    originalPrice: 4200,
    discountPercentage: 13,
    image: 'https://images.unsplash.com/photo-1627916607164-7b20241db935?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    reviewsCount: 94,
    badge: 'নতুন কালেকশন',
    fabric: 'হাই-থ্রেড কাউন্ট ইজিপশিয়ান গিজা কটন',
    description: 'প্রিমিয়াম কাবলি পাঞ্জাবির সাথে ম্যাচিং ট্রাউজার/পায়জামা সেট। মেটাল বোতাম ও ডাবল স্টিচ ফিনিশিং দীর্ঘস্থায়ী আরাম নিশ্চিত করে।',
    sizes: ['M (38)', 'L (40)', 'XL (42)', 'XXL (44)'],
    colors: [
      { name: 'Slate Gray', code: '#708090' },
      { name: 'Deep Navy', code: '#000080' },
      { name: 'Jet Black', code: '#1a1a1a' }
    ],
    inStock: true
  },
  {
    id: 'pj-03',
    nameBangla: 'হ্যান্ডক্রাফটেড এমব্রয়ডারি সেমি-ফিটেড পাঞ্জাবি',
    nameEnglish: 'Hand-Embroidered Semi-Fitted Panjabi',
    category: 'panjabi',
    price: 2750,
    originalPrice: 3200,
    discountPercentage: 14,
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviewsCount: 86,
    badge: 'প্রিমিয়াম চয়েস',
    fabric: 'পিওর ফাইন কটন সুতি',
    description: 'কলার ও প্লাকেটে সূক্ষ্ম সুতোর কাজ করা আড়ং স্টাইলের ক্লাসিক হ্যান্ডলুম পাঞ্জাবি। গ্রীষ্ম ও বসন্তের জন্য শতভাগ আরামদায়ক।',
    sizes: ['M (38)', 'L (40)', 'XL (42)'],
    colors: [
      { name: 'Soft Mint', code: '#98ff98' },
      { name: 'Pastel Beige', code: '#e8dcce' },
      { name: 'Snow White', code: '#ffffff' }
    ],
    inStock: true
  },
  {
    id: 'jb-01',
    nameBangla: 'এমিরেটস লাক্সারি কাট জুব্বা (ইউএই স্টাইল)',
    nameEnglish: 'Emirati Luxury Cut Thobe / Jubbah',
    category: 'jubbah',
    price: 3950,
    originalPrice: 4600,
    discountPercentage: 14,
    image: 'https://images.unsplash.com/photo-1564557287817-3785e38ec1f5?auto=format&fit=crop&w=800&q=80',
    rating: 5.0,
    reviewsCount: 112,
    badge: 'ট্রেডিং',
    fabric: 'প্রিমিয়াম জাপানিজ সিল্কি ম্যাট ফেব্রিক',
    description: 'সংযুক্ত আরব আমিরাতের ঐতিহ্যবাহী আল-তারবুশ (ঝুলন্ত সুতা) ডিজাইন এবং নিখুঁত ফল বিশিষ্ট জুব্বা। কোনো ইস্ত্রি নষ্ট হয় না, রিংকেল-ফ্রি।',
    sizes: ['52 (Height 5\'4"-5\'6")', '54 (Height 5\'6"-5\'8")', '56 (Height 5\'8"-5\'10")', '58 (Height 5\'10"+)'],
    colors: [
      { name: 'Pristine White', code: '#fafafa' },
      { name: 'Desert Dune Sand', code: '#d4c7b8' },
      { name: 'Imperial Black', code: '#121212' }
    ],
    inStock: true
  },
  {
    id: 'jb-02',
    nameBangla: 'মরোক্কান হুডেড উইন্টার অ্যান্ড ফল জুব্বা',
    nameEnglish: 'Moroccan Royal Hooded Djellaba',
    category: 'jubbah',
    price: 4450,
    originalPrice: 5200,
    discountPercentage: 15,
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    reviewsCount: 63,
    badge: 'এক্সক্লুসিভ',
    fabric: 'হেভিওয়েট ট্রিপল-প্লাই প্রিমিয়াম ফেব্রিক',
    description: 'মরক্কোর রাজকীয় ঐতিহ্যবাহী হুডেড জেল্লাবা। প্রিমিয়াম জিওমেট্রিক বোতাম ও বর্ডার আর্টওয়ার্ক সমন্বিত।',
    sizes: ['54 (Height 5\'6"-5\'8")', '56 (Height 5\'8"-5\'10")', '58 (Height 5\'10"+)'],
    colors: [
      { name: 'Forest Green', code: '#2e493e' },
      { name: 'Charcoal Black', code: '#1e242b' }
    ],
    inStock: true
  },
  {
    id: 'at-01',
    nameBangla: 'দেহন আল উদ কাম্বোডি (আর্টিসানাল খাঁটি আতর)',
    nameEnglish: 'Dehn Al Oud Combodi Artisan Attar',
    category: 'attar',
    price: 2450,
    originalPrice: 2900,
    discountPercentage: 15,
    image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=800&q=80',
    rating: 5.0,
    reviewsCount: 245,
    badge: 'মাস্টারপিস',
    fabric: '১০০% খাঁটি অ্যালকোহল-মুক্ত প্রাকৃতিক তেল',
    description: 'কম্বোডিয়ান বন্য আগরউডের গভীর, মিষ্টি ও স্মোকি সুবাসের সংমিশ্রণ। রাজকীয় ও ঐতিহ্যবাহী আভিজাত্যের চূড়ান্ত প্রতীক।',
    sizes: ['3ml (টেস্টার ভায়াল)', '6ml (রয়্যাল উডেন বক্স)', '12ml (ভিআইপি ক্রিস্টাল বটল)'],
    colors: [
      { name: 'Golden Amber Essence', code: '#d4af37' }
    ],
    fragranceNotes: {
      top: 'স্পাইসি সুইট বার্গামট ও দারুচিনির হালকা ছোঁয়া',
      heart: 'খাঁটি কম্বোডিয়ান আগরউড (Pure Agarwood)',
      base: 'গভীর স্মোকি লেদার, আম্বার ও কস্তুরী (Musk)',
      longevity: '১৪+ ঘণ্টা স্থায়ী সুবাস',
      projection: 'শক্তিশালী রাজকীয় প্রজেকশন (Strong & Noble)'
    },
    inStock: true
  },
  {
    id: 'at-02',
    nameBangla: 'রয়্যাল হোয়াইট মাস্ক (স্নিগ্ধ ও আত্মিক সুবাস)',
    nameEnglish: 'Royal White Musk Concentrated Oil',
    category: 'attar',
    price: 1350,
    originalPrice: 1650,
    discountPercentage: 18,
    image: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviewsCount: 198,
    badge: 'সেরা উপহার',
    fabric: 'নন-অ্যালকোহলিক পারফিউম কনসেন্ট্রেট',
    description: 'পবিত্র কাবা প্রাঙ্গনের মতো প্রশান্তিময়, স্নিগ্ধ এবং মৃদু মিষ্টি সুবাস। প্রতিদিনের সালাত ও বিশেষ মুহূর্তের সঙ্গী।',
    sizes: ['3ml', '6ml', '12ml'],
    colors: [
      { name: 'Pure Pearl Oil', code: '#f5f5f5' }
    ],
    fragranceNotes: {
      top: 'লিলি অফ দ্য ভ্যালি ও সফট ফ্রুটস',
      heart: 'পাউডারি আইরিস ও সাদা ফুলের পাপড়ি',
      base: 'ক্রিমি চন্দন ও খাঁটি হোয়াইট মাস্ক',
      longevity: '১০+ ঘণ্টা মিষ্টি সুবাস',
      projection: 'মৃদু, মার্জিত ও আত্মিক প্রশান্তি'
    },
    inStock: true
  },
  {
    id: 'at-03',
    nameBangla: 'মদিনা রোজ অ্যান্ড আম্বার উড',
    nameEnglish: 'Madinah Rose & Amber Wood',
    category: 'attar',
    price: 1750,
    originalPrice: 2100,
    discountPercentage: 16,
    image: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    reviewsCount: 89,
    badge: 'স্পেশাল এডিশন',
    fabric: 'অর্গানিক অ্যারোমা ব্লেন্ড',
    description: 'তায়েফি গোলাপের রাজকীয় সৌরভ এবং উষ্ণ আম্বারের এক অপূর্ব মিলন। মন জুড়িয়ে যাওয়া আবেশ তৈরি করে।',
    sizes: ['6ml', '12ml'],
    colors: [
      { name: 'Ruby Amber Oil', code: '#cc7722' }
    ],
    fragranceNotes: {
      top: 'তায়েফি ফ্রেশ গোলাপ ও জাফরান',
      heart: 'স্যান্ডালউড ও কারামেল সুইট নোট',
      base: 'ওয়ার্ম আম্বার ও ড্রাই উডি ফরেস্ট',
      longevity: '১২+ ঘণ্টা',
      projection: 'মাঝারি থেকে স্ট্রং'
    },
    inStock: true
  },
  {
    id: 'ts-01',
    nameBangla: 'প্রিমিয়াম ড্রপ-শোল্ডার "সবর" ওভারসাইজড টি-শার্ট',
    nameEnglish: 'Sabr (Patience) Oversized Heavyweight Tee',
    category: 'tshirt',
    price: 790,
    originalPrice: 990,
    discountPercentage: 20,
    image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviewsCount: 310,
    badge: 'বেস্টসেলার',
    fabric: '২৪০ জিএসএম (GSM) কম্বড কটন',
    description: 'ন্যূনতম ও শৈল্পিক ইসলামিক ক্যালিগ্রাফি "সবর" খোদাইকৃত ড্রপ-শোল্ডার টি-শার্ট। রিং-স্পান সুতা যা বহু ওয়াশের পরেও কোমলতা ধরে রাখে।',
    sizes: ['M (Chest 40)', 'L (Chest 42)', 'XL (Chest 44)', 'XXL (Chest 46)'],
    colors: [
      { name: 'Vintage Acid Washed Black', code: '#2b2b2b' },
      { name: 'Sage Olive Green', code: '#556b2f' },
      { name: 'Raw Bone White', code: '#f4f1ea' }
    ],
    inStock: true
  },
  {
    id: 'ts-02',
    nameBangla: 'সুপীমা কটন মিনিমালিস্ট পোলো টি-শার্ট',
    nameEnglish: 'Supima Cotton Minimalist Luxury Polo',
    category: 'tshirt',
    price: 980,
    originalPrice: 1250,
    discountPercentage: 21,
    image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=800&q=80',
    rating: 4.7,
    reviewsCount: 77,
    badge: 'ক্লাসিক লুক',
    fabric: '১০০% ইউএসএ সুপীমা কটন (Supima Cotton)',
    description: 'অফিস ক্যাজুয়াল কিংবা হালকা আড্ডার জন্য উপযুক্ত লাক্সারি পোলো। অ্যান্টি-পিলিং ও চমৎকার ব্রিদেবল টেক্সচার।',
    sizes: ['M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Navy Blue', code: '#1a2942' },
      { name: 'Charcoal Melange', code: '#3e444c' },
      { name: 'Off-White Ivory', code: '#fcfcfc' }
    ],
    inStock: true
  }
];

// Sample Combo Sets (Shop the Look)
const COMBO_SETS = [
  {
    id: 'combo-jumuah',
    title: 'জুমু\'আ সুন্নাহ লাক্সারি বান্ডেল',
    subtitle: 'পাঞ্জাবি + পায়জামা + ৬মিলি রয়্যাল দেহন আল উদ আতর',
    price: 5200,
    originalPrice: 6500,
    savings: 1300,
    image: 'https://images.unsplash.com/photo-1597983073493-88cd35cf93b0?auto=format&fit=crop&w=800&q=80',
    items: [
      'রয়্যাল অ্যারাবিয়ান জ্যাকোয়ার্ড পাঞ্জাবি (আইভরি হোয়াইট)',
      'প্রিমিয়াম সুতি পায়জামা',
      'দেহন আল উদ কাম্বোডি আতর (৬মিলি গিফট বক্স)'
    ]
  }
];
