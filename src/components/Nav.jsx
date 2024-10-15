import { NavLink } from 'react-router-dom'

const Nav = ({ user, handleLogOut }) => {
  // Check if user is logged in
  const userOptions = user ? (
    <nav>
      <NavLink to="/" onClick={handleLogOut} activeClassName="active-link">
        Sign Out
      </NavLink>
      <NavLink to="/feed" activeClassName="active-link">
        Home
      </NavLink>
      {/* Removed the email greeting */}
    </nav>
  ) : (
    // Options for users who are not logged in
    <nav>
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
