import React, { useState } from 'react'

const App = () => {
  const [user, setUser] = useState({
    name: "",
    age: "",
    email: "",
  })

  const handleChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  return (
    <>
      {JSON.stringify(user)}
      <form onSubmit={e => {}}>
        <input 
          type="text" 
          name="name" 
          value={user.name} 
          onChange={handleChange}
        />
        <input 
          type="number" 
          name="age" 
          value={user.age} 
          onChange={handleChange}
        />
        <input 
          type="email" 
          name="email" 
          value={user.email} 
          onChange={handleChange}
        />
        <button type="submit">Submit</button>
      </form>
    </>
  )
  
}

export default App