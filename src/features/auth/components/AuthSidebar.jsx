// import React from "react";
// import backgroundImage from "../../../assets/AuthSidebarImg.png";

// const FEATURES = [
//   "Save your favourite experiences to a wishlist",
//   "Track all your bookings in one place",
//   "Leave reviews & earn travel badges",
//   "Get personalised Morocco travel tips",
// ];
// const title = "Unlock the full\nMorocco experience";

// export default function AuthSidebar() {
//   return (
//     <div
//       className="relative w-full h-56 sm:h-72 shrink-0 overflow-hidden md:h-full md:w-2/5"
//       style={{
//         backgroundImage: backgroundImage
//           ? `url(${backgroundImage})`
//           : "linear-gradient(160deg, #4a3626 0%, #3a2a1c 35%, #241812 70%, #150e0a 100%)",
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//       }}
//     >
//       {!backgroundImage && (
//         <div
//           className="absolute inset-0 opacity-40 mix-blend-overlay"
//           style={{
//             backgroundImage:
//               "radial-gradient(circle at 20% 15%, rgba(255,200,140,0.25), transparent 45%), radial-gradient(circle at 80% 60%, rgba(255,150,90,0.18), transparent 50%)",
//           }}
//         />
//       )}

//       <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10" />

//       <div className="relative h-full flex flex-col justify-center items-center p-4 pb-5 sm:p-6 sm:pb-8">
//         <h1
//           className="text-white mb-3 ms-4 sm:mb-5 sm:text-xl whitespace-pre-line"
//           style={{
//             fontFamily: "'Ancizar Serif', Georgia, serif",
//             fontWeight: 700,
//             fontSize: "40px",
//             lineHeight: "110%",
//             letterSpacing: "0%",
//           }}
//         >
//           {title}
//         </h1>

//         <ul className="hidden sm:flex flex-col gap-3">
//           {FEATURES.map((feature) => (
//             <li key={feature} className="flex items-center gap-3">
//               <CheckIcon className="shrink-0" />
//               <span className="text-white/95 text-[14px] leading-snug">
//                 {feature}
//               </span>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }

// function CheckIcon({ className = "" }) {
//   return (
//     <span
//       className={`inline-flex items-center justify-center w-5 h-5 rounded-full bg-orange-600 ${className}`}
//     >
//       <svg
//         viewBox="0 0 24 24"
//         fill="none"
//         stroke="white"
//         strokeWidth="3"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         className="w-3 h-3"
//       >
//         <polyline points="20 6 9 17 4 12" />
//       </svg>
//     </span>
//   );
// }

import React from "react";
import backgroundImage from "../../../assets/AuthSidebarImg.png";

const FEATURES = [
  "Save your favourite experiences to a wishlist",
  "Track all your bookings in one place",
  "Leave reviews & earn travel badges",
  "Get personalised Morocco travel tips",
];
const title = "Unlock the full\nMorocco experience";

export default function AuthSidebar() {
  return (
    <div
      className="relative w-full h-56 sm:h-72 shrink-0 overflow-hidden md:h-full md:w-2/5"
      style={{
        backgroundImage: backgroundImage
          ? `url(${backgroundImage})`
          : "linear-gradient(160deg, #4a3626 0%, #3a2a1c 35%, #241812 70%, #150e0a 100%)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {!backgroundImage && (
        <div
          className="absolute inset-0 opacity-40 mix-blend-overlay"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 15%, rgba(255,200,140,0.25), transparent 45%), radial-gradient(circle at 80% 60%, rgba(255,150,90,0.18), transparent 50%)",
          }}
        />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10" />

      <div className="relative h-full flex flex-col justify-center items-center  p-4 pb-5 sm:p-6 sm:pb-8">
        <h1
          className="text-white mb-3 sm:mb-5 whitespace-pre-line text-[22px] sm:text-[32px] md:text-[40px]"
          style={{
            fontFamily: "'Ancizar Serif', Georgia, serif",
            fontWeight: 700,
            lineHeight: "110%",
            letterSpacing: "0%",
          }}
        >
          {title}
        </h1>

        <ul className="hidden sm:flex flex-col gap-3">
          {FEATURES.map((feature) => (
            <li key={feature} className="flex items-center gap-3">
              <CheckIcon className="shrink-0" />
              <span className="text-white/95 text-[14px] leading-snug">
                {feature}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function CheckIcon({ className = "" }) {
  return (
    <span
      className={`inline-flex items-center justify-center w-5 h-5 rounded-full bg-orange-600 ${className}`}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="white"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-3 h-3"
      >
        <polyline points="20 6 9 17 4 12" />
      </svg>
    </span>
  );
}
