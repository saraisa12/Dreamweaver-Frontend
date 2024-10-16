import { useRef, useEffect, useState } from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
import '../public/Ticket.css' // Ensure this is imported for styling

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
      console.log('Event details:', response.data)
      setEvent(response.data)
    } catch (error) {
      console.error('Error fetching event details:', error)
      setError(error.message)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const name = formRef.current['name'].value
    const email = formRef.current['email'].value
    const phone = formRef.current['phone'].value
    const quantity = parseInt(formRef.current['quantity'].value, 10)

    const reservationData = {
      eventId: id,
      name,
      email,
      phone,
      quantity
    }

    try {
      const response = await axios.post(
        'http://localhost:4000/reservations/add',
        reservationData
      )
      setSuccess('Tickets reserved successfully!')
      formRef.current.reset()
      navigate(`/reservationSuccess`)
    } catch (error) {
      console.error('Error reserving tickets:', error)
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
    <div className="ticket-container">
      <div className="ticket-left"></div> {/* فقط للصورة */}
      <div className="ticket-right">
        <h1>{event.name}</h1>
        {success && <p className="success-message">{success}</p>}
        <form ref={formRef} onSubmit={handleSubmit}>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" placeholder="Your Name" required />

          <label htmlFor="phone">Phone</label>
          <input type="tel" id="phone" placeholder="Your Phone" required />

          <label htmlFor="email">Email</label>
          <input type="email" id="email" placeholder="Your Email" required />

          <label htmlFor="quantity">Quantity</label>
          <input
            type="number"
            id="quantity"
            min="1"
            defaultValue="1"
            required
          />
          <button type="submit" className="submit-button">
            Submit
          </button>
        </form>
        <div className="SubmitButton"></div>
      </div>
    </div>
  )
}

export default ReserveEvent
