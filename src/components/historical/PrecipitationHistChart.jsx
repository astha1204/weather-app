import { useRef } from 'react'
import { Bar } from 'react-chartjs-2'
import '../../utils/chartSetup'
import ChartWrapper from '../shared/ChartWrapper'

function PrecipitationHistChart({ data }) {
  const chartRef = useRef(null)

  const labels = data?.dates ?? []

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Precipitation (mm)',
        data: data?.precipitation ?? [],
        backgroundColor: 'rgba(56,189,248,0.7)',
        borderColor: '#38bdf8',
        borderWidth: 1,
        borderRadius: 2,
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
          label: (ctx) => ` ${ctx.parsed.y} mm`,
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
        min: 0,
        ticks: { color: '#9ca3af', callback: (v) => `${v} mm` },
        grid: { color: '#1f2937' },
      },
    },
  }

  return (
    <ChartWrapper title="Precipitation — Daily Total" height={350} minWidth={Math.max(700, labels.length * 4)}>
      <div className="flex justify-end mb-2">
        <button
          onClick={() => chartRef.current?.resetZoom()}
          className="text-xs bg-gray-800 hover:bg-gray-700 text-gray-400 px-3 py-1 rounded-lg transition-all"
        >
          🔍 Reset Zoom
        </button>
      </div>
      <Bar ref={chartRef} data={chartData} options={options} />
    </ChartWrapper>
  )
}

export default PrecipitationHistChart