import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"
import { useDarkMode } from "../../contexts/DarkModeContext"
import { useState, useContext } from "react"
import api, { deleteUserFromAPI } from "../../api/axiosConfig"
import "./DeleteProfileForm.css"

export default function DeleteProfileForm() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [hasError, setHasError] = useState(false)

    const { user } = useAuth()
    const navigate = useNavigate()

    const { isDarkMode } = useDarkMode()

    const handleUsername = (e) => {
        setUsername(e.target.value)
    }

    const handlePassword = (e) => {
        setPassword(e.target.value)
    }

    const handleDelete = async (e) => {
        e.preventDefault()

        try {
            const response = await api.post("/api/v1/users/login", { username, password })
            const userData = response.data
            deleteUserFromAPI(userData.id)
            navigate("/login")
        } catch (e) {
            setHasError(true)
        }

    }

    return (
        <form
            className="delete-form"
            onSubmit={handleDelete}
        >
            <div className="delete-inputs">
                <input
                    className={`delete-input ${!isDarkMode ? "light" : ""}`}
                    type="text"
                    placeholder="Confirm username"
                    value={username}
                    onChange={handleUsername}
                />
                <input
                    className={`delete-input ${!isDarkMode ? "light" : ""}`}
                    type="password"
                    placeholder="Confirm password"
                    value={password}
                    onChange={handlePassword}
                />
            </div>
            <div className={`error-container ${!hasError ? "hidden" : ""}`}>
                <p>
                    Incorrect username or password.
                </p>
            </div>
            <div className="delete-buttons">
                <input
                    type="submit"
                    className="delete-submit-button"
                    value="Delete My Profile"
                />
            </div>
        </form>
    )
}