import { ButtonHTMLAttributes, MouseEventHandler } from "react";

type buttonType = ButtonHTMLAttributes<HTMLButtonElement>;
export interface CustomButtonProps {
  title: string;
  btnType?: buttonType["type"];
  containerStyles?: string;
  textStyles?: string;
  rightIcon?: string;
  isDisable?: boolean;
  handleClick?: MouseEventHandler<HTMLButtonElement>;
}

export interface SearchManufacturerProps {
  manufacturer: string;
  setManufacturer: (manufacturer: string) => void;
}

export interface carData {
  city_mpg: number;
  class: string;
  combination_mpg: number;
  cylinders: number;
  displacement: number;
  drive: string;
  fuel_type: string;
  highway_mpg: number;
  make: string;
  model: string;
  transmission: string;
  year: number;
}
export interface Filters {
  make: string;
  year: number;
  fuel: string;
  limit: number;
  model: string;
}

interface OptionsProps {
  title: string;
  value: string;
}
export interface CustomFilterProps {
  title: string;
  options: OptionsProps[];
}
export interface ShowMoreProps {
  pageNumber: number;
  isLimit: boolean;
}
