import React from "react";
export default function Header({
  eyebrow,
  title,
  accentWord,
  subtitle,
  linkText,
  linkHref = "#",
  align = "left=[",
}) {
  const renderTitle = () => {
    if (!accentWord) return title;

    const parts = title.split(accentWord);
    return (
      <>
        {parts[0]}
        <span className="text-[#c0442a] italic">{accentWord}</span>
        {parts[1]}
      </>
    );
  };

  const isCenter = align === "center";

  return (
    <div
      className={`flex flex-col gap-3 mb-6 sm:mb-8 ${
        isCenter
          ? "items-center text-center"
          : "items-start sm:flex-row sm:items-start sm:justify-between"
      }`}
    >
      {/* Left / center block */}
      <div className={isCenter ? "flex flex-col items-center" : ""}>
        {/* Eyebrow */}
        {eyebrow && (
          <p className="flex items-center gap-2 text-xs font-semibold italic text-[#c0442a] uppercase tracking-widest mb-2">
            {!isCenter && (
              <span className="w-5 h-px bg-[#c0442a] inline-block" />
            )}
            {eyebrow}
          </p>
        )}

        {/* Title */}
        {title && (
          <h2 className="text-2xl font-serif sm:text-3xl md:text-4xl font-extrabold text-[#1a120b] leading-tight">
            {renderTitle()}
          </h2>
        )}

        {/* Subtitle */}
        {subtitle && (
          <p
            className={`text-sm text-[#7a6a5e] font-sans leading-relaxed mt-2 ${
              isCenter ? "max-w-lg" : "max-w-xl"
            }`}
          >
            {subtitle}
          </p>
        )}
      </div>

      {/* Right-side link — only shown on sm+ and only when not centered */}
      {linkText && !isCenter && (
        <a
          href={linkHref}
          className="hidden sm:flex items-center gap-1 text-sm font-semibold text-[#c0442a] hover:opacity-75 transition-opacity whitespace-nowrap mt-1 flex-shrink-0"
        >
          {linkText}
        </a>
      )}
    </div>
  );
}
