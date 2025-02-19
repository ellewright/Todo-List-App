import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { DarkModeContext } from "../../App"
import "./SettingsPage.css"

export default function SettingsPage() {
    const { DARK_MODE_ACTIONS, isDarkMode, dispatch } = useContext(DarkModeContext)

    const navigate = useNavigate()

    return (
        <>
            <div className="settings-page">
                <h1 className="settings-header">
                    Settings
                </h1>
                <div className="settings-buttons-container">
                    <button
                        className={`theme-button ${!isDarkMode ? "light" : ""}`}
                        onClick={() => dispatch({ type: DARK_MODE_ACTIONS.TOGGLE })}
                    >
                        {!isDarkMode ? "Dark" : "Light"} Mode
                    </button>
                    <button
                        className={`password-change-button ${!isDarkMode ? "light" : ""}`}
                    >
                        Reset Password
                    </button>
                    <button
                        className={`back-button ${!isDarkMode ? "light" : ""}`}
                        onClick={() => navigate("/todos")}
                    >
                        Back
                    </button>
                </div>
            </div>
        </>
    )
}