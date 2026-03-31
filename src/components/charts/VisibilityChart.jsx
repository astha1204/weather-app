import { Line } from 'react-chartjs-2'
import '../../utils/chartSetup'
import ChartWrapper from '../shared/ChartWrapper'
import { formatHour } from '../../utils/formatters'

function VisibilityChart({ data }) {
  const labels = data?.times?.map(formatHour) ?? []

  // Convert meters to km
  const visibilityKm = data?.visibility?.map(v =>
    v !== null ? Math.round(v / 100) / 10 : null
  ) ?? []

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Visibility (km)',
        data: visibilityKm,
        borderColor: '#a78bfa',
        backgroundColor: 'rgba(167,139,250,0.1)',
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
          label: (ctx) => ` ${ctx.parsed.y} km`,
        },
      },
    },
    scales: {
      x: {
        ticks: { color: '#9ca3af', maxRotation: 45 },
        grid: { color: '#1f2937' },
      },
      y: {
        min: 0,
        ticks: { color: '#9ca3af', callback: (v) => `${v} km` },
        grid: { color: '#1f2937' },
      },
    },
  }

  return (
    <ChartWrapper title="Visibility" height={300} minWidth={700}>
      <Line data={chartData} options={options} />
    </ChartWrapper>
  )
}

export default VisibilityChart