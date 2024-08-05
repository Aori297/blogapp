import React from 'react'
import { Link } from 'react-router-dom'

const HomePage = () => {
  return (
    <div>
      <h1 className="text-3xl text-[#023047] font-bold">Home Page</h1>
     <Link to ='/login'>Login</Link> 
    </div>

  )
}

export default HomePage