import React from 'react'
import Child from './Child'

const App = () => {

  const h1 = "Hello World"
  return (
    <React.Fragment>
      <Child 
        heading ="Child" 
        subheading ="uhm"
        para ="paragraph!"
        /> 

        <button onClick={() => alert("Clicked")}>Click Me</button>
    </React.Fragment>
    
  )
}

export default App