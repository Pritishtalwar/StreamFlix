import { useEffect, useState } from 'react'
import { getPopularSeries } from '../services/tmdb'
import VideoCard from '../components/VideoCard'

function Series() {
  const [series, setSeries] = useState([])

  useEffect(() => {
    getPopularSeries()
      .then((data) => {
        setSeries(data.results || [])
      })
      .catch((error) => {
        console.error("Failed to fetch series:", error)
      })
  }, [])

  return (
    <section className="series-page">

      <h1>Series</h1>

      <div className="video-grid">

        {series.map((show) => (
          <VideoCard
            key={show.id}
            movie={{
              ...show,
              title: show.name,
            }}
          />
        ))}

      </div>

    </section>
  )
}

export default Series