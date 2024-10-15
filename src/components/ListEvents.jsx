import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import CardEvent from './CardEvent'

const ListEvents = () => {
  const [events, setEvents] = useState([])
  const [error, setError] = useState(null)

  const getEvents = async () => {
    try {
      const response = await axios.get('http://localhost:4000/event/index')
      console.log('Retrieved data:', response.data)
      setEvents(response.data)
    } catch (error) {
      console.error('Error fetching events:', error)
      setError(error.message)
    }
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/event/delete/${id}`)
      console.log('Event deleted successfully')
      getEvents()
    } catch (error) {
      console.error('Error deleting event:', error)
      setError(error.message)
    }
  }

  useEffect(() => {
    getEvents()
  }, [])

  return (
    <div>
      <h1>Event List</h1>
      {error && <p>Error: {error}</p>}
      {events.length > 0 ? (
        events.map((event) => (
          <CardEvent
            key={event._id}
            event={event}
            handleDelete={handleDelete}
          />
        ))
      ) : (
        <p>No events found.</p>
      )}
    </div>
  )
}

export default ListEvents
