import { useState } from 'react'

const emptyGame = {
  title: '',
  genre: '',
  platform: '',
  price: '',
  image: '',
}

function GameForm({ game = emptyGame, heading, submitText, onSubmit }) {
  const [form, setForm] = useState({ ...emptyGame, ...game })
  const [error, setError] = useState('')

  function updateField(event) {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }))
  }

  function handleSubmit(event) {
    event.preventDefault()

    const title = form.title.trim()
    const genre = form.genre.trim()
    const platform = form.platform.trim()

    if (!title || !genre || !platform || form.price === '') {
      setError('Veuillez renseigner le titre, le genre, la plateforme et le prix.')
      return
    }

    onSubmit({
      title,
      genre,
      platform,
      price: Number(form.price),
      image: form.image.trim(),
    })
    setError('')
    if (!game.id) setForm(emptyGame)
  }

  return (
    <form className="game-form" onSubmit={handleSubmit}>
      {heading && <div className="form-title-row"><h3>{heading}</h3></div>}

      <label className="field">
        Titre du jeu
        <input name="title" value={form.title} onChange={updateField} placeholder="Ex. : Elden Ring" required />
      </label>

      <div className="field-row">
        <label className="field">
          Genre
          <input name="genre" value={form.genre} onChange={updateField} placeholder="Ex. : aventure" required />
        </label>
        <label className="field">
          Plateforme
          <input name="platform" value={form.platform} onChange={updateField} placeholder="Ex. : PC" required />
        </label>
      </div>

      <div className="field-row">
        <label className="field">
          Prix (€)
          <input name="price" type="number" min="0" step="0.01" value={form.price} onChange={updateField} placeholder="0,00" required />
        </label>
        <label className="field">
          Lien de l’image <span className="optional-label">Facultatif</span>
          <input name="image" type="url" value={form.image} onChange={updateField} placeholder="https://…" />
        </label>
      </div>

      {error && <p className="form-error" role="alert">{error}</p>}
      <button className="submit-button" type="submit">{submitText}<span aria-hidden="true">↗</span></button>
    </form>
  )
}

export default GameForm
