function WindCard({ windSpeedMax, precipProbMax }) {
  return (
    <div className="bg-gray-900 rounded-2xl p-5 flex flex-col gap-4">
      <div className="flex items-center gap-2 text-gray-400 text-sm uppercase tracking-wide">
        <span>💨</span>
        <span>Wind & Air</span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {/* Max Wind Speed */}
        <div className="flex flex-col gap-2 bg-gray-800 rounded-xl p-4">
          <span className="text-3xl">🌬️</span>
          <span className="text-xs text-gray-500 uppercase">Max Wind Speed</span>
          <span className="text-blue-400 font-bold text-xl">
            {windSpeedMax !== null ? `${windSpeedMax} km/h` : 'N/A'}
          </span>
        </div>

        {/* Precipitation Probability */}
        <div className="flex flex-col gap-2 bg-gray-800 rounded-xl p-4">
          <span className="text-3xl">🌂</span>
          <span className="text-xs text-gray-500 uppercase">Precip. Probability</span>
          <span className="text-cyan-400 font-bold text-xl">
            {precipProbMax !== null ? `${precipProbMax}%` : 'N/A'}
          </span>

          {/* Progress bar */}
          {precipProbMax !== null && (
            <div className="w-full bg-gray-700 rounded-full h-1.5 mt-1">
              <div
                className="bg-cyan-400 h-1.5 rounded-full transition-all"
                style={{ width: `${precipProbMax}%` }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default WindCard