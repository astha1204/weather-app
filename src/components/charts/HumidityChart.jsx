import { Line } from 'react-chartjs-2'
import '../../utils/chartSetup'
import ChartWrapper from '../shared/ChartWrapper'
import { formatHour } from '../../utils/formatters'

function HumidityChart({ data }) {
  const labels = data?.times?.map(formatHour) ?? []

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Relative Humidity (%)',
        data: data?.humidity ?? [],
        borderColor: '#38bdf8',
        backgroundColor: 'rgba(56,189,248,0.15)',
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
          label: (ctx) => ` ${ctx.parsed.y}%`,
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
        max: 100,
        ticks: { color: '#9ca3af', callback: (v) => `${v}%` },
        grid: { color: '#1f2937' },
      },
    },
  }

  return (
    <ChartWrapper title="Relative Humidity" height={300} minWidth={700}>
      <Line data={chartData} options={options} />
    </ChartWrapper>
  )
}

export default HumidityChart