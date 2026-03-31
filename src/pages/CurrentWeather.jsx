import { useState } from 'react'
import useGeolocation from '../hooks/useGeolocation'
import useWeatherData from '../hooks/useWeatherData'
import { getTodayDate, formatDate } from '../utils/formatters'

// Shared
import LoadingSpinner from '../components/shared/LoadingSpinner'
import SkeletonLoader from '../components/shared/SkeletonLoader'
import ErrorMessage from '../components/shared/ErrorMessage'

// Cards
import TempCard from '../components/cards/TempCard'
import AtmosphericCard from '../components/cards/AtmosphericCard'
import SunCycleCard from '../components/cards/SunCycleCard'
import WindCard from '../components/cards/WindCard'
import AirQualityCard from '../components/cards/AirQualityCard'

// Charts
import TemperatureChart from '../components/charts/TemperatureChart'
import HumidityChart from '../components/charts/HumidityChart'
import PrecipitationChart from '../components/charts/PrecipitationChart'
import VisibilityChart from '../components/charts/VisibilityChart'
import WindSpeedChart from '../components/charts/WindSpeedChart'
import PM10PM25Chart from '../components/charts/PM10PM25Chart'

function CurrentWeather() {
  const [selectedDate, setSelectedDate] = useState(getTodayDate())
  const { lat, lon, loading: geoLoading, error: geoError } = useGeolocation()
  const { current, hourly, loading, error } = useWeatherData(lat, lon, selectedDate)

  // ── GPS loading ─────────────────────────────────────────
  if (geoLoading) {
    return <LoadingSpinner message="Detecting your location..." />
  }

  // ── GPS error ───────────────────────────────────────────
  if (geoError) {
    return <ErrorMessage message={geoError} />
  }

  return (
    <div className="flex flex-col gap-6">

      {/* ── Header ───────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Current Weather</h1>
          <p className="text-gray-400 text-sm mt-1">
            {formatDate(selectedDate)} · {lat?.toFixed(4)}°N, {lon?.toFixed(4)}°E
          </p>
        </div>

        {/* Date Picker */}
        <div className="flex flex-col gap-1">
          <label className="text-xs text-gray-500 uppercase tracking-wide">
            Select Date
          </label>
          <input
            type="date"
            value={selectedDate}
            max={getTodayDate()}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="bg-gray-800 text-white border border-gray-700 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-blue-500 cursor-pointer"
          />
        </div>
      </div>

      {/* ── Error ────────────────────────────────────────── */}
      {error && <ErrorMessage message={error} />}

      {/* ── Skeleton while loading ───────────────────────── */}
      {loading && <SkeletonLoader />}

      {/* ── Actual content ───────────────────────────────── */}
      {!loading && !error && current && (
        <>
          {/* Row 1: Temp + Atmospheric + Sun */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <TempCard
              current={current?.tempCurrent}
              min={current?.tempMin}
              max={current?.tempMax}
            />
            <AtmosphericCard
              precipitation={current?.precipitation}
              humidity={current?.humidity}
              uvIndex={current?.uvIndex}
            />
            <SunCycleCard
              sunrise={current?.sunrise}
              sunset={current?.sunset}
            />
          </div>

          {/* Row 2: Wind + Air Quality */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-1">
              <WindCard
                windSpeedMax={current?.windSpeedMax}
                precipProbMax={current?.precipProbMax}
              />
            </div>
            <div className="lg:col-span-2">
              <AirQualityCard
                aqi={current?.aqi}
                pm10={current?.pm10}
                pm25={current?.pm25}
                co={current?.co}
                co2={current?.co2}
                no2={current?.no2}
                so2={current?.so2}
              />
            </div>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-gray-800" />
            <span className="text-gray-500 text-xs uppercase tracking-widest">
              Hourly Breakdown
            </span>
            <div className="h-px flex-1 bg-gray-800" />
          </div>

          {/* Charts */}
          {hourly ? (
            <div className="flex flex-col gap-4">
              <TemperatureChart data={hourly} />
              <HumidityChart data={hourly} />
              <PrecipitationChart data={hourly} />
              <VisibilityChart data={hourly} />
              <WindSpeedChart data={hourly} />
              <PM10PM25Chart data={hourly} />
            </div>
          ) : (
            <p className="text-gray-500 text-sm text-center py-10">
              No hourly data available for this date.
            </p>
          )}
        </>
      )}

    </div>
  )
}

export default CurrentWeather