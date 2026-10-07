const STORAGE_KEY = 'streamflix-watchlist';
const PLAYBACK_KEY = 'streamflix-playback-progress';

const imageRoot = 'https://image.tmdb.org/t/p/';
const discoveredMovies = new Map();
const tmdbGenres = {
  28: 'Action',
  12: 'Adventure',
  16: 'Animation',
  35: 'Comedy',
  80: 'Crime',
  99: 'Documentary',
  18: 'Drama',
  10751: 'Family',
  14: 'Fantasy',
  36: 'History',
  27: 'Horror',
  10402: 'Music',
  9648: 'Mystery',
  10749: 'Romance',
  878: 'Sci-Fi',
  10770: 'TV Movie',
  53: 'Thriller',
  10752: 'War',
  37: 'Western'
};

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

const byId = (id) => catalog.find((item) => item.id === id);

function movieFromTmdb(movie) {
  if (!movie || !Number.isInteger(movie.id) || !movie.title) return null;

  const genres = Array.isArray(movie.genres)
    ? movie.genres.map((genre) => genre.name).filter(Boolean)
    : (movie.genre_ids || [])
        .map((id) => tmdbGenres[id])
        .filter(Boolean);
  const runtimeMinutes = Number(movie.runtime);
  const runtime = Number.isFinite(runtimeMinutes) && runtimeMinutes > 0
    ? `${Math.floor(runtimeMinutes / 60)}h ${String(runtimeMinutes % 60).padStart(2, '0')}m`
    : 'Feature film';

  return {
    id: `tmdb-${movie.id}`,
    tmdbId: movie.id,
    title: movie.title,
    year: String(movie.release_date || '').slice(0, 4) || '—',
    rating: Number(movie.vote_average || 0).toFixed(1),
    runtime,
    genre: genres.join(', ') || 'Movie',
    genreIds:
      movie.genre_ids ||
      (movie.genres || []).map((genre) => genre.id).filter(Number.isInteger),
    type: 'Movie',
    description: movie.overview || 'No synopsis is available for this title.',
    poster: movie.poster_path || 'local:hero',
    backdrop: movie.backdrop_path || movie.poster_path || 'local:hero'
  };
}

const trailerMap = {
  'interstellar': 'https://www.youtube.com/embed/zSWdZVtXT7E',
  'dune-part-two': 'https://www.youtube.com/embed/Way9Dexny3w',
  'the-batman': 'https://www.youtube.com/embed/mqqft2x_Aa4',
  'spider-verse': 'https://www.youtube.com/embed/shW9i6k8cB0',
  'everything-everywhere': 'https://www.youtube.com/embed/wxN1T1uxQ2g',
  'grand-budapest': 'https://www.youtube.com/embed/1Fg5iWmQjwk',
  'dark-knight': 'https://www.youtube.com/embed/EXeTwQWrcwY',
  'the-queens-gambit': 'https://www.youtube.com/embed/CDrieqwSdgI'
};

const trailerUrl = (item) => trailerMap[item.id] || null;

const escapeHtml = (value) =>
  String(value).replace(
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

const posterUrl = (item, size = 'w500') =>
  !item.poster || item.poster.startsWith('local:')
    ? './src/assets/hero-background.jpg'
    : `${imageRoot}${size}${item.poster}`;

const backdropUrl = (item) =>
  !item.backdrop || item.backdrop.startsWith('local:')
    ? './src/assets/hero-background.jpg'
    : `${imageRoot}w1280${item.backdrop}`;


// =========================
// WATCHLIST
// =========================

function readWatchlist() {
  try {
    const saved = JSON.parse(
      localStorage.getItem(STORAGE_KEY) || '[]'
    );

    if (!Array.isArray(saved)) return [];

    return saved.flatMap((entry) => {
      if (!entry || typeof entry.id !== 'string') return [];

      const knownItem = byId(entry.id);
      const storedItem = entry.item;
      const hasStoredMovie =
        /^tmdb-\d+$/.test(entry.id) &&
        storedItem &&
        storedItem.id === entry.id &&
        typeof storedItem.title === 'string' &&
        typeof storedItem.poster === 'string';

      if (!knownItem && !hasStoredMovie) return [];

      return [{
        id: entry.id,
        status: entry.status === 'watched' ? 'watched' : 'planned',
        ...(knownItem ? {} : { item: storedItem })
      }];
    });
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

function readPlaybackProgress() {
  try {
    const progress = JSON.parse(localStorage.getItem(PLAYBACK_KEY) || '{}');
    return progress && typeof progress === 'object' && !Array.isArray(progress)
      ? progress
      : {};
  } catch {
    return {};
  }
}

function savePlaybackProgress(id, seconds) {
  if (!id || !Number.isFinite(seconds) || seconds < 0) return;

  const progress = readPlaybackProgress();
  progress[id] = seconds;

  try {
    localStorage.setItem(PLAYBACK_KEY, JSON.stringify(progress));
  } catch {
    // Playback still works if browser storage is unavailable.
  }
}

function restorePlaybackPosition(video, id) {
  const seconds = Number(readPlaybackProgress()[id]);

  if (
    Number.isFinite(seconds) &&
    seconds > 0 &&
    Number.isFinite(video.duration) &&
    seconds < video.duration
  ) {
    if (Math.abs(video.currentTime - seconds) < 1) {
      return Promise.resolve();
    }

    return new Promise((resolve) => {
      const onSeeked = () => resolve();

      video.addEventListener('seeked', onSeeked, { once: true });
      video.currentTime = seconds;
    });
  }

  return Promise.resolve();
}

// =========================
// NOTIFICATION
// =========================

function notify(message) {
  const toast = document.querySelector('#toast');

  if (!toast) return;

  toast.textContent = message;
  toast.classList.add('is-visible');

  window.clearTimeout(notify.timeout);

  notify.timeout = window.setTimeout(
    () => toast.classList.remove('is-visible'),
    2400
  );
}


// =========================
// ADD TO WATCHLIST
// =========================

function addToWatchlist(id) {
  const item = byId(id) || discoveredMovies.get(id);

  if (!item) {
    notify('This title could not be added. Open it again from search and retry.');
    return;
  }

  const items = readWatchlist();

  if (items.some((item) => item.id === id)) {
    notify('Already saved to My List.');
    return;
  }

  if (
    writeWatchlist([
      ...items,
      {
        id,
        status: 'planned',
        ...(byId(id) ? {} : { item })
      }
    ])
  ) {
    notify('Added to My List.');
    renderCurrentPage();
  }
}


// =========================
// HEADER
// =========================

function renderHeader() {
  const currentPage =
    document.querySelector('#app')?.dataset.page;

  const links = [
    ['Home', 'index.html', 'home'],
    ['Movies', 'movies.html', 'movies'],
    ['Series', 'series.html', 'series'],
    ['Categories', 'movies.html#search', 'categories'],
    ['My List', 'my-list.html', 'my-list']
  ];

  const header = document.querySelector('#site-header');

  if (!header) return;

  let currentUser = null;

  try {
    currentUser = JSON.parse(
      localStorage.getItem('streamflix-current-user') || 'null'
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
              `<a
                href="${href}"
                ${
                  currentPage === page
                    ? 'aria-current="page"'
                    : ''
                }
              >
                ${label}
              </a>`
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


// =========================
// MOVIE CARD
// =========================

function cardMarkup(item) {
  return `
    <article class="movie-card">

      <a
        class="poster-link"
        href="movie.html?id=${encodeURIComponent(item.id)}"
        aria-label="View ${escapeHtml(item.title)} details"
      >

        <span
          class="poster-fallback"
          aria-hidden="true"
        >
          ${escapeHtml(item.title)}
        </span>

        <img
          src="${posterUrl(item)}"
          alt="${escapeHtml(item.title)} poster"
          loading="lazy"
          onerror="this.remove()"
        />

        <span class="card-rating">
          ★ ${escapeHtml(item.rating)}
        </span>

      </a>

      <div class="card-copy">

        <div class="card-title-row">
          <h3 class="card-title">
            ${escapeHtml(item.title)}
          </h3>

          <span class="card-year">
            ${item.year}
          </span>
        </div>

        <p class="card-subtitle">
          ${escapeHtml(item.genre)} · ${escapeHtml(item.type)}
        </p>

      </div>

    </article>
  `;
}


// =========================
// GRID
// =========================

function renderGrid(
  items,
  emptyTitle = 'No titles found',
  emptyText = 'Try another search or filter.'
) {
  if (!items.length) {
    return `
      <div class="empty-state">
        <h2>${emptyTitle}</h2>
        <p>${emptyText}</p>
      </div>
    `;
  }

  return items.map(cardMarkup).join('');
}

// =========================
// SECTION
// =========================

function sectionMarkup(
  title,
  items,
  link = 'movies.html'
) {
  return `
    <section class="content-section">

      <div class="section-heading">

        <h2>${title}</h2>

        <a
          class="text-link"
          href="${link}"
        >
          Explore all →
        </a>

      </div>

      <div class="movie-grid">
        ${renderGrid(items)}
      </div>

    </section>
  `;
}


// =========================
// HOME
// =========================

function renderHome() {
  const featured = byId('last-adventure');

  const movies = catalog.filter(
    (item) => item.type === 'Movie'
  );
  const series = catalog.filter(
    (item) => item.type === 'Series'
  );

  document.querySelector('#app').innerHTML = `

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

    ${sectionMarkup(
      'Trending Movies',
      movies.slice(1, 6)
    )}

    ${sectionMarkup(
      'Popular Movies',
      movies.slice(0, 5)
    )}

    ${sectionMarkup(
      'Top Rated Movies',
      [...movies]
        .sort(
          (left, right) =>
            Number(right.rating) -
            Number(left.rating)
        )
        .slice(0, 5)
    )}

    ${sectionMarkup(
      'Series to Explore',
      series,
      'series.html'
    )}

    <footer class="site-footer">

      <span>
        <strong>StreamFlix</strong>
      </span>

      <span>
        Discover your next favorite.
      </span>

    </footer>
  `;
}


// =========================
// MOVIES / SERIES
// =========================

function renderCatalog(type) {
  const heading =
    type === 'Series'
      ? 'Series'
      : 'Explore movies';

  const description =
    type === 'Series'
      ? 'Limited series, long-running favorites, and true stories.'
      : 'Browse the collection, search a title, or narrow things down by genre.';

  const items = catalog.filter(
    (item) => item.type === type
  );

  const genres = [
    ...new Set(
      items.map((item) => item.genre)
    )
  ];

  document.querySelector('#app').innerHTML = `

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

          <span class="summary-number">
            ${items.length}
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
            placeholder="${type === 'Movie' ? 'Search any movie title' : 'Search by title or genre'}"
            autocomplete="off"
            aria-label="Search titles"
          />

        </label>


        <div
          class="filter-list"
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

          ${genres
            .map(
              (genre) => `
                <button
                  class="filter-button"
                  type="button"
                  data-genre="${escapeHtml(genre)}"
                  aria-pressed="false"
                >
                  ${escapeHtml(genre)}
                </button>
              `
            )
            .join('')}

        </div>

      </div>


      <p
        class="catalog-count"
        id="catalog-count"
      >
        Showing ${items.length} titles
      </p>


      <div
        class="movie-grid"
        id="catalog-grid"
      >
        ${renderGrid(items)}
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


  let activeGenre = 'all';

  const input =
    document.querySelector('#catalog-search');

  const grid =
    document.querySelector('#catalog-grid');

  const count =
    document.querySelector('#catalog-count');


  let searchController;
  let searchRequest = 0;

  async function updateCatalog() {
    const rawQuery = input.value.trim();
    const query = rawQuery.toLocaleLowerCase();

    if (type === 'Movie' && rawQuery) {
      const requestId = ++searchRequest;
      searchController?.abort();

      if (rawQuery.length < 2) {
        count.textContent = 'Enter at least 2 characters to search TMDB.';
        grid.innerHTML = renderGrid(
          [],
          'Keep typing',
          'Search movie titles from the TMDB catalog.'
        );
        return;
      }

      searchController = new AbortController();
      count.textContent = 'Searching movies…';
      grid.innerHTML = renderGrid(
        [],
        'Searching TMDB…',
        'Loading matching movie titles.'
      );

      try {
        const response = await fetch(
          `/api/movies/search?q=${encodeURIComponent(rawQuery)}`,
          { signal: searchController.signal }
        );
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Movie search failed.');
        }

        if (requestId !== searchRequest) return;

        const results = (Array.isArray(data.results) ? data.results : [])
          .map(movieFromTmdb)
          .filter(Boolean);

        results.forEach((movie) => discoveredMovies.set(movie.id, movie));

        const activeGenreId = Object.entries(tmdbGenres).find(
          ([, genre]) => genre === activeGenre
        )?.[0];
        const filtered = results.filter(
          (movie) =>
            activeGenre === 'all' ||
            movie.genreIds.includes(Number(activeGenreId))
        );

        grid.innerHTML = renderGrid(
          filtered,
          'No matching movies',
          'Try another title or genre.'
        );
        count.textContent = `Found ${filtered.length} ${filtered.length === 1 ? 'movie' : 'movies'} on TMDB.`;
      } catch (error) {
        if (error.name === 'AbortError' || requestId !== searchRequest) return;

        count.textContent = 'TMDB search is unavailable.';
        grid.innerHTML = renderGrid(
          [],
          'Couldn’t search movies',
          escapeHtml(error.message || 'Check the server settings and try again.')
        );
      }

      return;
    }

    searchRequest += 1;
    searchController?.abort();

    const filtered = items.filter(
      (item) =>
        (activeGenre === 'all' || item.genre === activeGenre) &&
        `${item.title} ${item.genre} ${item.year}`
          .toLocaleLowerCase()
          .includes(query)
    );

    grid.innerHTML = renderGrid(filtered);
    count.textContent = `Showing ${filtered.length} of ${items.length} titles`;
  }

  let searchTimer;
  input.addEventListener('input', () => {
    window.clearTimeout(searchTimer);
    searchTimer = window.setTimeout(() => void updateCatalog(), 250);
  });


  document
    .querySelectorAll('[data-genre]')
    .forEach((button) =>
      button.addEventListener(
        'click',
        () => {

          activeGenre =
            button.dataset.genre;

          document
            .querySelectorAll('[data-genre]')
            .forEach((filter) =>
              filter.setAttribute(
                'aria-pressed',
                String(filter === button)
              )
            );

          updateCatalog();
        }
      )
    );


  if (window.location.hash === '#search') {
    input.focus({
      preventScroll: true
    });
  }
}


// =========================
// MOVIE DETAILS
// =========================

async function renderDetails() {
  const titleId = new URLSearchParams(window.location.search).get('id');
  const app =
    document.querySelector('#app');
  let item = byId(titleId);

  if (!item && /^tmdb-\d+$/.test(titleId || '')) {
    const tmdbId = titleId.slice('tmdb-'.length);
    app.innerHTML = `
      <section class="page-content">
        <p class="catalog-count">Loading movie details…</p>
      </section>
    `;

    try {
      const response = await fetch(`/api/movies/${tmdbId}`);
      const details = await response.json();

      if (!response.ok) {
        throw new Error(details.error || 'Could not load movie details.');
      }

      item = movieFromTmdb(details);
      if (item) discoveredMovies.set(item.id, item);
    } catch (error) {
      app.innerHTML = `
        <section class="page-content">
          <div class="empty-state">
            <h2>Couldn’t load this movie.</h2>
            <p>${escapeHtml(error.message || 'Check the server settings and try again.')}</p>
            <a class="button button-primary" href="movies.html">Back to movies</a>
          </div>
        </section>
      `;
      return;
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

  const savedPosition = Number(readPlaybackProgress()[item.id]) || 0;


  app.innerHTML = `

    <section
      class="details-hero"
      style="background-image:url('${backdropUrl(item)}')"
    >

      <div class="details-inner">


        <img
          class="detail-poster"
          src="${posterUrl(item)}"
          alt="${escapeHtml(item.title)} poster"
          onerror="this.hidden=true"
        />


        <div class="detail-copy">


          <a
            class="back-link"
            href="${
              item.type === 'Series'
                ? 'series.html'
                : 'movies.html'
            }"
          >
            ← Back to ${
              item.type === 'Series'
                ? 'series'
                : 'movies'
            }
          </a>


          <p class="eyebrow">

            ${escapeHtml(item.type)}

            ·

            ${escapeHtml(item.genre)}

          </p>


          <h1>
            ${escapeHtml(item.title)}
          </h1>


          <div class="detail-facts">

            <strong>
              ★ ${escapeHtml(item.rating)}
            </strong>

            <span>
              ${item.year}
            </span>

            <span>
              ${escapeHtml(item.runtime)}
            </span>

            <span>
              HD
            </span>

          </div>


          <div class="genre-tags">

            <span>
              ${escapeHtml(item.genre)}
            </span>

            <span>
              ${escapeHtml(item.type)}
            </span>

            <span>
              English
            </span>

          </div>


          <p class="detail-description">
            ${escapeHtml(item.description)}
          </p>


          <div class="detail-actions">

            <button
              class="button button-primary"
              type="button"
              data-action="play"
              data-id="${item.id}"
            >
              ${savedPosition > 0 ? '▶ Continue Watching' : '▶ Watch Now'}
            </button>

            <button
              class="button button-quiet"
              type="button"
              data-action="trailer"
              data-trailer="${trailerUrl(item) || ''}"
            >
              ▶ Watch Trailer
            </button>


            <button
              class="button button-quiet"
              type="button"
              data-action="add"
              data-id="${item.id}"
            >
              + Add to My List
            </button>

          </div>


          <p class="detail-note">
            ${trailerUrl(item) ? 'Watch the official trailer before adding this title to your list.' : 'No trailer is available for this title yet.'}
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


// =========================
// MY LIST
// =========================

function renderMyList() {
  const saved = readWatchlist();

  const items = saved.map(
    (entry) => ({
      ...(byId(entry.id) || entry.item),
      status: entry.status
    })
  );


  const watchedCount =
    items.filter(
      (item) => item.status === 'watched'
    ).length;


  const plannedCount =
    items.length - watchedCount;


  const app =
    document.querySelector('#app');


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
            Your own queue. Add titles, mark what you
            have watched, and clear anything you’re done with.
          </p>

        </div>


        <div class="list-summary">

          <span class="summary-number">
            ${items.length}
          </span>

          <span>
            ${plannedCount} planned
            <br />
            ${watchedCount} watched
          </span>

        </div>


      </div>


      ${
        items.length
          ? `
            <div class="saved-list">

              ${items
                .map(
                  (item) => `
                    <article class="saved-item">


                      <img
                        class="saved-poster"
                        src="${posterUrl(item, 'w185')}"
                        alt="${escapeHtml(item.title)} poster"
                        onerror="this.hidden=true"
                      />


                      <div>

                        <h2 class="saved-title">

                          <a
                            href="movie.html?id=${encodeURIComponent(item.id)}"
                          >
                            ${escapeHtml(item.title)}
                          </a>

                        </h2>


                        <p class="saved-meta">

                          ${item.year}

                          ·

                          ${escapeHtml(item.genre)}

                          ·

                          ★ ${escapeHtml(item.rating)}

                        </p>

                      </div>


                      <div class="saved-actions">


                        <label
                          class="sr-only"
                          for="status-${item.id}"
                        >
                          Viewing status for
                          ${escapeHtml(item.title)}
                        </label>


                        <select
                          class="status-select"
                          id="status-${item.id}"
                          data-action="status"
                          data-id="${item.id}"
                        >

                          <option
                            value="planned"
                            ${
                              item.status === 'planned'
                                ? 'selected'
                                : ''
                            }
                          >
                            Planned
                          </option>


                          <option
                            value="watched"
                            ${
                              item.status === 'watched'
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
                          data-id="${item.id}"
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
          `
      }


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


// =========================
// PAGE ROUTER
// =========================

function renderCurrentPage() {

  renderHeader();


  const page =
    document.querySelector('#app')?.dataset.page;


  if (page === 'home') {
    renderHome();
  }


  if (page === 'movies') {
    renderCatalog('Movie');
  }


  if (page === 'series') {
    renderCatalog('Series');
  }


  if (page === 'details') {
    renderDetails();
  }


  if (page === 'my-list') {
    renderMyList();
  }
}


// =========================
// CLICK EVENTS
// =========================
// =========================
// CLICK EVENTS
// =========================

document.addEventListener(
  'click',
    (event) => {

    // =========================
    // LOGIN / LOGOUT
    // =========================

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


    // =========================
    // NORMAL ACTIONS
    // =========================

    const control =
      event.target.closest(
        '[data-action]'
      );

    if (!control) return;


    const {
      action,
      id
    } = control.dataset;


    // =========================
    // ADD TO MY LIST
    // =========================

    if (action === 'add') {

      addToWatchlist(id);

      return;
    }


    // =========================
    // PLAY
    // =========================

    if (action === 'play') {

      const dialog = document.querySelector('#player-dialog');
      const player = document.querySelector('#movie-player');

      if (!dialog || !player) return;

      player.dataset.titleId = id;
      syncPlayerTitle(id);
      dialog.showModal();

      const startPlayback = () => {
        restorePlaybackPosition(player, id);
        player.play().catch(() => {
          // The visible native controls remain available if playback is blocked.
        });
      };

      if (player.readyState >= 1) {
        startPlayback();
      } else {
        player.addEventListener('loadedmetadata', startPlayback, { once: true });
      }

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
      settingsMenu
        ?.querySelectorAll('[data-action="set-playback-speed"]')
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
      document
        .querySelector('[data-action="toggle-settings"]')
        ?.setAttribute('aria-expanded', 'false');

      if (!captionsMenu.hidden) {
        renderCaptionOptions();
      }

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

      if (
        !player ||
        !Number.isFinite(offset) ||
        !Number.isFinite(player.duration)
      ) {
        return;
      }

      const wasPlaying = !player.paused;
      player.currentTime = Math.max(
        0,
        Math.min(player.duration, player.currentTime + offset)
      );
      savePlaybackProgress(player.dataset.titleId, player.currentTime);

      if (wasPlaying) {
        player.play().catch(() => {});
      }

      return;
    }


    // =========================
    // CLOSE PLAYER
    // =========================

    if (action === 'close-player') {

      const player = document.querySelector('#movie-player');

      if (player) {
        savePlaybackProgress(player.dataset.titleId, player.currentTime);
        player.pause();
      }

      document
        .querySelector('#player-dialog')
        ?.close();

      renderCurrentPage();

      return;
    }


    // =========================
    // WATCH TRAILER
    // =========================

    if (action === 'trailer') {

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
        `${trailer}?autoplay=1`;


      trailerDialog.showModal();

      return;
    }


    // =========================
    // CLOSE TRAILER
    // =========================

    if (action === 'close-trailer') {

      const trailerDialog =
        document.querySelector(
          '#trailer-dialog'
        );

      const trailerFrame =
        document.querySelector(
          '#trailer-frame'
        );


      if (trailerFrame) {

        trailerFrame.src = '';
      }


      trailerDialog?.close();

      return;
    }


    // =========================
    // REMOVE FROM MY LIST
    // =========================

    if (action === 'remove') {

      const remaining =
        readWatchlist().filter(
          (item) => item.id !== id
        );


      if (
        writeWatchlist(remaining)
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

const formatPlaybackTime = (seconds) => {
  if (!Number.isFinite(seconds) || seconds < 0) return '00:00:00';

  const totalSeconds = Math.floor(seconds);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const secs = totalSeconds % 60;

  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
};

function renderCaptionOptions() {
  const player = document.querySelector('#movie-player');
  const options = document.querySelector('.player-caption-options');
  const emptyMessage = document.querySelector('.player-caption-empty');

  if (!player || !options || !emptyMessage) return;

  const tracks = Array.from(player.textTracks).flatMap(
    (track, index) =>
      track.kind === 'captions' || track.kind === 'subtitles'
        ? [{ track, index }]
        : []
  );
  const activeTrack =
    tracks.find(({ track }) => track.mode === 'showing')?.index ?? -1;
  options.replaceChildren();
  emptyMessage.hidden = tracks.length > 0;

  const addOption = (label, trackIndex, selected) => {
    const option = document.createElement('button');
    option.type = 'button';
    option.dataset.action = 'set-caption-track';
    option.dataset.trackIndex = String(trackIndex);
    option.textContent = label;
    option.setAttribute('aria-pressed', String(selected));
    options.append(option);
  };

  addOption('Off', -1, activeTrack === -1);
  tracks.forEach(({ track, index }) => {
    const label = track.label || track.language || `Caption ${index + 1}`;
    addOption(label, index, index === activeTrack);
  });
}

const syncPlayerTitle = (titleId) => {
  const titleNode = document.querySelector('.player-show');

  if (!titleNode) return;

  const item = byId(titleId) || discoveredMovies.get(titleId);

  if (!item) return;

  if (titleNode) {
    titleNode.textContent = item.title;
  }
};

const syncPlayerDisplay = () => {
  const moviePlayer = document.querySelector('#movie-player');
  const progressMeter = document.querySelector('.player-progress-meter');
  const timeDisplay = document.querySelector('#movie-player-time');
  const toggleButton = document.querySelector('[data-action="toggle-play"]');

  if (!moviePlayer) return;

  if (progressMeter && Number.isFinite(moviePlayer.duration) && moviePlayer.duration > 0) {
    const ratio = Math.min(Math.max(moviePlayer.currentTime / moviePlayer.duration, 0), 1);
    progressMeter.style.width = `${ratio * 100}%`;
  }

  if (timeDisplay) {
    const current = formatPlaybackTime(moviePlayer.currentTime);
    const total = formatPlaybackTime(moviePlayer.duration || 0);
    timeDisplay.textContent = `${current} / ${total}`;
  }

  if (toggleButton) {
    toggleButton.textContent = moviePlayer.paused ? '▶' : '❚❚';
    toggleButton.setAttribute('aria-label', moviePlayer.paused ? 'Play video' : 'Pause video');
  }
};

const moviePlayer = document.querySelector('#movie-player');

if (moviePlayer) {
  moviePlayer.playbackRate = 1;

  moviePlayer.addEventListener('timeupdate', () => {
    if (!moviePlayer.seeking) {
      savePlaybackProgress(moviePlayer.dataset.titleId, moviePlayer.currentTime);
    }

    syncPlayerDisplay();
  });

  moviePlayer.addEventListener('pause', () => {
    if (!moviePlayer.seeking) {
      savePlaybackProgress(moviePlayer.dataset.titleId, moviePlayer.currentTime);
    }

    syncPlayerDisplay();
  });

  moviePlayer.addEventListener('play', syncPlayerDisplay);
  moviePlayer.addEventListener('loadedmetadata', syncPlayerDisplay);

  moviePlayer.addEventListener('seeked', () => {
    savePlaybackProgress(moviePlayer.dataset.titleId, moviePlayer.currentTime);
    syncPlayerDisplay();
  });

  moviePlayer.addEventListener('ended', () => {
    const progress = readPlaybackProgress();
    delete progress[moviePlayer.dataset.titleId];

    try {
      localStorage.setItem(PLAYBACK_KEY, JSON.stringify(progress));
    } catch {
      // The finished video remains playable if storage is unavailable.
    }

    syncPlayerDisplay();
  });
}

document.addEventListener('fullscreenchange', () => {
  const fullButton = document.querySelector('[data-action="toggle-fullscreen"]');

  if (!fullButton) return;

  const isFull = Boolean(document.fullscreenElement);
  fullButton.textContent = isFull ? '⤢' : '⤢';
  fullButton.setAttribute('aria-label', isFull ? 'Exit fullscreen' : 'Enter fullscreen');
});

// =========================
// WATCHLIST STATUS UPDATE
// =========================

document.addEventListener(
  'change',
  (event) => {

    const control =
      event.target.closest(
        '[data-action="status"]'
      );


    if (!control) return;


    const updated =
      readWatchlist().map(
        (item) =>
          item.id === control.dataset.id
            ? {
                ...item,
                status: control.value
              }
            : item
      );


    if (
      writeWatchlist(updated)
    ) {

      notify(
        'Viewing status updated.'
      );

      renderCurrentPage();
    }

  }
);


// =========================
// START APPLICATION
// =========================

renderCurrentPage();
