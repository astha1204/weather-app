import { getAQILabel, roundTo } from '../../utils/formatters'

function MetricItem({ icon, label, value, unit }) {
  return (
    <div className="flex flex-col gap-1 bg-gray-800 rounded-xl p-3">
      <span className="text-lg">{icon}</span>
      <span className="text-xs text-gray-500 uppercase">{label}</span>
      <span className="text-white font-semibold text-base">
        {value !== null && value !== undefined
          ? `${roundTo(value, 1)} ${unit}`
          : 'N/A'}
      </span>
    </div>
  )
}

function AirQualityCard({ aqi, pm10, pm25, co, co2, no2, so2 }) {
  const aqiInfo = getAQILabel(aqi)

  return (
    <div className="bg-gray-900 rounded-2xl p-5 flex flex-col gap-4">
      <div className="flex items-center gap-2 text-gray-400 text-sm uppercase tracking-wide">
        <span>🏭</span>
        <span>Air Quality</span>
      </div>

      {/* AQI Hero */}
      <div className="flex items-center gap-4 bg-gray-800 rounded-xl p-4">
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-xl"
          style={{ backgroundColor: aqiInfo.color }}
        >
          {aqi ?? '--'}
        </div>
        <div className="flex flex-col">
          <span className="text-xs text-gray-500 uppercase">Air Quality Index</span>
          <span
            className="text-lg font-bold"
            style={{ color: aqiInfo.color }}
          >
            {aqiInfo.label}
          </span>
          <span className="text-xs text-gray-500">European AQI Scale</span>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        <MetricItem icon="🟤" label="PM10"  value={pm10} unit="μg/m³" />
        <MetricItem icon="🔴" label="PM2.5" value={pm25} unit="μg/m³" />
        <MetricItem icon="⚫" label="CO"    value={co}   unit="μg/m³" />
        <MetricItem icon="🟡" label="NO₂"   value={no2}  unit="μg/m³" />
        <MetricItem icon="🟠" label="SO₂"   value={so2}  unit="μg/m³" />

        {/* CO2 — not available */}
        <div className="flex flex-col gap-1 bg-gray-800 rounded-xl p-3">
          <span className="text-lg">🌿</span>
          <span className="text-xs text-gray-500 uppercase">CO₂</span>
          <span className="text-gray-600 font-semibold text-sm">
            Not available
          </span>
          <span className="text-xs text-gray-700">via Open-Meteo</span>
        </div>
      </div>
    </div>
  )
}

export default AirQualityCard