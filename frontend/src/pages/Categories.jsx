import { useEffect, useState } from 'react'
import {
  getMovieGenres,
  getMoviesByGenre
} from '../services/tmdb'
import VideoCard from '../components/VideoCard'

function Categories() {
  const [genres, setGenres] = useState([])
  const [movies, setMovies] = useState([])
  const [selectedGenre, setSelectedGenre] = useState(null)

  useEffect(() => {
    getMovieGenres()
      .then((data) => {
        setGenres(data.genres || [])
      })
      .catch((error) => {
        console.error("Failed to fetch genres:", error)
      })
  }, [])

  function handleGenreClick(genreId) {
    setSelectedGenre(genreId)

    getMoviesByGenre(genreId)
      .then((data) => {
        setMovies(data.results || [])
      })
      .catch((error) => {
        console.error("Failed to fetch movies by genre:", error)
      })
  }

  return (
    <section className="categories-page">

      <h1>Categories</h1>

      <div className="genre-list">
        {genres.map((genre) => (
          <button
            key={genre.id}
            onClick={() => handleGenreClick(genre.id)}
            className={
              selectedGenre === genre.id
                ? "genre-button active"
                : "genre-button"
            }
          >
            {genre.name}
          </button>
        ))}
      </div>

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

export default Categories