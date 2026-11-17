import { useDispatch } from 'react-redux'
import { updateGame } from '../redux/gamesSlice.js'
import GameForm from './GameForm.jsx'

function EditGame({ game, onClose }) {
  const dispatch = useDispatch()

  function handleSave(updatedGame) {
    dispatch(updateGame({ ...updatedGame, id: game.id }))
    onClose()
  }

  return (
    <div className="modal-backdrop" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section className="edit-modal" role="dialog" aria-modal="true" aria-labelledby="edit-heading">
        <button className="modal-close" type="button" onClick={onClose} aria-label="Fermer">×</button>
        <h2 id="edit-heading">Modifier le jeu</h2>
        <GameForm key={game.id} game={game} submitText="Enregistrer" onSubmit={handleSave} />
      </section>
    </div>
  )
}

export default EditGame
