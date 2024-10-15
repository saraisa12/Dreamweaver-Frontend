import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Feed from './pages/Feed'
import Register from './pages/Register'
import SignIn from './pages/SignIn'
import Home from './pages/Home'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} /> {/* Home Page */}
        <Route path="/feed" element={<Feed />} /> {/* Feed Page */}
        <Route path="/register" element={<Register />} />{' '}
        {/* Registration Page */}
        <Route path="/signin" element={<SignIn />} /> {/* Sign In Page */}
      </Routes>
    </Router>
  )
}

export default App
