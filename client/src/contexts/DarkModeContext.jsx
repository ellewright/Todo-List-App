import { createContext, useContext, useReducer, useState } from "react"

const DarkModeContext = createContext()

export default function DarkModeProvider({ children }) {
    const DARK_MODE_KEY = "DARK_MODE"

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

    const [isDarkMode, dispatch] = useReducer(reducer, false, (initialValue) => {
        const value = localStorage.getItem(DARK_MODE_KEY)
        if (value == null) return initialValue

        return JSON.parse(value)
    })

    return (
        <DarkModeContext.Provider
            value={{
                DARK_MODE_ACTIONS,
                isDarkMode,
                dispatch
            }}
        >
            {children}
        </DarkModeContext.Provider>
    )
}

export function useDarkMode() {
    return useContext(DarkModeContext)
}