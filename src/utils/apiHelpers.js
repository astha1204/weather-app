export const buildWeatherURL = (lat, lon, date) => {
  const base = 'https://api.open-meteo.com/v1/forecast'
  const params = new URLSearchParams({
    latitude: lat,
    longitude: lon,
    daily: [
      'temperature_2m_max',
      'temperature_2m_min',
      'sunrise',
      'sunset',
      'uv_index_max',
      'precipitation_sum',
      'wind_speed_10m_max',
      'precipitation_probability_max',
    ].join(','),
    hourly: [
      'temperature_2m',
      'relative_humidity_2m',
      'precipitation',
      'visibility',
      'wind_speed_10m',
    ].join(','),
    current: [
      'temperature_2m',
      'relative_humidity_2m',
      'wind_speed_10m',
      'precipitation',
    ].join(','),
    timezone: 'auto',
    // forecast_days: 1,
    start_date: date,
    end_date: date,
  })
  return `${base}?${params}`
}

export const buildAirQualityURL = (lat, lon, date) => {
  const base = 'https://air-quality-api.open-meteo.com/v1/air-quality'
  const params = new URLSearchParams({
    latitude: lat,
    longitude: lon,
    hourly: [
      'pm10',
      'pm2_5',
      'carbon_monoxide',
      'nitrogen_dioxide',
      'sulphur_dioxide',
      'european_aqi',
    ].join(','),
    current: [
      'pm10',
      'pm2_5',
      'carbon_monoxide',
      'nitrogen_dioxide',
      'sulphur_dioxide',
      'european_aqi',
    ].join(','),
    timezone: 'auto',
    start_date: date,
    end_date: date,
  })
  return `${base}?${params}`
}

// ── Used by Page 1 (past dates) + Page 2 ──────────────────
export const buildHistoricalWeatherURL = (lat, lon, startDate, endDate) => {
  const base = 'https://archive-api.open-meteo.com/v1/archive'
  const params = new URLSearchParams({
    latitude: lat,
    longitude: lon,
    daily: [
      'temperature_2m_max',
      'temperature_2m_min',
      'temperature_2m_mean',
      'sunrise',
      'sunset',
      'precipitation_sum',
      'wind_speed_10m_max',
      'wind_direction_10m_dominant',
      'uv_index_max',                    // ← added for Page 1 past dates
      'precipitation_probability_max',   // ← added for Page 1 past dates
    ].join(','),
    hourly: [
      'temperature_2m',                  // ← added for Page 1 hourly charts
      'relative_humidity_2m',            // ← added for Page 1 hourly charts
      'precipitation',                   // ← added for Page 1 hourly charts
      'visibility',                      // ← added for Page 1 hourly charts
      'wind_speed_10m',                  // ← added for Page 1 hourly charts
    ].join(','),
    timezone: 'auto',
    start_date: startDate,
    end_date: endDate,
  })
  return `${base}?${params}`
}

// ── Used by Page 2 historical air quality ─────────────────
export const buildHistoricalAirQualityURL = (lat, lon, startDate, endDate) => {
  const base = 'https://air-quality-api.open-meteo.com/v1/air-quality'
  const params = new URLSearchParams({
    latitude: lat,
    longitude: lon,
    hourly: [
      'pm10',
      'pm2_5',
    ].join(','),
    timezone: 'auto',
    start_date: startDate,
    end_date: endDate,
  })
  return `${base}?${params}`
}

// ── Used by Page 1 for past date air quality ──────────────
export const buildHistoricalAirQualityURLForDate = (lat, lon, date) => {
  const base = 'https://air-quality-api.open-meteo.com/v1/air-quality'
  const params = new URLSearchParams({
    latitude: lat,
    longitude: lon,
    hourly: [
      'pm10',
      'pm2_5',
      'carbon_monoxide',
      'nitrogen_dioxide',
      'sulphur_dioxide',
      'european_aqi',
    ].join(','),
    timezone: 'auto',
    start_date: date,
    end_date: date,
  })
  return `${base}?${params}`
}