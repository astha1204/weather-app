import { useRef } from 'react'
import { Line } from 'react-chartjs-2'
import '../../utils/chartSetup'
import ChartWrapper from '../shared/ChartWrapper'
import { toIST } from '../../utils/formatters'

// Convert ISO time string to minutes since midnight for plotting
const toMinutes = (isoString) => {
  if (!isoString) return null
  const date = new Date(isoString)
  const ist = new Date(date.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }))
  return ist.getHours() * 60 + ist.getMinutes()
}

// Convert minutes back to HH:MM for display
const minutesToTime = (minutes) => {
  if (minutes === null || minutes === undefined) return 'N/A'
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  const period = h >= 12 ? 'PM' : 'AM'
  const hour = h % 12 || 12
  return `${hour}:${m.toString().padStart(2, '0')} ${period}`
}

function SunCycleHistChart({ data }) {
  const chartRef = useRef(null)

  const labels = data?.dates ?? []
  const sunriseMinutes = data?.sunrise?.map(toMinutes) ?? []
  const sunsetMinutes = data?.sunset?.map(toMinutes) ?? []

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Sunrise (IST)',
        data: sunriseMinutes,
        borderColor: '#fbbf24',
        backgroundColor: 'rgba(251,191,36,0.1)',
        fill: false,
        tension: 0.3,
        pointRadius: 0,
        pointHoverRadius: 5,
        borderWidth: 1.5,
      },
      {
        label: 'Sunset (IST)',
        data: sunsetMinutes,
        borderColor: '#f97316',
        backgroundColor: 'rgba(249,115,22,0.1)',
        fill: false,
        tension: 0.3,
        pointRadius: 0,
        pointHoverRadius: 5,
        borderWidth: 1.5,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: { mode: 'index', intersect: false },
    plugins: {
      legend: {
        display: true,
        labels: { color: '#9ca3af', boxWidth: 12 },
      },
      tooltip: {
        callbacks: {
          label: (ctx) => ` ${ctx.dataset.label}: ${minutesToTime(ctx.parsed.y)}`,
        },
      },
      zoom: {
        pan: { enabled: true, mode: 'x' },
        zoom: {
          wheel: { enabled: true },
          pinch: { enabled: true },
          mode: 'x',
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#9ca3af',
          maxRotation: 45,
          autoSkip: true,
          maxTicksLimit: 20,
        },
        grid: { color: '#1f2937' },
      },
      y: {
        ticks: {
          color: '#9ca3af',
          callback: (v) => minutesToTime(v),
          stepSize: 30,
        },
        grid: { color: '#1f2937' },
      },
    },
  }

  return (
    <ChartWrapper title="Sun Cycle — Sunrise & Sunset (IST)" height={350} minWidth={Math.max(700, labels.length * 4)}>
      <div className="flex justify-end mb-2">
        <button
          onClick={() => chartRef.current?.resetZoom()}
          className="text-xs bg-gray-800 hover:bg-gray-700 text-gray-400 px-3 py-1 rounded-lg transition-all"
        >
          🔍 Reset Zoom
        </button>
      </div>
      <Line ref={chartRef} data={chartData} options={options} />
    </ChartWrapper>
  )
}

export default SunCycleHistChart