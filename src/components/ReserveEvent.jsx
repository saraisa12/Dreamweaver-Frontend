import { useRef, useEffect, useState } from "react"
import axios from "axios"
import { useParams, useNavigate } from "react-router-dom"

const ReserveEvent = () => {
  const { id } = useParams()
  const formRef = useRef()
  const [event, setEvent] = useState(null)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const navigate = useNavigate()

  const getEventDetails = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/event/details/${id}`
      )
      console.log("Event details:", response.data) // Log event details
      setEvent(response.data)
    } catch (error) {
      console.error("Error fetching event details:", error)
      setError(error.message)
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const name = formRef.current["name"].value
    const email = formRef.current["email"].value
    const phone = formRef.current["phone"].value
    const quantity = parseInt(formRef.current["quantity"].value, 10)

    const reservationData = {
      eventId: id,
      name,
      email,
      phone,
      quantity,
    }

    try {
      const response = await axios.post(
        "http://localhost:4000/reservations/add",
        reservationData
      )
      setSuccess("Tickets reserved successfully!")
      formRef.current.reset()

      navigate(`/reservationSuccess`)
    } catch (error) {
      console.error("Error reserving tickets:", error)
      setError(error.message)
    }
  }

  useEffect(() => {
    getEventDetails()
  }, [id])

  // Handle errors and loading state
  if (error) {
    return <p>Error: {error}</p>
  }

  if (!event) {
    return <p>Loading event details...</p>
  }

  return (
    <div>
      <h1>Reserve Tickets</h1>
      {success && <p>{success}</p>}

      {/* Display the event name */}
      <div>
        <h2>Event: {event.name}</h2>
        <form ref={formRef} onSubmit={handleSubmit}>
          <label htmlFor="name">Your Name</label>
          <input type="text" id="name" placeholder="Your Name" required />

          <label htmlFor="email">Email</label>
          <input type="email" id="email" placeholder="Your Email" required />

          <label htmlFor="phone">Phone Number</label>
          <input
            type="tel"
            id="phone"
            placeholder="Your Phone Number"
            required
          />

          <label htmlFor="quantity">Quantity</label>
          <input
            type="number"
            id="quantity"
            placeholder="Number of Tickets"
            min="1"
            defaultValue="1" // Set a default value
            required
          />

          <button type="submit">Reserve Tickets</button>
        </form>
      </div>
    </div>
  )
}

export default ReserveEvent
