import { useState } from "react"
import api from "../../api/axiosConfig"
import "./RegisterPage.css"
import { Link, useNavigate } from "react-router-dom"

export default function RegisterPage() {
    const navigate = useNavigate()
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [retypedPassword, setRetypedPassword] = useState("")

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
                const response = await api.post("/api/v1/users/register", {
                    firstName,
                    lastName,
                    email,
                    password
                })
                navigate("/login")
            } catch (e) {
                console.error(e)
            }
        } else {
            console.error("Password fields do not match!")
        }

    }

    return (
        <>
            <form action="" className="register-form" onSubmit={handleSubmit}>
                <input type="text" placeholder="First name." value={firstName} onChange={handleFirstName} />
                <input type="text" placeholder="Last name." value={lastName} onChange={handleLastName} />
                <input type="email" placeholder="email@address.com" value={email} onChange={handleEmail} />
                <input type="password" placeholder="Password." value={password} onChange={handlePassword} />
                <input type="password" placeholder="Retype password." value={retypedPassword} onChange={handleRetypedPassword} />
                <input type="submit" />
            </form>
            <Link to="/login">Login</Link>
        </>
    )
}