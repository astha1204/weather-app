import { useState } from 'react'
import { Line } from 'react-chartjs-2'
import '../../utils/chartSetup'
import ChartWrapper from '../shared/ChartWrapper'
import { formatHour, celsiusToFahrenheit } from '../../utils/formatters'

function TemperatureChart({ data }) {
  const [unit, setUnit] = useState('C')

  const labels = data?.times?.map(formatHour) ?? []
  const temps = data?.temp?.map(v =>
    unit === 'F' ? celsiusToFahrenheit(v) : Math.round(v)
  ) ?? []

  const chartData = {
    labels,
    datasets: [
      {
        label: `Temperature (°${unit})`,
        data: temps,
        borderColor: '#f97316',
        backgroundColor: 'rgba(249,115,22,0.1)',
        fill: true,
        tension: 0.4,
        pointRadius: 3,
        pointHoverRadius: 6,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (ctx) => ` ${ctx.parsed.y}°${unit}`,
        },
      },
    },
    scales: {
      x: {
        ticks: { color: '#9ca3af', maxRotation: 45 },
        grid: { color: '#1f2937' },
      },
      y: {
        ticks: { color: '#9ca3af', callback: (v) => `${v}°${unit}` },
        grid: { color: '#1f2937' },
      },
    },
  }

  return (
    <ChartWrapper title="Temperature" height={300} minWidth={700}>
      {/* Toggle */}
      <div className="flex gap-2 mb-3">
        {['C', 'F'].map(u => (
          <button
            key={u}
            onClick={() => setUnit(u)}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
              unit === u
                ? 'bg-orange-500 text-white'
                : 'bg-gray-800 text-gray-400 hover:text-white'
            }`}
          >
            °{u}
          </button>
        ))}
      </div>
      <Line data={chartData} options={options} />
    </ChartWrapper>
  )
}

export default TemperatureChart