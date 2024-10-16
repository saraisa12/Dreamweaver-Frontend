import { NavLink } from 'react-router-dom'
import '../public/nav.css'

const Nav = ({ user, handleLogOut }) => {
  const userRole = localStorage.getItem('role')

  // Check if user is logged in
  const userOptions = user ? (
    <nav className="NavLinks">
      <NavLink to="/" onClick={handleLogOut} activeClassName="active-link">
        LogOut
      </NavLink>
      <NavLink to="/" activeClassName="active-link">
        Home
      </NavLink>

      {userRole === 'admin' && (
        <NavLink to="/event/add" activeClassName="active-link">
          Add Event
        </NavLink>
      )}
      {/* Removed the email greeting */}
    </nav>
  ) : (
    // Options for users who are not logged in
    <nav className="NavLinks">
      <NavLink to="/" activeClassName="active-link" exact>
        Home
      </NavLink>
      <NavLink to="/register" activeClassName="active-link">
        Register
      </NavLink>
      <NavLink to="/signin" activeClassName="active-link">
        Sign In
      </NavLink>
    </nav>
  )

  return <header>{userOptions}</header>
}

export default Nav
