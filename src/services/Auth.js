import Client from './api'

// Function to handle user sign-in
export const SignInUser = async (data) => {
  try {
    const res = await Client.post('/auth/login', data)
    // Set the current signed in user's token to localStorage
    localStorage.setItem('token', res.data.token)
    return res.data.user
  } catch (error) {
    console.error('Sign-in error:', error) // Log the error for debugging
    alert('Sign-in failed. Please check your credentials.') // Notify user of the error
    throw error // Propagate the error for further handling if needed
  }
}

// Function to handle user registration
export const RegisterUser = async (data) => {
  try {
    const res = await Client.post('/auth/register', data)
    console.log(data)
    return res.data // Return the response data from registration
  } catch (error) {
    console.error('Registration error:', error) // Log the error for debugging
    alert('Registration failed. Please try again.') // Notify user of the error
    throw error // Propagate the error for further handling if needed
  }
}

// Function to check the current session
export const CheckSession = async () => {
  try {
    // Checks if the current token if it exists is valid
    const res = await Client.get('/auth/session')
    return res.data // Return the session data
  } catch (error) {
    console.error('Session check error:', error) // Log the error for debugging
    throw error // Propagate the error for further handling if needed
  }
}
