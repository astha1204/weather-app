import { formatTemp } from '../../utils/formatters'

function TempCard({ current, min, max, unit = 'C' }) {
  return (
    <div className="bg-gray-900 rounded-2xl p-5 flex flex-col gap-4">
      <div className="flex items-center gap-2 text-gray-400 text-sm uppercase tracking-wide">
        <span>🌡️</span>
        <span>Temperature</span>
      </div>

      {/* Current Temp — big and bold */}
      <div className="flex items-end gap-2">
        <span className="text-6xl font-bold text-white">
          {current !== null ? Math.round(unit === 'F' ? (current * 9/5 + 32) : current) : '--'}
        </span>
        <span className="text-2xl text-gray-400 mb-2">°{unit}</span>
      </div>

      {/* Min / Max */}
      <div className="flex gap-4">
        <div className="flex flex-col">
          <span className="text-xs text-gray-500 uppercase">Min</span>
          <span className="text-blue-400 font-semibold text-lg">
            {formatTemp(min, unit)}
          </span>
        </div>
        <div className="w-px bg-gray-700" />
        <div className="flex flex-col">
          <span className="text-xs text-gray-500 uppercase">Max</span>
          <span className="text-red-400 font-semibold text-lg">
            {formatTemp(max, unit)}
          </span>
        </div>
      </div>
    </div>
  )
}

export default TempCard