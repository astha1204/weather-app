import { NavLink } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="bg-gray-900 border-b border-gray-800 px-6 py-4 flex gap-6 items-center">
      <span className="text-white font-bold text-lg mr-auto">🌤 WeatherApp</span>
      <NavLink
        to="/current"
        className={({ isActive }) =>
          isActive ? 'text-blue-400 font-semibold' : 'text-gray-400 hover:text-white'
        }
      >
        Current Weather
      </NavLink>
      <NavLink
        to="/historical"
        className={({ isActive }) =>
          isActive ? 'text-blue-400 font-semibold' : 'text-gray-400 hover:text-white'
        }
      >
        Historical
      </NavLink>
    </nav>
  )
}
export default Navbar