import { Link } from 'react-router-dom'

function VideoCard({ movie }) {
  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : ''

  return (
    <Link
      to={`/movie/${movie.id}`}
      className="video-card"
    >
      {imageUrl && (
        <img
          src={imageUrl}
          alt={movie.title}
        />
      )}

      <div className="video-info">
        <h3>{movie.title}</h3>

        <p>
          ⭐ {movie.vote_average?.toFixed(1)}
        </p>
      </div>
    </Link>
  )
}

export default VideoCard