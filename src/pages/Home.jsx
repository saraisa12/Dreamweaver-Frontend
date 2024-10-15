import React from "react"
import "../public/Home.css"
import { Link } from "react-router-dom"

const Home = () => {
  return (
    <div className="container">
      {" "}
      {/* New container for background image */}
      <div className="Greeting">
        <h1>
          Welcome <br /> to DreamWeaver
        </h1>
        <p>
          Where imagination is woven into reality,
          <br /> and every dream becomes
          <br /> an unforgettable experience
        </p>
        <Link className="event-link" to="/event/index">
          <button>Explore Events</button>
        </Link>
      </div>
    </div>
  )
}

export default Home
