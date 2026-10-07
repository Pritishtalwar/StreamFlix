# StreamFlix

A responsive, frontend-only movie and series discovery app built with HTML, CSS, and plain JavaScript. Browse a local sample catalog, search and filter titles, view details, play the bundled demo video, and manage a watchlist saved in the browser.

## Project Proposal

### Goals

- Demonstrate semantic HTML, responsive CSS, and browser-native JavaScript.
- Build multiple connected pages without a backend or JavaScript libraries.
- Implement watchlist create, read, update, and delete operations using Web Storage.
- Keep the app easy to run without a build step, package installation, or API key.

### Specifications

| Area | Specification |
| --- | --- |
| Technology | HTML5, CSS3, plain JavaScript (ES6+) |
| Pages | Home, Movies, Series, title details, My List, Login, Sign Up |
| Browse | Search the local movie/series catalog and filter by genre |
| Watchlist | Add titles, view saved titles, mark Planned/Watched, remove titles |
| Persistence | `localStorage` on the current browser and device |
| Playback | Bundled demo video with seek controls and saved resume position |
| Responsive design | Layouts adapt to phone, tablet, and desktop widths |
| Dependencies | No backend, JavaScript libraries, frameworks, API keys, or package install |

### Design

The visual direction is cinematic: near-black surfaces, warm text, coral actions, restrained rating accents, and poster-led browsing. Navigation and controls adapt to smaller screens; reduced-motion preferences are respected.

## Features

- `index.html`: featured title and movie/series sections.
- `movies.html` and `series.html`: local search and genre filters.
- `movie.html?id=...`: title details, bundled demo player, and available trailers.
- `my-list.html`: watchlist CRUD and planned/watched counts.
- `login.html` and `signup.html`: local demo account flow using browser Web Crypto.
- Watchlist, playback position, and demo accounts use browser storage. Data remains on that browser/device.

The catalog is sample data in `frontend/app.js`. Poster/backdrop images come from TMDB's image CDN and available trailers use YouTube, so those media need an internet connection. The home image is local. The video player uses the bundled `sample.mp4`; the catalog does not contain a separate full movie file for each title. Demo authentication is frontend-only and is not suitable for production accounts.

## Run Locally

Use a modern browser and a static file server that supports byte-range requests for MP4 seeking. In VS Code, open `frontend/index.html` with the Live Server extension. No `npm install`, build command, API key, or backend server is needed.

You can also open `frontend/index.html` directly in a browser for a quick preview. Browser storage behavior for `file://` pages can vary; use Live Server for the full experience.

## Files

```text
StreamFlix/
├── README.md
├── LICENSE
├── .gitignore
└── frontend/
    ├── *.html
    ├── app.js
    ├── auth.js
    ├── styles.css
    ├── public/
    └── src/assets/
```

The MIT License is in [LICENSE](LICENSE).
