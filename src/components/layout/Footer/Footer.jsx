import { FaFacebookF, FaInstagram, FaXTwitter } from "react-icons/fa6";
import {
  MdOutlineMail,
  MdOutlinePhone,
  MdOutlineLocationOn,
} from "react-icons/md";

// ── Data ──────────────────────────────────────────────────────
const EXPLORE_LINKS = [
  { label: "All Experiences", href: "#" },
  { label: "Destinations", href: "#" },
  { label: "Categories", href: "#" },
  { label: "Special Offers", href: "#" },
];

const DESTINATION_LINKS = [
  { label: "Marrakech", href: "#" },
  { label: "Fez", href: "#" },
  { label: "Chefchaouen", href: "#" },
  { label: "Essaouira", href: "#" },
  { label: "Sahara Desert", href: "#" },
];

const SOCIAL_LINKS = [
  { Icon: FaFacebookF, href: "#", label: "Facebook" },
  { Icon: FaInstagram, href: "#", label: "Instagram" },
  { Icon: FaXTwitter, href: "#", label: "Twitter" },
];

const CONTACT_INFO = [
  { Icon: MdOutlineMail, text: "hello@tourstica.com" },
  { Icon: MdOutlinePhone, text: "+212 5XX-XXXXXX" },
  { Icon: MdOutlineLocationOn, text: "Marrakech, Morocco" },
];

// ── Reusable column ───────────────────────────────────────────
function FooterColumn({ title, children }) {
  return (
    <div className="flex flex-col gap-4">
      <h4 className="text-white font-bold text-sm tracking-wide">{title}</h4>
      {children}
    </div>
  );
}

// ── Main Footer ───────────────────────────────────────────────
export default function Footer() {
  return (
    <footer className="w-full bg-[#1a120b] py-12 px-4 sm:px-6 md:px-10">
      <div className="max-w-6xl mx-auto">
        {/* ── Top grid ────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 pb-10 border-b border-white/10">
          {/* Brand column */}
          <div className="flex flex-col gap-4">
            <span className="text-[#c0442a] font-extrabold text-xl tracking-tight">
              Tour<span className="text-white">stica</span>
            </span>
            <p className="text-white/50 text-xs leading-relaxed max-w-[200px]">
              Discover the magic of Morocco through authentic, locally-curated
              travel experiences.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-3 mt-1">
              {SOCIAL_LINKS.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:border-[#c0442a] hover:text-[#c0442a] transition-colors duration-200"
                >
                  <Icon size={13} />
                </a>
              ))}
            </div>
          </div>

          {/* Explore */}
          <FooterColumn title="Explore">
            <ul className="flex flex-col gap-2.5">
              {EXPLORE_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="text-white/50 text-xs hover:text-[#c0442a] transition-colors duration-200"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </FooterColumn>

          {/* Destinations */}
          <FooterColumn title="Destinations">
            <ul className="flex flex-col gap-2.5">
              {DESTINATION_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="text-white/50 text-xs hover:text-[#c0442a] transition-colors duration-200"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </FooterColumn>

          {/* Contact */}
          <FooterColumn title="Contact">
            <ul className="flex flex-col gap-3">
              {CONTACT_INFO.map(({ Icon, text }) => (
                <li key={text} className="flex items-start gap-2">
                  <Icon
                    size={14}
                    className="text-[#c0442a] flex-shrink-0 mt-0.5"
                  />
                  <span className="text-white/50 text-xs leading-relaxed">
                    {text}
                  </span>
                </li>
              ))}
            </ul>
          </FooterColumn>
        </div>

        {/* ── Bottom bar ──────────────────────────────────── */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/30 text-xs">
            © {new Date().getFullYear()} Tourstica. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {["Privacy Policy", "Terms of Service"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-white/30 text-xs hover:text-white/60 transition-colors duration-200"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
