function SummaryStats({ stats }) {
  if (!stats) return <div>Loading stats...</div>;

  return (
    <div className="summary-stats">
      <div className="stat-card">
        <h3>Total Funds</h3>
        <p className="stat-value">${stats.totalFunds.toFixed(0)}B</p>
        <span className="stat-label">2000-2026</span>
      </div>

      <div className="stat-card">
        <h3>Average Annual</h3>
        <p className="stat-value">${stats.averageFunds}B</p>
        <span className="stat-label">Per Year</span>
      </div>

      <div className="stat-card">
        <h3>Peak Year</h3>
        <p className="stat-value">{stats.maxYear.year}</p>
        <span className="stat-label">${stats.maxYear.amount}B</span>
      </div>

      <div className="stat-card">
        <h3>Lowest Year</h3>
        <p className="stat-value">{stats.minYear.year}</p>
        <span className="stat-label">${stats.minYear.amount}B</span>
      </div>

      <div className="stat-card">
        <h3>Years Tracked</h3>
        <p className="stat-value">{stats.yearsTracked}</p>
        <span className="stat-label">Data Points</span>
      </div>
    </div>
  );
}

export default SummaryStats;
