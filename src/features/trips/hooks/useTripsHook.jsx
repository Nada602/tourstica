import React, { useEffect, useMemo, useState } from "react";

const TRIPS = [
  {
    image:
      "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=900&q=80",
    title: "Marrakech Desert Escape",
    location: "Marrakech, Morocco",
    category: "Desert",
    rating: 4.9,
    reviews: 128,
    duration: 72,
    tags: ["Private option available", "Small group"],
    price: 1250,
    originalPrice: 1600,
    discount: 45,
    featured: true,
  },
  {
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80",
    title: "Atlas Mountain Adventure",
    location: "Imlil, Morocco",
    category: "Mountain",
    rating: 4.8,
    reviews: 95,
    duration: 48,
    tags: ["Hiking", "Scenic views"],
    price: 980,
    originalPrice: 1300,
    discount: 25,
  },
  {
    image:
      "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=900&q=80",
    title: "Fes Medina & Food Tour",
    location: "Fes, Morocco",
    category: "Food",
    rating: 4.7,
    reviews: 76,
    duration: 4,
    tags: ["Food tasting", "Local guide"],
    price: 450,
    originalPrice: 600,
    discount: 15,
  },
  {
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
    title: "Essaouira Coastal Retreat",
    location: "Essaouira, Morocco",
    category: "Beach",
    rating: 4.6,
    reviews: 63,
    duration: 24,
    tags: ["Beachfront", "Relaxing"],
    price: 720,
    originalPrice: 900,
    discount: 20,
  },
  {
    image:
      "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=900&q=80",
    title: "Ouarzazate Desert Nights",
    location: "Ouarzazate, Morocco",
    category: "Desert",
    rating: 4.9,
    reviews: 112,
    duration: 72,
    tags: ["Camp stay", "Stargazing"],
    price: 1100,
    originalPrice: 1400,
    discount: 21,
  },
  {
    image:
      "https://images.unsplash.com/photo-1521295121783-8a321d551ad2?auto=format&fit=crop&w=900&q=80",
    title: "Chefchaouen Blue Village",
    location: "Chefchaouen, Morocco",
    category: "Culture",
    rating: 4.5,
    reviews: 54,
    duration: 48,
    tags: ["Photography", "Culture"],
    price: 650,
    originalPrice: 800,
    discount: 19,
  },
  {
    image:
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=900&q=80",
    title: "Sahara Sunset Camp",
    location: "Merzouga, Morocco",
    category: "Desert",
    rating: 4.8,
    reviews: 88,
    duration: 48,
    tags: ["Luxury camp", "Camel ride"],
    price: 1500,
    originalPrice: 1850,
    discount: 19,
  },
  {
    image:
      "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=900&q=80",
    title: "Zagora Nomad Experience",
    location: "Zagora, Morocco",
    category: "Culture",
    rating: 4.4,
    reviews: 41,
    duration: 24,
    tags: ["Nomad visit", "Local meals"],
    price: 560,
    originalPrice: 700,
    discount: 20,
  },
  {
    image:
      "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=900&q=80",
    title: "Rif Mountain Escape",
    location: "Rif, Morocco",
    category: "Mountain",
    rating: 4.7,
    reviews: 70,
    duration: 72,
    tags: ["Mountain views", "Nature"],
    price: 890,
    originalPrice: 1100,
    discount: 19,
  },
];
export default function useTripsHook({
  initialData = TRIPS,
  fetcher = null,
  pageSize = 9,
} = {}) {
  const [data, setData] = useState(initialData || []);
  const [loading, setLoading] = useState(Boolean(fetcher));
  const [error, setError] = useState(null);
  const [toggleFilterState, setToggleFilterState] = useState(true);
  const [showFilterPanel, setShowFilterPanel] = React.useState(true);

  const toggleFilter = () => {
    setToggleFilterState(!toggleFilterState);
  };

  const toggleFilterPanel = () => setShowFilterPanel((value) => !value);

  return {
    trips: data,

    loading,
    error,
    toggleFilter,
    toggleFilterState,
    toggleFilterPanel,
    showFilterPanel,
    setData,
  };
}
