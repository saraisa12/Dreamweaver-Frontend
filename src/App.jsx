
// App.js
import "./App.css"
import { Routes, Route } from "react-router-dom"
import AddEvent from "./components/AddEvent"
import ListEvents from "./components/ListEvents"
import DetailsEvent from "./components/DetailsEvent"
import ReserveEvent from "./components/ReserveEvent"
import ReservationSuccess from "./components/ReservationSuccess"
import Feed from './pages/Feed'
import Register from './pages/Register'
import SignIn from './pages/SignIn'
import Home from './pages/Home'

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
          <Route path="/" element={<Home />} /> {/* Home Page */}
        <Route path="/feed" element={<Feed />} /> {/* Feed Page */}
        <Route path="/register" element={<Register />} />{' '}
        {/* Registration Page */}
        <Route path="/signin" element={<SignIn />} /> {/* Sign In Page */}
        </Routes>
      </main>
    </div>

  )

  //...
}

export default App
