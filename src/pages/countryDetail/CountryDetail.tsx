import { useEffect, useState } from "react";
import { fetchCountriesByname } from "../../services/api";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Cities } from "../../types/types";

function CountryDetail() {
  const params = useParams<{ name: string }>();
  const [getSingleCounrty, setGetSingleCounrty] = useState<Cities>();

  useEffect(() => {
    async function loadCities() {
      const citiesData = await fetchCountriesByname(params.name as string);
      setGetSingleCounrty(citiesData);
    }
    loadCities();
  }, [params.name]);
  // Extract values with fallback for undefined
  const topLevelDomains = Object.keys(getSingleCounrty || {})
    .filter((key) => key.startsWith("topLevelDomain/"))
    .map((key) => (getSingleCounrty as unknown as Record<string, unknown>)[key])
    .filter((value) => value);

  const currencies = Object.keys(getSingleCounrty || {})
    .filter((key) => key.startsWith("currencies/") && key.endsWith("/name"))
    .map((key) => (getSingleCounrty as unknown as Record<string, unknown>)[key])
    .filter((value) => value);

  const languages = Object.keys(getSingleCounrty || {})
    .filter((key) => key.startsWith("languages/") && key.endsWith("/name"))
    .map((key) => (getSingleCounrty as unknown as Record<string, unknown>)[key])
    .filter((value) => value);
  const borders = Object.keys(getSingleCounrty || {})
    .filter((key) => key.startsWith("borders/"))
    .map((key) => (getSingleCounrty as unknown as Record<string, unknown>)[key])
    .filter((value) => value);
  return (
    <div className="bg-[var(--Very-Light-Gray)] dark:bg-[var(--Very-Dark-Blue-Background)] h-full lg:h-screen px-6 py-8">
      <div>
        <Link to={"/"}>
          <button className="bg-[var(--White)] dark:bg-[var(--Dark-Blue)] dark:text-[var(--White)] dark:font-thin dark:shadow-[var(--Very-Dark-Blue)] flex items-center justify-center gap-2 shadow-[var(--Dark-Gray)] shadow-[0px_3px_8px] px-5 py-[6px] text-sm rounded-sm">
            <FontAwesomeIcon icon={faArrowLeft} /> Back
          </button>
        </Link>
      </div>
      {getSingleCounrty ? (
        <div className="mt-14 dark:text-[var(--White)] dark:font-thin  flex flex-col justify-center lg:flex-row lg:items-center lg:gap-16 ">
          <div className="lg:w-1/2">
            <img src={getSingleCounrty.flag} alt={getSingleCounrty.name} />
          </div>
          <div className="lg:w-1/2">
            <div className="flex flex-col gap-5 mt-10 lg:gap-4 lg:mt-0 ">
              <h1 className="font-extrabold xl:text-xl">
                {getSingleCounrty.name}
              </h1>
              <div className="lg:flex lg:items-start lg:gap-16">
                <div className="text-xs grid gap-2 dark:text-slate-200 xl:text-base">
                  <p>
                    {" "}
                    <span className="font-normal dark:text-[var(--White)] lg:font-medium">
                      Native Name :
                    </span>{" "}
                    {getSingleCounrty.nativeName}
                  </p>
                  <p>
                    {" "}
                    <span className="font-normal dark:text-[var(--White)] lg:font-medium">
                      Population :
                    </span>{" "}
                    {getSingleCounrty.population.toLocaleString()}
                  </p>
                  <p>
                    {" "}
                    <span className="font-normal dark:text-[var(--White)] lg:font-medium">
                      Region :
                    </span>{" "}
                    {getSingleCounrty.region}
                  </p>
                  <p>
                    {" "}
                    <span className="font-normal dark:text-[var(--White)] lg:font-medium">
                      Sub Region :
                    </span>{" "}
                    {getSingleCounrty.subregion}
                  </p>
                  <p>
                    {" "}
                    <span className="font-normal dark:text-[var(--White)] lg:font-medium">
                      Capital :
                    </span>{" "}
                    {getSingleCounrty.capital}
                  </p>
                </div>
                <div className="text-xs grid gap-2 mt-4 dark:text-slate-200 lg:mt-0 xl:text-base">
                  <p>
                    <span className="font-normal dark:text-[var(--White)] lg:font-medium">
                      Top Level Domain :{" "}
                    </span>
                    {topLevelDomains.length > 0
                      ? topLevelDomains.join(", ")
                      : "-"}
                  </p>
                  <p>
                    <span className="font-normal dark:text-[var(--White)] lg:font-medium">
                      Currencies :{" "}
                    </span>
                    {currencies.length > 0 ? currencies.join(", ") : "-"}
                  </p>
                  <p>
                    <span className="font-normal dark:text-[var(--White)] lg:font-medium">
                      Languages :
                    </span>{" "}
                    {languages.length > 0 ? languages.join(", ") : "-"}
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-9 dark:text-slate-200">
              {borders.length > 0 ? (
                <div className="lg:flex">
                  <p className="font-normal dark:text-[var(--White)] lg:font-medium text-sm lg:w-1/2 xl:w-1/4 2xl:w-1/6 ">
                    Border Countries :
                  </p>{" "}
                  <div className="flex flex-wrap items-center gap-3 mt-3 lg:mt-0 ">
                    {(borders as string[]).map((country: string) => (
                      <p
                        key={country}
                        className="text-xs w-20 bg-[var(--White)] rounded-sm px-7 py-1 shadow-[var(--Dark-Gray)] shadow-[0px_3px_8px] dark:bg-[var(--Dark-Blue)] dark:text-[var(--White)] dark:font-thin dark:shadow-[var(--Very-Dark-Blue)]"
                      >
                        {country}
                      </p>
                    ))}
                  </div>
                </div>
              ) : (
                <div>
                  <p className="font-normal dark:text-[var(--White)] text-sm">
                    Border Countries :
                  </p>{" "}
                  {"-"}
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <p className="mt-4 dark:text-[var(--White)]">Loading...</p>
      )}
    </div>
  );
}

export default CountryDetail;
