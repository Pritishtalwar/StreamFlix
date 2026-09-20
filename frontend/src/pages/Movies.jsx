import { useEffect, useState } from 'react'
import { getPopularMovies } from '../services/tmdb'
import VideoCard from '../components/VideoCard'

function Movies() {
  const [movies, setMovies] = useState([])

  useEffect(() => {
    getPopularMovies()
      .then((data) => {
        setMovies(data.results || [])
      })
      .catch((error) => {
        console.error("Failed to fetch movies:", error)
      })
  }, [])

  return (
    <section className="movies-page">

      <h1>Movies</h1>

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

export default Movies