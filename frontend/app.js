const STORAGE_KEY = 'streamflix-watchlist';
const imageRoot = 'https://image.tmdb.org/t/p/';

const catalog = [
  { id: 'last-adventure', title: 'The Last Adventure', year: 2026, rating: '8.4', runtime: '2h 08m', genre: 'Adventure', type: 'Movie', description: 'A cartographer returns to the edge of the world to finish the map her father left behind. Beyond the last marked shore, the journey becomes a story about courage, memory, and finding a way home.', poster: 'local:hero', backdrop: 'local:hero' },
  { id: 'interstellar', title: 'Interstellar', year: 2014, rating: '8.7', runtime: '2h 49m', genre: 'Sci-Fi', type: 'Movie', description: 'A team of explorers travels beyond this galaxy to discover whether mankind has a future among the stars.', poster: '/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg', backdrop: '/xJHokMbljvjADYdit5fK5VQsXEG.jpg' },
  { id: 'dune-part-two', title: 'Dune: Part Two', year: 2024, rating: '8.5', runtime: '2h 46m', genre: 'Sci-Fi', type: 'Movie', description: 'Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.', poster: '/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg', backdrop: '/xOMo8BRK7PfcJv9JCnx7s5hj0PX.jpg' },
  { id: 'the-batman', title: 'The Batman', year: 2022, rating: '7.8', runtime: '2h 56m', genre: 'Mystery', type: 'Movie', description: 'Batman ventures into Gotham City’s underworld when a sadistic killer leaves behind a trail of cryptic clues.', poster: '/74xTEgt7R36Fpooo50r9T25onhq.jpg', backdrop: '/b0PlSFdDwbyK0cf5RxwDpaOJQvQ.jpg' },
  { id: 'spider-verse', title: 'Across the Spider-Verse', year: 2023, rating: '8.6', runtime: '2h 20m', genre: 'Animation', type: 'Movie', description: 'Miles Morales is swept across the multiverse, where he meets a team of Spider-People charged with protecting its existence.', poster: '/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg', backdrop: '/4HodYYKEIsGOdinkGi2Ucz6X9i0.jpg' },
  { id: 'everything-everywhere', title: 'Everything Everywhere All at Once', year: 2022, rating: '7.8', runtime: '2h 19m', genre: 'Adventure', type: 'Movie', description: 'An exhausted laundromat owner discovers she is the only person who can save the many versions of the universe.', poster: '/w3LxiVYdWWRvEVdn5RYq6jIqkb1.jpg', backdrop: '/ss0Os3uWJfQAENILHZUiU2BzqQW.jpg' },
  { id: 'grand-budapest', title: 'The Grand Budapest Hotel', year: 2014, rating: '8.0', runtime: '1h 39m', genre: 'Comedy', type: 'Movie', description: 'A legendary concierge and his young protégé become wrapped up in a priceless painting, a family fortune, and a changing Europe.', poster: '/eWdyYQreja6JGCzqHWXpWHDrrPo.jpg', backdrop: '/nX5XotM9yprCKarRH4fzOq1VM1J.jpg' },
  { id: 'dark-knight', title: 'The Dark Knight', year: 2008, rating: '9.0', runtime: '2h 32m', genre: 'Action', type: 'Movie', description: 'Batman faces his greatest test when the Joker plunges Gotham into chaos and pushes its people to the edge.', poster: '/qJ2tW6WMUDux911r6m7haRef0WH.jpg', backdrop: '/hqkIcbrOHL86UncnHIsHVcVmzue.jpg' },
  { id: 'planet-earth', title: 'Planet Earth', year: 2006, rating: '9.4', runtime: '11 episodes', genre: 'Documentary', type: 'Series', description: 'A landmark journey through the planet’s wildest habitats, revealing the lives of the animals that call them home.', poster: 'local:hero', backdrop: 'local:hero' },
  { id: 'the-queens-gambit', title: 'The Queen’s Gambit', year: 2020, rating: '8.5', runtime: '7 episodes', genre: 'Drama', type: 'Series', description: 'An orphaned chess prodigy fights to become the world’s greatest player while navigating a life shaped by loss and addiction.', poster: '/zU0htwkhNvBQdVSIKB9s6hgVeFK.jpg', backdrop: '/34OGjFEbHj0E3lE2w0iTUVq0CBz.jpg' },
  { id: 'our-planet', title: 'Our Planet', year: 2019, rating: '9.3', runtime: '8 episodes', genre: 'Documentary', type: 'Series', description: 'Explore the planet’s most precious habitats and the extraordinary wildlife that lives in them.', poster: 'local:hero', backdrop: 'local:hero' }
];

const byId = (id) => catalog.find((item) => item.id === id);
const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]);
const posterUrl = (item, size = 'w500') => item.poster.startsWith('local:') ? './src/assets/hero-background.jpg' : `${imageRoot}${size}${item.poster}`;
const backdropUrl = (item) => item.backdrop.startsWith('local:') ? './src/assets/hero-background.jpg' : `${imageRoot}w1280${item.backdrop}`;

function readWatchlist() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    if (!Array.isArray(saved)) return [];
    return saved.filter((entry) => entry && byId(entry.id)).map((entry) => ({
      id: entry.id,
      status: entry.status === 'watched' ? 'watched' : 'planned'
    }));
  } catch {
    return [];
  }
}

function writeWatchlist(items) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    return true;
  } catch {
    notify('Your browser could not save this list. Check storage settings.');
    return false;
  }
}

function notify(message) {
  const toast = document.querySelector('#toast');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('is-visible');
  window.clearTimeout(notify.timeout);
  notify.timeout = window.setTimeout(() => toast.classList.remove('is-visible'), 2400);
}

function addToWatchlist(id) {
  const items = readWatchlist();
  if (items.some((item) => item.id === id)) {
    notify('Already saved to My List.');
    return;
  }
  if (writeWatchlist([...items, { id, status: 'planned' }])) {
    notify('Added to My List.');
    renderCurrentPage();
  }
}

function renderHeader() {
  const currentPage = document.querySelector('#app')?.dataset.page;
  const links = [
    ['Home', 'index.html', 'home'],
    ['Movies', 'movies.html', 'movies'],
    ['Series', 'series.html', 'series'],
    ['Categories', 'movies.html#search', 'categories'],
    ['My List', 'my-list.html', 'my-list']
  ];
  const header = document.querySelector('#site-header');
  if (!header) return;
  header.innerHTML = `<header class="site-header">
    <a class="brand" href="index.html" aria-label="StreamFlix home">Stream<span>Flix</span></a>
    <nav class="nav-links" aria-label="Main navigation">${links.map(([label, href, page]) => `<a href="${href}"${currentPage === page ? ' aria-current="page"' : ''}>${label}</a>`).join('')}</nav>
    <div class="nav-actions"><a class="nav-search" href="movies.html#search" aria-label="Search titles">🔍</a><button class="profile-button" type="button" aria-label="Profile">👤</button></div>
  </header>`;
}

function cardMarkup(item) {
  return `<article class="movie-card">
    <a class="poster-link" href="movie.html?id=${encodeURIComponent(item.id)}" aria-label="View ${escapeHtml(item.title)} details">
      <span class="poster-fallback" aria-hidden="true">${escapeHtml(item.title)}</span>
      <img src="${posterUrl(item)}" alt="${escapeHtml(item.title)} poster" loading="lazy" onerror="this.remove()" />
      <span class="card-rating">★ ${escapeHtml(item.rating)}</span>
    </a>
    <div class="card-copy">
      <div class="card-title-row"><h3 class="card-title">${escapeHtml(item.title)}</h3><span class="card-year">${item.year}</span></div>
      <p class="card-subtitle">${escapeHtml(item.genre)} · ${escapeHtml(item.type)}</p>
    </div>
  </article>`;
}

function renderGrid(items, emptyTitle = 'No titles found', emptyText = 'Try another search or filter.') {
  if (!items.length) return `<div class="empty-state"><h2>${emptyTitle}</h2><p>${emptyText}</p></div>`;
  return items.map(cardMarkup).join('');
}

function sectionMarkup(title, items, link = 'movies.html') {
  return `<section class="content-section"><div class="section-heading"><h2>${title}</h2><a class="text-link" href="${link}">Explore all →</a></div><div class="movie-grid">${renderGrid(items)}</div></section>`;
}

function renderHome() {
  const featured = byId('last-adventure');
  const movies = catalog.filter((item) => item.type === 'Movie');
  document.querySelector('#app').innerHTML = `
    <section class="hero" aria-labelledby="hero-title"><div class="hero-copy">
      <p class="eyebrow">Featured Movie</p>
      <h1 id="hero-title">The Last Adventure</h1>
      <p class="hero-description">A new journey begins. Discover a world full of adventure, mystery and unforgettable moments.</p>
      <div class="hero-actions"><a class="button button-primary" href="movie.html?id=${featured.id}">▶ Watch Now</a><button class="button button-quiet" type="button" data-action="add" data-id="${featured.id}">＋ My List</button></div>
    </div></section>
    ${sectionMarkup('Trending Movies', movies.slice(1, 6))}
    ${sectionMarkup('Popular Movies', movies.slice(0, 5))}
    ${sectionMarkup('Top Rated Movies', [...movies].sort((left, right) => Number(right.rating) - Number(left.rating)).slice(0, 5))}
    <footer class="site-footer"><span><strong>StreamFlix</strong></span><span>Discover your next favorite.</span></footer>`;
}

function renderCatalog(type) {
  const heading = type === 'Series' ? 'Series' : 'Explore movies';
  const description = type === 'Series' ? 'Limited series, long-running favorites, and true stories.' : 'Browse the collection, search a title, or narrow things down by genre.';
  const items = catalog.filter((item) => item.type === type);
  const genres = [...new Set(items.map((item) => item.genre))];
  document.querySelector('#app').innerHTML = `<section class="page-content">
    <div class="page-heading"><div class="page-heading-copy"><p class="eyebrow">The StreamFlix collection</p><h1 class="page-title">${heading}</h1><p class="page-lede">${description}</p></div><span class="list-summary"><span class="summary-number">${items.length}</span> titles</span></div>
    <div class="catalog-tools"><label class="search-field" id="search"><span aria-hidden="true">⌕</span><input id="catalog-search" type="search" placeholder="Search by title or genre" autocomplete="off" aria-label="Search titles" /></label>
      <div class="filter-list" aria-label="Filter by genre"><button class="filter-button" type="button" data-genre="all" aria-pressed="true">All</button>${genres.map((genre) => `<button class="filter-button" type="button" data-genre="${escapeHtml(genre)}" aria-pressed="false">${escapeHtml(genre)}</button>`).join('')}</div>
    </div>
    <p class="catalog-count" id="catalog-count">Showing ${items.length} titles</p>
    <div class="movie-grid" id="catalog-grid">${renderGrid(items)}</div>
  </section><footer class="site-footer"><span><strong>StreamFlix</strong> · Your next story starts here.</span><span>Built with HTML, CSS, JavaScript, and browser storage.</span></footer>`;

  let activeGenre = 'all';
  const input = document.querySelector('#catalog-search');
  const grid = document.querySelector('#catalog-grid');
  const count = document.querySelector('#catalog-count');
  function updateCatalog() {
    const query = input.value.trim().toLocaleLowerCase();
    const filtered = items.filter((item) => (activeGenre === 'all' || item.genre === activeGenre)
      && `${item.title} ${item.genre} ${item.year}`.toLocaleLowerCase().includes(query));
    grid.innerHTML = renderGrid(filtered);
    count.textContent = `Showing ${filtered.length} of ${items.length} titles`;
  }
  input.addEventListener('input', updateCatalog);
  document.querySelectorAll('[data-genre]').forEach((button) => button.addEventListener('click', () => {
    activeGenre = button.dataset.genre;
    document.querySelectorAll('[data-genre]').forEach((filter) => filter.setAttribute('aria-pressed', String(filter === button)));
    updateCatalog();
  }));
  if (window.location.hash === '#search') input.focus({ preventScroll: true });
}

function renderDetails() {
  const item = byId(new URLSearchParams(window.location.search).get('id'));
  const app = document.querySelector('#app');
  if (!item) {
    app.innerHTML = `<section class="page-content"><div class="empty-state"><h2>We couldn’t find that title.</h2><p>It may have moved out of the collection.</p><a class="button button-primary" href="movies.html">Browse titles</a></div></section>`;
    return;
  }
  document.title = `${item.title} | StreamFlix`;
  app.innerHTML = `<section class="details-hero" style="background-image:url('${backdropUrl(item)}')"><div class="details-inner">
    <img class="detail-poster" src="${posterUrl(item)}" alt="${escapeHtml(item.title)} poster" onerror="this.hidden=true" />
    <div class="detail-copy"><a class="back-link" href="${item.type === 'Series' ? 'series.html' : 'movies.html'}">← Back to ${item.type === 'Series' ? 'series' : 'movies'}</a><p class="eyebrow">${escapeHtml(item.type)} · ${escapeHtml(item.genre)}</p><h1>${escapeHtml(item.title)}</h1>
      <div class="detail-facts"><strong>★ ${escapeHtml(item.rating)}</strong><span>${item.year}</span><span>${escapeHtml(item.runtime)}</span><span>HD</span></div>
      <div class="genre-tags"><span>${escapeHtml(item.genre)}</span><span>${escapeHtml(item.type)}</span><span>English</span></div>
      <p class="detail-description">${escapeHtml(item.description)}</p>
      <div class="detail-actions"><button class="button button-primary" type="button" data-action="play">▶ Watch sample</button><button class="button button-quiet" type="button" data-action="add" data-id="${item.id}">+ Add to My List</button></div>
      <p class="detail-note">The included sample player uses the project’s local demo video.</p>
    </div>
  </div></section><footer class="site-footer"><span><strong>StreamFlix</strong> · Your next story starts here.</span><span>Built with HTML, CSS, JavaScript, and browser storage.</span></footer>`;
}

function renderMyList() {
  const saved = readWatchlist();
  const items = saved.map((entry) => ({ ...byId(entry.id), status: entry.status }));
  const watchedCount = items.filter((item) => item.status === 'watched').length;
  const plannedCount = items.length - watchedCount;
  const app = document.querySelector('#app');
  app.innerHTML = `<section class="page-content">
    <div class="page-heading"><div class="page-heading-copy"><p class="eyebrow">Saved on this device</p><h1 class="page-title">My List</h1><p class="page-lede">Your own queue. Add titles, mark what you have watched, and clear anything you’re done with.</p></div><div class="list-summary"><span class="summary-number">${items.length}</span><span>${plannedCount} planned<br />${watchedCount} watched</span></div></div>
    ${items.length ? `<div class="saved-list">${items.map((item) => `<article class="saved-item">
      <img class="saved-poster" src="${posterUrl(item, 'w185')}" alt="${escapeHtml(item.title)} poster" onerror="this.hidden=true" />
      <div><h2 class="saved-title"><a href="movie.html?id=${item.id}">${escapeHtml(item.title)}</a></h2><p class="saved-meta">${item.year} · ${escapeHtml(item.genre)} · ★ ${escapeHtml(item.rating)}</p></div>
      <div class="saved-actions"><label class="sr-only" for="status-${item.id}">Viewing status for ${escapeHtml(item.title)}</label><select class="status-select" id="status-${item.id}" data-action="status" data-id="${item.id}"><option value="planned"${item.status === 'planned' ? ' selected' : ''}>Planned</option><option value="watched"${item.status === 'watched' ? ' selected' : ''}>Watched</option></select><button class="button button-danger button-small" type="button" data-action="remove" data-id="${item.id}">Remove</button></div>
    </article>`).join('')}</div>` : `<div class="empty-state"><h2>Your list is ready for a first pick.</h2><p>Save a movie or series and it will stay here on this device.</p><a class="button button-primary" href="movies.html">Browse movies</a></div>`}
  </section><footer class="site-footer"><span><strong>StreamFlix</strong> · Your next story starts here.</span><span>Your list is stored in this browser only.</span></footer>`;
}

function renderCurrentPage() {
  renderHeader();
  const page = document.querySelector('#app')?.dataset.page;
  if (page === 'home') renderHome();
  if (page === 'movies') renderCatalog('Movie');
  if (page === 'series') renderCatalog('Series');
  if (page === 'details') renderDetails();
  if (page === 'my-list') renderMyList();
}

document.addEventListener('click', (event) => {
  const control = event.target.closest('[data-action]');
  if (!control) return;
  const { action, id } = control.dataset;
  if (action === 'add') addToWatchlist(id);
  if (action === 'play') document.querySelector('#player-dialog')?.showModal();
  if (action === 'close-player') document.querySelector('#player-dialog')?.close();
  if (action === 'remove') {
    const remaining = readWatchlist().filter((item) => item.id !== id);
    if (writeWatchlist(remaining)) {
      notify('Removed from My List.');
      renderCurrentPage();
    }
  }
});

document.addEventListener('change', (event) => {
  const control = event.target.closest('[data-action="status"]');
  if (!control) return;
  const updated = readWatchlist().map((item) => item.id === control.dataset.id ? { ...item, status: control.value } : item);
  if (writeWatchlist(updated)) {
    notify('Viewing status updated.');
    renderCurrentPage();
  }
});

renderCurrentPage();