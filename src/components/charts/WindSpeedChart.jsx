import { Line } from 'react-chartjs-2'
import '../../utils/chartSetup'
import ChartWrapper from '../shared/ChartWrapper'
import { formatHour } from '../../utils/formatters'

function WindSpeedChart({ data }) {
  const labels = data?.times?.map(formatHour) ?? []

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Wind Speed (km/h)',
        data: data?.windSpeed ?? [],
        borderColor: '#34d399',
        backgroundColor: 'rgba(52,211,153,0.1)',
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
          label: (ctx) => ` ${ctx.parsed.y} km/h`,
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
        ticks: { color: '#9ca3af', callback: (v) => `${v} km/h` },
        grid: { color: '#1f2937' },
      },
    },
  }

  return (
    <ChartWrapper title="Wind Speed (10m)" height={300} minWidth={700}>
      <Line data={chartData} options={options} />
    </ChartWrapper>
  )
}

export default WindSpeedChart