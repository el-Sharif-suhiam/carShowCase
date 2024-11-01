import { Hero, SearchBar, CustomFilter, ShowMore } from "@/components";
import { fetchCars } from "@/utils";
import { carData, Filters } from "@/types";
import dynamic from "next/dynamic";
import { fuels, yearsOfProduction } from "@/constants";

// Dynamically import client components
const CarCard = dynamic(() => import("@/components/CarCard"), { ssr: false });

export default async function Home({ searchParams }: any) {
  const params: Filters = {
    make: searchParams.manufacturer || "",
    year: searchParams.year || 2022,
    fuel: searchParams.fuel || "",
    limit: searchParams.limit || 10,
    model: searchParams.model || "",
  };

  const url: string = `https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?make=${params.make}&model=${params.model}&fuel_type=${params.fuel}&limit=${params.limit}&year=${params.year}`;
  const respone = await fetchCars<carData[]>(url);
  const CarsData = respone.data;
  const isCarsDataEmpty =
    !Array.isArray(CarsData) || CarsData.length < 1 || !CarsData;
  return (
    <main className="overflow-hidden">
      <Hero />
      <div className="mt-12 padding-x padding-y max-width" id="discover">
        <div className="home__text-container">
          <h1 className="text-4xl font-extrabold">Car Catalogue</h1>
          <p>Explore the cars you might like</p>
        </div>
        <div className="home__filters">
          <SearchBar />
          <div className="home__filter-container">
            <CustomFilter title="fuel" options={fuels} />
            <CustomFilter title="year" options={yearsOfProduction} />
          </div>
        </div>
      </div>

      {!isCarsDataEmpty ? (
        <section>
          <div className="home__cars-wrapper">
            {CarsData?.map((car) => (
              <CarCard key={car.model} car={car} />
            ))}
          </div>
          <ShowMore
            pageNumber={(searchParams.limit || 10) / 10}
            isLimit={(searchParams.limit || 10) > CarsData.length}
          />
        </section>
      ) : (
        <section className="home__error-container">
          <h2 className="text-x1 font-bold">
            nothing to show: {respone?.message}
          </h2>
        </section>
      )}
    </main>
  );
}
