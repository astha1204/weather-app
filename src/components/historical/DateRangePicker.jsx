import { useState } from 'react'
import {
  getTodayDate,
  formatDateToAPI,
  isRangeValid,
  getMinHistoricalDate,
} from '../../utils/formatters'

function DateRangePicker({ onFetch, loading }) {
  // Default → last 30 days
  const today = getTodayDate()
  const thirtyDaysAgo = formatDateToAPI(
    new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
  )

  const [startDate, setStartDate] = useState(thirtyDaysAgo)
  const [endDate, setEndDate] = useState(today)
  const [error, setError] = useState(null)

  const validate = (start, end) => {
    if (!start || !end) {
      return 'Please select both start and end dates.'
    }
    if (new Date(end) < new Date(start)) {
      return 'End date cannot be before start date.'
    }
    if (new Date(end) > new Date(today)) {
      return 'End date cannot be in the future.'
    }
    if (!isRangeValid(start, end)) {
      return 'Date range cannot exceed 2 years (730 days).'
    }
    return null
  }

  const handleFetch = () => {
    const validationError = validate(startDate, endDate)
    if (validationError) {
      setError(validationError)
      return
    }
    setError(null)
    onFetch({ startDate, endDate })
  }

  const handleStartChange = (e) => {
    setStartDate(e.target.value)
    setError(null)
  }

  const handleEndChange = (e) => {
    setEndDate(e.target.value)
    setError(null)
  }

  // Calculate days in range
  const daysDiff = startDate && endDate
    ? Math.round(
        (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24)
      )
    : null

  return (
    <div className="bg-gray-900 rounded-2xl p-5 flex flex-col gap-4">

      {/* Title */}
      <div className="flex items-center gap-2 text-gray-400 text-sm uppercase tracking-wide">
        <span>📅</span>
        <span>Select Date Range</span>
        <span className="ml-auto text-xs text-gray-600">Max 2 years</span>
      </div>

      {/* Inputs Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

        {/* Start Date */}
        <div className="flex flex-col gap-1">
          <label className="text-xs text-gray-500 uppercase tracking-wide">
            Start Date
          </label>
          <input
            type="date"
            value={startDate}
            min={getMinHistoricalDate()}
            max={today}
            onChange={handleStartChange}
            className="bg-gray-800 text-white border border-gray-700 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-blue-500 cursor-pointer w-full"
          />
        </div>

        {/* End Date */}
        <div className="flex flex-col gap-1">
          <label className="text-xs text-gray-500 uppercase tracking-wide">
            End Date
          </label>
          <input
            type="date"
            value={endDate}
            min={startDate || getMinHistoricalDate()}
            max={today}
            onChange={handleEndChange}
            className="bg-gray-800 text-white border border-gray-700 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-blue-500 cursor-pointer w-full"
          />
        </div>

      </div>

      {/* Range Info */}
      {daysDiff !== null && daysDiff >= 0 && !error && (
        <div className="flex items-center gap-2">
          <div className="h-1.5 flex-1 bg-gray-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500 rounded-full transition-all"
              style={{ width: `${Math.min((daysDiff / 730) * 100, 100)}%` }}
            />
          </div>
          <span className="text-xs text-gray-400 whitespace-nowrap">
            {daysDiff} / 730 days
          </span>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="flex items-center gap-2 bg-red-900/30 border border-red-800 rounded-xl px-4 py-2">
          <span>⚠️</span>
          <span className="text-red-400 text-sm">{error}</span>
        </div>
      )}

      {/* Fetch Button */}
      <button
        onClick={handleFetch}
        disabled={loading}
        className="w-full sm:w-auto sm:self-end bg-blue-600 hover:bg-blue-500 disabled:bg-gray-700 disabled:text-gray-500 disabled:cursor-not-allowed text-white font-semibold px-6 py-2.5 rounded-xl transition-all text-sm"
      >
        {loading ? (
          <span className="flex items-center gap-2 justify-center">
            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Fetching...
          </span>
        ) : (
          '📊 Fetch Historical Data'
        )}
      </button>

    </div>
  )
}

export default DateRangePicker