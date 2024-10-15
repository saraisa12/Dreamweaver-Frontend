import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { RegisterUser } from '../services/Auth'

const Register = () => {
  const navigate = useNavigate()
  const initialState = {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  }
  const [formValues, setFormValues] = useState(initialState)

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (formValues.password !== formValues.confirmPassword) {
      alert('Passwords do not match!')
      return
    }

    try {
      await RegisterUser({
        name: formValues.name,
        email: formValues.email,
        password: formValues.password
      })
      setFormValues(initialState)
      navigate('/signin')
    } catch (error) {
      console.error('Registration error:', error)
      alert('Registration failed. Please try again.')
    }
  }

  return (
    <div className="container">
      <div className="auth-card">
        <h2>Register</h2>
        <div className="input-box">
          <form onSubmit={handleSubmit}>
            <div className="auth-input-wrapper">
              <input
                type="text"
                name="name"
                placeholder="Name"
                onChange={handleChange}
                value={formValues.name}
                required
              />
            </div>
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
            <div className="auth-input-wrapper">
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                onChange={handleChange}
                value={formValues.confirmPassword}
                required
              />
            </div>
            <button type="submit">Register</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register
