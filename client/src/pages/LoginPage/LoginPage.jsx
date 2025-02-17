import { useState } from "react"
import api from "../../api/axiosConfig"
import "./LoginPage.css"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"

export default function LoginPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const { login } = useAuth()
    const navigate = useNavigate()

    const handleEmail = (e) => {
        setEmail(e.target.value)
    }

    const handlePassword = (e) => {
        setPassword(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await api.post("/api/v1/users/login", { email, password })
            const userData = response.data
            login(userData)
            navigate("/todos")
        } catch (e) {
            console.error(e)
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
                            className="login-input"
                            type="email"
                            placeholder="email@address.com"
                            value={email}
                            onChange={handleEmail}
                        />
                        <input
                            className="login-input"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={handlePassword}
                        />
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