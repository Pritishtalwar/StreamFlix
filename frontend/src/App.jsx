import './App.css'

import { Routes, Route } from 'react-router-dom'
import Movies from './pages/Movies'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Search from './components/Search'
import Trending from './components/Trending'
import Popular from './components/Popular'
import TopRated from './components/TopRated'
import MovieDetails from './pages/MovieDetails'
import MyList from './pages/MyList'
import Series from './pages/Series'
import Categories from './pages/Categories'

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

        <Route
          path="/movies"
          element={<Movies />}
        />
        
        <Route
          path="/series"
          element={<Series />}
        />

        <Route
          path="/series"
          element={<Series />}
        />
        <Route
          path="/categories"
          element={<Categories />}
        />
  
      </Routes>
    </>
  )
}

export default App