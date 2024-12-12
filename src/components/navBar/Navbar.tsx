import { faMoon, faSun } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import { useCountriesContext } from "../../context/CounrtiesContext";

function Navbar() {
  const { isDarkMode, toggleDarkMode } = useCountriesContext();

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <div className="flex justify-between z-10 items-center px-5 h-16 shadow-sm min-[1024px]:h-12 min-[1024px]:px-14 text-[var(--Very-Dark-Blue)] dark:bg-[var(--Dark-Blue)] dark:text-[var(--White)] relative">
      <div>
        <p className=" font-semibold text-sm min-[1024px]:font-extrabold cursor-default">
          Where in the world?
        </p>
      </div>
      <div
        className="flex justify-center items-center gap-1 text-xs min-[1024px]:text-sm cursor-pointer"
        onClick={toggleDarkMode}
      >
        <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} />
        <p>{isDarkMode ? "Light Mode" : "Dark Mode"}</p>
      </div>
    </div>
  );
}

export default Navbar;
