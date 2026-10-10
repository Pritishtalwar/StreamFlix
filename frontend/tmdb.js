const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMDRiOTk1MzE5MGQ4Y2VjMzhkMWM2ZmU3ZWM5Y2ViYiIsIm5iZiI6MTc4NzY3ODE0NC42OTkwMDAxLCJzdWIiOiI2YThkY2RjMDM5MjAxOWQ5MzY5OTFlYzIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.EYx-Gdx7ZE-akXD9tr4wwBLBQbl8IWd7Fo-nfZKTKpY';

async function tmdbFetch(endpoint, params = {}) {
  if (!TMDB_API_KEY) {
    throw new Error('Add your TMDB API key to tmdb.js to enable live data.');
  }

  const query = new URLSearchParams({
    ...params,
    api_key: TMDB_API_KEY
  });
  const response = await fetch(`${TMDB_BASE_URL}${endpoint}?${query}`);

  if (!response.ok) {
    throw new Error(`TMDB request failed: ${response.status}`);
  }

  return response.json();
}

function searchMovies(query, page = 1) {
  return tmdbFetch('/search/movie', {
    query,
    page,
    include_adult: 'false',
    language: 'en-US'
  });
}

function searchSeries(query, page = 1) {
  return tmdbFetch('/search/tv', {
    query,
    page,
    include_adult: 'false',
    language: 'en-US'
  });
}

function getPopularMovies(page = 1) {
  return tmdbFetch('/movie/popular', { page, language: 'en-US' });
}

function getPopularSeries(page = 1) {
  return tmdbFetch('/tv/popular', { page, language: 'en-US' });
}

function getTopRatedMovies(page = 1) {
  return tmdbFetch('/movie/top_rated', { page, language: 'en-US' });
}

function getMovieDetails(id) {
  return tmdbFetch(`/movie/${encodeURIComponent(id)}`, {
    language: 'en-US',
    append_to_response: 'videos'
  });
}

function getSeriesDetails(id) {
  return tmdbFetch(`/tv/${encodeURIComponent(id)}`, {
    language: 'en-US',
    append_to_response: 'videos'
  });
}

function getMovieGenres() {
  return tmdbFetch('/genre/movie/list', { language: 'en-US' });
}

function getSeriesGenres() {
  return tmdbFetch('/genre/tv/list', { language: 'en-US' });
}

function getTrailerFromVideos(videos) {
  if (!Array.isArray(videos?.results)) {
    return null;
  }

  const trailer = videos.results.find(
    (video) =>
      video.site === 'YouTube' &&
      video.type === 'Trailer' &&
      video.official
  ) || videos.results.find(
    (video) =>
      video.site === 'YouTube' &&
      video.type === 'Trailer'
  );

  return trailer
    ? `https://www.youtube.com/embed/${trailer.key}`
    : null;
}
