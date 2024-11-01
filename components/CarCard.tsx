"use client";
import React from "react";
import { CustomBtn, CarDetails } from "@/components";
import { carData } from "@/types";
import Image from "next/image";
import { calculateRentalPrice, generateCarImageUrl } from "@/utils";
interface CarProps {
  car: carData;
}
function CarCard({ car }: CarProps) {
  const { city_mpg, year, make, model, transmission, drive } = car;
  const carRent = calculateRentalPrice(city_mpg, year);
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  return (
    <div className="car-card group">
      <div className="car-card__content">
        <h2 className="car-card__content-title">
          {make} {model}
        </h2>
      </div>
      <p className="flex mt-6 text-[32px] font-extrabold">
        <span className="self-start text-[14px] font-semibold">$</span>
        {carRent}
        <span className="self-end text-[14px] font-medium">/day</span>
      </p>
      <div className="relative w-full h-40 my-3 object-contain">
        <Image
          src={generateCarImageUrl(car)}
          alt="car model"
          fill
          priority
          className="object-contain"
        />
      </div>
      <div className="relative w-full mt-2 flex">
        <div className="flex group-hover:invisible w-full justify-between text-gray">
          <div className="flex flex-col justify-center items-center gap-2">
            <Image
              src="/steering-wheel.svg"
              width={20}
              height={20}
              alt="steering wheel"
            />
            <p className="text-[14px] font-semibold">
              {transmission === "a" ? "Automatic" : "Manual"}
            </p>
          </div>
          <div className="flex flex-col justify-center items-center gap-2">
            <Image src="/tire.svg" width={20} height={20} alt="tire image" />
            <p className="text-[14px] font-semibold">{drive.toUpperCase()}</p>
          </div>
          <div className="flex flex-col justify-center items-center gap-2">
            <Image src="/gas.svg" width={20} height={20} alt="Mpg Image" />
            <p className="text-[14px] font-semibold">{city_mpg} Mpg</p>
          </div>
        </div>
        <div className="car-card__btn-container">
          <CustomBtn
            title="View More"
            containerStyles="w-full py-[16px] rounded-full bg-primary-blue"
            textStyles="text-white text-[14px] leading-[17px] font-bold"
            rightIcon="/right-arrow.svg"
            handleClick={() => setIsOpen(true)}
          />
        </div>
      </div>
      <CarDetails
        isOpen={isOpen}
        closeModal={() => setIsOpen(false)}
        car={car}
      />
    </div>
  );
}

export default CarCard;
