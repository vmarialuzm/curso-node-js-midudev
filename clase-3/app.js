const express = require('express')
const movies = require('./movies.json')

const app = express()
app.disable('x-powered-by') // deshabilita la cabecera X-Powered-By

// Todos los recursos que sean MOVIES se identifican con el prefijo /movies
app.get('/movies', (req, res) => {
  const { genre } = req.query
  if (genre) {
    const filteredMovies = movies.filter(
      movie => movie.genre.some(g => g.toLowerCase() === genre.toLowerCase())
    )
    return res.json(filteredMovies)
  }
  res.json(movies)
})

app.get('/movies/:id', (req, res) => {
  const { id } = req.params
  const movie = movies.find(movie => movie.id === id)
  if (movie) return res.json(movie)

  res.status(404).json({ error: 'Movie not found' })
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`)
})
