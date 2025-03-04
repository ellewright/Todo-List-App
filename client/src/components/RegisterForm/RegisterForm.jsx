import { Link, useNavigate } from "react-router-dom"
import { useDarkMode } from "../../contexts/DarkModeContext"
import { useState } from "react"
import api from "../../api/axiosConfig"
import "./RegisterForm.css"

export default function RegisterForm() {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [retypedPassword, setRetypedPassword] = useState("")

    const [hasError, setHasError] = useState(false)

    const { isDarkMode } = useDarkMode()

    const navigate = useNavigate()

    const handleUsername = (e) => {
        setUsername(e.target.value)
    }

    const handleFirstName = (e) => {
        setFirstName(e.target.value)
    }

    const handleLastName = (e) => {
        setLastName(e.target.value)
    }

    const handleEmail = (e) => {
        setEmail(e.target.value)
    }

    const handlePassword = (e) => {
        setPassword(e.target.value)
    }

    const handleRetypedPassword = (e) => {
        setRetypedPassword(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (password === retypedPassword) {
            try {
                await api.post("/api/v1/users/register", {
                    username,
                    firstName,
                    lastName,
                    email,
                    password
                })
                navigate("/login")
            } catch (e) {
                setHasError(true)
            }
        } else {
            setHasError(true)
        }
    }

    return (
        <form
            className="register-form"
            onSubmit={handleSubmit}
        >
            <div className="register-inputs">
                <input
                    className={`register-input ${!isDarkMode ? "light" : ""}`}
                    type="text"
                    placeholder="First name"
                    value={firstName}
                    onChange={handleFirstName}
                />
                <input
                    className={`register-input ${!isDarkMode ? "light" : ""}`}
                    type="text"
                    placeholder="Last name"
                    value={lastName}
                    onChange={handleLastName}
                />
                <input
                    className={`register-input ${!isDarkMode ? "light" : ""}`}
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={handleUsername}
                />
                <input
                    className={`register-input ${!isDarkMode ? "light" : ""}`}
                    type="email"
                    placeholder="email@address.com"
                    value={email}
                    onChange={handleEmail}
                />
                <input
                    className={`register-input ${!isDarkMode ? "light" : ""}`}
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={handlePassword}
                />
                <input
                    className={`register-input ${!isDarkMode ? "light" : ""}`}
                    type="password"
                    placeholder="Confirm password"
                    value={retypedPassword}
                    onChange={handleRetypedPassword}
                />
            </div>
            <div className={`error-container ${!hasError ? "hidden" : ""}`}>
                <p>
                    Registration failed: All fields must be valid.
                </p>
            </div>
            <div className="register-buttons">
                <input
                    className="register-submit-button"
                    type="submit"
                />
                <div className="login-container">
                    Already have an account?
                    <Link
                        className="login-button"
                        to="/login"
                    >
                        Login
                    </Link>
                </div>
            </div>
        </form>
    )
}