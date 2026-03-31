import { formatTime } from '../../utils/formatters'

function SunCycleCard({ sunrise, sunset }) {
  return (
    <div className="bg-gray-900 rounded-2xl p-5 flex flex-col gap-4">
      <div className="flex items-center gap-2 text-gray-400 text-sm uppercase tracking-wide">
        <span>🌅</span>
        <span>Sun Cycle</span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {/* Sunrise */}
        <div className="flex flex-col gap-2 bg-gray-800 rounded-xl p-4">
          <span className="text-3xl">🌄</span>
          <span className="text-xs text-gray-500 uppercase">Sunrise</span>
          <span className="text-yellow-400 font-bold text-xl">
            {formatTime(sunrise)}
          </span>
        </div>

        {/* Sunset */}
        <div className="flex flex-col gap-2 bg-gray-800 rounded-xl p-4">
          <span className="text-3xl">🌇</span>
          <span className="text-xs text-gray-500 uppercase">Sunset</span>
          <span className="text-orange-400 font-bold text-xl">
            {formatTime(sunset)}
          </span>
        </div>
      </div>
    </div>
  )
}

export default SunCycleCard