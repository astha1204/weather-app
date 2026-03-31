import { useState, useEffect } from 'react'
import { buildHistoricalWeatherURL, buildHistoricalAirQualityURL } from '../utils/apiHelpers'

function useHistoricalData(lat, lon, startDate, endDate) {
  const [data, setData] = useState({
    historical: null,
    loading: true,
    error: null,
  })

  useEffect(() => {
    if (lat == null || lon == null || !startDate || !endDate) return

    const fetchData = async () => {
      setData(prev => ({ ...prev, loading: true, error: null }))

      try {
        const [weatherRes, airRes] = await Promise.all([
          fetch(buildHistoricalWeatherURL(lat, lon, startDate, endDate)),
          fetch(buildHistoricalAirQualityURL(lat, lon, startDate, endDate)),
        ])

        if (!weatherRes.ok) throw new Error('Historical Weather API failed')
        if (!airRes.ok) throw new Error('Historical Air Quality API failed')

        const [weather, air] = await Promise.all([
          weatherRes.json(),
          airRes.json(),
        ])

        const daily = weather.daily ?? {}
        const airHourly = air.hourly ?? {}
        const airTimes = airHourly.time ?? []

        // ✅ Single date axis from weather
        const weatherDates = daily.time ?? []

        // ✅ Reusable aggregator aligned to weather dates
        const getDailyAvg = (hourlyArr) => {
          return weatherDates.map(date => {
            const indices = airTimes
              .map((t, i) => (t.startsWith(date) ? i : -1))
              .filter(i => i !== -1)
            const values = indices
              .map(i => hourlyArr?.[i])
              .filter(v => v !== null && v !== undefined)
            if (values.length === 0) return null
            return Math.round(
              values.reduce((sum, v) => sum + v, 0) / values.length
            )
          })
        }

        const historical = {
          // ✅ Single date axis for ALL charts
          dates:         weatherDates,

          // Temperature
          tempMax:       daily.temperature_2m_max ?? [],
          tempMin:       daily.temperature_2m_min ?? [],
          tempMean:      daily.temperature_2m_mean ?? [],

          // Sun Cycle
          sunrise:       daily.sunrise ?? [],
          sunset:        daily.sunset ?? [],

          // Precipitation
          precipitation: daily.precipitation_sum ?? [],

          // Wind
          windSpeedMax:  daily.wind_speed_10m_max ?? [],
          windDirection: daily.wind_direction_10m_dominant ?? [],

          // Air Quality — aligned to same dates axis
          pm10:          getDailyAvg(airHourly.pm10),
          pm25:          getDailyAvg(airHourly.pm2_5),
        }

        setData({
          historical,
          loading: false,
          error: null,
        })
      } catch (err) {
        setData(prev => ({
          ...prev,
          loading: false,
          error: err.message || 'Something went wrong',
        }))
      }
    }

    fetchData()
  }, [lat, lon, startDate, endDate])

  return data
}

export default useHistoricalData