import { useEffect, useState } from 'react'
import { getTopRatedMovies } from '../services/tmdb'
import MovieSection from './MovieSection'

function TopRated() {
  const [movies, setMovies] = useState([])

  useEffect(() => {
    getTopRatedMovies()
      .then((data) => {
        setMovies(data.results)
      })
      .catch((error) => {
        console.error("Failed to fetch top rated movies:", error)
      })
  }, [])

  return (
    <MovieSection title="Top Rated" movies={movies} />
  )
}

export default TopRated