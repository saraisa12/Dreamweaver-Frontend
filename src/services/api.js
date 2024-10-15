import Axios from 'axios'

// Base URL for the API
export const BASE_URL = 'http://localhost:4000' // Change this to match your backend port

// Create and export the Axios instance with the base URL
const axiosInstance = Axios.create({ baseURL: BASE_URL })

// Intercept every request to include the authorization token if it exists
axiosInstance.interceptors.request.use(
  (config) => {
    // Retrieve the token from localStorage
    const token = localStorage.getItem('token')

    // If the token exists, set the authorization header
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }

    return config // Return the updated config
  },
  (error) => Promise.reject(error) // Handle errors
)

// Optionally, you can also add an interceptor for responses
axiosInstance.interceptors.response.use(
  (response) => response, // Simply return the response if successful
  (error) => {
    // Handle any errors
    console.error(
      'API Error:',
      error.response ? error.response.data : error.message
    )
    return Promise.reject(error) // Propagate the error
  }
)

export default axiosInstance // You can change 'axiosInstance' to any name you prefer
