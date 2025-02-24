import { useContext } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import { DarkModeContext } from "../../App"
import "./SettingsPage.css"

export default function SettingsPage() {
    return (
        <>
            <div className="settings-page">
                <h1 className="settings-header">
                    Settings
                </h1>
                <Outlet />
            </div>
        </>
    )
}

export function MainSettings() {
    const { DARK_MODE_ACTIONS, isDarkMode, dispatch } = useContext(DarkModeContext)

    const navigate = useNavigate()

    return (
        <>
            <div className="settings-buttons-container">
                <button
                    className={`theme-button ${!isDarkMode ? "light" : ""}`}
                    onClick={() => dispatch({ type: DARK_MODE_ACTIONS.TOGGLE })}
                >
                    {!isDarkMode ? "Dark" : "Light"} Mode
                </button>
                <button
                    className={`edit-profile-button ${!isDarkMode ? "light" : ""}`}
                    onClick={() => navigate("/settings/edit-profile")}
                >
                    Edit Profile
                </button>
                <button
                    className={`password-change-button ${!isDarkMode ? "light" : ""}`}
                    onClick={() => navigate("/settings/password-reset")}
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
        </>
    )
}