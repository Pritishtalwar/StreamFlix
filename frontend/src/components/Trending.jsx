import { useEffect, useState } from 'react'
import { getTrendingMovies } from '../services/tmdb'
import MovieSection from './MovieSection'

function Trending() {
  const [movies, setMovies] = useState([])

  useEffect(() => {
    getTrendingMovies()
      .then((data) => {
        setMovies(data.results)
      })
      .catch((error) => {
        console.error("Failed to fetch trending movies:", error)
      })
  }, [])

  return (
    <MovieSection title="Trending Now" movies={movies} />
  )
}

export default Trending