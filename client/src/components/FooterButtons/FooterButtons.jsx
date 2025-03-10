import { Link } from "react-router-dom"
import { useDarkMode } from "../../contexts/DarkModeContext"
import { useAuth } from "../../contexts/AuthContext"
import "./FooterButtons.css"

export default function FooterButtons() {
    const { isDarkMode } = useDarkMode()
    const { logout } = useAuth()

    function handleLogout() {
        logout()
    }

    return (
        <div className="buttons-container">
            <Link
                className={`settings button ${!isDarkMode ? "light" : ""}`}
                to="/settings"
            >
                Settings
            </Link>
            <button
                className="logout button"
                onClick={() => handleLogout()}
            >
                Logout
            </button>
        </div >
    )
}