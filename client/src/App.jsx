import { useEffect } from "react"
import { Outlet } from "react-router-dom"
import { useDarkMode } from "./contexts/DarkModeContext"
import "./App.css"

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