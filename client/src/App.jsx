import React, { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'

const HomePage = lazy(() => import('./pages/HomePage'))
const AboutPage = lazy(() => import('./pages/AboutPage'))

const App = () => {
  return (
    <>
      <Suspense fallback={<h1>Loading</h1>}>
        <Routes>
          <Route path = "/" element={<HomePage />}/>
          <Route path = "/about" element={<AboutPage />}/>
          <Route path = "/contact" element={<h1>Contact Page</h1>}/>
        </Routes>
      </Suspense>
    </>
  )
}

export default App