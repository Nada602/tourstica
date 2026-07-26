import React from "react";
import Header from "@/components/common/Header/Header";
import StatCard from "@/components/common/StatCard";
import TripCard from "@/components/common/TripCard/TripCard";
import FilterPanal from "./components/FilterPanal";
import useTripsHook from "./hooks/useTripsHook";
import TextField from "../../components/ui/TextField";
import { Filter } from "lucide-react";

export default function Trips() {
  const {
    trips,
    toggleFilterPanel,
    showFilterPanel,
    priceMax,
    getDurationBucket,
    filter,
    dispatch,
    filteredTrips,
    searchRef,
  } = useTripsHook();

  console.log("Filtered Trips:", filteredTrips);

  return (
    <div className="w-full  mt-20  ">
      <div className="  w-full">
        <div className="bg-white w-full">
          <div className="flex bg-white flex-col sm:flex-row py-8  w-[80%] m-auto sm:items-start sm:justify-between gap-8">
            <div className="flex-1">
              <Header
                title="All Experiences"
                accentWord="Experiences"
                subtitle="Authentic, locally-curated travel experiences across Morocco"
                align="left"
              />
            </div>

            <div className="flex gap-4 sm:flex-row flex-wrap sm:flex-nowrap sm:gap-6 ">
              <StatCard number={trips.length} label="Experiences available" />
              <StatCard number="11" label="Destinations covered" count={9} />
            </div>
          </div>
        </div>
        <div className="border-t border-l-0 border-r-0 w-full border-2   bg-white mb-3 border-gray-200 ">
          <div className="  py-4 w-[80%] lg:w-[80%] flex-wrap lg:flex-nowrap  m-auto flex items-center justify-between  gap-4">
            <div className="flex items-center gap-3">
              <button
                onClick={toggleFilterPanel}
                className="flex items-center gap-2 bg-white border border-gray-200 rounded-full px-3 py-2 text-sm text-[#c0442a] transition duration-200 hover:bg-[#f9edeb] hover:border-[#c0442a] hover:text-[#9f2f1f]"
              >
                Filters
              </button>
              <button className="bg-white flex flex-row gap-2 justify-center items-center border border-gray-200 rounded-full px-4 py-2 text-sm text-gray-700 transition duration-200 hover:bg-gray-100 hover:border-gray-300 hover:text-gray-900">
                <Filter size={18} />
                <select
                  value={filter.sort}
                  onChange={(e) =>
                    dispatch({ type: "SET_SORT", payload: e.target.value })
                  }
                  className="bg-transparent border-none outline-none text-sm text-gray-700"
                >
                  <option value="recommended">Recommended</option>
                  <option value="priceLowToHigh">Price: Low to High</option>
                  <option value="priceHighToLow">Price: High to Low</option>
                </select>
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
              className={` w-full md:w-full lg:w-70 shrink-0 px-4 sm:px-6 lg:px-0 pb-8 lg:pb-16`}
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
                <span className="text-black mr-1">{filteredTrips.length} </span>
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
