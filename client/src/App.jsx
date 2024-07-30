import React, { useEffect, useRef, useState } from 'react'

const App = () => {
  const headingref = useRef(null)

  useEffect(() => {
    headingref.current.innerHTML = "Hello"
  }, [])

  return(
    <>
      <h1 ref={headingref}>Hello World</h1>
    </>
  )
}

export default App