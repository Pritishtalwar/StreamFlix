import { useEffect, useState } from 'react'
import { getPopularMovies } from '../services/tmdb'
import MovieSection from './MovieSection'

function Popular() {
  const [movies, setMovies] = useState([])

  useEffect(() => {
    getPopularMovies()
      .then((data) => {
        setMovies(data.results)
      })
      .catch((error) => {
        console.error("Failed to fetch popular movies:", error)
      })
  }, [])

  return (
    <MovieSection title="Popular Movies" movies={movies} />
  )
}

export default Popular