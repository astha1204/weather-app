import { useState } from 'react'
import useGeolocation from '../hooks/useGeolocation'
import useHistoricalData from '../hooks/useHistoricalData'
import { getTodayDate, formatDateToAPI } from '../utils/formatters'

// Shared
import LoadingSpinner from '../components/shared/LoadingSpinner'
import ErrorMessage from '../components/shared/ErrorMessage'

// Historical components
import DateRangePicker from '../components/historical/DateRangePicker'
import TemperatureHistChart from '../components/historical/TemperatureHistChart'
import SunCycleHistChart from '../components/historical/SunCycleHistChart'
import PrecipitationHistChart from '../components/historical/PrecipitationHistChart'
import WindHistChart from '../components/historical/WindHistChart'
import AirQualityHistChart from '../components/historical/AirQualityHistChart'

function HistoricalWeather() {
  // Default → last 30 days
  const today = getTodayDate()
  const thirtyDaysAgo = formatDateToAPI(
    new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
  )

  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)

  const { lat, lon, loading: geoLoading, error: geoError } = useGeolocation()
  const { historical, loading, error } = useHistoricalData(lat, lon, startDate, endDate)

  // ── Handle fetch from date picker ───────────────────────
  const handleFetch = ({ startDate: s, endDate: e }) => {
    setStartDate(s)
    setEndDate(e)
  }

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
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-white">Historical Weather</h1>
        <p className="text-gray-400 text-sm">
          Analyze long-term trends · {lat?.toFixed(4)}°N, {lon?.toFixed(4)}°E
        </p>
      </div>

      {/* ── Date Range Picker ────────────────────────────── */}
      <DateRangePicker
        onFetch={handleFetch}
        loading={loading}
      />

      {/* ── No date selected yet ─────────────────────────── */}
      {!startDate && !endDate && (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
          <span className="text-5xl">📅</span>
          <p className="text-gray-400 text-base font-medium">
            Select a date range to view historical data
          </p>
          <p className="text-gray-600 text-sm">
            You can select up to 2 years of historical weather
          </p>
        </div>
      )}

      {/* ── Loading ───────────────────────────────────────── */}
      {loading && (
        <LoadingSpinner message="Fetching historical data..." />
      )}

      {/* ── Error ─────────────────────────────────────────── */}
      {error && !loading && (
        <ErrorMessage message={error} />
      )}

      {/* ── Charts ────────────────────────────────────────── */}
      {historical && !loading && !error && (
        <div className="flex flex-col gap-6">

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-gray-800" />
            <span className="text-gray-500 text-xs uppercase tracking-widest">
              {startDate} → {endDate}
            </span>
            <div className="h-px flex-1 bg-gray-800" />
          </div>

          {/* Stats Summary */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-gray-900 rounded-xl p-3 flex flex-col gap-1">
              <span className="text-xs text-gray-500 uppercase">Data Points</span>
              <span className="text-white font-bold text-lg">
                {historical.dates?.length ?? 0} days
              </span>
            </div>
            <div className="bg-gray-900 rounded-xl p-3 flex flex-col gap-1">
              <span className="text-xs text-gray-500 uppercase">Avg Max Temp</span>
              <span className="text-red-400 font-bold text-lg">
                {historical.tempMax?.length
                  ? `${Math.round(historical.tempMax.reduce((a, b) => a + b, 0) / historical.tempMax.length)}°C`
                  : 'N/A'}
              </span>
            </div>
            <div className="bg-gray-900 rounded-xl p-3 flex flex-col gap-1">
              <span className="text-xs text-gray-500 uppercase">Total Precip</span>
              <span className="text-blue-400 font-bold text-lg">
                {historical.precipitation?.length
                  ? `${Math.round(historical.precipitation.reduce((a, b) => a + (b ?? 0), 0))} mm`
                  : 'N/A'}
              </span>
            </div>
            <div className="bg-gray-900 rounded-xl p-3 flex flex-col gap-1">
              <span className="text-xs text-gray-500 uppercase">Avg Wind</span>
              <span className="text-green-400 font-bold text-lg">
                {historical.windSpeedMax?.length
                  ? `${Math.round(historical.windSpeedMax.reduce((a, b) => a + (b ?? 0), 0) / historical.windSpeedMax.length)} km/h`
                  : 'N/A'}
              </span>
            </div>
          </div>

          {/* Charts */}
          <TemperatureHistChart data={historical} />
          <SunCycleHistChart data={historical} />
          <PrecipitationHistChart data={historical} />
          <WindHistChart data={historical} />
          <AirQualityHistChart data={historical} />

        </div>
      )}

    </div>
  )
}

export default HistoricalWeather