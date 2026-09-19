import { Link } from 'react-router-dom'
function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        StreamFlix
      </div>

      <div className="nav-links">
        <a href="#">Home</a>
        <a href="#">Movies</a>
        <a href="#">Series</a>
        <a href="#">Categories</a>
      </div>

      <div className="nav-actions">
        <button>🔍</button>
        <button>👤</button>
      </div>
    </nav>
  )
}

export default Navbar