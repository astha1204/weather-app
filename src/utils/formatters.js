// ─── Temperature ───────────────────────────────────────────
export const celsiusToFahrenheit = (c) => {
  if (c === null || c === undefined) return null
  return Math.round((c * 9) / 5 + 32)
}

export const formatTemp = (value, unit = 'C') => {
  if (value === null || value === undefined) return 'N/A'
  const val = unit === 'F' ? celsiusToFahrenheit(value) : Math.round(value)
  return `${val}°${unit}`
}

// ─── Time ──────────────────────────────────────────────────
export const formatTime = (isoString) => {
  if (!isoString) return 'N/A'
  const date = new Date(isoString)
  return date.toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  })
}

export const formatHour = (isoString) => {
  if (!isoString) return ''
  const date = new Date(isoString)
  return date.toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  })
}

export const formatDate = (isoString) => {
  if (!isoString) return 'N/A'
  const date = new Date(isoString)
  return date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

// ─── IST Conversion (for Page 2 Sun Cycle) ─────────────────
export const toIST = (isoString) => {
  if (!isoString) return 'N/A'
  const date = new Date(isoString)
  return date.toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
    timeZone: 'Asia/Kolkata',
  })
}

export const toISTDateLabel = (isoString) => {
  if (!isoString) return ''
  const date = new Date(isoString)
  return date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    timeZone: 'Asia/Kolkata',
  })
}

// ─── Date Helpers ───────────────────────────────────────────
export const getTodayDate = () => {
  return new Date().toISOString().split('T')[0]  // YYYY-MM-DD
}

export const formatDateToAPI = (date) => {
  // Accepts Date object or string → returns YYYY-MM-DD
  const d = new Date(date)
  return d.toISOString().split('T')[0]
}

export const getMaxHistoricalDate = () => {
  return getTodayDate()
}

export const getMinHistoricalDate = () => {
  const d = new Date()
  d.setFullYear(d.getFullYear() - 2)
  return formatDateToAPI(d)
}

export const isRangeValid = (startDate, endDate) => {
  const start = new Date(startDate)
  const end = new Date(endDate)
  const diffMs = end - start
  const diffDays = diffMs / (1000 * 60 * 60 * 24)
  return diffDays >= 0 && diffDays <= 730  // max 2 years
}

// ─── Wind Direction ─────────────────────────────────────────
export const degreesToDirection = (deg) => {
  if (deg === null || deg === undefined) return 'N/A'
  const dirs = ['N','NE','E','SE','S','SW','W','NW']
  return dirs[Math.round(deg / 45) % 8]
}

// ─── AQI Label ──────────────────────────────────────────────
export const getAQILabel = (aqi) => {
  if (aqi === null || aqi === undefined) return { label: 'N/A', color: '#6b7280' }
  if (aqi <= 20)  return { label: 'Good',              color: '#22c55e' }
  if (aqi <= 40)  return { label: 'Fair',              color: '#84cc16' }
  if (aqi <= 60)  return { label: 'Moderate',          color: '#eab308' }
  if (aqi <= 80)  return { label: 'Poor',              color: '#f97316' }
  if (aqi <= 100) return { label: 'Very Poor',         color: '#ef4444' }
  return           { label: 'Extremely Poor',          color: '#7c3aed' }
}

// ─── UV Index Label ─────────────────────────────────────────
export const getUVLabel = (uv) => {
  if (uv === null || uv === undefined) return { label: 'N/A', color: '#6b7280' }
  if (uv <= 2)  return { label: 'Low',       color: '#22c55e' }
  if (uv <= 5)  return { label: 'Moderate',  color: '#eab308' }
  if (uv <= 7)  return { label: 'High',      color: '#f97316' }
  if (uv <= 10) return { label: 'Very High', color: '#ef4444' }
  return         { label: 'Extreme',         color: '#7c3aed' }
}

// ─── Number Formatting ──────────────────────────────────────
export const roundTo = (val, decimals = 1) => {
  if (val === null || val === undefined) return null
  return Math.round(val * 10 ** decimals) / 10 ** decimals
}

export const formatVisibility = (meters) => {
  if (meters === null || meters === undefined) return 'N/A'
  if (meters >= 1000) return `${(meters / 1000).toFixed(1)} km`
  return `${meters} m`
}