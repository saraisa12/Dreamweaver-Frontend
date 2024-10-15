import React, { useEffect, useState } from "react"
import axios from "axios"

const Test = () => {
  const [message, setMessage] = useState("")

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/test")
        setMessage(response.data.message)
      } catch (error) {
        console.error("Error fetching the API:", error)
        setMessage("Error connecting to the API")
      }
    }

    fetchData()
  }, [])

  return (
    <div>
      <h1>Connection Test</h1>
      <p>{message}</p>
    </div>
  )
}

export default Test
