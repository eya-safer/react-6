import { useState } from 'react'

function GameCard({ game, onDelete, onEdit }) {
  const [imageFailed, setImageFailed] = useState(false)
  const initials = game.title
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0])
    .join('')
    .toUpperCase()

  return (
    <article className="game-card">
      <div className={`game-cover${imageFailed || !game.image ? ' cover-fallback' : ''}`}>
        {game.image && !imageFailed && (
          <img
            src={game.image}
            alt={`Illustration de ${game.title}`}
            loading="lazy"
            onError={() => setImageFailed(true)}
          />
        )}
        {(imageFailed || !game.image) && <span className="cover-initials" aria-hidden="true">{initials}</span>}
        <span className="cover-genre">{game.genre}</span>
        <div className="cover-actions">
          <button className="icon-button" type="button" onClick={onEdit} aria-label={`Modifier ${game.title}`} title="Modifier">↗</button>
          <button className="icon-button" type="button" onClick={onDelete} aria-label={`Supprimer ${game.title}`} title="Supprimer">×</button>
        </div>
      </div>

      <div className="game-details">
        <div className="game-heading">
          <h3>{game.title}</h3>
          <span className="game-price">{Number(game.price).toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}</span>
        </div>
        <p className="game-platform"><span className="platform-dot" />{game.platform}</p>
      </div>
    </article>
  )
}

export default GameCard
