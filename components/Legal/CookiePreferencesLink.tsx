"use client"

import { openCookiePreferences } from "./consent"

/** Pulsante che riapre il banner cookie (footer e cookie policy). */
export default function CookiePreferencesLink({
  className = "",
  label = "modifica le preferenze cookie",
}: {
  className?: string
  label?: string
}) {
  return (
    <button type="button" onClick={openCookiePreferences} className={`cursor-pointer ${className}`}>
      {label}
    </button>
  )
}
