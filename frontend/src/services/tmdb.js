const BASE_URL = "https://api.themoviedb.org/3";

const TOKEN = import.meta.env.VITE_TMDB_TOKEN;
console.log("TMDB token loaded:", !!TOKEN);

export async function getPopularMovies() {
  const response = await fetch(`${BASE_URL}/movie/popular`, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      accept: "application/json",
    },
  });

  const data = await response.json();

  return data;
}

export async function getMovieDetails(id) {
  const response = await fetch(`${BASE_URL}/movie/${id}`, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      accept: "application/json",
    },
  });

  const data = await response.json();

  return data;
}

export async function getMovieVideos(id) {
  const response = await fetch(`${BASE_URL}/movie/${id}/videos`, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      accept: "application/json",
    },
  });

  const data = await response.json();

  return data;
}
export async function searchMovies(query) {
  const response = await fetch(
    `${BASE_URL}/search/movie?query=${encodeURIComponent(query)}`,
    {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        accept: "application/json",
      },
    }
  );

  const data = await response.json();

  return data;
}
export async function getTrendingMovies() {
  const response = await fetch(`${BASE_URL}/trending/movie/week`, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      accept: "application/json",
    },
  });

  const data = await response.json();

  return data;
}
export async function getTopRatedMovies() {
  const response = await fetch(`${BASE_URL}/movie/top_rated`, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      accept: "application/json",
    },
  });

  const data = await response.json();

  return data;
} 

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

export async function getMovieGenres() {
  const response = await fetch(`${BASE_URL}/genre/movie/list`, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      accept: "application/json",
    },
  })

  const data = await response.json()

  return data
}

export async function getMoviesByGenre(genreId) {
  const response = await fetch(
    `${BASE_URL}/discover/movie?with_genres=${genreId}`,
    {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        accept: "application/json",
      },
    }
  )

  const data = await response.json()

  return data
}