import { Line } from 'react-chartjs-2'
import '../../utils/chartSetup'
import ChartWrapper from '../shared/ChartWrapper'
import { formatHour } from '../../utils/formatters'

function PM10PM25Chart({ data }) {
  const labels = data?.times?.map(formatHour) ?? []

  const chartData = {
    labels,
    datasets: [
      {
        label: 'PM10 (μg/m³)',
        data: data?.pm10 ?? [],
        borderColor: '#fb923c',
        backgroundColor: 'rgba(251,146,60,0.1)',
        fill: false,
        tension: 0.4,
        pointRadius: 3,
        pointHoverRadius: 6,
      },
      {
        label: 'PM2.5 (μg/m³)',
        data: data?.pm25 ?? [],
        borderColor: '#f43f5e',
        backgroundColor: 'rgba(244,63,94,0.1)',
        fill: false,
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
      legend: {
        display: true,
        labels: { color: '#9ca3af', boxWidth: 12 },
      },
      tooltip: {
        callbacks: {
          label: (ctx) => ` ${ctx.dataset.label}: ${ctx.parsed.y} μg/m³`,
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
        ticks: { color: '#9ca3af', callback: (v) => `${v} μg/m³` },
        grid: { color: '#1f2937' },
      },
    },
  }

  return (
    <ChartWrapper title="PM10 & PM2.5" height={300} minWidth={700}>
      <Line data={chartData} options={options} />
    </ChartWrapper>
  )
}

export default PM10PM25Chart