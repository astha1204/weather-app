import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import CurrentWeather from './pages/CurrentWeather'
import HistoricalWeather from './pages/HistoricalWeather'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-950 text-white">
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 py-6">
          <Routes>
            <Route path="/" element={<Navigate to="/current" replace />} />
            <Route path="/current" element={<CurrentWeather />} />
            <Route path="/historical" element={<HistoricalWeather />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App