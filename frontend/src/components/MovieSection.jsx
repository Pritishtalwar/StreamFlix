import VideoCard from './VideoCard'

function MovieSection({ title, movies }) {
  return (
    <section className="movie-section">
      <h2>{title}</h2>

      <div className="video-grid">
        {movies.map((movie) => (
          <VideoCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  )
}

export default MovieSection