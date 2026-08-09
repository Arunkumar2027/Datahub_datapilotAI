# World Funds Raised Analysis (2000-2026)

A full-stack application displaying dummy analysis of global funds raised across different industries from 2000 to 2026.

## Project Structure

```
Datahub_datapilotAI/
├── backend/           # Express.js REST API server
│   ├── server.js      # Main server file with API endpoints
│   ├── package.json   # Backend dependencies
│   └── .env           # Environment variables
├── frontend/          # React + Vite frontend application
│   ├── src/
│   │   ├── App.jsx    # Main application component
│   │   ├── App.css    # Styling
│   │   └── components/
│   │       ├── FundChart.jsx         # Line chart visualization
│   │       ├── SummaryStats.jsx      # Statistics cards
│   │       └── IndustryBreakdown.jsx # Bar chart for industries
│   └── package.json   # Frontend dependencies
└── README.md          # This file
```

## Features

- 📊 **Interactive Charts**: Line chart showing funds over time
- 📈 **Industry Breakdown**: Bar chart showing funds by industry
- 📋 **Summary Statistics**: Total, average, peak, and lowest year statistics
- 🎨 **Responsive Design**: Works on desktop, tablet, and mobile devices
- 🔄 **Real-time Data**: Fetches data from backend API

## Technologies Used

### Backend
- **Node.js**: JavaScript runtime
- **Express.js**: Web framework
- **CORS**: Cross-origin resource sharing
- **dotenv**: Environment variable management

### Frontend
- **React**: UI library
- **Vite**: Build tool
- **Chart.js**: Charting library
- **React-ChartJS-2**: React wrapper for Chart.js
- **Axios**: HTTP client

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
```bash
cd /workspaces/Datahub_datapilotAI
```

2. **Install backend dependencies**
```bash
cd backend
npm install
```

3. **Install frontend dependencies**
```bash
cd ../frontend
npm install
```

## Running the Application

### Terminal 1 - Start Backend Server
```bash
cd /workspaces/Datahub_datapilotAI/backend
npm start
```

The backend will run on `http://localhost:5000`

### Terminal 2 - Start Frontend Development Server
```bash
cd /workspaces/Datahub_datapilotAI/frontend
npm run dev
```

The frontend will run on `http://localhost:5173`

## API Endpoints

### GET `/api/funds`
Returns all fund data for years 2000-2026.

**Response:**
```json
[
  {
    "year": 2026,
    "amount": 350,
    "region": "Global",
    "industries": {
      "tech": 160,
      "biotech": 110,
      "energy": 105
    }
  }
]
```

### GET `/api/funds/summary`
Returns summary statistics.

**Response:**
```json
{
  "totalFunds": 4575,
  "averageFunds": "175.96",
  "maxYear": {
    "year": 2026,
    "amount": 350
  },
  "minYear": {
    "year": 2001,
    "amount": 48
  },
  "yearsTracked": 27
}
```

### GET `/api/funds/:year`
Returns fund data for a specific year.

### GET `/api/funds/:year/industries`
Returns industry breakdown for a specific year.

### GET `/api/health`
Health check endpoint.

## Data

The application includes dummy data for 27 years (2000-2026) with:
- Total funds raised by year
- Regional distribution
- Industry breakdown (Tech, Biotech, Energy)

## Styling

The application uses a modern gradient design with:
- Purple gradient header
- Responsive grid layouts
- Card-based component design
- Mobile-friendly breakpoints

## Future Enhancements

- Add real data integration
- Implement data filtering and search
- Add more industry categories
- Include geographical filtering
- Add export functionality (CSV, PDF)
- Implement user authentication
- Add predictive analysis

## Troubleshooting

### "Failed to fetch data" error
- Ensure backend server is running on `http://localhost:5000`
- Check browser console for CORS errors
- Verify network connectivity

### Port already in use
- Backend: Change PORT in `.env` file
- Frontend: Modify Vite config or use `npm run dev -- --port 3000`

## License

MIT License - feel free to use this project for learning and development.
