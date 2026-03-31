import { Bar } from 'react-chartjs-2'
import '../../utils/chartSetup'
import ChartWrapper from '../shared/ChartWrapper'
import { formatHour } from '../../utils/formatters'

function PrecipitationChart({ data }) {
  const labels = data?.times?.map(formatHour) ?? []

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Precipitation (mm)',
        data: data?.precip ?? [],
        backgroundColor: 'rgba(56,189,248,0.7)',
        borderColor: '#38bdf8',
        borderWidth: 1,
        borderRadius: 4,
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
    },
    scales: {
      x: {
        ticks: { color: '#9ca3af', maxRotation: 45 },
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
    <ChartWrapper title="Precipitation" height={300} minWidth={700}>
      <Bar data={chartData} options={options} />
    </ChartWrapper>
  )
}

export default PrecipitationChart