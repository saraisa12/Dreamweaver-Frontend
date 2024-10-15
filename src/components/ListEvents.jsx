import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import CardEvent from "./CardEvent"

const ListEvents = () => {
  const [events, setEvents] = useState([])
  const [error, setError] = useState(null) //
  const getEvents = async () => {
    try {
      const response = await axios.get("http://localhost:4000/event/index")
      console.log("Retrieved data:", response.data)
      setEvents(response.data)
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

  useEffect(() => {
    getEvents()
  }, [])

  return (
    <div>
      <div className="navBar">
        <ul>
          <li>
            <a href="">Home</a>
          </li>
          <li>
            <a href="">Sign Out</a>
          </li>
        </ul>
      </div>
      <div className="EventHeader">
        <h1>Event</h1>
      </div>
      <div className="Months">
        <button className="MonthsName">October</button>
        <button className="MonthsName">November</button>
        <button className="MonthsName">December</button>
        <button className="MonthsName">January</button>
      </div>
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
        <p>No Events Found.</p>
      )}
    </div>
  )
}

export default ListEvents
