import { useState } from 'react'
import { getWatchlist, removeFromWatchlist } from '../services/watchlist'
import VideoCard from '../components/VideoCard'

function MyList() {
  const [movies, setMovies] = useState(getWatchlist())

  function handleRemove(movieId) {
    removeFromWatchlist(movieId)
    setMovies(getWatchlist())
  }

  return (
    <section className="my-list">

      <h1>My List</h1>

      {movies.length === 0 ? (
        <p>No movies added to your list yet.</p>
      ) : (
        <div className="video-grid">
          {movies.map((movie) => (
            <div key={movie.id} className="my-list-card">

              <VideoCard movie={movie} />

              <button
                className="remove-button"
                onClick={() => handleRemove(movie.id)}
              >
                Remove
              </button>

            </div>
          ))}
        </div>
      )}

    </section>
  )
}

export default MyList