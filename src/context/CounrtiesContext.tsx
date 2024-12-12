import { createContext, useContext, useEffect, useState } from "react";

interface CountriesContextProviderProps {
  children: React.ReactNode;
}

interface CountriesContext {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export const CountriesContext = createContext({} as CountriesContext);

export const useCountriesContext = () => {
  return useContext(CountriesContext);
};

export function CountriesContextProvider({
  children,
}: CountriesContextProviderProps) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Load theme from localStorage on initial mount
  useEffect(() => {
    const savedMode = localStorage.getItem("theme");
    if (savedMode === "dark") {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark"); // Apply Tailwind's dark mode class
    }
  }, []);

  // Toggle theme and save preference in localStorage
  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);

    // Update localStorage and document class
    localStorage.setItem("theme", newMode ? "dark" : "light");
    if (newMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <CountriesContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </CountriesContext.Provider>
  );
}
