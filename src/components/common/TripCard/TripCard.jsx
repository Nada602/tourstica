import { useState } from "react";
import styles from "./tripCard.module.css";
import { Clock, Heart, Trash2, MapPin } from "lucide-react";

function Stars({ rating }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <svg
          key={s}
          className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${
            s <= Math.round(rating) ? "text-[#f5a623]" : "text-gray-300"
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.368 2.447a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118L10 14.347l-3.352 2.777c-.784.57-1.838-.197-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.663 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.957z" />
        </svg>
      ))}
    </div>
  );
}

export default function TripCard({
  variant = "grid",
  image,
  title,
  location,
  category,
  rating = 5,
  reviews = 0,
  duration,
  tags = [],
  price,
  currency = "MAD",
  originalPrice,
  discount,
  perPersonLabel = "per person",
  featured = false,
  defaultLiked = false,
  onView,
  onBook,
  onRemove,
  onToggleLike,
}) {
  const isWishlist = variant === "wishlist";
  const [liked, setLiked] = useState(defaultLiked);

  function handleHeartClick() {
    setLiked((l) => {
      const next = !l;
      onToggleLike?.(next);
      return next;
    });
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col h-full transition-transform duration-300 hover:scale-105 hover:shadow-lg">
      <div className="relative h-44 sm:h-48 md:h-52 overflow-hidden flex-shrink-0">
        <img
          src={image}
          alt={title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />

        {!isWishlist && featured && (
          <span className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-[#c0442a] text-white text-[10px] sm:text-[11px] font-semibold px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full">
            Featured
          </span>
        )}

        <button
          onClick={isWishlist ? onRemove : handleHeartClick}
          aria-label={
            isWishlist
              ? "Remove from wishlist"
              : liked
                ? "Remove from wishlist"
                : "Add to wishlist"
          }
          className="absolute top-2 right-2 sm:top-3 sm:right-3 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow transition-transform duration-200 hover:scale-110"
        >
          {isWishlist ? (
            <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-500" />
          ) : (
            <Heart
              className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-colors duration-200 ${
                liked ? "fill-[#c0442a] text-[#c0442a]" : "text-gray-400"
              }`}
            />
          )}
        </button>

        {!isWishlist && duration != null && (
          <span className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3 bg-black/60 text-white text-[10px] sm:text-[11px] font-medium px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full flex items-center gap-1">
            <Clock className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
            {duration >= 24 ? `${duration / 24} Days` : `${duration} Hours`}
          </span>
        )}

        {isWishlist && price != null && (
          <span className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 bg-white/90 backdrop-blur-sm text-[#1a120b] text-[10px] sm:text-[11px] font-semibold px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full shadow">
            From {price} {currency}
          </span>
        )}
      </div>

      <div className="p-3 sm:p-4 flex flex-col gap-1.5 sm:gap-2 flex-1">
        {location && (
          <p className="text-[10px] sm:text-xs text-gray-400 font-medium flex flex-wrap items-center gap-1">
            {isWishlist && <MapPin className="w-3 h-3 text-[#c0442a]" />}
            <span className={isWishlist ? "text-[#c0442a]" : undefined}>
              {location}
            </span>
            {category && <span className="text-gray-400">· {category}</span>}
          </p>
        )}

        <p className={styles.title}>{title}</p>

        {!isWishlist && tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {tags.map((tag) => (
              <span
                key={tag}
                className="text-[9px] sm:text-[10px] text-gray-500 bg-gray-100 px-1.5 sm:px-2 py-0.5 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center gap-1 sm:gap-1.5">
          <Stars rating={rating} />
          <span className="text-xs sm:text-sm font-bold text-[#1a120b]">
            {rating}
          </span>
          <span className="text-[10px] sm:text-xs text-gray-400">
            ({reviews})
          </span>
        </div>

        <div
          className={`border-t border-gray-100 mt-auto pt-2 sm:pt-3 flex items-end gap-2 ${
            isWishlist ? "justify-end" : "justify-between"
          }`}
        >
          {isWishlist ? (
            <button
              onClick={onBook}
              className="flex-shrink-0 bg-[#c0442a] hover:bg-[#a83a24] text-white text-xs sm:text-sm font-semibold px-3 sm:px-5 py-1.5 sm:py-2 rounded-xl transition-colors duration-200"
            >
              Book Now
            </button>
          ) : (
            <>
              <div className="min-w-0">
                <p className="text-[9px] sm:text-[10px] text-gray-400 mb-0.5">
                  From
                </p>
                <div className="flex items-baseline gap-1 sm:gap-1.5 flex-wrap">
                  <span className="text-base sm:text-lg font-extrabold text-[#1a120b]">
                    {price} {currency}
                  </span>
                  {originalPrice != null && (
                    <span className="text-[10px] sm:text-xs text-gray-400 hidden sm:inline">
                      {currency} {originalPrice}
                    </span>
                  )}
                  {discount != null && (
                    <span className="bg-[#fde8e4] text-[#c0442a] text-[9px] sm:text-[10px] font-bold px-1 sm:px-1.5 py-0.5 rounded">
                      -{discount}%
                    </span>
                  )}
                </div>
                {perPersonLabel && (
                  <p className="text-[9px] sm:text-[10px] text-gray-400 mt-0.5">
                    {perPersonLabel}
                  </p>
                )}
              </div>

              <button
                onClick={onView}
                className="flex-shrink-0 bg-[#fcfbfa] hover:bg-[#c0442a] text-[#c0442a] hover:text-white outline outline-[#c0442a] text-xs sm:text-sm font-semibold px-3 sm:px-5 py-1.5 sm:py-2 rounded-xl transition-colors duration-200"
              >
                View
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
