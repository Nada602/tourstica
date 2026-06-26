// DestinationCard.jsx
import { forwardRef, useState } from "react";
import { Bookmark } from "lucide-react"; // أو أيقونة من مكتبتك

const DestinationCard = forwardRef(
  (
    {
      image,
      title,
      isSaved = false,
      onToggleSave,
      variant = "default", // "default" | "edge" (الكارت الأخير على الحافة)
      className = "",
    },
    ref,
  ) => {
    const [saved, setSaved] = useState(isSaved);

    const handleSave = () => {
      setSaved((prev) => !prev);
      onToggleSave?.(!saved);
    };

    return (
      <div
        ref={ref}
        className={`
          relative  overflow-hidden rounded-2xl
          ${variant === "edge" ? "w-[180px]" : "w-[220px]"}
          h-[320px] shadow-lg shadow-black/20
          ${className}
        `}
      >
        {/* الصورة */}
        <img
          src={image}
          alt={title}
          className="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-[#2B1B12]/60 via-transparent to-transparent" />

        <div className="absolute top-4 left-4 right-4">
          <h3 className="text-sm font-semibold text-[#F4EDE4] drop-shadow-sm">
            {title}
          </h3>
        </div>

        <button
          onClick={handleSave}
          aria-label={saved ? "unsave" : "save"}
          className="absolute top-4 right-4 grid h-8 w-8 place-items-center
                     rounded-full bg-[#F4EDE4]/90 backdrop-blur-sm
                     transition-transform hover:scale-105"
        >
          <Bookmark
            size={14}
            className={
              saved ? "fill-[#C4583A] text-[#C4583A]" : "text-[#2B1B12]"
            }
          />
        </button>
      </div>
    );
  },
);

DestinationCard.displayName = "DestinationCard";

export default DestinationCard;
