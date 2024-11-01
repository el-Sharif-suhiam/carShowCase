"use client";
import React from "react";
import Image from "next/image";
import { CustomBtn } from "@/components/index";
import { useRouter } from "next/navigation";
function Hero() {
  const router = useRouter();
  function handleScroll() {
    router.push("#discover");
  }

  return (
    <main className="hero">
      <div className="flex-1 pt-36 padding-x">
        <h1 className="hero__title">
          Find, book, or rent a car - quickly and easily!
        </h1>
        <p className="hero__subtitle">
          Streamline your car rental experience with our effortless booking
          process.
        </p>
        <CustomBtn
          title="Explore Cars"
          containerStyles="bg-primary-blue text-white rounded-full mt-10 hover:bg-blue-500 font-bold"
          handleClick={handleScroll}
        />
      </div>
      <div className="hero__image-container">
        <div className="hero__image">
          <Image
            src="/hero.png"
            alt="hero picture"
            fill
            className="object-contain animation"
          />
        </div>
        <div className="hero__image-overlay" />
      </div>
    </main>
  );
}

export default Hero;
