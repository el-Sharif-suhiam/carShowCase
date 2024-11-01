import { carData, Filters } from "@/types";
interface FetchOptions extends RequestInit {
  "x-rapidapi-key"?: string;
  "x-rapidapi-host"?: string;
}

interface FetchResponse<T> {
  data?: T;
  error?: boolean;
  message?: string;
}

export async function fetchCars<T>(url: string): Promise<FetchResponse<T>> {
  try {
    const defaultOptions: FetchOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-rapidapi-key": process.env.CARS_API_KEY as string,
        "x-rapidapi-host": "cars-by-api-ninjas.p.rapidapi.com",
      },
      cache: "no-cache",
    };

    // Make the request
    const response = await fetch(url, defaultOptions);

    // Check the response status
    if (!response.ok) {
      // In case of a server error (like 404 or 500)
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data: T = await response.json();

    // Return the data if successful
    return { data };
  } catch (error) {
    // Handle any errors from fetching or server issues
    console.error(
      "Fetch error:",
      error instanceof Error ? error.message : "Unknown fetching error"
    );
    return {
      error: true,
      message:
        error instanceof Error ? error.message : "Unknown fetching error",
    };
  }
}

/**
 * Function to calculate a rental price based on city MPG and the car's manufacturing year.
 * @param cityMpg - The city miles per gallon (fuel efficiency) of the car.
 * @param year - The year the car was manufactured.
 * @returns The calculated rental price in USD.
 */
export function calculateRentalPrice(cityMpg: number, year: number): number {
  // Define base price per day
  const basePricePerDay = 50;

  // Adjust price based on mileage (city mpg) and age of the car
  const mileageFactor = cityMpg > 0 ? 100 / cityMpg : 1; // Higher mpg means cheaper rental
  const ageFactor =
    new Date().getFullYear() - year > 0
      ? (new Date().getFullYear() - year) * 0.1
      : 1;

  // Final price is base price adjusted by mileage and age factor
  const rentalPrice = basePricePerDay * mileageFactor * ageFactor;

  // Return the rounded price
  return Math.round(rentalPrice);
}

export function generateCarImageUrl(car: carData, angle?: string) {
  const url = new URL("https://cdn.imagin.studio/getimage");
  const { make, year, model } = car;
  url.searchParams.append("customer", "img");
  url.searchParams.append("make", make);
  url.searchParams.append("modelFamily", model.split(" ")[0]);
  url.searchParams.append("zoomType", "fullscreen");
  url.searchParams.append("modelYear", `${year}`);
  url.searchParams.append("angle", `${angle}`);

  return `${url}`;
}

export const updateSearchParams = (
  type: string,
  value: string,
  deleteValue?: string
) => {
  const searchParams = new URLSearchParams(window.location.search);

  searchParams.set(type, value);
  if (deleteValue) {
    searchParams.delete(deleteValue);
  }
  const newPathName = `${window.location.pathname}?${searchParams.toString()}`;
  return newPathName;
};
