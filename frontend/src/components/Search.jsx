import { useState } from 'react'
import { searchMovies } from '../services/tmdb'
import VideoCard from './VideoCard'

function Search() {
  const [query, setQuery] = useState('')
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)

  async function handleSearch() {
    if (!query.trim()) {
      return
    }

    try {
      setLoading(true)

      const data = await searchMovies(query)

      setMovies(data.results || [])
    } catch (error) {
      console.error("Search failed:", error)
      setMovies([])
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="search-section">

      <div className="search-box">

        <input
          type="text"
          placeholder="Search movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSearch()
            }
          }}
        />

        <button onClick={handleSearch}>
          Search
        </button>

      </div>

      {loading && (
        <p className="search-message">
          Searching...
        </p>
      )}

      {!loading && query && movies.length === 0 && (
        <p className="search-message">
          No movies found.
        </p>
      )}

      <div className="video-grid">

        {movies.map((movie) => (
          <VideoCard
            key={movie.id}
            movie={movie}
          />
        ))}

      </div>

    </section>
  )
}

export default Search