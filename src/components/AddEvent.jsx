import { useRef } from "react"
import axios from "axios"

const AddEvent = () => {
  const formRef = useRef()

  const handleSubmit = async (event) => {
    event.preventDefault()

    // Get form values using refs
    const name = formRef.current["name"].value
    const date = formRef.current["date"].value
    const time = formRef.current["time"].value
    const details = formRef.current["details"].value
    const availableTickets = parseInt(
      formRef.current["availableTickets"].value,
      10
    )

    const eventData = {
      name,
      date,
      time,
      details,
      availableTickets,
    }

    try {
      // Make a POST request to your server endpoint
      const response = await axios.post(
        "http://localhost:4000/event/add", // Ensure the port matches your server
        eventData
      )
      console.log("Event added successfully:", response.data)

      // Clear form fields after successful submission
      formRef.current.reset() // Reset the form fields
    } catch (error) {
      console.error("Error adding event:", error)
      alert(
        "Error adding event: " +
          (error.response ? error.response.data.message : error.message)
      )
    }
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      <label htmlFor="name">Name</label>
      <input type="text" id="name" placeholder="Event Name" required />

      <label htmlFor="date">Date</label>
      <input type="date" id="date" placeholder="Event Date" required />

      <label htmlFor="time">Time</label>
      <input type="text" id="time" placeholder="Event Time" required />

      <label htmlFor="details">Details</label>
      <input type="text" id="details" placeholder="Event Details" required />

      <label htmlFor="availableTickets">Available Tickets</label>
      <input
        type="number"
        id="availableTickets"
        placeholder="Number of Tickets"
        required
      />

      <button type="submit">Add Event</button>
    </form>
  )
}

export default AddEvent
