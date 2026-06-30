import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./navbar.module.css";

const NAV_LINKS = [
  {
    label: "Home",
    link: "/",
  },
  {
    label: "Experiences",
    link: "/trips",
  },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    console.log("scrolled:", scrolled);
    document.addEventListener("scroll", onScroll, { passive: true });

    return () => document.removeEventListener("scroll", onScroll);
  }, [scrolled]);

  return (
    <nav
      className={`
        ${styles.nav}
        fixed top-0 left-0 right-0 
        flex items-center justify-between
        px-4 sm:px-6 md:px-10 py-4
        ${
          scrolled || location.pathname !== "/"
            ? "bg-white shadow-md text-[#1a120b]"
            : "bg-transparent text-white"
        }
      `}
    >
      {/* Brand */}
      <h1
        className={`font-extrabold text-xl tracking-tight ${scrolled || location.pathname !== "/" ? "text-[#1a120b]" : "text-white"}`}
      >
        Tour<span className="text-[#c0442a]">stica</span>
      </h1>

      {/* Links — hidden on mobile */}
      <div className="hidden md:flex items-center gap-7">
        {NAV_LINKS.map((l) => (
          <a
            href={l.link}
            key={l.label}
            className={`text-sm font-semibold cursor-pointer transition-colors duration-200 hover:text-[#c0442a] ${
              scrolled || location.pathname !== "/"
                ? "text-[#1a120b]"
                : "text-white/90"
            }`}
          >
            {l.label}
          </a>
        ))}
      </div>

      {/* Auth buttons */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => navigate("/login")}
          className={`text-sm font-semibold px-3 py-2 transition-colors duration-200 hover:text-[#c0442a] ${
            scrolled || location.pathname !== "/"
              ? "text-[#1a120b]"
              : "text-white"
          }`}
        >
          Log in
        </button>
        <button
          onClick={() => navigate("/register")}
          className={`text-sm font-semibold px-4 py-2 rounded-lg border transition-colors duration-200 ${
            scrolled || location.pathname !== "/"
              ? "border-[#c0442a] text-[#c0442a] hover:bg-[#c0442a] hover:text-white"
              : "border-white text-white hover:bg-white hover:text-[#1a120b]"
          }`}
        >
          Sign up
        </button>
      </div>
    </nav>
  );
}
