import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="navbar">

      <Link to="/" className="logo">
        StreamFlix
      </Link>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/movies">Movies</Link>
        <Link to="/">Series</Link>
        <Link to="/">Categories</Link>
        <Link to="/my-list">My List</Link>
      </div>

      <div className="nav-actions">

        <button>🔍</button>

        <button>👤</button>

      </div>

    </nav>
  )
}

export default Navbar