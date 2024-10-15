import React, { useState } from 'react'
import axios from 'axios'

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

    // Append event data to FormData
    formData.append('name', name)
    formData.append('date', date)
    formData.append('time', time)
    formData.append('details', details)
    formData.append('availableTickets', availableTickets)

    // Append image if selected
    if (image) {
      formData.append('image', image)
    }

    try {
      // Make POST request to add the event
      const response = await axios.post(
        'http://localhost:4000/event/add',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
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
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Event Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        required
      />
      <textarea
        placeholder="Details"
        value={details}
        onChange={(e) => setDetails(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Available Tickets"
        value={availableTickets}
        onChange={(e) => setAvailableTickets(e.target.value)}
        required
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
      />
      <button type="submit">Add Event</button>
    </form>
  )
}

export default AddEvent
