import { useState, useEffect } from 'react'
import {
  buildWeatherURL,
  buildAirQualityURL,
  buildHistoricalWeatherURL,
  buildHistoricalAirQualityURLForDate,
} from '../utils/apiHelpers'
import { getTodayDate } from '../utils/formatters'

const cache = {}
function useWeatherData(lat, lon, date = getTodayDate()) {
  const [data, setData] = useState({
    current: null,
    hourly: null,
    loading: true,
    error: null,
  })

  useEffect(() => {
    if (lat == null || lon == null) return

    const fetchData = async () => {
      const cacheKey = `${lat}_${lon}_${date}`
      if (cache[cacheKey]) {
        setData({ ...cache[cacheKey], loading: false, error: null })
        return
      }

      setData(prev => ({ ...prev, loading: true, error: null }))

      const isToday = date === getTodayDate()

      // Helper — get first non-null hourly value for past dates
      const getFirstHourly = (arr) =>
        arr?.find(v => v !== null && v !== undefined) ?? null

      try {
        let weather, air

        if (isToday) {
          // ── Today → use forecast API ─────────────────────
          const [weatherRes, airRes] = await Promise.all([
            fetch(buildWeatherURL(lat, lon, date)),
            fetch(buildAirQualityURL(lat, lon, date)),
          ])

          if (!weatherRes.ok) throw new Error('Weather API failed')
          if (!airRes.ok) throw new Error('Air Quality API failed')

          ;[weather, air] = await Promise.all([
            weatherRes.json(),
            airRes.json(),
          ])
        } else {
          // ── Past date → use archive APIs ──────────────────
          const [weatherRes, airRes] = await Promise.all([
            fetch(buildHistoricalWeatherURL(lat, lon, date, date)),
            fetch(buildHistoricalAirQualityURLForDate(lat, lon, date)),
          ])

          if (!weatherRes.ok) throw new Error('Historical Weather API failed')
          if (!airRes.ok) throw new Error('Air Quality API failed')

          ;[weather, air] = await Promise.all([
            weatherRes.json(),
            airRes.json(),
          ])
        }

        // ── Shape current ─────────────────────────────────
        const current = {
          // Temperature
          tempCurrent:   weather.current?.temperature_2m
                         ?? weather.daily?.temperature_2m_mean?.[0]
                         ?? null,
          tempMax:       weather.daily?.temperature_2m_max?.[0] ?? null,
          tempMin:       weather.daily?.temperature_2m_min?.[0] ?? null,

          // Atmospheric
          precipitation: weather.current?.precipitation
                         ?? weather.daily?.precipitation_sum?.[0]
                         ?? null,
          humidity:      isToday
                         ? weather.current?.relative_humidity_2m ?? null
                         : getFirstHourly(weather.hourly?.relative_humidity_2m),
          uvIndex:       weather.daily?.uv_index_max?.[0] ?? null,

          // Sun cycle
          sunrise:       weather.daily?.sunrise?.[0] ?? null,
          sunset:        weather.daily?.sunset?.[0] ?? null,

          // Wind & Air
          windSpeedMax:  weather.daily?.wind_speed_10m_max?.[0] ?? null,
          precipProbMax: weather.daily?.precipitation_probability_max?.[0] ?? null,

          // Air Quality — today uses current block, past uses first hourly value
          aqi:  isToday
                ? air.current?.european_aqi ?? null
                : getFirstHourly(air.hourly?.european_aqi),

          pm10: isToday
                ? air.current?.pm10 ?? null
                : getFirstHourly(air.hourly?.pm10),

          pm25: isToday
                ? air.current?.pm2_5 ?? null
                : getFirstHourly(air.hourly?.pm2_5),

          co:   isToday
                ? air.current?.carbon_monoxide ?? null
                : getFirstHourly(air.hourly?.carbon_monoxide),

          no2:  isToday
                ? air.current?.nitrogen_dioxide ?? null
                : getFirstHourly(air.hourly?.nitrogen_dioxide),

          so2:  isToday
                ? air.current?.sulphur_dioxide ?? null
                : getFirstHourly(air.hourly?.sulphur_dioxide),

          co2: null, // Not available via Open-Meteo
        }

        // ── Shape hourly ──────────────────────────────────
        const times = weather.hourly?.time ?? []
        const datePrefix = date

        const filterToDate = (arr) =>
          arr?.filter((_, i) => times[i]?.startsWith(datePrefix)) ?? []

        const hourlyTimes = times.filter(t => t.startsWith(datePrefix))

        const hourly = {
          times:      hourlyTimes,
          temp:       filterToDate(weather.hourly?.temperature_2m),
          humidity:   filterToDate(weather.hourly?.relative_humidity_2m),
          precip:     filterToDate(weather.hourly?.precipitation),
          visibility: filterToDate(weather.hourly?.visibility),
          windSpeed:  filterToDate(weather.hourly?.wind_speed_10m),
          pm10:       filterToDate(air.hourly?.pm10),
          pm25:       filterToDate(air.hourly?.pm2_5),
        }
        cache[cacheKey] = { current, hourly }

        setData({ current, hourly, loading: false, error: null })

      } catch (err) {
        setData(prev => ({
          ...prev,
          loading: false,
          error: err.message || 'Something went wrong',
        }))
      }
    }

    fetchData()
  }, [lat, lon, date])

  return data
}

export default useWeatherData