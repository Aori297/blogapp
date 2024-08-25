import React, { lazy, Suspense } from 'react'
import { Toaster } from 'react-hot-toast'
import { Route, Routes } from 'react-router-dom'
import AuthenticatedLayout from './layouts/AuthenticatedLayout'
import AdminLayout from './layouts/AdminLayout'

const HomePage = lazy(() => import('./pages/HomePage'))
const LoginPage = lazy(() => import('./pages/LoginPage'))
const RegisterPage = lazy(() => import('./pages/RegisterPage'))

const AdminCreateBlogPage = lazy(() => import('./pages/admin/CreateBlog'))

const App = () => {
  return (
    <>
      <Suspense fallback={<h1>Loading</h1>}>
        <Routes>
          <Route path = "/" element={<HomePage />}/>

          <Route path = "/login" element={<LoginPage />}/>

          <Route path = "/register" element={<RegisterPage />}/>

          <Route 
            path = "/*" 
            element={<AuthenticatedLayout />}>
            {/* Authenticated user routes starts */}

            {/* Authenticated user routes ends  */}

            <Route 
              path = "admin/*"
              element={<AdminLayout />}> 
              <Route
                path="create"
                element={<AdminCreateBlogPage />}>
              </Route>
            </Route>
          </Route>
          
         


          
          {/* Admin  */}

        </Routes>
        <Toaster />
      </Suspense>
    </>
  )
}

export default App