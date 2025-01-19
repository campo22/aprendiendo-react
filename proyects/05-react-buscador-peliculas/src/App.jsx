import { Movies } from './components/movies'
import { useMovies } from './hooks/useMovies'
import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'
import debounce from 'just-debounce-it'



function useSearch() {

  const [search, setSearch] = useState('')
  const [error, setError] = useState(null);
  const isFirtsInput = useRef(true)

  useEffect(() => {

    if (isFirtsInput.current) {
      isFirtsInput.current = search === ''
      return
    }
    if (search == '') {
      setError('No se puede buscar una pelicula vacia')
      return
    }
    if (search.match(/^\d+$/)) {
      setError('No se puede buscar una pelicula con un numero')
      return
    }
    if (search.length < 3) {
      setError('La busqueda debe tener al menos 3 caracteres')
      return
    }
    setError(null)
  }, [search])

  return { search, setSearch, error }
}

function App() {
  const [sort, setSort] = useState(false)

  const { search, setSearch, error } = useSearch()
  const { movies, getMovies, loading } = useMovies({ search, sort })

  const debounceGetMovies = useCallback(
    debounce((search) => {
      console.log('search', search)
      getMovies({ search })
    }, 300),
    [getMovies]
  )



  const handleSubmit = (event) => {
    event.preventDefault()
    getMovies({ search })
  }
  const handleSort = () => {
    setSort(!sort)
  }


  const handleChagenge = (event) => {
    const newSearch = event.target.value
    setSearch(newSearch)
    debounceGetMovies(newSearch)
  }

  return (
    <div className="page">
      <header>
        <h1>Buscador de peliculas</h1>
        <form className='fortm' onSubmit={handleSubmit}>
          <input onChange={handleChagenge} value={search} name='query' placeholder='avenger, star wars, the matrix' />
          <input type="checkbox" onChange={handleSort} checked={sort} />
          <button >buscar</button>
        </form>
        {
          error && <p style={{ color: 'red' }}>{error}</p>
        }

      </header>

      <main>
        {
          loading ? <p>Cargando...</p> : <Movies movies={movies} />
        }

      </main>
    </div>

  )

}

export default App
