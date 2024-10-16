import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SignInUser } from '../services/Auth'
import '../public/signin.css'

const SignIn = ({ setUser }) => {
  const navigate = useNavigate()
  const initialState = { email: '', password: '' }
  const [formValues, setFormValues] = useState(initialState)

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const user = await SignInUser(formValues)
      setUser({ ...user, role: user.role }) // Store the user's role
      localStorage.setItem('role', user.role) // Store role in localStorage
      setFormValues(initialState)
      navigate('/')
    } catch (error) {
      console.error('Sign-in error:', error)
    }
  }

  return (
    <div className="container">
      <div className="auth-card">
        <h2>SIGN IN</h2>
        <div className="input-box">
          <form onSubmit={handleSubmit}>
            <img className="ferris-wheel" src="" />
            <div className="auth-input-wrapper">
              <input
                type="email"
                name="email"
                placeholder="Email"
                onChange={handleChange}
                value={formValues.email}
                required
              />
            </div>
            <div className="auth-input-wrapper">
              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                value={formValues.password}
                required
              />
            </div>
            <button type="submit">Sign In</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SignIn
