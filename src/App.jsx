import { useState } from 'react'
import { useSelector } from 'react-redux'
import AddGame from './components/AddGame.jsx'
import EditGame from './components/EditGame.jsx'
import GameList from './components/GameList.jsx'
import logo from './assets/logo.jpg'
import './App.css'

function App() {
  const games = useSelector((state) => state.games)
  const [search, setSearch] = useState('')
  const [genre, setGenre] = useState('Tous les genres')
  const [gameToEdit, setGameToEdit] = useState(null)

  const genres = [...new Set(games.map((game) => game.genre))].sort()
  const searchTerm = search.toLowerCase()
  const filteredGames = games.filter((game) => {
    const gameDetails = `${game.title} ${game.genre} ${game.platform}`.toLowerCase()
    const matchesSearch = gameDetails.includes(searchTerm)
    const matchesGenre = genre === 'Tous les genres' || game.genre === genre
    return matchesSearch && matchesGenre
  })
  const collectionValue = games.reduce((total, game) => total + Number(game.price || 0), 0)

  return (
    <main className="app-shell">
      <header className="topbar">
        <a className="brand" href="#top" aria-label="Accueil gamy">
          <img className="brand-logo" src={logo} alt="" />
          <span>gamy</span>
        </a>
      </header>

      <section className="hero" id="top">
        <h1>Mes jeux<br /><span>vidéo.</span></h1>
      </section>

      <section className="collection-section" aria-labelledby="collection-title">
        <div className="section-heading">
          <h2 id="collection-title">
            Mes jeux <span className="count-pill">{String(games.length).padStart(2, '0')}</span>
          </h2>
        </div>

        <div className="library-toolbar">
          <label className="search-box">
            <span aria-hidden="true">⌕</span>
            <input
              type="search"
              placeholder="Rechercher un jeu…"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              aria-label="Rechercher un jeu"
            />
          </label>
          <label className="filter-box">
            <span className="sr-only">Filtrer par genre</span>
            <select value={genre} onChange={(event) => setGenre(event.target.value)}>
              <option>Tous les genres</option>
              {genres.map((item) => <option key={item}>{item}</option>)}
            </select>
            <span aria-hidden="true">⌄</span>
          </label>
          <span className="results-count">
            Jeux affichés <strong>{String(filteredGames.length).padStart(2, '0')}</strong>
          </span>
        </div>

        <GameList games={filteredGames} onEdit={setGameToEdit} />

        <section className="add-section" aria-labelledby="add-heading">
          <div className="add-intro">
            <h2 id="add-heading">Ajouter<br />un jeu</h2>
          </div>
          <div className="form-panel">
            <AddGame />
          </div>
        </section>

        <footer className="footer">
          <a className="brand footer-brand" href="#top" aria-label="Retour en haut">
            <img className="brand-logo" src={logo} alt="" />
            <span>gamy</span>
          </a>
          <span>
            Valeur de la collection <strong>{collectionValue.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}</strong>
          </span>
        </footer>
      </section>

      {gameToEdit && <EditGame game={gameToEdit} onClose={() => setGameToEdit(null)} />}
    </main>
  )
}

export default App
