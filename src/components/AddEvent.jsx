
import React, { useState } from 'react'

import { useRef } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import "../public/AddEvent.css"

const AddEvent = () => {
  const [name, setName] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [details, setDetails] = useState('')
  const [availableTickets, setAvailableTickets] = useState(0)
  const [image, setImage] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData()


    const formData = new FormData(formRef.current) // Create a FormData object

    try {
      // Make POST request to add the event
      const response = await axios.post(

        "http://localhost:4000/event/add",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Set the appropriate content type
          },

        }
      )

      // Reset form fields upon success
      console.log('Event added successfully:', response.data)
      setName('')
      setDate('')
      setTime('')
      setDetails('')
      setAvailableTickets(0)
      setImage(null)
    } catch (error) {
      console.error('Error adding event:', error)
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

      <label htmlFor="image">Image</label>
      <input type="file" id="image" name="image" accept="image/*" />

      <button type="submit" className="submit-button">
        Add Event
      </button>

    </form>
  )
}

export default AddEvent
