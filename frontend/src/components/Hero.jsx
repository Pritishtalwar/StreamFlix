import heroBackground from '../assets/hero-background.jpg'

function Hero() {
  return (
    <section
      className="hero"
      style={{ backgroundImage: `url(${heroBackground})` }}
    >
      <div className="hero-content">

        <p className="hero-category">
          FEATURED MOVIE
        </p>

        <h1>
          The Last Adventure
        </h1>

        <p className="hero-description">
          A new journey begins. Discover a world full of adventure,
          mystery and unforgettable moments.
        </p>

        <div className="hero-buttons">
          <button className="watch-button">
            ▶ Watch Now
          </button>

          <button className="list-button">
            ＋ My List
          </button>
        </div>

      </div>
    </section>
  )
}

export default Hero