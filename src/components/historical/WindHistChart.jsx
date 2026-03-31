import { useRef } from 'react'
import { Line, Bar } from 'react-chartjs-2'
import '../../utils/chartSetup'
import ChartWrapper from '../shared/ChartWrapper'
import { degreesToDirection } from '../../utils/formatters'

function WindHistChart({ data }) {
  const chartRef = useRef(null)

  const labels = data?.dates ?? []

  const chartData = {
    labels,
    datasets: [
      {
        type: 'line',
        label: 'Max Wind Speed (km/h)',
        data: data?.windSpeedMax ?? [],
        borderColor: '#34d399',
        backgroundColor: 'rgba(52,211,153,0.1)',
        fill: false,
        tension: 0.3,
        pointRadius: 0,
        pointHoverRadius: 5,
        borderWidth: 1.5,
        yAxisID: 'ySpeed',
      },
      {
        type: 'bar',
        label: 'Wind Direction (°)',
        data: data?.windDirection ?? [],
        backgroundColor: 'rgba(167,139,250,0.4)',
        borderColor: '#a78bfa',
        borderWidth: 1,
        borderRadius: 2,
        yAxisID: 'yDir',
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
          label: (ctx) => {
            if (ctx.dataset.label.includes('Direction')) {
              return ` Direction: ${degreesToDirection(ctx.parsed.y)} (${ctx.parsed.y}°)`
            }
            return ` Wind Speed: ${ctx.parsed.y} km/h`
          },
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
      ySpeed: {
        type: 'linear',
        position: 'left',
        ticks: { color: '#34d399', callback: (v) => `${v} km/h` },
        grid: { color: '#1f2937' },
      },
      yDir: {
        type: 'linear',
        position: 'right',
        min: 0,
        max: 360,
        ticks: {
          color: '#a78bfa',
          callback: (v) => degreesToDirection(v),
          stepSize: 45,
        },
        grid: { drawOnChartArea: false },
      },
    },
  }

  return (
    <ChartWrapper title="Wind — Max Speed & Dominant Direction" height={350} minWidth={Math.max(700, labels.length * 4)}>
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

export default WindHistChart