import React from "react";
// import { MapPin } from "lucide-react";
import styles from "./destinations.module.css";
import Header from "../../../../components/common/Header/Header";

const DESTINATIONS = [
  {
    id: 0,
    title: "Marrakech",
    experiences: "1,747",
    featured: true,
    image:
      "https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=900&q=80",
  },
  {
    id: 1,
    title: "Sahara Desert",
    experiences: "208",
    image:
      "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=700&q=80",
  },
  {
    id: 2,
    title: "Essaouira",
    experiences: "208",
    image:
      "https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=700&q=80",
  },
  {
    id: 3,
    title: "Sahara Desert",
    experiences: "208",
    image:
      "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=700&q=80",
  },
  {
    id: 4,
    title: "Atlas Mountains",
    experiences: "208",
    image:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=700&q=80",
  },
];

// ── Card slot → CSS class map ─────────────────────────────────
const SLOT_CLASSES = [
  styles.cardFeatured,
  styles.cardTopRight1,
  styles.cardTopRight2,
  styles.cardBottomRight1,
  styles.cardBottomRight2,
];

// ── Component ─────────────────────────────────────────────────
export default function Destinations() {
  return (
    <section className={styles.section}>
    
      <Header
        eyebrow="Explore Cities"
        title="Morocco's Most Beautiful Destinations"
        accentWord="Beautiful"
        subtitle="From imperial cities to the vast Sahara — every destination is a unique experience"
        linkText="View All →"
        linkHref="/destinations"
      />
      {/* Grid */}
      <div className={styles.grid}>
        {DESTINATIONS.map((dest, i) => (
          <div key={dest.id} className={`${styles.card} ${SLOT_CLASSES[i]}`}>
            <img src={dest.image} alt={dest.title} loading="lazy" />

            <div className={styles.cardInfo}>
              <p className={styles.cardTitle}>{dest.title}</p>
              <span className={styles.cardMeta}>
                {/* <MapPin /> */}
                {dest.experiences} experiences
              </span>
              {dest.featured && <div className={styles.badge}>Featured</div>}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
