import { useRef } from 'react'
import { Line } from 'react-chartjs-2'
import '../../utils/chartSetup'
import ChartWrapper from '../shared/ChartWrapper'

function TemperatureHistChart({ data }) {
  const chartRef = useRef(null)

  const labels = data?.dates ?? []

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Max Temp (°C)',
        data: data?.tempMax ?? [],
        borderColor: '#ef4444',
        backgroundColor: 'rgba(239,68,68,0.1)',
        fill: false,
        tension: 0.3,
        pointRadius: 0,
        pointHoverRadius: 5,
        borderWidth: 1.5,
      },
      {
        label: 'Mean Temp (°C)',
        data: data?.tempMean ?? [],
        borderColor: '#ffffff',
        backgroundColor: 'rgba(255,255,255,0.05)',
        fill: false,
        tension: 0.3,
        pointRadius: 0,
        pointHoverRadius: 5,
        borderWidth: 1.5,
      },
      {
        label: 'Min Temp (°C)',
        data: data?.tempMin ?? [],
        borderColor: '#38bdf8',
        backgroundColor: 'rgba(56,189,248,0.1)',
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
          label: (ctx) => ` ${ctx.dataset.label}: ${ctx.parsed.y}°C`,
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
        ticks: { color: '#9ca3af', callback: (v) => `${v}°C` },
        grid: { color: '#1f2937' },
      },
    },
  }

  return (
    <ChartWrapper title="Temperature — Mean, Max & Min" height={350} minWidth={Math.max(700, labels.length * 4)}>
      {/* Reset Zoom Button */}
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

export default TemperatureHistChart