import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getLanguageFromPath(pathname: string): 'en' | 'fr' {
  if (pathname.startsWith('/fr')) return 'fr'
  return 'en'
}

export function removeLanguagePrefix(pathname: string): string {
  return pathname.replace(/^\/(en|fr)/, '') || '/'
}

export function addLanguagePrefix(pathname: string, lang: 'en' | 'fr'): string {
  const cleanPath = pathname.startsWith('/') ? pathname : `/${pathname}`
  return `/${lang}${cleanPath === '/' ? '' : cleanPath}`
}
