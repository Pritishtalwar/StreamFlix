# StreamFlix

## Project Proposal

### Description

StreamFlix is a responsive movie and series discovery website. Visitors can browse a curated catalog, search TMDB for movies, filter titles, open a detail page, play a demo video, resume it where they left off, view available trailers, and maintain a personal watchlist saved in their browser.

### Goals

- Demonstrate semantic HTML, responsive CSS, and browser-native JavaScript.
- Provide more than two connected pages and working navigation.
- Implement complete watchlist CRUD using Web Storage.
- Keep the project easy to run without a package install, build step, or JavaScript library.

### Specifications

| Area | Specification |
| --- | --- |
| Technology | HTML5, CSS3, and plain JavaScript (ES6+) |
| Pages | Home, Movies, Series, title details, and My List |
| Browse | Search TMDB movie titles by name; filter curated titles by genre |
| Watchlist create | Add a movie or series from a card or its details page |
| Watchlist read | View saved titles and planned/watched counts |
| Watchlist update | Change a saved title between Planned and Watched |
| Watchlist delete | Remove a title from My List |
| Playback | Seek on the video timeline, jump backward or forward by 10 seconds, and resume from the saved position |
| Persistence | `localStorage` on the current browser and device |
| Responsive design | Layouts adapt to phone, tablet, and desktop widths |
| External dependencies | No JavaScript libraries or frameworks; movie search uses TMDB through a server-side API proxy |

Watchlist records use this data shape:

```json
{
  "id": "interstellar",
  "status": "planned"
}
```

The home page and series list use sample data stored in `app.js`. Movie title searches use TMDB; the API key stays on the Node server and is never sent to browser JavaScript. Poster and backdrop artwork is loaded from TMDB's image CDN, and available trailers open from YouTube. A network connection is needed for TMDB search and external media; images have a local fallback. Without a configured TMDB key, the curated catalog remains available but API search is disabled.

### Design

The visual direction is a quiet, cinematic catalog: near-black surfaces, warm off-white text, a coral action color, restrained green rating accents, large editorial headings, and poster-led browsing. Navigation and controls stay compact so titles remain the focus. The grid collapses from multiple columns to two columns on small screens, while the detail layout and navigation also adapt for mobile.

### Pages and Features

- `index.html`: featured title, trending picks, and series recommendations.
- `movies.html`: searchable and genre-filterable movie catalog.
- `series.html`: searchable and genre-filterable series catalog.
- `movie.html?id=...`: title details, a demo video player with timeline seeking and saved resume progress, and available trailers.
- `my-list.html`: saved titles, status editing, and removal.

### Acceptance Criteria

- Pages are served by the included Node server, which also proxies TMDB search and movie-detail requests.
- TMDB movie search and curated genre filters update the visible catalog without a page reload.
- Adding a title creates a watchlist record; saved records remain after reload.
- The status selector updates a record, and Remove deletes it.
- The layout remains usable at phone, tablet, and desktop widths.
- The project runs without `npm install` or a third-party JavaScript library; a TMDB API key is required for live movie search.

## Run Locally

Use Node.js 18.17 or newer. Get a TMDB API key (v3) from your TMDB account, then create a local `.env` file and add the key:

```powershell
Copy-Item .env.example .env
notepad .env
```

Replace the example value with your actual key. Keep `.env` private; it is excluded from Git. Start the app from the repository root:

```powershell
node server.js
```

Then open <http://localhost:4173>. No package installation or build command is required. Search uses the first TMDB results page; artwork and trailer playback also need an internet connection.

## Project Deliverables

- [ ] Add the project details to the [Web Fundamentals 2026 project sheet](https://docs.google.com/spreadsheets/d/1oUoMCgBDUgH6XzotvVgHV7kBuueprepCGq30OQHaW6A/edit?usp=drive_link) by September 30, 2026.
- [ ] Upload the project to the assigned GitHub repository and make at least 10 genuine commits on 10 different days by October 10, 2026. Commit dates must reflect the actual work; they cannot be completed retroactively in one session.
- [ ] Optional: deploy the static site to a cloud or static hosting provider.

## License

This project is available under the MIT License. See [LICENSE](LICENSE).

## Files

- `app.js` contains the sample catalog, TMDB search UI, rendering, and watchlist storage operations.
- `styles.css` contains the visual system and responsive layouts.
- The root HTML files provide the individual pages.
- `../server.js` serves the frontend and keeps the TMDB API key on the server.
- `public/` contains the favicon and local sample video.
- `src/assets/hero-background.jpg` is the locally stored home-page hero image.
- `auth.js` provides a frontend-only demo account flow. Passwords are salted and hashed with Web Crypto; this does not make browser-only authentication suitable for production.
