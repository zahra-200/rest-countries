import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { fetchCountries } from "../../services/api";
import { Cities } from "../../types/types";
import CountriesData from "../../components/cities/CountriesData";
import Select, { GroupBase, StylesConfig } from "react-select";
import { Link } from "react-router-dom";
import { useCountriesContext } from "../../context/CounrtiesContext";

interface RegionOption {
  value: string;
  label: string;
}

function Home() {
  const { isDarkMode } = useCountriesContext();
  const [getCities, setGetCities] = useState<Cities[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [filteredCities, setFilteredCities] = useState<Cities[]>([]);

  // Fetch cities data
  useEffect(() => {
    async function loadCities() {
      const citiesData = await fetchCountries();
      setGetCities(citiesData);
      setFilteredCities(citiesData); // Initially, show all cities
    }
    loadCities();
  }, []);

  // Filter cities dynamically
  useEffect(() => {
    let filtered = getCities;

    // Filter by search query
    if (searchQuery.trim()) {
      filtered = filtered.filter((city) =>
        city.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by selected region
    if (selectedRegion) {
      filtered = filtered.filter((city) => city.region === selectedRegion);
    }

    setFilteredCities(filtered);
  }, [searchQuery, selectedRegion, getCities]);

  // Extract unique regions for the dropdown
  const regionOptions = [...new Set(getCities.map((item) => item.region))]
    .filter(Boolean) // Remove empty/undefined regions
    .map((region) => ({
      value: region,
      label: region,
    }));

  // Handle region selection
  const handleRegionChange = (
    selectedOption: { value: string; label: string } | null
  ) => {
    setSelectedRegion(selectedOption?.value || "");
  };

  // React-Select custom styles
  const customStyles: StylesConfig<
    RegionOption,
    false,
    GroupBase<RegionOption>
  > = {
    control: (provided) => ({
      ...provided,
      backgroundColor: isDarkMode
        ? "var(--Dark-Blue)"
        : "var(--White)", 
      border: "none",
      borderRadius: "4px",
      boxShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
      padding: "5px",
      color: isDarkMode ? "var(--White)" : "var(--Dark-Gray)",
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: isDarkMode
        ? "var(--Dark-Blue)" 
        : "var(--White)", 
      borderRadius: "6px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused
        ? isDarkMode
          ? "var(--Light-Gray)"
          : "#f3f3f3"
        : isDarkMode
        ? "var(--Dark-Blue)"
        : "white",
      color: isDarkMode ? "var(--White)" : "var(--Very-Dark-Blue)",
      cursor: "pointer",
      padding: "10px 30px",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: isDarkMode ? "var(--White)" : "var(--Very-Dark-Blue)",
    }),
    placeholder: (provided) => ({
      ...provided,
      color: isDarkMode ? "var(--Light-Gray)" : "var(--Very-Dark-Blue)", // Placeholder text color
    }),
    input: (provided) => ({
      ...provided,
      color: isDarkMode ? "var(--Light-Gray)" : "var(--Very-Dark-Blue)", // Input text color
    }),
  };

  return (
    <div className="bg-[var(--Very-Light-Gray)] dark:bg-[var(--Very-Dark-Blue-Background)] h-full  p-5">
      <div className="w-full flex flex-col gap-7 sm:flex-row sm:justify-between sm:items-center">
        {/* Search Box */}
        <div className="bg-white dark:bg-[var(--Dark-Blue)] rounded-md shadow-sm w-full min-[426px]:w-[60%] flex items-center gap-4">
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className="text-[var(--Dark-Gray)] text-sm pl-6"
          />
          <input
            className="text-[var(--Dark-Gray)] dark:bg-[var(--Dark-Blue)] text-sm font-semibold rounded-md tracking-wider h-full w-full py-3 px-2 focus:outline-none"
            placeholder="Search for a country..."
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        {/* Filter Dropdown */}
        <div className="w-full sm:w-[60%] lg:w-[30%]">
          <Select
            options={[ ...regionOptions]} 
            onChange={handleRegionChange}
            placeholder="Filter by Region"
            isClearable={true} // Enables a clear button in the dropdown
            styles={customStyles}
          />
        </div>
      </div>
      {/* Content */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5 mt-5">
        {filteredCities.length > 0 ? (
          filteredCities.map((item) => (
            <Link key={item.name} to={`/country/${item.name}`}>
              <CountriesData {...item} />
            </Link>
          ))
        ) : (
          <p className="text-center text-[var(--Dark-Gray)] h-screen dark:text-[var(--White)]">
            No countries found.
          </p>
        )}
      </div>
    </div>
  );
}

export default Home;
