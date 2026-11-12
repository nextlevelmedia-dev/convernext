"use client"

/** Pulsante che riapre le preferenze cookie di iubenda (footer). */
export default function CookiePreferencesLink({
  className = "",
  label = "modifica le preferenze cookie",
}: {
  className?: string
  label?: string
}) {
  const open = () => {
    const w = window as unknown as { _iub?: { cs?: { api?: { openPreferences?: () => void } } } }
    w._iub?.cs?.api?.openPreferences?.()
  }
  return (
    <button type="button" onClick={open} className={`iubenda-cs-preferences-link cursor-pointer ${className}`}>
      {label}
    </button>
  )
}
