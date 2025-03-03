import TodoListPage from "./pages/TodoListPage/TodoListPage"
import "./App.css"
import { createContext, useEffect, useReducer, useState } from "react"
import LoginPage from "./pages/LoginPage/LoginPage"
import RegisterPage from "./pages/RegisterPage/RegisterPage"
import { Outlet } from "react-router-dom"
import { useDarkMode } from "./contexts/DarkModeContext"

function App() {
  const { isDarkMode, DARK_MODE_KEY } = useDarkMode()

  useEffect(() => {
    localStorage.setItem(DARK_MODE_KEY, JSON.stringify(isDarkMode))

    document.body.style.backgroundColor = !isDarkMode ?
      "var(--lighter-gray)" : "var(--dark-gray)"

    return () => {
      document.body.style.backgroundColor = ""
    };
  }, [isDarkMode])

  return (
    <>
      <div className={`app-container ${!isDarkMode ? "light" : ""}`}>
        <Outlet />
      </div>
    </>
  )
}

export default App