interface CitiesEntry {
  name: string;
  flag: string;
  population: number;
  region: string;
  capital?: string | undefined;
}

function CountriesData({ name, flag, population, region, capital }: CitiesEntry) {
  return (
    <div className="m-4 rounded-lg shadow-md bg-white dark:text-[var(--White)] dark:bg-[var(--Dark-Blue)] transition-transform transform duration-500 cursor-pointer hover:scale-105 sm:m-6">
      {/* Flag Image */}
      <img
        className="rounded-t-lg w-full h-48 object-cover sm:h-56 lg:h-64"
        src={flag}
        alt={`${name} flag`}
      />

      {/* Content */}
      <div className="p-4 sm:p-6">
        <p className="font-extrabold text-base sm:text-lg mb-3">{name}</p>

        <p className="text-xs sm:text-sm mb-2">
          <span className="font-medium">Population:</span> {population.toLocaleString()}
        </p>

        <p className="text-xs sm:text-sm mb-2">
          <span className="font-medium">Region:</span> {region}
        </p>

        <p className="text-xs sm:text-sm mb-2">
          <span className="font-medium">Capital:</span> {capital || "N/A"}
        </p>
      </div>
    </div>
  );
}

export default CountriesData;
