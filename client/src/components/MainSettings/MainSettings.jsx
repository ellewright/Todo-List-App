import { useDarkMode } from "./../../contexts/DarkModeContext"
import { useNavigate } from "react-router-dom"
import "./MainSettings.css"

export default function MainSettings() {
    const { DARK_MODE_ACTIONS, isDarkMode, dispatch } = useDarkMode()

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
                <button
                    className={`delete-profile-button ${!isDarkMode ? "light" : ""}`}
                    onClick={() => navigate("/settings/delete-profile")}
                >
                    Delete Profile
                </button>
            </div>
        </>
    )
}