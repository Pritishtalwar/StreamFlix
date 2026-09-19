import './App.css'

import { Routes, Route } from 'react-router-dom'

import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Search from './components/Search'
import Trending from './components/Trending'
import Popular from './components/Popular'
import TopRated from './components/TopRated'

import MovieDetails from './pages/MovieDetails'
import MyList from './pages/MyList'

function App() {
  return (
    <>
      <Navbar />

      <Routes>

        <Route
          path="/"
          element={
            <>
              <Hero />
              <Search />
              <Trending />
              <Popular />
              <TopRated />
            </>
          }
        />

        <Route
          path="/movie/:id"
          element={<MovieDetails />}
        />

        <Route
          path="/my-list"
          element={<MyList />}
        />

      </Routes>
    </>
  )
}

export default App