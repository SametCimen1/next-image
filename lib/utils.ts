import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getImageKey(url:string){
  return url.slice(52);
}

export function getImageUrl(url:string){
  return `https://albertcamusbucket.s3.us-east-2.amazonaws.com/${url}`
}