import TodoListPage from "./pages/TodoListPage/TodoListPage"
import "./App.css"
import { createContext, useEffect, useState } from "react"

export const DarkModeContext = createContext()

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true)

  useEffect(() => {
    document.body.style.backgroundColor = !isDarkMode ?
      "white" : "var(--dark-gray)"

    return () => {
      document.body.style.backgroundColor = ""
    };
  }, [isDarkMode])

  return (
    <>
      <div className={`app-container ${!isDarkMode ? "light" : ""}`}>
        <DarkModeContext.Provider
          value={{
            isDarkMode
          }}
        >
          <TodoListPage />
        </DarkModeContext.Provider>
        <button
          className={`theme-button ${!isDarkMode ? "light" : ""}`}
          onClick={() => setIsDarkMode(t => !t)}
        >
          {!isDarkMode ? "Dark" : "Light"} Mode
        </button>
      </div>
    </>
  )
}

export default App