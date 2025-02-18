import { useState } from "react"
import api from "../../api/axiosConfig"
import "./RegisterPage.css"
import { Link, useNavigate } from "react-router-dom"

export default function RegisterPage() {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [retypedPassword, setRetypedPassword] = useState("")

    const [hasError, setHasError] = useState(false)

    const navigate = useNavigate()

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
        <>
            <div className="register-page">
                <h1 className="register-header">
                    Welcome!
                </h1>
                <p className="register-subheader">
                    Please register your account below:
                </p>
                <form
                    className="register-form"
                    onSubmit={handleSubmit}
                >
                    <div className="register-inputs">
                        <input
                            className="register-input"
                            type="text"
                            placeholder="First name"
                            value={firstName}
                            onChange={handleFirstName}
                        />
                        <input
                            className="register-input"
                            type="text"
                            placeholder="Last name"
                            value={lastName}
                            onChange={handleLastName}
                        />
                        <input
                            className="register-input"
                            type="email"
                            placeholder="email@address.com"
                            value={email}
                            onChange={handleEmail}
                        />
                        <input
                            className="register-input"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={handlePassword}
                        />
                        <input
                            className="register-input"
                            type="password"
                            placeholder="Confirm password"
                            value={retypedPassword}
                            onChange={handleRetypedPassword}
                        />
                    </div>
                    <div className={`error-container ${!hasError ? "hidden" : ""}`}>
                        <p>
                            Registration failed: All fields must be completed.
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
            </div>
        </>
    )
}