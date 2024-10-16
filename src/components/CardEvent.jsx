import { Link } from 'react-router-dom'
import '../public/cardEvent.css'

const CardEvent = ({ event, handleDelete, isAdmin }) => {
  const baseUrl = 'http://localhost:4000'

  return (
    <div className="event-card">
      {event.image && (
        <img src={`${baseUrl}/${event.image}`} alt={event.name} />
      )}

      <div>
        <Link className="event-details-link" to={`/event/details/${event._id}`}>
          <button>{event.name}</button>
        </Link>

        {/* Conditionally render the delete button only for admins */}
        {isAdmin && (
          <button onClick={() => handleDelete(event._id)}>Delete</button>
        )}
      </div>
    </div>
  )
}

export default CardEvent
