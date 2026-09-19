import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {
  getMovieDetails,
  getMovieVideos
} from '../services/tmdb'
import { addToWatchlist } from '../services/watchlist'

function MovieDetails() {
  const { id } = useParams()

  const [movie, setMovie] = useState(null)
  const [trailer, setTrailer] = useState(null)
  const [showTrailer, setShowTrailer] = useState(false)

  useEffect(() => {
    getMovieDetails(id)
      .then((data) => {
        setMovie(data)
      })
      .catch((error) => {
        console.error("Failed to fetch movie:", error)
      })

    getMovieVideos(id)
      .then((data) => {
        const trailerVideo = data.results?.find(
          (video) =>
            video.type === "Trailer" &&
            video.site === "YouTube"
        )

        setTrailer(trailerVideo)
      })
      .catch((error) => {
        console.error("Failed to fetch trailer:", error)
      })
  }, [id])

  if (!movie) {
    return <p>Loading...</p>
  }

  const backdropUrl =
    `https://image.tmdb.org/t/p/original${movie.backdrop_path}`

  const posterUrl =
    `https://image.tmdb.org/t/p/w500${movie.poster_path}`

  return (
    <div
      className="movie-details"
      style={{
        backgroundImage: `url(${backdropUrl})`
      }}
    >

      <div className="movie-details-overlay">

        <div className="movie-details-content">

          <img
            className="movie-details-poster"
            src={posterUrl}
            alt={movie.title}
          />

          <div className="movie-details-info">

            <h1>{movie.title}</h1>

            <div className="movie-meta">

              <span>
                ⭐ {movie.vote_average.toFixed(1)}
              </span>

              <span>
                {movie.release_date}
              </span>

              <span>
                {movie.runtime} min
              </span>

            </div>

            <div className="movie-genres">

              {movie.genres.map((genre) => (
                <span key={genre.id}>
                  {genre.name}
                </span>
              ))}

            </div>

            <p className="movie-overview">
              {movie.overview}
            </p>

            {trailer && (
              <button
                className="watch-button"
                onClick={() => setShowTrailer(true)}
              >
                ▶ Watch Trailer
              </button>
            )}
            <button
  className="list-button"
  onClick={() => addToWatchlist(movie)}
>
  + My List
</button>

          </div>

        </div>

      </div>


      {/* TRAILER MODAL */}

      {showTrailer && trailer && (
        <div className="trailer-modal">

          <div className="trailer-modal-content">

            <button
              className="close-trailer"
              onClick={() => setShowTrailer(false)}
            >
              ✕
            </button>

            <iframe
              src={`https://www.youtube.com/embed/${trailer.key}`}
              title={`${movie.title} Trailer`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>

          </div>

        </div>
      )}

    </div>
  )
}

export default MovieDetails