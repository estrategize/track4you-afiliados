import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

// Esta função ajuda a combinar classes do Tailwind de forma condicional e sem conflitos.
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
