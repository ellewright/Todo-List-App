import { createRoot } from 'react-dom/client'
import { RouterProvider } from "react-router-dom"
import { router } from './router.jsx'
import AuthProvider from './contexts/AuthContext.jsx'
import DarkModeProvider from './contexts/DarkModeContext.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <DarkModeProvider>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </DarkModeProvider>
)
