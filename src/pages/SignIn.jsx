import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SignInUser } from '../services/Auth'

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
      setUser(user) // Set the user state on successful login
      setFormValues(initialState)
      navigate('/') // Redirect to the Home page
    } catch (error) {
      console.error('Sign-in error:', error)
    }
  }

  return (
    <div className="signin">
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          value={formValues.email}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          value={formValues.password}
          required
        />
        <button type="submit">Sign In</button>
      </form>
    </div>
  )
}

export default SignIn
