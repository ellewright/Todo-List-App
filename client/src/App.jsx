import TodoListPage from "./pages/TodoListPage/TodoListPage"
import "./App.css"
import { createContext, useEffect, useReducer, useState } from "react"
import LoginPage from "./pages/LoginPage/LoginPage"
import RegisterPage from "./pages/RegisterPage/RegisterPage"

const DARK_MODE_KEY = "DARK_MODE"

export const DarkModeContext = createContext()

const DARK_MODE_ACTIONS = {
  TOGGLE: "TOGGLE"
}

function reducer(state, { type }) {
  switch (type) {
    case DARK_MODE_ACTIONS.TOGGLE:
      return !state
    default:
      return state
  }
}

function App() {
  const [isDarkMode, dispatch] = useReducer(reducer, false, (initialValue) => {
    const value = localStorage.getItem(DARK_MODE_KEY)
    if (value == null) return initialValue

    return JSON.parse(value)
  })

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
        <DarkModeContext.Provider
          value={{
            isDarkMode
          }}
        >
          <TodoListPage />
        </DarkModeContext.Provider>
        <button
          className={`theme-button ${!isDarkMode ? "light" : ""}`}
          onClick={() => dispatch({ type: DARK_MODE_ACTIONS.TOGGLE })}
        >
          {!isDarkMode ? "Dark" : "Light"} Mode
        </button>
      </div>
    </>
  )
}

export default App