import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

const DetailsEvent = () => {
  const { id } = useParams()
  const [event, setEvent] = useState(null)
  const [error, setError] = useState(null) // Add error state for better error handling

  const getEventDetails = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/event/details/${id}`
      )
      setEvent(response.data)
    } catch (error) {
      console.error("Error fetching event details:", error)
      setError(error.message) // Set the error message if fetching fails
    }
  }

  useEffect(() => {
    getEventDetails()
  }, [id])

  // Conditional rendering to avoid null reference errors
  if (error) {
    return <p>Error: {error}</p>
  }

  if (!event) {
    return <p>Loading event details...</p> // Show loading message while fetching data
  }

  return (
    <div>
      <h1>{event.name}</h1>
      <p>Date: {new Date(event.date).toLocaleDateString()}</p>
      <p>Time: {event.time}</p>
      <p>Details: {event.details}</p>
    </div>
  )
}

export default DetailsEvent
