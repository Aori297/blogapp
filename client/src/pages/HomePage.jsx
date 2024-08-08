import React from 'react'
import { Link } from 'react-router-dom'
import Input from '../componenets/forms/Input'

const HomePage = () => {
  return (
    <div>
      <h1 className="text-3xl text-[#023047] font-bold">Home Page</h1>
      <Link to ='/login'>Login</Link> 
      <Input placeholder='Name' />
    </div>

  )
}

export default HomePage