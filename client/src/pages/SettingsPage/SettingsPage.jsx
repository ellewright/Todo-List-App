import { useContext } from "react"
import { DarkModeContext } from "../../App"
import "./SettingsPage.css"

export default function SettingsPage() {

    const { DARK_MODE_ACTIONS, isDarkMode, dispatch } = useContext(DarkModeContext)

    return (
        <>
            <div className="settings-page">
                <h1 className="settings-header">
                    Settings
                </h1>
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