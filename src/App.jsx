import './App.css'
import { Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import AddEvent from './components/AddEvent'
import ListEvents from './components/ListEvents'
import DetailsEvent from './components/DetailsEvent'
import ReserveEvent from './components/ReserveEvent'
import ReservationSuccess from './components/ReservationSuccess'
import Feed from './pages/Feed'
import Register from './pages/Register'
import SignIn from './pages/SignIn'
import Home from './pages/Home'
import Nav from './components/Nav' // Import Nav here

const App = () => {
  const [user, setUser] = useState(null) // State for the user

  const handleLogOut = () => {
    setUser(null) // Clear user state on logout
  }

  return (
    <div className="App">
      <header>
        <Nav user={user} handleLogOut={handleLogOut} />{' '}
        {/* Pass user state and handleLogOut function */}
      </header>
      <main>
        <Routes>
          <Route path="/event/index" element={<ListEvents />} />
          <Route path="/event/add" element={<AddEvent />} />
          <Route path="/event/details/:id" element={<DetailsEvent />} />
          <Route path="/event/reserve/:id" element={<ReserveEvent />} />
          <Route path="/reservationsuccess" element={<ReservationSuccess />} />
          <Route path="/" element={<Home />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/register" element={<Register />} />
          <Route path="/signin" element={<SignIn setUser={setUser} />} />{' '}
          {/* Pass setUser to SignIn */}
        </Routes>
      </main>
    </div>
  )
}

export default App
