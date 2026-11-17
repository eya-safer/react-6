import { useDispatch } from 'react-redux'
import { addGame } from '../redux/gamesSlice.js'
import GameForm from './GameForm.jsx'

function AddGame() {
  const dispatch = useDispatch()

  function handleAdd(game) {
    const id = globalThis.crypto?.randomUUID?.() ?? `game-${Date.now()}`
    dispatch(addGame({ ...game, id }))
  }

  return <GameForm heading="Nouveau jeu" submitText="Ajouter à la collection" onSubmit={handleAdd} />
}

export default AddGame
