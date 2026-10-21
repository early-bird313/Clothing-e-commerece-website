import React from 'react';

export default function ProductCard({
  product,
  isWishlisted,
  onToggleWishlist,
  onOpenDetails,
  onAddToCart
}) {
  const hasFragrance = product.category === 'attar';

  return (
    <div className="group bg-white rounded-none border border-stone-100 flex flex-col justify-between hover:shadow-lg transition-all duration-300">
      <div>
        {/* Product Image on Clean Light Neutral Background (like NEON reference) */}
        <div 
          className="relative aspect-[4/5] bg-[#f8f8f8] overflow-hidden cursor-pointer flex items-center justify-center p-3"
          onClick={() => onOpenDetails(product)}
        >
          <img 
            src={product.image} 
            alt={product.nameBangla} 
            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />

          {/* Badges */}
          <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10">
            <span className="bg-black text-white text-[9px] uppercase tracking-wider font-bold px-2 py-0.5">
              {product.badge}
            </span>
            {product.discountPercentage && (
              <span className="bg-stone-800 text-white text-[9px] font-bold px-2 py-0.5">
                -{product.discountPercentage}%
              </span>
            )}
          </div>

          {/* Wishlist Heart Icon */}
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onToggleWishlist(product.id);
            }}
            className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-stone-700 hover:text-black shadow-sm transition-transform active:scale-90"
            title="Wishlist"
          >
            <span className={isWishlisted ? 'text-red-500 text-sm' : 'text-stone-400 text-sm'}>
              {isWishlisted ? '♥' : '♡'}
            </span>
          </button>
        </div>

        {/* Product Meta */}
        <div className="p-4 text-left">
          <p className="text-[10px] tracking-widest uppercase text-stone-400 font-semibold mb-1">
            {product.category === 'panjabi' ? 'Panjabi' : product.category === 'jubbah' ? 'Jubbah' : product.category === 'attar' ? 'Artisan Oud' : 'T-Shirt'}
          </p>

          <h3 
            onClick={() => onOpenDetails(product)}
            className="font-bangla font-semibold text-stone-900 text-sm sm:text-base leading-snug hover:text-black cursor-pointer line-clamp-1 mb-0.5"
            title={product.nameBangla}
          >
            {product.nameBangla}
          </h3>

          <p className="text-[11px] text-stone-400 font-sans tracking-wide uppercase truncate mb-2">
            {product.nameEnglish}
          </p>

          {hasFragrance ? (
            <p className="text-[11px] text-amber-800 font-bangla mb-2 truncate">
              ✨ {product.fragranceNotes.heart}
            </p>
          ) : (
            <p className="text-[11px] text-stone-500 font-bangla mb-2 truncate">
              ✓ {product.fabric}
            </p>
          )}

          {/* Price */}
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-base font-bold text-stone-950 font-bangla">
              ৳{product.price.toLocaleString('bn-BD')}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-stone-400 line-through font-bangla">
                ৳{product.originalPrice.toLocaleString('bn-BD')}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Solid Black "ADD TO CART" Button exactly matching NEON reference */}
      <div className="p-4 pt-0">
        <button 
          onClick={() => onAddToCart(
            product, 
            product.sizes ? product.sizes[0] : 'Standard', 
            product.colors && product.colors[0] ? product.colors[0].name : ''
          )}
          className="w-full bg-black hover:bg-stone-800 text-white text-[11px] font-bold uppercase tracking-widest py-3 rounded-none transition-colors active:scale-95 shadow-sm"
        >
          ADD TO CART
        </button>
      </div>
    </div>
  );
}
