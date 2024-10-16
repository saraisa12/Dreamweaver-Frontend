import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom/dist"
import "../public/DetailsEvent.css"

const DetailsEvent = () => {
  const { id } = useParams()
  const [event, setEvent] = useState(null)
  const [error, setError] = useState(null)

  const getEventDetails = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/event/details/${id}`
      )
      setEvent(response.data)
    } catch (error) {
      console.error("Error fetching event details:", error)
      setError(error.message)
    }
  }

  useEffect(() => {
    getEventDetails()
  }, [id])

  if (error) {
    return <p>Error: {error}</p>
  }

  if (!event) {
    return <p>Loading event details...</p>
  }

  const baseUrl = "http://localhost:4000"

  return (
    <div className="event-details-container">
      <h1>{event.name}</h1>

      <div className="details-info">
        <div>
          <img
            src={`${baseUrl}/${event.image}`}
            alt={event.name}
            className="event-image"
          />
        </div>
        <div className="event-details">
          <h4>Details</h4>
          <p className="event-description">{event.details}</p>

          <div className="time-date-container">
            <p className="event-date">
              <span className="event-info">
                <i className="bi bi-calendar"></i>
                <span>{new Date(event.date).toLocaleDateString()}</span>
              </span>
            </p>
            <p className="event-time">
              <span className="event-info">
                <i className="bi bi-clock"></i>
                <span>{event.time}</span>
              </span>
            </p>
          </div>
        </div>
      </div>

      <div className="button-container">
        <button className="reserve-button">
          <Link to={`/event/reserve/${event._id}`} className="reserve-link">
            Reserve Tickets
          </Link>
        </button>
      </div>
    </div>
  )
}

export default DetailsEvent
