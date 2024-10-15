import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom/dist'

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
      console.error('Error fetching event details:', error)
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

  return (
    <div>
      <h1>{event.name}</h1>
      {event.image && <img src={event.image} alt={event.name} />}{' '}
      <p>Date: {new Date(event.date).toLocaleDateString()}</p>
      <p>Time: {event.time}</p>
      <p>Details: {event.details}</p>
      <button>
        <Link to={`/event/reserve/${event._id}`}>Reserve Tickets</Link>
      </button>
    </div>
  )
}

export default DetailsEvent
