const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Dummy data: World Funds Raised (2000-2026)
const fundData = [
  { year: 2000, amount: 50, region: 'North America', industries: { tech: 10, biotech: 5, energy: 8 } },
  { year: 2001, amount: 48, region: 'North America', industries: { tech: 9, biotech: 6, energy: 7 } },
  { year: 2002, amount: 45, region: 'North America', industries: { tech: 8, biotech: 5, energy: 6 } },
  { year: 2003, amount: 55, region: 'Europe', industries: { tech: 12, biotech: 8, energy: 10 } },
  { year: 2004, amount: 65, region: 'Europe', industries: { tech: 15, biotech: 10, energy: 12 } },
  { year: 2005, amount: 75, region: 'Asia', industries: { tech: 18, biotech: 12, energy: 15 } },
  { year: 2006, amount: 85, region: 'Asia', industries: { tech: 20, biotech: 15, energy: 18 } },
  { year: 2007, amount: 95, region: 'Asia', industries: { tech: 25, biotech: 18, energy: 20 } },
  { year: 2008, amount: 70, region: 'North America', industries: { tech: 15, biotech: 10, energy: 12 } },
  { year: 2009, amount: 65, region: 'Europe', industries: { tech: 14, biotech: 9, energy: 11 } },
  { year: 2010, amount: 80, region: 'Asia', industries: { tech: 22, biotech: 14, energy: 16 } },
  { year: 2011, amount: 95, region: 'North America', industries: { tech: 28, biotech: 16, energy: 18 } },
  { year: 2012, amount: 110, region: 'Europe', industries: { tech: 32, biotech: 20, energy: 22 } },
  { year: 2013, amount: 125, region: 'Asia', industries: { tech: 38, biotech: 24, energy: 26 } },
  { year: 2014, amount: 140, region: 'Asia', industries: { tech: 45, biotech: 28, energy: 30 } },
  { year: 2015, amount: 155, region: 'North America', industries: { tech: 52, biotech: 32, energy: 35 } },
  { year: 2016, amount: 170, region: 'Europe', industries: { tech: 58, biotech: 36, energy: 40 } },
  { year: 2017, amount: 185, region: 'Asia', industries: { tech: 65, biotech: 42, energy: 45 } },
  { year: 2018, amount: 200, region: 'North America', industries: { tech: 72, biotech: 48, energy: 50 } },
  { year: 2019, amount: 215, region: 'Europe', industries: { tech: 80, biotech: 54, energy: 55 } },
  { year: 2020, amount: 195, region: 'Asia', industries: { tech: 70, biotech: 48, energy: 48 } },
  { year: 2021, amount: 240, region: 'North America', industries: { tech: 90, biotech: 60, energy: 62 } },
  { year: 2022, amount: 260, region: 'Europe', industries: { tech: 100, biotech: 68, energy: 70 } },
  { year: 2023, amount: 280, region: 'Asia', industries: { tech: 115, biotech: 78, energy: 78 } },
  { year: 2024, amount: 300, region: 'North America', industries: { tech: 130, biotech: 88, energy: 88 } },
  { year: 2025, amount: 320, region: 'Global', industries: { tech: 145, biotech: 98, energy: 98 } },
  { year: 2026, amount: 350, region: 'Global', industries: { tech: 160, biotech: 110, energy: 105 } },
];

// Routes

// Get all fund data
app.get('/api/funds', (req, res) => {
  res.json(fundData);
});

// Get summary statistics
app.get('/api/funds/summary', (req, res) => {
  const totalFunds = fundData.reduce((sum, item) => sum + item.amount, 0);
  const averageFunds = totalFunds / fundData.length;
  const maxYear = fundData.reduce((max, item) => item.amount > max.amount ? item : max);
  const minYear = fundData.reduce((min, item) => item.amount < min.amount ? item : min);

  res.json({
    totalFunds,
    averageFunds: averageFunds.toFixed(2),
    maxYear: {
      year: maxYear.year,
      amount: maxYear.amount,
    },
    minYear: {
      year: minYear.year,
      amount: minYear.amount,
    },
    yearsTracked: fundData.length,
  });
});

// Get funds by year
app.get('/api/funds/:year', (req, res) => {
  const year = parseInt(req.params.year);
  const data = fundData.find(item => item.year === year);
  
  if (data) {
    res.json(data);
  } else {
    res.status(404).json({ error: 'Year not found' });
  }
});

// Get industry breakdown for a specific year
app.get('/api/funds/:year/industries', (req, res) => {
  const year = parseInt(req.params.year);
  const data = fundData.find(item => item.year === year);
  
  if (data) {
    res.json({
      year,
      industries: data.industries,
      total: data.amount,
    });
  } else {
    res.status(404).json({ error: 'Year not found' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
