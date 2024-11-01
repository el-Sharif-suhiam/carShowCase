"use client";
import { ShowMoreProps } from "@/types";
import { useRouter } from "next/navigation";

import React from "react";
import CustomBtn from "./CustomBtn";
import { updateSearchParams } from "@/utils";

function ShowMore({ pageNumber, isLimit }: ShowMoreProps) {
  const router = useRouter();
  const handleNav = () => {
    const newLimit = (pageNumber + 1) * 10;
    const newUrl = updateSearchParams("limit", String(newLimit));
    router.push(newUrl, { scroll: false });
  };
  return (
    <div className="w-full flex-center gap-5 mt-10">
      {!isLimit && (
        <CustomBtn
          title="Show More"
          btnType="button"
          containerStyles="bg-primary-blue rounded-full text-white"
          handleClick={handleNav}
        />
      )}
    </div>
  );
}

export default ShowMore;
