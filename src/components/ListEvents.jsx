import { Link } from 'react-router-dom'
import CardEvent from './CardEvent'
import axios from 'axios'
import { useEffect, useState } from 'react'
import '../public/listEvents.css'

const ListEvents = () => {
  const [events, setEvents] = useState([])
  const [filteredEvents, setFilteredEvents] = useState([])
  const [error, setError] = useState(null)
  const [selectedMonth, setSelectedMonth] = useState(null)

  // Get user role from localStorage
  const userRole = localStorage.getItem('role')

  const getEvents = async () => {
    try {
      const response = await axios.get('http://localhost:4000/event/index')
      console.log('Retrieved data:', response.data)
      setEvents(response.data)
      setFilteredEvents(response.data) // Initialize filtered events
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

  const filterEventsByMonth = (month) => {
    if (month !== null) {
      const filtered = events.filter((event) => {
        const eventDate = new Date(event.date)
        const eventMonth = eventDate.getMonth()
        return eventMonth === month
      })
      setFilteredEvents(filtered)
      setSelectedMonth(month)
    } else {
      setFilteredEvents(events) // Reset to show all events
      setSelectedMonth(null)
    }
  }

  useEffect(() => {
    getEvents()
  }, [])

  // Get current month
  const currentMonth = new Date().getMonth()
  const monthButtons = Array.from({ length: 4 }, (_, index) => {
    return (currentMonth + index) % 12 // Wrap around using modulo
  })

  return (
    <div>
      <div className="header">EVENTS</div>
      {error && <p>Error: {error}</p>}

      <div className="nav">
        <a
          className={`nav-item ${selectedMonth === null ? 'active' : ''}`}
          onClick={() => filterEventsByMonth(null)}
        >
          All Events
        </a>
        {monthButtons.map((month) => (
          <a
            className={`nav-item ${selectedMonth === month ? 'active' : ''}`}
            key={month}
            onClick={() => filterEventsByMonth(month)}
          >
            {new Date(0, month).toLocaleString('default', { month: 'long' })}
          </a>
        ))}
      </div>

      <div className="card-container">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <CardEvent
              key={event._id}
              event={event}
              handleDelete={handleDelete}
              isAdmin={userRole === 'admin'} // Pass down the role
            />
          ))
        ) : (
          <p>No events available this month</p>
        )}
      </div>
    </div>
  )
}

export default ListEvents
