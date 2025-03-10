import { useEffect, useState } from "react"
import { useAuth } from "../../contexts/AuthContext"
import { updateUserFromAPI } from "../../api/axiosConfig"
import { useNavigate } from "react-router-dom"
import { useDarkMode } from "../../contexts/DarkModeContext"
import "./EditProfileForm.css"

export default function EditProfileForm() {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [hasError, setHasError] = useState(false)

    const navigate = useNavigate()
    const { isDarkMode } = useDarkMode()
    const { user } = useAuth()

    useEffect(() => {
        if (user) {
            setUsername(user.username || "")
            setFirstName(user.firstName || "")
            setLastName(user.lastName || "")
            setEmail(user.email || "")
        }
    }, [user])

    const handleFirstName = (e) => {
        setFirstName(e.target.value)
    }

    const handleLastName = (e) => {
        setLastName(e.target.value)
    }

    const handleUsername = (e) => {
        setUsername(e.target.value)
    }

    const handleEmail = (e) => {
        setEmail(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            user.username = username
            user.firstName = firstName
            user.lastName = lastName
            user.email = email

            updateUserFromAPI(user.id, user)
            navigate("/")
        } catch (e) {
            setHasError(true)
        }
    }

    return (
        <>
            <form
                className="edit-profile-form"
                onSubmit={handleSubmit}
            >
                <input
                    type="text"
                    className={`input ${!isDarkMode ? "light" : ""}`}
                    placeholder={user.firstName}
                    value={firstName}
                    onChange={handleFirstName}
                    required
                />
                <input
                    type="text"
                    className={`input ${!isDarkMode ? "light" : ""}`}
                    placeholder={user.lastName}
                    value={lastName}
                    onChange={handleLastName}
                    required
                />
                <input
                    type="text"
                    className={`input ${!isDarkMode ? "light" : ""}`}
                    placeholder={user.username}
                    value={username}
                    onChange={handleUsername}
                    required
                />
                <input
                    type="email"
                    className={`input ${!isDarkMode ? "light" : ""}`}
                    placeholder={user.email}
                    value={email}
                    onChange={handleEmail}
                    required
                />
                <div className={`error-container ${!hasError ? "hidden" : ""}`}>
                    <p>
                        Update failed. Please try again.
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