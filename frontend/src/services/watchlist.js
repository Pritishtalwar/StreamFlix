export function getWatchlist() {
  const watchlist = localStorage.getItem('watchlist')

  if (!watchlist) {
    return []
  }

  return JSON.parse(watchlist)
}

export function addToWatchlist(movie) {
  const watchlist = getWatchlist()

  const alreadyExists = watchlist.some(
    (item) => item.id === movie.id
  )

  if (alreadyExists) {
    return
  }

  watchlist.push(movie)

  localStorage.setItem(
    'watchlist',
    JSON.stringify(watchlist)
  )
}

export function removeFromWatchlist(movieId) {
  const watchlist = getWatchlist()

  const updatedWatchlist = watchlist.filter(
    (movie) => movie.id !== movieId
  )

  localStorage.setItem(
    'watchlist',
    JSON.stringify(updatedWatchlist)
  )
}