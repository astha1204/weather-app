import { useState, useEffect } from 'react'
import { buildWeatherURL, buildAirQualityURL } from '../utils/apiHelpers'
import { getTodayDate } from '../utils/formatters'

function useWeatherData(lat, lon, date = getTodayDate()) {
  const [data, setData] = useState({
    current: null,
    hourly: null,
    loading: true,
    error: null,
  })

  useEffect(() => {
    if (lat==null || lon==null) return

    const fetchData = async () => {
      setData(prev => ({ ...prev, loading: true, error: null }))

      try {
        const [weatherRes, airRes] = await Promise.all([
          fetch(buildWeatherURL(lat, lon, date)),
          fetch(buildAirQualityURL(lat, lon, date)),
        ])

        if (!weatherRes.ok) throw new Error('Weather API failed')
        if (!airRes.ok) throw new Error('Air Quality API failed')

        const [weather, air] = await Promise.all([
          weatherRes.json(),
          airRes.json(),
        ])

        // ── Shape current weather ──────────────────────────
        const current = {
          // Temperature
          tempCurrent:     weather.current?.temperature_2m ?? null,
          tempMax:         weather.daily?.temperature_2m_max?.[0] ?? null,
          tempMin:         weather.daily?.temperature_2m_min?.[0] ?? null,

          // Atmospheric
          precipitation:   weather.current?.precipitation ?? null,
          humidity:        weather.current?.relative_humidity_2m ?? null,
          uvIndex:         weather.daily?.uv_index_max?.[0] ?? null,

          // Sun cycle
          sunrise:         weather.daily?.sunrise?.[0] ?? null,
          sunset:          weather.daily?.sunset?.[0] ?? null,

          // Wind & Air
          windSpeedMax:    weather.daily?.wind_speed_10m_max?.[0] ?? null,
          precipProbMax:   weather.daily?.precipitation_probability_max?.[0] ?? null,

          // Air Quality
          aqi:             air.current?.european_aqi ?? null,
          pm10:            air.current?.pm10 ?? null,
          pm25:            air.current?.pm2_5 ?? null,
          co2:             null, //NOT AVAILABLE 
          co:              air.current?.carbon_monoxide ?? null,
          no2:             air.current?.nitrogen_dioxide ?? null,
          so2:             air.current?.sulphur_dioxide ?? null,
        }

        // ── Shape hourly data (filter to selected date only) 
        const times = weather.hourly?.time ?? []
        const datePrefix = date // 'YYYY-MM-DD'

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

        setData({
          current,
          hourly,
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
  }, [lat, lon, date])

  return data
}

export default useWeatherData