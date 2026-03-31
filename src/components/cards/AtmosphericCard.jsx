import { getUVLabel, roundTo } from '../../utils/formatters'

function AtmosphericCard({ precipitation, humidity, uvIndex }) {
  const uv = getUVLabel(uvIndex)

  return (
    <div className="bg-gray-900 rounded-2xl p-5 flex flex-col gap-4">
      <div className="flex items-center gap-2 text-gray-400 text-sm uppercase tracking-wide">
        <span>🌫️</span>
        <span>Atmospheric Conditions</span>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {/* Precipitation */}
        <div className="flex flex-col gap-1 bg-gray-800 rounded-xl p-3">
          <span className="text-xl">🌧️</span>
          <span className="text-xs text-gray-500 uppercase">Precipitation</span>
          <span className="text-white font-semibold text-lg">
            {precipitation !== null ? `${roundTo(precipitation, 1)} mm` : 'N/A'}
          </span>
        </div>

        {/* Humidity */}
        <div className="flex flex-col gap-1 bg-gray-800 rounded-xl p-3">
          <span className="text-xl">💧</span>
          <span className="text-xs text-gray-500 uppercase">Humidity</span>
          <span className="text-white font-semibold text-lg">
            {humidity !== null ? `${humidity}%` : 'N/A'}
          </span>
        </div>

        {/* UV Index */}
        <div className="flex flex-col gap-1 bg-gray-800 rounded-xl p-3">
          <span className="text-xl">☀️</span>
          <span className="text-xs text-gray-500 uppercase">UV Index</span>
          <span className="text-white font-semibold text-lg">
            {uvIndex !== null ? uvIndex : 'N/A'}
          </span>
          {uvIndex !== null && (
            <span
              className="text-xs font-semibold"
              style={{ color: uv.color }}
            >
              {uv.label}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

export default AtmosphericCard