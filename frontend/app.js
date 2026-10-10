const STORAGE_KEY = 'streamflix-watchlist';
const PLAYBACK_KEY = 'streamflix-playback-progress';

const imageRoot = 'https://image.tmdb.org/t/p/';

/* =========================================================
   LOCAL FALLBACK CATALOG
   ========================================================= */

const catalog = [
  {
    id: 'last-adventure',
    title: 'The Last Adventure',
    year: 2026,
    rating: '8.4',
    runtime: '2h 08m',
    genre: 'Adventure',
    type: 'Movie',
    description:
      'A cartographer returns to the edge of the world to finish the map her father left behind. Beyond the last marked shore, the journey becomes a story about courage, memory, and finding a way home.',
    poster: 'local:hero',
    backdrop: 'local:hero'
  },

  {
    id: 'interstellar',
    title: 'Interstellar',
    year: 2014,
    rating: '8.7',
    runtime: '2h 49m',
    genre: 'Sci-Fi',
    type: 'Movie',
    description:
      'A team of explorers travels beyond this galaxy to discover whether mankind has a future among the stars.',
    poster: '/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
    backdrop: '/xJHokMbljvjADYdit5fK5VQsXEG.jpg'
  },

  {
    id: 'dune-part-two',
    title: 'Dune: Part Two',
    year: 2024,
    rating: '8.5',
    runtime: '2h 46m',
    genre: 'Sci-Fi',
    type: 'Movie',
    description:
      'Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.',
    poster: '/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg',
    backdrop: '/xOMo8BRK7PfcJv9JCnx7s5hj0PX.jpg'
  },

  {
    id: 'the-batman',
    title: 'The Batman',
    year: 2022,
    rating: '7.8',
    runtime: '2h 56m',
    genre: 'Mystery',
    type: 'Movie',
    description:
      'Batman ventures into Gotham City’s underworld when a sadistic killer leaves behind a trail of cryptic clues.',
    poster: '/74xTEgt7R36Fpooo50r9T25onhq.jpg',
    backdrop: '/b0PlSFdDwbyK0cf5RxwDpaOJQvQ.jpg'
  },

  {
    id: 'spider-verse',
    title: 'Across the Spider-Verse',
    year: 2023,
    rating: '8.6',
    runtime: '2h 20m',
    genre: 'Animation',
    type: 'Movie',
    description:
      'Miles Morales is swept across the multiverse, where he meets a team of Spider-People charged with protecting its existence.',
    poster: '/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg',
    backdrop: '/4HodYYKEIsGOdinkGi2Ucz6X9i0.jpg'
  },

  {
    id: 'everything-everywhere',
    title: 'Everything Everywhere All at Once',
    year: 2022,
    rating: '7.8',
    runtime: '2h 19m',
    genre: 'Adventure',
    type: 'Movie',
    description:
      'An exhausted laundromat owner discovers she is the only person who can save the many versions of the universe.',
    poster: '/w3LxiVYdWWRvEVdn5RYq6jIqkb1.jpg',
    backdrop: '/ss0Os3uWJfQAENILHZUiU2BzqQW.jpg'
  },

  {
    id: 'grand-budapest',
    title: 'The Grand Budapest Hotel',
    year: 2014,
    rating: '8.0',
    runtime: '1h 39m',
    genre: 'Comedy',
    type: 'Movie',
    description:
      'A legendary concierge and his young protégé become wrapped up in a priceless painting, a family fortune, and a changing Europe.',
    poster: '/eWdyYQreja6JGCzqHWXpWHDrrPo.jpg',
    backdrop: '/nX5XotM9yprCKarRH4fzOq1VM1J.jpg'
  },

  {
    id: 'dark-knight',
    title: 'The Dark Knight',
    year: 2008,
    rating: '9.0',
    runtime: '2h 32m',
    genre: 'Action',
    type: 'Movie',
    description:
      'Batman faces his greatest test when the Joker plunges Gotham into chaos and pushes its people to the edge.',
    poster: '/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
    backdrop: '/hqkIcbrOHL86UncnHIsHVcVmzue.jpg'
  },

  {
    id: 'planet-earth',
    title: 'Planet Earth',
    year: 2006,
    rating: '9.4',
    runtime: '11 episodes',
    genre: 'Documentary',
    type: 'Series',
    description:
      'A landmark journey through the planet’s wildest habitats, revealing the lives of the animals that call them home.',
    poster: 'local:hero',
    backdrop: 'local:hero'
  },

  {
    id: 'the-queens-gambit',
    title: 'The Queen’s Gambit',
    year: 2020,
    rating: '8.5',
    runtime: '7 episodes',
    genre: 'Drama',
    type: 'Series',
    description:
      'An orphaned chess prodigy fights to become the world’s greatest player while navigating a life shaped by loss and addiction.',
    poster: '/zU0htwkhNvBQdVSIKB9s6hgVeFK.jpg',
    backdrop: '/34OGjFEbHj0E3lE2w0iTUVq0CBz.jpg'
  },

  {
    id: 'our-planet',
    title: 'Our Planet',
    year: 2019,
    rating: '9.3',
    runtime: '8 episodes',
    genre: 'Documentary',
    type: 'Series',
    description:
      'Explore the planet’s most precious habitats and the extraordinary wildlife that lives in them.',
    poster: 'local:hero',
    backdrop: 'local:hero'
  }
];

/* =========================================================
   TMDB RUNTIME DATA
   ========================================================= */

const tmdbRuntimeCatalog = new Map();

const movieGenreMap = new Map();
const seriesGenreMap = new Map();

let movieGenresLoaded = false;
let seriesGenresLoaded = false;

/* =========================================================
   LOCAL HELPERS
   ========================================================= */

const byId = (id) =>
  catalog.find((item) => item.id === id);

const trailerMap = {
  'interstellar':
    'https://www.youtube.com/embed/zSWdZVtXT7E',

  'dune-part-two':
    'https://www.youtube.com/embed/Way9Dexny3w',

  'the-batman':
    'https://www.youtube.com/embed/mqqft2x_Aa4',

  'spider-verse':
    'https://www.youtube.com/embed/shW9i6k8cB0',

  'everything-everywhere':
    'https://www.youtube.com/embed/wxN1T1uxQ2g',

  'grand-budapest':
    'https://www.youtube.com/embed/1Fg5iWmQjwk',

  'dark-knight':
    'https://www.youtube.com/embed/EXeTwQWrcwY',

  'the-queens-gambit':
    'https://www.youtube.com/embed/CDrieqwSdgI'
};

const trailerUrl = (item) =>
  item?.trailer ||
  trailerMap[item?.id] ||
  null;

const escapeHtml = (value) =>
  String(value ?? '').replace(
    /[&<>"']/g,
    (character) =>
      ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
      })[character]
  );

/* =========================================================
   IMAGE HELPERS
   ========================================================= */

const posterUrl = (item, size = 'w500') => {
  if (!item?.poster) {
    return './src/assets/hero-background.jpg';
  }

  if (item.poster.startsWith('local:')) {
    return './src/assets/hero-background.jpg';
  }

  if (
    item.poster.startsWith('http://') ||
    item.poster.startsWith('https://')
  ) {
    return item.poster;
  }

  return `${imageRoot}${size}${item.poster}`;
};

const backdropUrl = (item) => {
  if (!item?.backdrop) {
    return './src/assets/hero-background.jpg';
  }

  if (item.backdrop.startsWith('local:')) {
    return './src/assets/hero-background.jpg';
  }

  if (
    item.backdrop.startsWith('http://') ||
    item.backdrop.startsWith('https://')
  ) {
    return item.backdrop;
  }

  return `${imageRoot}w1280${item.backdrop}`;
};

/* =========================================================
   TMDB ID HELPERS
   ========================================================= */

function isTmdbMovieId(id) {
  return String(id || '').startsWith('tmdb-movie-');
}

function isTmdbSeriesId(id) {
  return String(id || '').startsWith('tmdb-tv-');
}

function getTmdbId(id) {
  if (!id) return null;

  if (
    isTmdbMovieId(id) ||
    isTmdbSeriesId(id)
  ) {
    return Number(
      String(id)
        .replace('tmdb-movie-', '')
        .replace('tmdb-tv-', '')
    );
  }

  return null;
}

/* =========================================================
   TMDB GENRE LOADING
   ========================================================= */

async function ensureMovieGenres() {
  if (movieGenresLoaded) return;

  try {
    const data = await getMovieGenres();

    (data.genres || []).forEach((genre) => {
      movieGenreMap.set(
        genre.id,
        genre.name
      );
    });

    movieGenresLoaded = true;
  } catch {
    console.warn(
      'Unable to load TMDB movie genres.'
    );
  }
}

async function ensureSeriesGenres() {
  if (seriesGenresLoaded) return;

  try {
    const data = await getSeriesGenres();

    (data.genres || []).forEach((genre) => {
      seriesGenreMap.set(
        genre.id,
        genre.name
      );
    });

    seriesGenresLoaded = true;
  } catch {
    console.warn(
      'Unable to load TMDB series genres.'
    );
  }
}

/* =========================================================
   TMDB NORMALIZATION
   ========================================================= */

function normalizeTmdbMovie(movie) {
  if (!movie) return null;

  const id = `tmdb-movie-${movie.id}`;

  const year =
    movie.release_date
      ? Number(
          String(movie.release_date).slice(0, 4)
        )
      : '—';

  const genres =
    Array.isArray(movie.genres) &&
    movie.genres.length
      ? movie.genres.map(
          (genre) => genre.name
        )
      : Array.isArray(movie.genre_ids)
        ? movie.genre_ids
            .map((id) =>
              movieGenreMap.get(id)
            )
            .filter(Boolean)
        : [];

  const item = {
    id,
    tmdbId: Number(movie.id),
    mediaType: 'movie',

    title:
      movie.title ||
      movie.original_title ||
      'Untitled Movie',

    year,

    rating:
      Number.isFinite(
        Number(movie.vote_average)
      )
        ? Number(movie.vote_average).toFixed(1)
        : 'N/A',

    runtime:
      movie.runtime
        ? `${Math.floor(movie.runtime / 60)}h ${
            movie.runtime % 60
          }m`
        : 'Runtime unavailable',

    genre:
      genres.length
        ? genres.slice(0, 2).join(' · ')
        : 'Movie',

    type: 'Movie',

    description:
      movie.overview ||
      'No description is available for this title yet.',

    poster:
      movie.poster_path || 'local:hero',

    backdrop:
      movie.backdrop_path || 'local:hero',

    trailer:
      getTrailerFromVideos(movie.videos) ||
      null
  };

  tmdbRuntimeCatalog.set(
    item.id,
    item
  );

  return item;
}

function normalizeTmdbSeries(series) {
  if (!series) return null;

  const id = `tmdb-tv-${series.id}`;

  const year =
    series.first_air_date
      ? Number(
          String(series.first_air_date).slice(0, 4)
        )
      : '—';

  const genres =
    Array.isArray(series.genres) &&
    series.genres.length
      ? series.genres.map(
          (genre) => genre.name
        )
      : Array.isArray(series.genre_ids)
        ? series.genre_ids
            .map((id) =>
              seriesGenreMap.get(id)
            )
            .filter(Boolean)
        : [];

  const item = {
    id,
    tmdbId: Number(series.id),
    mediaType: 'tv',

    title:
      series.name ||
      series.original_name ||
      'Untitled Series',

    year,

    rating:
      Number.isFinite(
        Number(series.vote_average)
      )
        ? Number(series.vote_average).toFixed(1)
        : 'N/A',

    runtime:
      Array.isArray(series.episode_run_time) &&
      series.episode_run_time.length
        ? `${Math.floor(
            series.episode_run_time[0] / 60
          )}h ${
            series.episode_run_time[0] % 60
          }m`
        : 'Series',

    genre:
      genres.length
        ? genres.slice(0, 2).join(' · ')
        : 'Series',

    type: 'Series',

    description:
      series.overview ||
      'No description is available for this title yet.',

    poster:
      series.poster_path || 'local:hero',

    backdrop:
      series.backdrop_path || 'local:hero',

    trailer:
      getTrailerFromVideos(series.videos) ||
      null
  };

  tmdbRuntimeCatalog.set(
    item.id,
    item
  );

  return item;
}

/* =========================================================
   ITEM LOOKUP
   ========================================================= */

function getItemById(id) {
  if (!id) return null;

  const localItem = byId(id);

  if (localItem) {
    return localItem;
  }

  return (
    tmdbRuntimeCatalog.get(id) ||
    null
  );
}

/* =========================================================
   FETCH / TMDB LOADING HELPERS
   ========================================================= */

async function loadPopularMovies() {
  await ensureMovieGenres();

  const data =
    await getPopularMovies(1);

  return (data.results || [])
    .map(normalizeTmdbMovie)
    .filter(Boolean);
}

async function loadPopularSeries() {
  await ensureSeriesGenres();

  const data =
    await getPopularSeries(1);

  return (data.results || [])
    .map(normalizeTmdbSeries)
    .filter(Boolean);
}

async function loadTopRatedMovies() {
  await ensureMovieGenres();

  const data =
    await getTopRatedMovies(1);

  return (data.results || [])
    .map(normalizeTmdbMovie)
    .filter(Boolean);
}

async function searchTmdbMovies(query) {
  await ensureMovieGenres();

  const data =
    await searchMovies(query, 1);

  return (data.results || [])
    .map(normalizeTmdbMovie)
    .filter(Boolean);
}

async function searchTmdbSeries(query) {
  await ensureSeriesGenres();

  const data =
    await searchSeries(query, 1);

  return (data.results || [])
    .map(normalizeTmdbSeries)
    .filter(Boolean);
}

/* =========================================================
   WATCHLIST STORAGE
   ========================================================= */

function readWatchlist() {
  try {
    const saved = JSON.parse(
      localStorage.getItem(STORAGE_KEY) || '[]'
    );

    if (!Array.isArray(saved)) {
      return [];
    }

    return saved
      .filter(
        (entry) =>
          entry &&
          typeof entry.id === 'string'
      )
      .map((entry) => {
        const item =
          getItemById(entry.id);

        return {
          ...(item || {}),
          ...(entry.item || {}),
          id: entry.id,
          status:
            entry.status === 'watched'
              ? 'watched'
              : 'planned'
        };
      })
      .filter(
        (entry) =>
          entry.id &&
          (
            entry.title ||
            getItemById(entry.id)
          )
      );
  } catch {
    return [];
  }
}

function writeWatchlist(items) {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(items)
    );

    return true;
  } catch {
    notify(
      'Your browser could not save this list. Check storage settings.'
    );

    return false;
  }
}

/* =========================================================
   PLAYBACK STORAGE
   ========================================================= */

function readPlaybackProgress() {
  try {
    const progress = JSON.parse(
      localStorage.getItem(
        PLAYBACK_KEY
      ) || '{}'
    );

    return progress &&
      typeof progress === 'object' &&
      !Array.isArray(progress)
      ? progress
      : {};
  } catch {
    return {};
  }
}

function savePlaybackProgress(
  id,
  seconds
) {
  if (
    !id ||
    !Number.isFinite(seconds) ||
    seconds < 0
  ) {
    return;
  }

  const progress =
    readPlaybackProgress();

  progress[id] = seconds;

  try {
    localStorage.setItem(
      PLAYBACK_KEY,
      JSON.stringify(progress)
    );
  } catch {
    // Playback still works if storage is unavailable.
  }
}

function restorePlaybackPosition(video, id) {
  const seconds = Number(readPlaybackProgress()[id]);

  if (Number.isFinite(seconds) && seconds > 0 && seconds < video.duration) {
    video.currentTime = seconds;
  }

  video.play().catch(() => {
    notify('Press play to start the sample video.');
  });
}

/* =========================================================
   NOTIFICATIONS
   ========================================================= */

function notify(message) {
  const toast =
    document.querySelector('#toast');

  if (!toast) return;

  toast.textContent = message;

  toast.classList.add(
    'is-visible'
  );

  window.clearTimeout(
    notify.timeout
  );

  notify.timeout =
    window.setTimeout(
      () =>
        toast.classList.remove(
          'is-visible'
        ),
      2400
    );
}

/* =========================================================
   WATCHLIST CRUD
   ========================================================= */

function addToWatchlist(id) {
  const item =
    getItemById(id);

  if (!item) {
    notify(
      'This title could not be added. Open it again and retry.'
    );

    return;
  }

  const items =
    readWatchlist();

  if (
    items.some(
      (saved) =>
        saved.id === id
    )
  ) {
    notify(
      'Already saved to My List.'
    );

    return;
  }

  const savedEntry = {
    id: item.id,
    status: 'planned',
    item: {
      id: item.id,
      tmdbId: item.tmdbId || null,
      mediaType:
        item.mediaType || null,
      title: item.title,
      year: item.year,
      rating: item.rating,
      runtime: item.runtime,
      genre: item.genre,
      type: item.type,
      description:
        item.description,
      poster: item.poster,
      backdrop: item.backdrop,
      trailer:
        trailerUrl(item)
    }
  };

  if (
    writeWatchlist([
      ...items,
      savedEntry
    ])
  ) {
    notify(
      'Added to My List.'
    );

    renderCurrentPage();
  }
}

/* =========================================================
   HEADER
   ========================================================= */

function renderHeader() {
  const currentPage =
    document.querySelector(
      '#app'
    )?.dataset.page;

  const links = [
    ['Home', 'index.html', 'home'],
    ['Movies', 'movies.html', 'movies'],
    ['Series', 'series.html', 'series'],
    [
      'Categories',
      'movies.html#search',
      'categories'
    ],
    [
      'My List',
      'my-list.html',
      'my-list'
    ]
  ];

  const header =
    document.querySelector(
      '#site-header'
    );

  if (!header) return;

  let currentUser = null;

  try {
    currentUser = JSON.parse(
      localStorage.getItem(
        'streamflix-current-user'
      ) || 'null'
    );
  } catch {
    currentUser = null;
  }

  header.innerHTML = `
    <header class="site-header">

      <a
        class="brand"
        href="index.html"
        aria-label="StreamFlix home"
      >
        Stream<span>Flix</span>
      </a>

      <nav
        class="nav-links"
        aria-label="Main navigation"
      >
        ${links
          .map(
            ([label, href, page]) =>
              `
                <a
                  href="${href}"
                  ${
                    currentPage === page
                      ? 'aria-current="page"'
                      : ''
                  }
                >
                  ${label}
                </a>
              `
          )
          .join('')}
      </nav>

      <div class="nav-actions">

        <a
          class="nav-search"
          href="movies.html#search"
          aria-label="Search titles"
        >
          🔍
        </a>

        ${
          currentUser
            ? `
              <button
                class="profile-button"
                type="button"
                data-auth-action="logout"
                aria-label="Logout"
                title="Logout"
              >
                👤
              </button>
            `
            : `
              <a
                class="profile-button"
                href="login.html"
                aria-label="Login"
                title="Login"
              >
                👤
              </a>
            `
        }

      </div>

    </header>
  `;
}

/* =========================================================
   CARD UI
   ========================================================= */

function cardMarkup(item) {
  return `
    <article class="movie-card">

      <a
        class="poster-link"
        href="movie.html?id=${encodeURIComponent(
          item.id
        )}"
        aria-label="View ${escapeHtml(
          item.title
        )} details"
      >

        <span
          class="poster-fallback"
          aria-hidden="true"
        >
          ${escapeHtml(
            item.title
          )}
        </span>

        <img
          src="${posterUrl(item)}"
          alt="${escapeHtml(
            item.title
          )} poster"
          loading="lazy"
          onerror="this.remove()"
        />

        <span class="card-rating">
          ★ ${escapeHtml(
            item.rating
          )}
        </span>

      </a>

      <div class="card-copy">

        <div class="card-title-row">

          <h3 class="card-title">
            ${escapeHtml(
              item.title
            )}
          </h3>

          <span class="card-year">
            ${item.year}
          </span>

        </div>

        <p class="card-subtitle">
          ${escapeHtml(
            item.genre
          )} · ${escapeHtml(
            item.type
          )}
        </p>

      </div>

    </article>
  `;
}

function renderGrid(
  items,
  emptyTitle = 'No titles found',
  emptyText =
    'Try another search or filter.'
) {
  if (!items.length) {
    return `
      <div class="empty-state">
        <h2>${emptyTitle}</h2>
        <p>${emptyText}</p>
      </div>
    `;
  }

  return items
    .map(cardMarkup)
    .join('');
}

/* =========================================================
   SECTION UI
   ========================================================= */

/* =========================================================
   HOME PAGE
   ========================================================= */

async function renderHome() {
  const app = document.querySelector('#app');

  if (!app) return;

  const featured =
    byId('last-adventure');

  app.innerHTML = `
    <section
      class="hero"
      aria-labelledby="hero-title"
    >

      <div class="hero-copy">

        <p class="eyebrow">
          Featured Movie
        </p>

        <h1 id="hero-title">
          The Last Adventure
        </h1>

        <p class="hero-description">
          A new journey begins. Discover a world full
          of adventure, mystery and unforgettable moments.
        </p>

        <div class="hero-actions">

          <a
            class="button button-primary"
            href="movie.html?id=${featured.id}"
          >
            ▶ Watch Now
          </a>

          <button
            class="button button-quiet"
            type="button"
            data-action="add"
            data-id="${featured.id}"
          >
            ＋ My List
          </button>

        </div>

      </div>

    </section>

    <section class="content-section">

      <div class="section-heading">

        <h2>Trending Movies</h2>

        <a
          class="text-link"
          href="movies.html"
        >
          Explore all →
        </a>

      </div>

      <div
        class="movie-grid"
        id="home-trending"
      >
        <div class="empty-state">
          <h2>Loading movies...</h2>
          <p>Fetching the latest titles from TMDB.</p>
        </div>
      </div>

    </section>

    <section class="content-section">

      <div class="section-heading">

        <h2>Top Rated Movies</h2>

        <a
          class="text-link"
          href="movies.html"
        >
          Explore all →
        </a>

      </div>

      <div
        class="movie-grid"
        id="home-top-rated"
      >
        <div class="empty-state">
          <h2>Loading movies...</h2>
          <p>Fetching highly rated titles.</p>
        </div>
      </div>

    </section>

    <section class="content-section">

      <div class="section-heading">

        <h2>Series to Explore</h2>

        <a
          class="text-link"
          href="series.html"
        >
          Explore all →
        </a>

      </div>

      <div
        class="movie-grid"
        id="home-series"
      >
        <div class="empty-state">
          <h2>Loading series...</h2>
          <p>Fetching popular series from TMDB.</p>
        </div>
      </div>

    </section>

    <footer class="site-footer">

      <span>
        <strong>StreamFlix</strong>
      </span>

      <span>
        Discover your next favorite.
      </span>

    </footer>
  `;

  document.querySelector('#home-trending').innerHTML =
    renderGrid(catalog.filter((item) => item.type === 'Movie').slice(0, 6));
  document.querySelector('#home-top-rated').innerHTML =
    renderGrid(
      catalog
        .filter((item) => item.type === 'Movie')
        .sort((a, b) => Number(b.rating) - Number(a.rating))
        .slice(0, 6)
    );
  document.querySelector('#home-series').innerHTML =
    renderGrid(catalog.filter((item) => item.type === 'Series').slice(0, 6));

  try {
    const [
      popularMovies,
      topRatedMovies,
      popularSeries
    ] = await Promise.all([
      loadPopularMovies(),
      loadTopRatedMovies(),
      loadPopularSeries()
    ]);

    const trendingGrid =
      document.querySelector(
        '#home-trending'
      );

    const topRatedGrid =
      document.querySelector(
        '#home-top-rated'
      );

    const seriesGrid =
      document.querySelector(
        '#home-series'
      );

    if (trendingGrid) {
      trendingGrid.innerHTML =
        renderGrid(
          popularMovies.slice(0, 6)
        );
    }

    if (topRatedGrid) {
      topRatedGrid.innerHTML =
        renderGrid(
          topRatedMovies.slice(0, 6)
        );
    }

    if (seriesGrid) {
      seriesGrid.innerHTML =
        renderGrid(
          popularSeries.slice(0, 6)
        );
    }
  } catch (error) {
    console.error(
      'TMDB home loading failed:',
      error
    );

    const trendingGrid =
      document.querySelector(
        '#home-trending'
      );

    const topRatedGrid =
      document.querySelector(
        '#home-top-rated'
      );

    const seriesGrid =
      document.querySelector(
        '#home-series'
      );

    const fallbackMovies =
      catalog.filter(
        (item) =>
          item.type === 'Movie'
      );

    const fallbackSeries =
      catalog.filter(
        (item) =>
          item.type === 'Series'
      );

    if (trendingGrid) {
      trendingGrid.innerHTML =
        renderGrid(
          fallbackMovies.slice(0, 6)
        );
    }

    if (topRatedGrid) {
      topRatedGrid.innerHTML =
        renderGrid(
          fallbackMovies
            .slice()
            .sort(
              (a, b) =>
                Number(b.rating) -
                Number(a.rating)
            )
            .slice(0, 6)
        );
    }

    if (seriesGrid) {
      seriesGrid.innerHTML =
        renderGrid(
          fallbackSeries.slice(0, 6)
        );
    }

    notify(
      'Unable to load TMDB titles. Showing available StreamFlix titles.'
    );
  }
}

/* =========================================================
   CATALOG PAGE
   ========================================================= */

async function renderCatalog(type) {
  const app =
    document.querySelector('#app');

  if (!app) return;

  const isSeries =
    type === 'Series';

  const heading =
    isSeries
      ? 'Series'
      : 'Explore movies';

  const description =
    isSeries
      ? 'Limited series, long-running favorites, and true stories.'
      : 'Browse movies, search titles, and discover something new.';

  const fallbackItems =
    catalog.filter(
      (item) =>
        item.type === type
    );

  app.innerHTML = `
    <section class="page-content">

      <div class="page-heading">

        <div class="page-heading-copy">

          <p class="eyebrow">
            The StreamFlix collection
          </p>

          <h1 class="page-title">
            ${heading}
          </h1>

          <p class="page-lede">
            ${description}
          </p>

        </div>

        <span class="list-summary">

          <span
            class="summary-number"
            id="catalog-total"
          >
            —
          </span>

          titles

        </span>

      </div>

      <div class="catalog-tools">

        <label
          class="search-field"
          id="search"
        >

          <span aria-hidden="true">
            ⌕
          </span>

          <input
            id="catalog-search"
            type="search"
            placeholder="Search by title"
            autocomplete="off"
            aria-label="Search titles"
          />

        </label>

        <div
          class="filter-list"
          id="catalog-filters"
          aria-label="Filter by genre"
        >
          <button
            class="filter-button"
            type="button"
            data-genre="all"
            aria-pressed="true"
          >
            All
          </button>
        </div>

      </div>

      <p
        class="catalog-count"
        id="catalog-count"
      >
        Loading titles...
      </p>

      <div
        class="movie-grid"
        id="catalog-grid"
      >
        <div class="empty-state">
          <h2>Loading...</h2>
          <p>Fetching titles from TMDB.</p>
        </div>
      </div>

    </section>

    <footer class="site-footer">

      <span>
        <strong>StreamFlix</strong>
        · Your next story starts here.
      </span>

      <span>
        Built with HTML, CSS, JavaScript, and browser storage.
      </span>

    </footer>
  `;

  const input =
    document.querySelector(
      '#catalog-search'
    );

  const grid =
    document.querySelector(
      '#catalog-grid'
    );

  const count =
    document.querySelector(
      '#catalog-count'
    );

  const total =
    document.querySelector(
      '#catalog-total'
    );

  const filters =
    document.querySelector(
      '#catalog-filters'
    );

  let currentItems =
    fallbackItems;

  let activeGenre = 'all';

  let searchTimer = null;

  function buildGenreButtons(items) {
    if (!filters) return;

    const genres = [
      ...new Set(
        items
          .map(
            (item) =>
              item.genre
          )
          .filter(Boolean)
          .flatMap(
            (genre) =>
              genre
                .split(' · ')
                .map(
                  (value) =>
                    value.trim()
                )
          )
      )
    ].slice(0, 12);

    filters.innerHTML = `
      <button
        class="filter-button"
        type="button"
        data-genre="all"
        aria-pressed="true"
      >
        All
      </button>

      ${genres
        .map(
          (genre) => `
            <button
              class="filter-button"
              type="button"
              data-genre="${escapeHtml(
                genre
              )}"
              aria-pressed="false"
            >
              ${escapeHtml(
                genre
              )}
            </button>
          `
        )
        .join('')}
    `;

    filters
      .querySelectorAll(
        '[data-genre]'
      )
      .forEach(
        (button) => {
          button.addEventListener(
            'click',
            () => {
              activeGenre =
                button.dataset.genre;

              filters
                .querySelectorAll(
                  '[data-genre]'
                )
                .forEach(
                  (filter) => {
                    filter.setAttribute(
                      'aria-pressed',
                      String(
                        filter ===
                          button
                      )
                    );
                  }
                );

              updateCatalog();
            }
          );
        }
      );
  }

  function updateCatalog() {
    if (!grid || !count) {
      return;
    }

    const query =
      input?.value
        .trim()
        .toLocaleLowerCase() ||
      '';

    const filtered =
      currentItems.filter(
        (item) => {
          const genreMatch =
            activeGenre === 'all' ||
            String(
              item.genre || ''
            )
              .split(' · ')
              .some(
                (genre) =>
                  genre ===
                  activeGenre
              );

          const searchText =
            `${item.title} ${item.genre} ${item.year}`
              .toLocaleLowerCase();

          return (
            genreMatch &&
            searchText.includes(
              query
            )
          );
        }
      );

    grid.innerHTML =
      renderGrid(
        filtered,
        'No titles found',
        'Try another search or filter.'
      );

    count.textContent =
      `Showing ${filtered.length} of ${currentItems.length} titles`;

    if (total) {
      total.textContent =
        currentItems.length;
    }
  }

  async function loadInitialCatalog() {
    try {
      currentItems =
        isSeries
          ? await loadPopularSeries()
          : await loadPopularMovies();

      if (!currentItems.length) {
        currentItems =
          fallbackItems;
      }

      buildGenreButtons(
        currentItems
      );

      updateCatalog();
    } catch (error) {
      console.error(
        'TMDB catalog loading failed:',
        error
      );

      currentItems =
        fallbackItems;

      buildGenreButtons(
        currentItems
      );

      updateCatalog();

      notify(
        `Unable to load TMDB ${isSeries ? 'series' : 'movies'}. Showing fallback titles.`
      );
    }
  }

  async function performSearch(
    query
  ) {
    const cleanQuery =
      query.trim();

    if (!cleanQuery) {
      try {
        currentItems =
          isSeries
            ? await loadPopularSeries()
            : await loadPopularMovies();

        activeGenre = 'all';

        buildGenreButtons(
          currentItems
        );

        updateCatalog();

        return;
      } catch {
        currentItems =
          fallbackItems;

        activeGenre = 'all';

        buildGenreButtons(
          currentItems
        );

        updateCatalog();

        return;
      }
    }

    count.textContent =
      'Searching TMDB...';

    grid.innerHTML = `
      <div class="empty-state">
        <h2>Searching...</h2>
        <p>
          Finding titles matching
          "${escapeHtml(cleanQuery)}".
        </p>
      </div>
    `;

    try {
      currentItems =
        isSeries
          ? await searchTmdbSeries(
              cleanQuery
            )
          : await searchTmdbMovies(
              cleanQuery
            );

      activeGenre = 'all';

      buildGenreButtons(
        currentItems
      );

      updateCatalog();
    } catch (error) {
      console.error(
        'TMDB search failed:',
        error
      );

      grid.innerHTML = `
        <div class="empty-state">
          <h2>Search failed</h2>
          <p>
            Unable to reach TMDB right now.
            Please try again.
          </p>
        </div>
      `;

      count.textContent =
        'Unable to search titles.';
    }
  }

  if (input) {
    input.addEventListener(
      'input',
      () => {
        window.clearTimeout(
          searchTimer
        );

        searchTimer =
          window.setTimeout(
            () => {
              void performSearch(
                input.value
              );
            },
            450
          );
      }
    );
  }

  buildGenreButtons(currentItems);
  updateCatalog();
  await loadInitialCatalog();

  if (
    window.location.hash ===
    '#search'
  ) {
    input?.focus({
      preventScroll: true
    });
  }
}

/* =========================================================
   DETAILS PAGE
   ========================================================= */

async function fetchDynamicDetails(
  id
) {
  if (isTmdbMovieId(id)) {
    const tmdbId =
      getTmdbId(id);

    if (!tmdbId) return null;

    await ensureMovieGenres();

    const data =
      await getMovieDetails(
        tmdbId
      );

    return normalizeTmdbMovie(
      data
    );
  }

  if (isTmdbSeriesId(id)) {
    const tmdbId =
      getTmdbId(id);

    if (!tmdbId) return null;

    await ensureSeriesGenres();

    const data =
      await getSeriesDetails(
        tmdbId
      );

    return normalizeTmdbSeries(
      data
    );
  }

  return null;
}

async function renderDetails() {
  const titleId =
    new URLSearchParams(
      window.location.search
    ).get('id');

  const app =
    document.querySelector(
      '#app'
    );

  if (!app) return;

  let item =
    getItemById(titleId);

  if (
    !item &&
    (
      isTmdbMovieId(titleId) ||
      isTmdbSeriesId(titleId)
    )
  ) {
    app.innerHTML = `
      <section class="page-content">

        <div class="empty-state">

          <h2>Loading title...</h2>

          <p>
            Fetching details from TMDB.
          </p>

        </div>

      </section>
    `;

    try {
      item =
        await fetchDynamicDetails(
          titleId
        );
    } catch (error) {
      console.error(
        'TMDB details failed:',
        error
      );

      item = null;
    }
  }

  if (!item) {
    app.innerHTML = `
      <section class="page-content">

        <div class="empty-state">

          <h2>
            We couldn’t find that title.
          </h2>

          <p>
            It may have moved out of the collection.
          </p>

          <a
            class="button button-primary"
            href="movies.html"
          >
            Browse titles
          </a>

        </div>

      </section>
    `;

    return;
  }

  document.title =
    `${item.title} | StreamFlix`;

  const savedPosition =
    Number(
      readPlaybackProgress()[
        item.id
      ]
    ) || 0;

  const returnPage =
    item.type === 'Series'
      ? 'series.html'
      : 'movies.html';

  const trailer =
    trailerUrl(item);

  const alreadySaved =
    readWatchlist().some(
      (entry) =>
        entry.id === item.id
    );

  app.innerHTML = `
    <section
      class="details-hero"
      style="background-image:url('${backdropUrl(
        item
      )}')"
    >

      <div class="details-inner">

        <img
          class="detail-poster"
          src="${posterUrl(
            item
          )}"
          alt="${escapeHtml(
            item.title
          )} poster"
          onerror="this.hidden=true"
        />

        <div class="detail-copy">

          <a
            class="back-link"
            href="${returnPage}"
          >
            ← Back to ${
              item.type === 'Series'
                ? 'series'
                : 'movies'
            }
          </a>

          <p class="eyebrow">
            ${escapeHtml(
              item.type
            )}
            ·
            ${escapeHtml(
              item.genre
            )}
          </p>

          <h1>
            ${escapeHtml(
              item.title
            )}
          </h1>

          <div class="detail-facts">

            <strong>
              ★ ${escapeHtml(
                item.rating
              )}
            </strong>

            <span>
              ${item.year}
            </span>

            <span>
              ${escapeHtml(
                item.runtime
              )}
            </span>

            <span>
              HD
            </span>

          </div>

          <div class="genre-tags">

            <span>
              ${escapeHtml(
                item.genre
              )}
            </span>

            <span>
              ${escapeHtml(
                item.type
              )}
            </span>

            <span>
              English
            </span>

          </div>

          <p class="detail-description">
            ${escapeHtml(
              item.description
            )}
          </p>

          <div class="detail-actions">

            <button
              class="button button-primary"
              type="button"
              data-action="play"
              data-id="${item.id}"
            >
              ${
                savedPosition > 0
                  ? '▶ Continue Watching'
                  : '▶ Watch Now'
              }
            </button>

            <button
              class="button button-quiet"
              type="button"
              data-action="trailer"
              data-trailer="${escapeHtml(
                trailer || ''
              )}"
            >
              ▶ Watch Trailer
            </button>

            <button
              class="button button-quiet"
              type="button"
              data-action="add"
              data-id="${item.id}"
            >
              ${
                alreadySaved
                  ? '✓ In My List'
                  : '+ Add to My List'
              }
            </button>

          </div>

          <p class="detail-note">
            ${
              trailer
                ? 'Watch the trailer before adding this title to your list.'
                : 'No trailer is available for this title yet.'
            }
          </p>

        </div>

      </div>

    </section>

    <footer class="site-footer">

      <span>
        <strong>StreamFlix</strong>
        · Your next story starts here.
      </span>

      <span>
        Built with HTML, CSS, JavaScript, and browser storage.
      </span>

    </footer>
  `;
}

/* =========================================================
   MY LIST PAGE
   ========================================================= */

function renderMyList() {
  const app =
    document.querySelector(
      '#app'
    );

  if (!app) return;

  const items =
    readWatchlist();

  const watchedCount =
    items.filter(
      (item) =>
        item.status === 'watched'
    ).length;

  const plannedCount =
    items.length -
    watchedCount;

  const listContent =
    items.length
      ? `
        <div class="saved-list">

          ${items
            .map(
              (item) => `
                <article
                  class="saved-item"
                >

                  <img
                    class="saved-poster"
                    src="${posterUrl(
                      item,
                      'w185'
                    )}"
                    alt="${escapeHtml(
                      item.title
                    )} poster"
                    onerror="this.hidden=true"
                  />

                  <div>

                    <h2
                      class="saved-title"
                    >
                      <a
                        href="movie.html?id=${encodeURIComponent(
                          item.id
                        )}"
                      >
                        ${escapeHtml(
                          item.title
                        )}
                      </a>
                    </h2>

                    <p
                      class="saved-meta"
                    >
                      ${item.year}
                      ·
                      ${escapeHtml(
                        item.genre
                      )}
                      ·
                      ★ ${escapeHtml(
                        item.rating
                      )}
                    </p>

                  </div>

                  <div
                    class="saved-actions"
                  >

                    <label
                      class="sr-only"
                      for="status-${escapeHtml(
                        item.id
                      )}"
                    >
                      Viewing status for
                      ${escapeHtml(
                        item.title
                      )}
                    </label>

                    <select
                      class="status-select"
                      id="status-${escapeHtml(
                        item.id
                      )}"
                      data-action="status"
                      data-id="${escapeHtml(
                        item.id
                      )}"
                    >

                      <option
                        value="planned"
                        ${
                          item.status ===
                          'planned'
                            ? 'selected'
                            : ''
                        }
                      >
                        Planned
                      </option>

                      <option
                        value="watched"
                        ${
                          item.status ===
                          'watched'
                            ? 'selected'
                            : ''
                        }
                      >
                        Watched
                      </option>

                    </select>

                    <button
                      class="button button-danger button-small"
                      type="button"
                      data-action="remove"
                      data-id="${escapeHtml(
                        item.id
                      )}"
                    >
                      Remove
                    </button>

                  </div>

                </article>
              `
            )
            .join('')}

        </div>
      `
      : `
        <div class="empty-state">

          <h2>
            Your list is ready for a first pick.
          </h2>

          <p>
            Save a movie or series and it will stay
            here on this device.
          </p>

          <a
            class="button button-primary"
            href="movies.html"
          >
            Browse movies
          </a>

        </div>
      `;

  app.innerHTML = `
    <section class="page-content">

      <div class="page-heading">

        <div class="page-heading-copy">

          <p class="eyebrow">
            Saved on this device
          </p>

          <h1 class="page-title">
            My List
          </h1>

          <p class="page-lede">
            Your own queue. Add titles, mark what
            you have watched, and clear anything
            you’re done with.
          </p>

        </div>

        <div class="list-summary">

          <span
            class="summary-number"
          >
            ${items.length}
          </span>

          <span>
            ${plannedCount} planned
            <br />
            ${watchedCount} watched
          </span>

        </div>

      </div>

      ${listContent}

    </section>

    <footer class="site-footer">

      <span>
        <strong>StreamFlix</strong>
        · Your next story starts here.
      </span>

      <span>
        Your list is stored in this browser only.
      </span>

    </footer>
  `;
}

/* =========================================================
   PAGE RENDERER
   ========================================================= */

async function renderCurrentPage() {
  renderHeader();

  const page =
    document.querySelector(
      '#app'
    )?.dataset.page;

  if (page === 'home') {
    await renderHome();
    return;
  }

  if (page === 'movies') {
    await renderCatalog(
      'Movie'
    );
    return;
  }

  if (page === 'series') {
    await renderCatalog(
      'Series'
    );
    return;
  }

  if (page === 'details') {
    await renderDetails();
    return;
  }

  if (page === 'my-list') {
    renderMyList();
  }
}

/* =========================================================
   GLOBAL CLICK HANDLER
   ========================================================= */

document.addEventListener(
  'click',
  (event) => {

    /* =====================================================
       AUTH / LOGOUT
       ===================================================== */

    const authControl =
      event.target.closest(
        '[data-auth-action]'
      );

    if (authControl) {

      if (
        authControl.dataset.authAction ===
        'logout'
      ) {

        localStorage.removeItem(
          'streamflix-current-user'
        );

        notify(
          'Logged out successfully.'
        );

        renderCurrentPage();

        return;
      }
    }

    /* =====================================================
       DATA ACTION CONTROL
       ===================================================== */

    const control =
      event.target.closest(
        '[data-action]'
      );

    if (!control) return;

    const {
      action,
      id
    } = control.dataset;

    /* =====================================================
       ADD TO MY LIST
       ===================================================== */

    if (action === 'add') {

      addToWatchlist(id);

      return;
    }

    /* =====================================================
       WATCH NOW / CONTINUE WATCHING
       ===================================================== */

    if (action === 'play') {
      const dialog = document.querySelector('#player-dialog');
      const player = document.querySelector('#movie-player');

      if (!dialog || !player) {
        notify('Video player is not available.');
        return;
      }

      player.dataset.titleId = id;
      syncPlayerTitle(id);
      dialog.showModal();

      const restorePosition = () =>
        restorePlaybackPosition(player, id);

      if (player.readyState >= 1) {
        restorePosition();
      } else {
        player.addEventListener('loadedmetadata', restorePosition, { once: true });
      }

      return;
    }

    if (action === 'close-player') {
      document.querySelector('#player-dialog')?.close();
      return;
    }

    if (action === 'toggle-play') {
      const player = document.querySelector('#movie-player');
      if (!player) return;

      if (player.paused) {
        player.play().catch(() => {});
      } else {
        player.pause();
      }
      return;
    }

    if (action === 'toggle-mute') {
      const player = document.querySelector('#movie-player');
      if (!player) return;

      player.muted = !player.muted;
      control.textContent = player.muted ? '🔇' : '🔊';
      control.setAttribute('aria-label', player.muted ? 'Unmute video' : 'Mute video');
      return;
    }

    if (action === 'toggle-settings') {
      const settingsMenu = document.querySelector('#player-settings-menu');
      const captionsMenu = document.querySelector('#player-captions-menu');
      const captionsButton = document.querySelector('[data-action="captions"]');
      if (!settingsMenu) return;

      settingsMenu.hidden = !settingsMenu.hidden;
      if (captionsMenu) captionsMenu.hidden = true;
      captionsButton?.setAttribute('aria-expanded', 'false');
      control.setAttribute('aria-expanded', String(!settingsMenu.hidden));
      control.setAttribute(
        'aria-label',
        settingsMenu.hidden ? 'Open player settings' : 'Close player settings'
      );
      return;
    }

    if (action === 'set-playback-speed') {
      const player = document.querySelector('#movie-player');
      const settingsMenu = document.querySelector('#player-settings-menu');
      const speed = Number(control.dataset.speed);
      if (!player || !Number.isFinite(speed) || speed <= 0) return;

      player.playbackRate = speed;
      settingsMenu?.querySelectorAll('[data-action="set-playback-speed"]')
        .forEach((option) => {
          option.setAttribute('aria-pressed', String(option === control));
        });

      if (settingsMenu) settingsMenu.hidden = true;
      const settingsButton = document.querySelector('[data-action="toggle-settings"]');
      settingsButton?.setAttribute('aria-expanded', 'false');
      settingsButton?.setAttribute('aria-label', 'Open player settings');
      return;
    }

    if (action === 'captions') {
      const captionsMenu = document.querySelector('#player-captions-menu');
      const settingsMenu = document.querySelector('#player-settings-menu');
      if (!captionsMenu) return;

      captionsMenu.hidden = !captionsMenu.hidden;
      if (settingsMenu) settingsMenu.hidden = true;
      control.setAttribute('aria-expanded', String(!captionsMenu.hidden));
      control.setAttribute(
        'aria-label',
        captionsMenu.hidden ? 'Open captions' : 'Close captions'
      );
      document.querySelector('[data-action="toggle-settings"]')
        ?.setAttribute('aria-expanded', 'false');

      if (!captionsMenu.hidden) renderCaptionOptions();
      return;
    }

    if (action === 'set-caption-track') {
      const player = document.querySelector('#movie-player');
      const selectedTrack = Number(control.dataset.trackIndex);
      if (!player || !Number.isInteger(selectedTrack)) return;

      Array.from(player.textTracks).forEach((track, index) => {
        track.mode = index === selectedTrack ? 'showing' : 'disabled';
      });
      renderCaptionOptions();
      return;
    }

    if (action === 'toggle-fullscreen') {
      const playerShell = document.querySelector('.player-shell');
      if (!playerShell) return;

      if (!document.fullscreenElement) {
        playerShell.requestFullscreen().catch(() => {});
      } else {
        document.exitFullscreen().catch(() => {});
      }
      return;
    }

    if (action === 'seek-by') {
      const player = document.querySelector('#movie-player');
      const offset = Number(control.dataset.seconds);
      if (!player || !Number.isFinite(offset) || !Number.isFinite(player.duration)) return;

      const wasPlaying = !player.paused;
      player.currentTime = Math.max(
        0,
        Math.min(player.duration, player.currentTime + offset)
      );
      savePlaybackProgress(player.dataset.titleId, player.currentTime);
      if (wasPlaying) player.play().catch(() => {});
      return;
    }

    /* =====================================================
       TRAILER
       ===================================================== */

    if (
      action ===
      'trailer'
    ) {

      const trailerDialog =
        document.querySelector(
          '#trailer-dialog'
        );

      const trailerFrame =
        document.querySelector(
          '#trailer-frame'
        );

      if (
        !trailerDialog ||
        !trailerFrame
      ) {

        notify(
          'Trailer player is not available.'
        );

        return;
      }

      const trailer =
        control.dataset.trailer;

      if (!trailer) {

        notify(
          'Trailer is not available for this title.'
        );

        return;
      }

      trailerFrame.src =
        `${trailer}${
          trailer.includes('?')
            ? '&'
            : '?'
        }autoplay=1`;

      trailerDialog.showModal();

      return;
    }

    /* =====================================================
       CLOSE TRAILER
       ===================================================== */

    if (
      action ===
      'close-trailer'
    ) {

      const trailerDialog =
        document.querySelector(
          '#trailer-dialog'
        );

      const trailerFrame =
        document.querySelector(
          '#trailer-frame'
        );

      if (trailerFrame) {

        trailerFrame.src =
          '';
      }

      trailerDialog?.close();

      return;
    }

    /* =====================================================
       REMOVE FROM MY LIST
       ===================================================== */

    if (
      action ===
      'remove'
    ) {

      const remaining =
        readWatchlist().filter(
          (item) =>
            item.id !== id
        );

      if (
        writeWatchlist(
          remaining.map(
            (item) => ({
              id: item.id,
              status:
                item.status,
              item: {
                id: item.id,
                tmdbId:
                  item.tmdbId ||
                  null,
                mediaType:
                  item.mediaType ||
                  null,
                title:
                  item.title,
                year:
                  item.year,
                rating:
                  item.rating,
                runtime:
                  item.runtime,
                genre:
                  item.genre,
                type:
                  item.type,
                description:
                  item.description,
                poster:
                  item.poster,
                backdrop:
                  item.backdrop,
                trailer:
                  item.trailer ||
                  null
              }
            })
          )
        )
      ) {

        notify(
          'Removed from My List.'
        );

        renderCurrentPage();
      }

      return;
    }
  }
);

function formatPlaybackTime(seconds) {
  if (!Number.isFinite(seconds) || seconds < 0) return '00:00:00';

  const totalSeconds = Math.floor(seconds);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const remainingSeconds = totalSeconds % 60;

  return [hours, minutes, remainingSeconds]
    .map((part) => String(part).padStart(2, '0'))
    .join(':');
}

function renderCaptionOptions() {
  const player = document.querySelector('#movie-player');
  const options = document.querySelector('.player-caption-options');
  const emptyMessage = document.querySelector('.player-caption-empty');
  if (!player || !options || !emptyMessage) return;

  const tracks = Array.from(player.textTracks)
    .map((track, index) => ({ track, index }))
    .filter(({ track }) => ['captions', 'subtitles'].includes(track.kind));
  const activeTrack = tracks.find(({ track }) => track.mode === 'showing')?.index ?? -1;

  options.replaceChildren();
  emptyMessage.hidden = tracks.length > 0;

  const addOption = (label, trackIndex, selected) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.dataset.action = 'set-caption-track';
    button.dataset.trackIndex = String(trackIndex);
    button.textContent = label;
    button.setAttribute('aria-pressed', String(selected));
    options.append(button);
  };

  addOption('Off', -1, activeTrack === -1);
  tracks.forEach(({ track, index }) => {
    addOption(track.label || track.language || `Caption ${index + 1}`, index, index === activeTrack);
  });
}

function syncPlayerTitle(id) {
  const title = getItemById(id)?.title;
  const titleNode = document.querySelector('.player-show');
  if (title && titleNode) titleNode.textContent = title;
}

function syncPlayerDisplay() {
  const player = document.querySelector('#movie-player');
  if (!player) return;

  const progress = document.querySelector('.player-progress-meter');
  if (progress && Number.isFinite(player.duration) && player.duration > 0) {
    const percentage = Math.min(100, (player.currentTime / player.duration) * 100);
    progress.style.width = `${percentage}%`;
  }

  const time = document.querySelector('#movie-player-time');
  if (time) {
    time.textContent =
      `${formatPlaybackTime(player.currentTime)} / ${formatPlaybackTime(player.duration || 0)}`;
  }

  const playButton = document.querySelector('[data-action="toggle-play"]');
  if (playButton) {
    playButton.textContent = player.paused ? '▶' : '❚❚';
    playButton.setAttribute('aria-label', player.paused ? 'Play video' : 'Pause video');
  }
}

const moviePlayer = document.querySelector('#movie-player');

if (moviePlayer) {
  moviePlayer.playbackRate = 1;

  moviePlayer.addEventListener('timeupdate', () => {
    if (!moviePlayer.seeking) {
      savePlaybackProgress(moviePlayer.dataset.titleId, moviePlayer.currentTime);
    }
    syncPlayerDisplay();
  });

  moviePlayer.addEventListener('loadedmetadata', () => {
    syncPlayerDisplay();
    renderCaptionOptions();
  });

  moviePlayer.addEventListener('play', syncPlayerDisplay);
  moviePlayer.addEventListener('pause', syncPlayerDisplay);

  moviePlayer.addEventListener('volumechange', () => {
    const muteButton = document.querySelector('[data-action="toggle-mute"]');
    if (!muteButton) return;

    muteButton.textContent = moviePlayer.muted ? '🔇' : '🔊';
    muteButton.setAttribute('aria-label', moviePlayer.muted ? 'Unmute video' : 'Mute video');
  });

  moviePlayer.addEventListener('ended', () => {
    savePlaybackProgress(moviePlayer.dataset.titleId, 0);
    syncPlayerDisplay();
  });
}

document.addEventListener('fullscreenchange', () => {
  const button = document.querySelector('[data-action="toggle-fullscreen"]');
  if (button) {
    button.setAttribute(
      'aria-label',
      document.fullscreenElement ? 'Exit fullscreen' : 'Enter fullscreen'
    );
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key !== 'Escape') return;
  const settingsMenu = document.querySelector('#player-settings-menu');
  const captionsMenu = document.querySelector('#player-captions-menu');
  if (settingsMenu) settingsMenu.hidden = true;
  if (captionsMenu) captionsMenu.hidden = true;
});

/* =========================================================
   WATCHLIST STATUS CHANGE
   ========================================================= */

document.addEventListener(
  'change',
  (event) => {

    const control =
      event.target.closest(
        '[data-action="status"]'
      );

    if (!control) {
      return;
    }

    const id =
      control.dataset.id;

    if (!id) {
      return;
    }

    const newStatus =
      control.value === 'watched'
        ? 'watched'
        : 'planned';

    const updated =
      readWatchlist().map(
        (item) => {

          if (
            item.id !== id
          ) {
            return item;
          }

          return {
            id: item.id,

            status:
              newStatus,

            item: {
              id: item.id,

              tmdbId:
                item.tmdbId ||
                null,

              mediaType:
                item.mediaType ||
                null,

              title:
                item.title,

              year:
                item.year,

              rating:
                item.rating,

              runtime:
                item.runtime,

              genre:
                item.genre,

              type:
                item.type,

              description:
                item.description,

              poster:
                item.poster,

              backdrop:
                item.backdrop,

              trailer:
                item.trailer ||
                null
            }
          };
        }
      );

    if (
      writeWatchlist(
        updated
      )
    ) {

      notify(
        newStatus ===
        'watched'
          ? 'Marked as watched.'
          : 'Moved back to planned.'
      );

      renderCurrentPage();
    }
  }
);

/* =========================================================
   TRAILER DIALOG CLEANUP
   ========================================================= */

const trailerDialog =
  document.querySelector(
    '#trailer-dialog'
  );

if (trailerDialog) {

  trailerDialog.addEventListener(
    'close',
    () => {

      const trailerFrame =
        document.querySelector(
          '#trailer-frame'
        );

      if (trailerFrame) {
        trailerFrame.src = '';
      }
    }
  );
}

/* =========================================================
   PLAYER DIALOG CLEANUP
   ========================================================= */

const playerDialog =
  document.querySelector(
    '#player-dialog'
  );

if (playerDialog) {
  playerDialog.addEventListener(
    'close',
    () => {
      const player =
        document.querySelector('#movie-player');

      if (!player) {
        return;
      }

      if (player.dataset.titleId) {
        savePlaybackProgress(
          player.dataset.titleId,
          player.currentTime
        );
      }

      player.pause();
    }
  );
}

/* =========================================================
   INITIAL PAGE RENDER
   ========================================================= */

if (
  document.readyState ===
  'loading'
) {

  document.addEventListener(
    'DOMContentLoaded',
    () => {
      void renderCurrentPage();
    },
    {
      once: true
    }
  );

} else {

  void renderCurrentPage();

}