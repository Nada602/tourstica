import React from "react";
import Header from "@/components/common/Header/Header";
import StatCard from "@/components/common/StatCard";
import TripCard from "@/components/common/TripCard/TripCard";
import FilterPanal from "./components/FilterPanal";
import useTripsHook from "./hooks/useTripsHook";
import TextField from "../../components/ui/TextField";
const initialFilters = {
  search: "",
  selectedCategories: [],
  priceValue: 500,
  selectedQuickPriceRange: "",
  selectedDuration: "",
  selectedOption: "",
  sort: "recommended",
};
const quickPriceRangeValues = {
  "0-50": 50,
  "50-150": 150,
  "150+": 500,
};

function filterReducer(state, action) {
  switch (action.type) {
    case "SET_SEARCH":
      return {
        ...state,
        search: action.payload,
      };
    case "TOGGLE_CATEGORY":
      return {
        ...state,
        selectedCategories: state.selectedCategories.includes(action.payload)
          ? state.selectedCategories.filter(
              (category) => category !== action.payload,
            )
          : [...state.selectedCategories, action.payload],
      };
    case "SET_PRICE":
      return {
        ...state,
        priceValue: action.payload,
        selectedQuickPriceRange:
          Object.keys(quickPriceRangeValues).find(
            (range) => quickPriceRangeValues[range] === action.payload,
          ) || "",
      };
    case "SET_QUICK_PRICE_RANGE": {
      const nextRange =
        state.selectedQuickPriceRange === action.payload ? "" : action.payload;
      return {
        ...state,
        selectedQuickPriceRange: nextRange,
        priceValue: nextRange
          ? quickPriceRangeValues[nextRange]
          : state.priceValue,
      };
    }
    case "SET_DURATION":
      return {
        ...state,
        selectedDuration:
          state.selectedDuration === action.payload ? "" : action.payload,
      };
    case "SET_OPTION":
      return {
        ...state,
        selectedOption:
          state.selectedOption === action.payload ? "" : action.payload,
      };
    case "RESET_FILTERS":
      return initialFilters;
    default:
      return state;
  }
}
export default function Trips() {
  const { trips, toggleFilterPanel, showFilterPanel } = useTripsHook();
  const [filter, dispatch] = React.useReducer(filterReducer, initialFilters);
  const searchRef = React.useRef(null);

  // const filteredTrips = React.useMemo(() => {
  //   const query = filter.search.toLowerCase();
  //   return trips.filter((trip) => {
  //     const matchesSearch =
  //       trip.title?.toLowerCase().includes(query) ||
  //       trip.description?.toLowerCase().includes(query);
  //     return matchesSearch;
  //   });
  // }, [trips, filter.search]);
  function getDurationBucket(hours) {
    if (hours < 4) return "Half day (under 4h)";
    if (hours <= 8) return "Full day (4–8h)";
    return "Multi-day (8h+)";
  }

  const filteredTrips = React.useMemo(() => {
    const query = filter.search.toLowerCase();

    return trips.filter((trip) => {
      const matchesSearch =
        trip.title?.toLowerCase().includes(query) ||
        trip.location?.toLowerCase().includes(query);
        console.log("matchesSearch:", matchesSearch, "query:", query, "trip.title:", trip.title, "trip.location:", trip.location);

      const matchesCategory =
        filter.selectedCategories.length === 0 ||
        filter.selectedCategories.includes(trip.category);
console.log("matchesCategory:", matchesCategory, "selectedCategories:", filter.selectedCategories, "trip.category:", trip.category);
      const matchesPrice = trip.price <= filter.priceValue;
console.log("matchesPrice:", matchesPrice, "trip.price:", trip.price, "filter.priceValue:", filter.priceValue);
      const matchesDuration =
        !filter.selectedDuration ||
        getDurationBucket(trip.duration) === filter.selectedDuration;
console.log("matchesDuration:", matchesDuration, "trip.duration:", trip.duration, "filter.selectedDuration:", filter.selectedDuration);
      // No `options` field on trip data yet — every trip passes until that's added
      const matchesOption = !filter.selectedOption || true;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesPrice &&
        matchesDuration &&
        matchesOption
      );
    });
  }, [trips, filter]);
  const priceMax = React.useMemo(
    () => Math.max(...trips.map((t) => t.price), 0),
    [trips],
  );

  return (
    <div className="w-full  mt-20  ">
      <div className="  w-full">
        <div className="bg-white w-full">
          <div className="flex bg-white flex-col sm:flex-row py-8 w-[80%] m-auto sm:items-start sm:justify-between gap-8">
            <div className="flex-1">
              <Header
                title="All Experiences"
                accentWord="Experiences"
                subtitle="Authentic, locally-curated travel experiences across Morocco"
                align="left"
              />
            </div>

            <div className="flex gap-4 sm:flex-row flex-wrap sm:flex-nowrap sm:gap-6">
              <StatCard number={trips.length} label="Experiences available" />
              <StatCard number="11" label="Destinations covered" count={9} />
            </div>
          </div>
        </div>
        <div className="border-t border-l-0 border-r-0 w-full border-2  bg-white mb-3 border-gray-200 ">
          <div className="px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button
                onClick={toggleFilterPanel}
                className="flex items-center gap-2 bg-white border border-gray-200 rounded-full px-3 py-2 text-sm text-[#c0442a] transition duration-200 hover:bg-[#f9edeb] hover:border-[#c0442a] hover:text-[#9f2f1f]"
              >
                Filters
              </button>
              <button className="bg-white border border-gray-200 rounded-full px-4 py-2 text-sm text-gray-700 transition duration-200 hover:bg-gray-100 hover:border-gray-300 hover:text-gray-900">
                Recommended
              </button>
            </div>
            <div className="w-[60%] min-w-0">
              <TextField
                type="search"
                placeholder="Search experiences"
                className="w-full"
                ref={searchRef}
                value={filter.search}
                onChange={(e) =>
                  dispatch({ type: "SET_SEARCH", payload: e.target.value })
                }
              />
            </div>
            <div className="text-sm text-gray-500">
              Showing {filteredTrips.length} of {trips.length}
            </div>
          </div>
        </div>

        {/* Filter + Grid Container */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 w-full md:w-[80%] lg:w-[80%] m-auto">
          {/* Filter Panel - Sidebar */}
          {showFilterPanel && (
            <div
              className={`w-full md:w-full lg:w-80 shrink-0 px-4 sm:px-6 lg:px-0 pb-8 lg:pb-16`}
            >
              <div className="sticky top-24">
                <FilterPanal
                  selectedCategories={filter.selectedCategories}
                  onCategoryToggle={(value) =>
                    dispatch({ type: "TOGGLE_CATEGORY", payload: value })
                  }
                  priceValue={filter.priceValue}
                  priceMax={priceMax}
                  selectedQuickPriceRange={filter.selectedQuickPriceRange}
                  onPriceChange={(value) =>
                    dispatch({ type: "SET_PRICE", payload: value })
                  }
                  onQuickPriceSelect={(value) =>
                    dispatch({
                      type: "SET_QUICK_PRICE_RANGE",
                      payload: value,
                    })
                  }
                  selectedDuration={filter.selectedDuration}
                  onDurationChange={(value) =>
                    dispatch({ type: "SET_DURATION", payload: value })
                  }
                  selectedOption={filter.selectedOption}
                  onOptionChange={(value) =>
                    dispatch({ type: "SET_OPTION", payload: value })
                  }
                  onReset={() => dispatch({ type: "RESET_FILTERS" })}
                />
              </div>
            </div>
          )}
          <div className="flex-1 px-4 sm:px-6 md-[60%]  lg:px-0 pb-12 sm:pb-16">
            <div className="flex">
              <h3 className="font-semibold m-4 text-gray-300">
                <span className="text-black">{filteredTrips.length}</span>
                Experience Found
              </h3>
              <div className="ml-auto">{/* <Tabs/> */}</div>
            </div>
            {filteredTrips && filteredTrips.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {filteredTrips.map((trip, index) => (
                  <TripCard key={`${trip.title}-${index}`} {...trip} />
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center bg-white border rounded shadow-xs shadow-amber-50 border-white min-h-96 text-center">
                <p className="text-lg text-gray-500">No experiences yet.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
