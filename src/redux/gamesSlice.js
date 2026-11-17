import { createSlice } from '@reduxjs/toolkit'

const initialState = [
  {
    id: 'game-1',
    title: 'The Legend of Zelda: Breath of the Wild',
    genre: 'Aventure',
    platform: 'Nintendo Switch',
    price: 59.99,
    image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 'game-2',
    title: 'Cyberpunk 2077',
    genre: 'Jeu de rôle',
    platform: 'PlayStation 5',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 'game-3',
    title: 'Hades',
    genre: 'Action',
    platform: 'PC',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 'game-4',
    title: 'EA Sports FC 25',
    genre: 'Sport',
    platform: 'Xbox Series X',
    price: 69.99,
    image: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=900&q=85',
  },
]

const gamesSlice = createSlice({
  name: 'games',
  initialState,
  reducers: {
    addGame: (state, action) => {
      state.push(action.payload)
    },
    deleteGame: (state, action) => state.filter((game) => game.id !== action.payload),
    updateGame: (state, action) => {
      const index = state.findIndex((game) => game.id === action.payload.id)
      if (index !== -1) {
        state[index] = { ...state[index], ...action.payload }
      }
    },
  },
})

export const { addGame, deleteGame, updateGame } = gamesSlice.actions
export default gamesSlice.reducer
