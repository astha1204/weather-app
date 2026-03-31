# 🌤️ WeatherApp

A responsive weather dashboard built with React + Vite that provides real-time and historical weather insights using the Open-Meteo API. The app automatically detects the user's location via browser GPS to display localized data.

## 🔗 Live Demo
[View Live](https://weather-app-new-wheat-xi.vercel.app/current)

---


## ✨ Features

### Page 1 — Current Weather & Hourly Forecast
- 📍 Auto-detects user location via browser GPS
- 📅 Select any past date via date picker
- 🌡️ Temperature — Current, Min, Max with °C / °F toggle
- 🌫️ Atmospheric Conditions — Precipitation, Humidity, UV Index
- 🌅 Sun Cycle — Sunrise & Sunset times
- 💨 Wind & Air — Max Wind Speed, Precipitation Probability
- 🏭 Air Quality — AQI, PM10, PM2.5, CO, NO₂, SO₂
- 📊 6 Hourly Charts:
  - Temperature (with °C/°F toggle)
  - Relative Humidity
  - Precipitation
  - Visibility
  - Wind Speed
  - PM10 & PM2.5 (combined)

### Page 2 — Historical Weather (Up to 2 Years)
- 📅 Custom date range picker with 2-year max validation
- 📊 5 Interactive Historical Charts:
  - Temperature — Mean, Max, Min
  - Sun Cycle — Sunrise & Sunset (IST)
  - Precipitation — Daily totals
  - Wind — Max Speed & Dominant Direction
  - Air Quality — PM10 & PM2.5 trends
- 🔍 Zoom & Pan on all charts
- 📱 Horizontal scrolling for dense datasets
- 📈 Summary stats — Data points, Avg Max Temp, Total Precipitation, Avg Wind

---

## 🛠️ Tech Stack

| Purpose | Library |
|---|---|
| Framework | React 18 + Vite |
| Routing | React Router v6 |
| Charts | Chart.js + react-chartjs-2 |
| Zoom/Pan | chartjs-plugin-zoom + hammerjs |
| Styling | Tailwind CSS |
| Data Source | Open-Meteo API |
| Deployment | Vercel |

---

## 📡 APIs Used

| API | Endpoint | Used For |
|---|---|---|
| Open-Meteo Forecast | `api.open-meteo.com/v1/forecast` | Page 1 current + hourly weather |
| Open-Meteo Archive | `archive-api.open-meteo.com/v1/archive` | Page 1 past dates + Page 2 historical |
| Air Quality Forecast | `air-quality-api.open-meteo.com/v1/air-quality` | Page 1 current air quality |
| Air Quality Archive | `air-quality-api.open-meteo.com/v1/air-quality` | Page 1 past dates + Page 2 historical |

> No API key required — Open-Meteo is free and open source.

---

## 📁 Project Structure
```
src/
├── hooks/
│   ├── useGeolocation.js        # Browser GPS detection
│   ├── useWeatherData.js        # Page 1 weather + air quality fetch
│   └── useHistoricalData.js     # Page 2 historical data fetch
├── components/
│   ├── layout/
│   │   └── Navbar.jsx           # Navigation bar
│   ├── shared/
│   │   ├── ChartWrapper.jsx     # Reusable scrollable chart container
│   │   ├── LoadingSpinner.jsx   # Loading indicator
│   │   ├── SkeletonLoader.jsx   # Skeleton loading cards
│   │   └── ErrorMessage.jsx     # Error display
│   ├── cards/
│   │   ├── TempCard.jsx         # Temperature metrics
│   │   ├── AtmosphericCard.jsx  # Precipitation, Humidity, UV
│   │   ├── SunCycleCard.jsx     # Sunrise & Sunset
│   │   ├── WindCard.jsx         # Wind speed & precipitation probability
│   │   └── AirQualityCard.jsx   # AQI and pollutants
│   ├── charts/
│   │   ├── TemperatureChart.jsx     # Hourly temperature
│   │   ├── HumidityChart.jsx        # Hourly humidity
│   │   ├── PrecipitationChart.jsx   # Hourly precipitation
│   │   ├── VisibilityChart.jsx      # Hourly visibility
│   │   ├── WindSpeedChart.jsx       # Hourly wind speed
│   │   └── PM10PM25Chart.jsx        # Hourly PM10 & PM2.5
│   └── historical/
│       ├── DateRangePicker.jsx          # Date range selector with validation
│       ├── TemperatureHistChart.jsx     # Historical temperature trends
│       ├── SunCycleHistChart.jsx        # Historical sunrise & sunset (IST)
│       ├── PrecipitationHistChart.jsx   # Historical precipitation
│       ├── WindHistChart.jsx            # Historical wind speed & direction
│       └── AirQualityHistChart.jsx      # Historical PM10 & PM2.5
├── pages/
│   ├── CurrentWeather.jsx       # Page 1 layout
│   └── HistoricalWeather.jsx    # Page 2 layout
├── utils/
│   ├── apiHelpers.js            # API URL builders
│   ├── formatters.js            # Unit conversions, time formatting
│   └── chartSetup.js            # Chart.js global registration
├── App.jsx                      # Router setup
└── main.jsx
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/yourusername/weather-app.git

# Navigate to project directory
cd weather-app

# Install dependencies
npm install

# Start development server
npm run dev
```

### Build for Production
```bash
npm run build
```

---

## 🌐 Deployment

This project is deployed on **Vercel**.

A `vercel.json` is included to handle React Router client-side routing:
```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

---

## ⚙️ Performance

| Optimization | Details |
|---|---|
| Parallel API calls | `Promise.all` fires both API calls simultaneously |
| In-memory cache | Same location + date served instantly on revisit |
| Skeleton loading | Page feels instant — skeleton cards shown while data loads |
| Payload optimization | Only required fields requested from API |

---

## 📱 Responsive Design

| Breakpoint | Layout |
|---|---|
| Mobile (375px) | Single column, scrollable charts |
| Tablet (768px) | 2 column cards |
| Desktop (1280px) | 3 column cards, full dashboard |

---

## ⚠️ Known Limitations

| Limitation | Detail |
|---|---|
| CO₂ data | Not available via Open-Meteo API — displayed as "Not available" |
| Air quality history | Open-Meteo air quality archive starts from 2022-07-29 |
| GPS requirement | Location access must be granted for the app to function |
| Load time | First load ~1s due to Open-Meteo API response time |

---

## 📄 License

MIT License — feel free to use and modify.

---

## 🙏 Acknowledgements

- [Open-Meteo](https://open-meteo.com) — Free weather API
- [Chart.js](https://www.chartjs.org) — Charting library
- [Tailwind CSS](https://tailwindcss.com) — Utility-first CSS
- [Vercel](https://vercel.com) — Deployment platform
