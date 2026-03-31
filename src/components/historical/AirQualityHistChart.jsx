import { useRef } from 'react'
import { Line } from 'react-chartjs-2'
import '../../utils/chartSetup'
import ChartWrapper from '../shared/ChartWrapper'

function AirQualityHistChart({ data }) {
  const chartRef = useRef(null)

  const labels = data?.dates ?? []

  const chartData = {
    labels,
    datasets: [
      {
        label: 'PM10 (μg/m³)',
        data: data?.pm10 ?? [],
        borderColor: '#fb923c',
        backgroundColor: 'rgba(251,146,60,0.1)',
        fill: false,
        tension: 0.3,
        pointRadius: 0,
        pointHoverRadius: 5,
        borderWidth: 1.5,
      },
      {
        label: 'PM2.5 (μg/m³)',
        data: data?.pm25 ?? [],
        borderColor: '#f43f5e',
        backgroundColor: 'rgba(244,63,94,0.1)',
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
          label: (ctx) => ` ${ctx.dataset.label}: ${ctx.parsed.y} μg/m³`,
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
        ticks: { color: '#9ca3af', callback: (v) => `${v} μg/m³` },
        grid: { color: '#1f2937' },
      },
    },
  }

  return (
    <ChartWrapper title="Air Quality — PM10 & PM2.5 Trends" height={350} minWidth={Math.max(700, labels.length * 4)}>
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

export default AirQualityHistChart