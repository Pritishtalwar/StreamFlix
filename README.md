# 🎬 StreamFlix

### Discover. Explore. Save Your Next Watch.

StreamFlix is a responsive movie and series discovery website built using **HTML5, CSS3, and Vanilla JavaScript**. It provides a cinematic browsing experience where users can explore movies and series, search for titles, view details, discover available trailers, and manage a personal watchlist.

---

## 📌 Table of Contents

- [Project Proposal](#-project-proposal)
- [Project Goals](#-project-goals)
- [Technology Stack](#-technology-stack)
- [Features](#-features)
- [CRUD Operations](#-crud-operations)
- [Data Storage](#-data-storage)
- [TMDB API Integration](#-tmdb-api-integration)
- [Project Structure](#-project-structure)
- [Installation and Setup](#-installation-and-setup)
- [Limitations](#-limitations)
- [Future Improvements](#-future-improvements)
- [License](#-license)
- [Author](#-author)

---

## 📝 Project Proposal

### Project Description

StreamFlix is a frontend web development project designed to demonstrate the practical use of HTML, CSS, and JavaScript through a multi-page movie and series discovery application.

The website provides interactive browsing, search functionality, title information, responsive layouts, and a personal watchlist. It also demonstrates browser storage and CRUD operations using JavaScript.

### 🎯 Project Goals

- Build a responsive website using HTML, CSS, and JavaScript.
- Create multiple interconnected web pages with consistent navigation.
- Implement movie and series browsing and search functionality.
- Integrate the TMDB API for movie-related data and search functionality.
- Implement watchlist CRUD operations.
- Store relevant application data using browser storage.
- Practice DOM manipulation, event handling, and asynchronous JavaScript.
- Maintain a clean and organized project structure.

---

## 🛠️ Technology Stack

| Technology | Purpose |
|---|---|
| HTML5 | Web page structure and semantic elements |
| CSS3 | Styling, layouts, animations, and responsive design |
| Vanilla JavaScript | Application logic, DOM manipulation, and interactivity |
| TMDB API | Movie-related data and search functionality |
| TMDB Image CDN | Movie and series posters and backdrop images |
| LocalStorage | Persistent browser-side data |
| YouTube | External trailer content, where available |
| Visual Studio Code | Development environment |
| Git and GitHub | Version control and source code hosting |

The project is designed around browser-native web technologies and does not require a backend or a build process.

---

## ✨ Features

### 🏠 Home Page

- Featured title and movie/series sections.
- Cinematic interface with poster-based browsing.
- Navigation to different sections of the website.

### 🎥 Movies and Series

- Browse movie and series content.
- Search for titles.
- Filter available titles by genre.
- View available posters, ratings, descriptions, and other title information.

### 🔎 Movie Search and Details

- Search functionality for discovering titles.
- Movie-related data retrieval through the TMDB API, where implemented.
- Dedicated page for viewing information about a selected title.
- Access to available trailer content and the demo video player.

### 📋 My List

- Add movies or series to a personal watchlist.
- View saved titles.
- Update a saved title's status to Planned or Watched.
- Remove titles from the watchlist.
- Preserve saved watchlist data across page refreshes using browser storage.

### 🔐 Login and Sign Up

- Frontend demonstration of a local account flow.
- Browser-side handling of demo account data.
- Educational implementation rather than production-grade authentication.

### ▶️ Demo Video Player

- Play and pause the available demo video.
- Use the available playback controls.
- Save playback progress for later continuation, where supported.

### 📱 Responsive Design

- Layouts designed for mobile, tablet, and desktop screens.
- Responsive navigation and content sections.
- Consistent styling across pages.
- Reduced-motion preferences respected where implemented.

---

## 🔄 CRUD Operations

StreamFlix demonstrates the four fundamental CRUD operations through its personal watchlist.

| Operation | Description |
|---|---|
| **Create** | Add a movie or series to My List |
| **Read** | Display saved watchlist entries |
| **Update** | Change a saved title's status |
| **Delete** | Remove a title from the watchlist |

These operations demonstrate how JavaScript can manage application data and dynamically update the interface without requiring a backend database.

---

## 💾 Data Storage

StreamFlix uses the browser's **LocalStorage API** to preserve relevant application data.

Browser storage can be used for:

- Personal watchlist entries.
- Playback progress.
- Demo account data.

Stored information remains within the relevant browser environment and is not automatically synchronized across devices.

---

## 🎞️ TMDB API Integration

StreamFlix uses The Movie Database (TMDB) services to support its movie discovery experience.

### Purpose of Integration

- Retrieve movie-related information through API requests, where implemented.
- Support movie search functionality.
- Display poster and backdrop images using TMDB image URLs.
- Improve the visual presentation of movie and series content.

TMDB image URLs use image paths and the TMDB image CDN. The exact data available depends on the API requests implemented in the application.

The app sends requests from the browser using a TMDB API key. To enable live TMDB data, add your key to the `TMDB_API_KEY` value in `frontend/tmdb.js`. Browser code is public, so this key is visible to users; use a restricted key for this demo and never add a private access token.

An internet connection is required for content retrieved from TMDB and for externally hosted images or trailers.

Visit [The Movie Database](https://www.themoviedb.org/) for more information.

---

## 📂 Project Structure

```text
StreamFlix/
├── README.md
├── LICENSE
├── .gitignore
└── frontend/
    ├── index.html
    ├── movies.html
    ├── series.html
    ├── movie.html
    ├── my-list.html
    ├── login.html
    ├── signup.html
    ├── app.js
    ├── auth.js
    ├── tmdb.js
    ├── styles.css
    ├── public/
    │   └── favicon.png
    └── src/
        └── assets/
            └── hero-background.jpg
```

### Main Files

- **`index.html`** — Home page.
- **`movies.html`** — Movie browsing and search page.
- **`series.html`** — Series browsing page.
- **`movie.html`** — Selected title details and video player.
- **`my-list.html`** — Personal watchlist.
- **`login.html`** — Demo login page.
- **`signup.html`** — Demo registration page.
- **`app.js`** — Main application logic and user interactions.
- **`auth.js`** — Frontend demo authentication logic.
- **`tmdb.js`** — TMDB-related integration code.
- **`styles.css`** — Shared styling and responsive layouts.

---

## 🚀 Installation and Setup

### Prerequisites

- A modern web browser such as Google Chrome, Microsoft Edge, or Firefox.
- [Visual Studio Code](https://code.visualstudio.com/).
- The Live Server extension for Visual Studio Code (recommended).

### Steps to Run

1. Clone or download the repository:

   ```bash
   git clone https://github.com/Pritishtalwar/StreamFlix.git
   ```

2. Open the downloaded `StreamFlix` folder in Visual Studio Code.

3. Open the `frontend` directory.

4. Open `index.html`.

5. Right-click the file and select **Open with Live Server**.

6. Explore the website in your browser.

To enable live TMDB requests, set `TMDB_API_KEY` in `frontend/tmdb.js`. The key is visible in browser code, so use a restricted demo key and do not use a private access token.

A static development server is recommended for consistent browser storage behavior and video seeking.

---

## ⚠️ Limitations

- Some displayed content may come from a sample catalog.
- Available movie information depends on the API integration and network connectivity.
- Externally hosted posters, images, and trailers require an internet connection.
- The demo player does not provide a full-length video for every catalog title.
- Demo authentication is frontend-only and is not suitable for sensitive information or production accounts.
- Browser storage is local to the browser and device.
- The application does not provide server-side account management or cross-device synchronization.

---

## 🔮 Future Improvements

- Expand live movie and series discovery functionality.
- Improve search results, sorting, and genre filtering.
- Add more detailed title information.
- Improve accessibility and keyboard navigation.
- Enhance error handling for unavailable API responses.
- Improve account security through a secure backend, if required.
- Deploy the website as a static web application.

---

## 📄 License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Pritish Talwar**

- GitHub: [@Pritishtalwar](https://github.com/Pritishtalwar)
- Project Repository: [StreamFlix](https://github.com/Pritishtalwar/StreamFlix)

---

*Built as a Web Development Fundamentals project to practice HTML, CSS, JavaScript, responsive design, API integration, browser storage, and CRUD operations.*