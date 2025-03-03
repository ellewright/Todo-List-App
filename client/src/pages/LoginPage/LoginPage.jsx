import { useState, useContext } from "react"
import api from "../../api/axiosConfig"
import "./LoginPage.css"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"
import { useDarkMode } from "../../contexts/DarkModeContext"

export default function LoginPage() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [hasError, setHasError] = useState(false)

    const { login } = useAuth()
    const navigate = useNavigate()

    const { isDarkMode } = useDarkMode()

    const handleUsername = (e) => {
        setUsername(e.target.value)
    }

    const handlePassword = (e) => {
        setPassword(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await api.post("/api/v1/users/login", { username, password })
            const userData = response.data
            login(userData)
            navigate("/todos")
        } catch (e) {
            setHasError(true)
        }

    }

    return (
        <>
            <div className="login-page">
                <h1 className="login-header">
                    Welcome!
                </h1>
                <p className="login-subheader">
                    Please log in:
                </p>
                <form
                    className="login-form"
                    onSubmit={handleSubmit}
                >
                    <div className="login-inputs">
                        <input
                            className={`login-input ${!isDarkMode ? "light" : ""}`}
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={handleUsername}
                        />
                        <input
                            className={`login-input ${!isDarkMode ? "light" : ""}`}
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={handlePassword}
                        />
                    </div>
                    <div className={`error-container ${!hasError ? "hidden" : ""}`}>
                        <p>
                            Incorrect username or password.
                        </p>
                    </div>
                    <div className="login-buttons">
                        <input
                            type="submit"
                            className="login-submit-button"
                        />
                        <div className="register-container">
                            Don't have an account?
                            <Link
                                to="/register"
                                className="register-button"
                            >
                                Register
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}