// import { useGSAP } from "@gsap/react";
// import gsap from "gsap";
// import React, { forwardRef } from "react";

// const Header = forwardRef(function Header(
//   {
//     eyebrow,
//     title,
//     accentWord,
//     subtitle,
//     linkText,
//     linkHref = "#",
//     align = "left",
//   },
//   ref,
// ) {
//   const renderTitle = () => {
//     if (!accentWord) return title;
//     const parts = title.split(accentWord);
//     return (
//       <>
//         {parts[0]}
//         <span className="text-[#c0442a] italic">{accentWord}</span>
//         {parts[1]}
//       </>
//     );
//   };

//   const isCenter = align === "center";

//   useGSAP(() => {
//     if (!ref?.current) return;
//     gsap.from(ref.current, {
//       x: -80,
//       opacity:0,
//       duration: 1,
//       ease: "power1.in",
//       scrollTrigger: {
//         trigger: ref.current,
//         start: "top 80%", // animation starts when top of header hits 80% down the viewport
//         toggleActions: "play none none none",
//         // markers: true,        // uncomment temporarily to visualize trigger points while debugging
//       },
//     });
//     // dropped the paired gsap.to — it fights the .from, same issue as before
//   }, []);

//   return (
//     <div
//       className={`flex flex-col gap-3 mb-6 sm:mb-8 ${
//         isCenter
//           ? "items-center text-center"
//           : "items-start sm:flex-row sm:items-start sm:justify-between"
//       }`}
//     >
//       <div className={isCenter ? "flex flex-col items-center" : ""}>
//         {eyebrow && (
//           <p className="flex items-center gap-2 text-xs font-semibold italic text-[#c0442a] uppercase tracking-widest mb-2">
//             {!isCenter && (
//               <span className="w-5 h-px bg-[#c0442a] inline-block" />
//             )}
//             {eyebrow}
//           </p>
//         )}

//         {title && (
//           <h2
//             ref={ref}
//             className="text-2xl font-serif sm:text-3xl md:text-4xl font-extrabold text-[#1a120b] leading-tight"
//           >
//             {renderTitle()}
//           </h2>
//         )}

//         {subtitle && (
//           <p
//             className={`text-sm text-[#7a6a5e] font-sans leading-relaxed mt-2 ${
//               isCenter ? "max-w-lg" : "max-w-xl"
//             }`}
//           >
//             {subtitle}
//           </p>
//         )}
//       </div>

//       {linkText && !isCenter && (
//         <a
//           href={linkHref}
//           className="hidden sm:flex items-center gap-1 text-sm font-semibold text-[#c0442a] hover:opacity-75 transition-opacity whitespace-nowrap mt-1 flex-shrink-0"
//         >
//           {linkText}
//         </a>
//       )}
//     </div>
//   );
// });

// export default Header;

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { forwardRef, useRef } from "react";

const Header = forwardRef(function Header(
  {
    eyebrow,
    title,
    accentWord,
    subtitle,
    linkText,
    linkHref = "#",
    align = "left",
  },
  ref,
) {
  const eyebrowRef = useRef(null);
  const subtitleRef = useRef(null);

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

  useGSAP(() => {
    if (!ref?.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ref.current,
        start: "top 80%",
        toggleActions: "play none none none",
      },
      defaults: { ease: "power2.out" }, // shared ease so nothing feels mismatched
    });

    tl.from(eyebrowRef.current, {
      opacity: 0,
      y: 10,
      duration: 0.5,
    })
      .from(
        ref.current,
        {
          x: -60,
          opacity: 0,
          duration: 0.7,
        },
        "-=0.25", // overlap slightly with the eyebrow so it doesn't feel disjointed
      )
      .from(
        subtitleRef.current,
        {
          y: 15,
          opacity: 0,
          duration: 0.5,
        },
        "-=0.3",
      );
  }, []);

  return (
    <div
      className={`flex flex-col gap-3 mb-6 sm:mb-8 ${
        isCenter
          ? "items-center text-center"
          : "items-start sm:flex-row sm:items-start sm:justify-between"
      }`}
    >
      <div className={isCenter ? "flex flex-col items-center" : ""}>
        {eyebrow && (
          <p
            ref={eyebrowRef}
            className="flex items-center gap-2 text-xs font-semibold italic text-[#c0442a] uppercase tracking-widest mb-2"
          >
            {!isCenter && (
              <span className="w-5 h-px bg-[#c0442a] inline-block" />
            )}
            {eyebrow}
          </p>
        )}

        {title && (
          <h2
            ref={ref}
            className="text-2xl font-serif sm:text-3xl md:text-4xl font-extrabold text-[#1a120b] leading-tight"
          >
            {renderTitle()}
          </h2>
        )}

        {subtitle && (
          <p
            ref={subtitleRef}
            className={`text-sm text-[#7a6a5e] font-sans leading-relaxed mt-2 ${
              isCenter ? "max-w-lg" : "max-w-xl"
            }`}
          >
            {subtitle}
          </p>
        )}
      </div>

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
});

export default Header;
