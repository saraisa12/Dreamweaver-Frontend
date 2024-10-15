// App.js
import "./App.css"
import { Routes, Route } from "react-router-dom"
import AddEvent from "./components/AddEvent"
import ListEvents from "./components/ListEvents"
import DetailsEvent from "./components/DetailsEvent"
import ReserveEvent from "./components/ReserveEvent"
import ReservationSuccess from "./components/ReservationSuccess"

const App = () => {
  return (
    <div className="App">
      <header>{/* Import Nav here */}</header>
      <main>
        <Routes>
          <Route path="/event/index" element={<ListEvents />} />{" "}
          <Route path="/event/add" element={<AddEvent />} />{" "}
          <Route path="/event/details/:id" element={<DetailsEvent />} />{" "}
          <Route path="/event/reserve/:id" element={<ReserveEvent />} />{" "}
          <Route path="/reservationsuccess" element={<ReservationSuccess />} />{" "}
        </Routes>
      </main>
    </div>
  )

  //...
}

export default App
