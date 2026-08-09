import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function IndustryBreakdown({ year, fundData }) {
  const yearData = fundData.find(item => item.year === year);

  if (!yearData) {
    return <div className="loading">Loading industry data...</div>;
  }

  const chartData = {
    labels: Object.keys(yearData.industries),
    datasets: [
      {
        label: `Funds by Industry - ${year} (Billions $)`,
        data: Object.values(yearData.industries),
        backgroundColor: [
          '#3b82f6',
          '#10b981',
          '#f59e0b',
        ],
        borderRadius: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Funds Raised (Billions $)',
        },
      },
    },
  };

  return (
    <div className="industry-breakdown">
      <div className="chart-container">
        <Bar data={chartData} options={options} />
      </div>
      
      <div className="industry-stats">
        <h3>Industry Details for {year}</h3>
        <ul>
          {Object.entries(yearData.industries).map(([industry, amount]) => (
            <li key={industry}>
              <span className="industry-name">
                {industry.charAt(0).toUpperCase() + industry.slice(1)}:
              </span>
              <span className="industry-amount">${amount}B</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default IndustryBreakdown;
