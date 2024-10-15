import axios from "axios"
import { useEffect, useState } from "react"
import CardEvent from "./CardEvent"

const ListEvents = () => {
  const [events, setEvents] = useState([])
  const [filteredEvents, setFilteredEvents] = useState([])
  const [error, setError] = useState(null)
  const [selectedMonth, setSelectedMonth] = useState(null)

  const getEvents = async () => {
    try {
      const response = await axios.get("http://localhost:4000/event/index")
      console.log("Retrieved data:", response.data)
      setEvents(response.data)
      setFilteredEvents(response.data) // Initialize filtered events
    } catch (error) {
      console.error("Error fetching events:", error)
      setError(error.message)
    }
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/event/delete/${id}`)
      console.log("Event deleted successfully")
      getEvents()
    } catch (error) {
      console.error("Error deleting event:", error)
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
      <h1>Event List</h1>
      {error && <p>Error: {error}</p>}
      <div>
        <button onClick={() => filterEventsByMonth(null)}>All Events</button>
        {monthButtons.map((month) => (
          <button key={month} onClick={() => filterEventsByMonth(month)}>
            {new Date(0, month).toLocaleString("default", { month: "long" })}
          </button>
        ))}
      </div>
      {filteredEvents.length > 0 ? (
        filteredEvents.map((event) => (
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
