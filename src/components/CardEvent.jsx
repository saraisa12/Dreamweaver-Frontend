import { Link } from "react-router-dom"
const CardEvent = ({ event, handleDelete }) => {
  return (
    <div>
      <h2>{event.name}</h2>

      <Link to={`/event/details/${event._id}`}>View Details</Link>
      <button onClick={() => handleDelete(event._id)}>Delete</button>
    </div>
  )
}

export default CardEvent
