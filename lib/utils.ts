import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function addCommasToNumber(number : number) {
  if (typeof number !== "number") {
    return number; // Return unchanged if it's not a number
  }
  
  const numberStr = number.toString();
  const parts = numberStr.split(".");
  
  // Split the number into its integer and decimal parts
  const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const decimalPart = parts[1] ? "." + parts[1] : "";
  
  // Combine the integer and decimal parts
  return integerPart + decimalPart;
}

export function getSizeName(value: string) {
  switch (value) {
    case "xs":
      return "X-Small"
    case "s":
      return "Small"
    case "m":
      return "Medium"
    case "l":
      return "Large"
    case "xl":
      return "X-Large"
    case "one-size":
      return "One Size"
  }
}
