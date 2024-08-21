import React, { lazy, Suspense } from 'react'
import { Toaster } from 'react-hot-toast'
import { Route, Routes } from 'react-router-dom'

const HomePage = lazy(() => import('./pages/HomePage'))
const LoginPage = lazy(() => import('./pages/LoginPage'))

const App = () => {
  return (
    <>
      <Suspense fallback={<h1>Loading</h1>}>
        <Routes>
          <Route path = "/" element={<HomePage />}/>
          <Route path = "/login" element={<LoginPage />}/>
        </Routes>
        <Toaster />
      </Suspense>
    </>
  )
}

export default App