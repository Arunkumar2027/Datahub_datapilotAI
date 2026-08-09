import { useState, useEffect } from 'react';
import axios from 'axios';
import FundChart from './components/FundChart';
import SummaryStats from './components/SummaryStats';
import IndustryBreakdown from './components/IndustryBreakdown';
import './App.css';

function App() {
  const [fundData, setFundData] = useState([]);
  const [summaryStats, setSummaryStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedYear, setSelectedYear] = useState(2026);

  const API_BASE_URL = 'http://localhost:5000/api';

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [fundsRes, summaryRes] = await Promise.all([
          axios.get(`${API_BASE_URL}/funds`),
          axios.get(`${API_BASE_URL}/funds/summary`),
        ]);
        
        setFundData(fundsRes.data);
        setSummaryStats(summaryRes.data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch data. Make sure the backend server is running on localhost:5000');
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <header className="app-header">
        <h1>🌍 World Funds Raised Analysis</h1>
        <p>Investment trends from 2000 to 2026</p>
      </header>

      {error && (
        <div className="error-message">
          ⚠️ {error}
        </div>
      )}

      {loading ? (
        <div className="loading">Loading data...</div>
      ) : (
        <>
          <SummaryStats stats={summaryStats} />
          
          <main className="main-content">
            <div className="chart-section">
              <h2>Total Funds Raised Over Time</h2>
              <FundChart data={fundData} />
            </div>

            <div className="industry-section">
              <h2>Industry Breakdown</h2>
              <div className="year-selector">
                <label htmlFor="year-select">Select Year:</label>
                <select 
                  id="year-select"
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                  className="select-input"
                >
                  {fundData.map(item => (
                    <option key={item.year} value={item.year}>
                      {item.year}
                    </option>
                  ))}
                </select>
              </div>
              <IndustryBreakdown year={selectedYear} fundData={fundData} />
            </div>
          </main>
        </>
      )}
    </div>
  );
}

export default App;
