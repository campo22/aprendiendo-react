import { Movies } from './components/movies'
import responseMovies from './mocks/with-results.json';
import './App.css'

function App() {
  const movies = responseMovies.Search;

  return (
    <div className="page">
      <header>
        <h1>Buscador de peliculas</h1>
        <form className='fortm'>
          <input placeholder='avenger, star wars, the matrix' />
          <button>buscar</button>
        </form>
      </header>
      <main>
        {
          <Movies movies={movies} />
        }
      </main>
    </div>

  )

}

export default App
