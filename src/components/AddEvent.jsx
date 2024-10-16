import { useRef } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import "../public/AddEvent.css"

const AddEvent = () => {
  const formRef = useRef()
  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault()

    const formData = new FormData(formRef.current) // Create a FormData object

    try {
      const response = await axios.post(
        "http://localhost:4000/event/add",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Set the appropriate content type
          },
        }
      )
      console.log("Event added successfully:", response.data)

      formRef.current.reset()

      navigate("/event/index")
    } catch (error) {
      console.error("Error adding event:", error)
      alert(
        "Error adding event: " +
          (error.response ? error.response.data.message : error.message)
      )
    }
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="event-form">
      <h2>Add Event</h2>
      <label htmlFor="name">Name</label>
      <input
        type="text"
        id="name"
        name="name"
        placeholder="Event Name"
        required
      />

      <label htmlFor="date">Date</label>
      <input
        type="date"
        id="date"
        name="date"
        placeholder="Event Date"
        required
      />

      <label htmlFor="time">Time</label>
      <input
        type="text"
        id="time"
        name="time"
        placeholder="Event Time"
        required
      />

      <label htmlFor="details">Details</label>
      <input
        type="text"
        id="details"
        name="details"
        placeholder="Event Details"
        required
      />

      <label htmlFor="availableTickets">Available Tickets</label>
      <input
        type="number"
        id="availableTickets"
        name="availableTickets"
        placeholder="Number of Tickets"
        required
      />

      <label htmlFor="image">Event Image</label>
      <input type="file" id="image" name="image" accept="image/*" />

      <button type="submit" className="submit-button">
        Add Event
      </button>
    </form>
  )
}

export default AddEvent
