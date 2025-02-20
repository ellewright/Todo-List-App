import "./PasswordResetForm.css"
import { updateUserFromAPI } from "../../api/axiosConfig"
import { useAuth } from "../../contexts/AuthContext"
import { useContext, useState } from "react"
import { DarkModeContext } from "../../App"
import { useNavigate } from "react-router-dom"

export default function PasswordResetForm() {
    const [prevPassword, setPrevPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmedPassword, setConfirmedPassword] = useState("")
    const [hasError, setHasError] = useState(false)

    const navigate = useNavigate()

    const { isDarkMode } = useContext(DarkModeContext)

    const { user, login } = useAuth()

    const handleSubmit = async (e) => {
        e.preventDefault()

        if ((newPassword === confirmedPassword) && (newPassword !== prevPassword) && (prevPassword === user.password)) {
            try {
                user.password = newPassword
                updateUserFromAPI(user.id, user)
                navigate("/")
            } catch (e) {
                setHasError(true)
            } finally {
                console.log(hasError)
            }
        } else {
            setHasError(true)
        }
    }

    return (
        <>
            <form
                className="password-reset-form"
                onSubmit={handleSubmit}
            >
                <input
                    type="password"
                    className={`input ${!isDarkMode ? "light" : ""}`}
                    placeholder="Old password"
                    value={prevPassword}
                    onChange={e => setPrevPassword(e.target.value)}
                    required
                />
                <input
                    type="password"
                    className={`input ${!isDarkMode ? "light" : ""}`}
                    placeholder="New password"
                    value={newPassword}
                    onChange={e => setNewPassword(e.target.value)}
                    required
                />
                <input
                    type="password"
                    className={`input ${!isDarkMode ? "light" : ""}`}
                    placeholder="Confirm new password"
                    value={confirmedPassword}
                    onChange={e => setConfirmedPassword(e.target.value)}
                    required
                />
                <div className={`error-container ${!hasError ? "hidden" : ""}`}>
                    <p>
                        Password reset failed. Please try again.
                    </p>
                </div>
                <input
                    type="submit"
                    className="submit"
                />
            </form>
        </>
    )
}