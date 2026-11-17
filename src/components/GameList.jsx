import { useDispatch } from 'react-redux'
import { deleteGame } from '../redux/gamesSlice.js'
import GameCard from './GameCard.jsx'

function GameList({ games, onEdit }) {
  const dispatch = useDispatch()

  if (games.length === 0) {
    return (
      <div className="empty-state">
        <span aria-hidden="true">⌕</span>
        <h3>Aucun jeu trouvé</h3>
        <p>Modifiez votre recherche ou ajoutez un jeu à la collection.</p>
      </div>
    )
  }

  function handleDelete(id) {
    dispatch(deleteGame(id))
  }

  return (
    <div className="game-grid">
      {games.map((game) => (
        <GameCard
          key={game.id}
          game={game}
          onDelete={() => handleDelete(game.id)}
          onEdit={() => onEdit(game)}
        />
      ))}
    </div>
  )
}

export default GameList
