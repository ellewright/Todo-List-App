import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from "react-router-dom"
import { router } from './router.jsx'
import './index.css'
import AuthProvider from './contexts/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
)
