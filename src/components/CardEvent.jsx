import { Link } from "react-router-dom"
const CardEvent = ({ event, handleDelete }) => {
  return (
    <div>
      {event.image && (
        <img
          src={event.image}
          alt={event.name}
          style={{ width: "100%", height: "auto", borderRadius: "8px" }}
        />
      )}

      <h2>{event.name}</h2>

      <Link to={`/event/details/${event._id}`}>View Details</Link>
      <button onClick={() => handleDelete(event._id)}>Delete</button>
    </div>
  )
}

export default CardEvent
