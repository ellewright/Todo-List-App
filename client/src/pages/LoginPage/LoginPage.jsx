import { useState } from "react"
import api from "../../api/axiosConfig"
import "./LoginPage.css"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"

export default function LoginPage() {
    const { login } = useAuth()
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

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
            console.log("Successfully logged in!")
            navigate("/todos")
        } catch (e) {
            console.error(e)
        }

    }

    return (
        <>
            <form action="" className="login-form" onSubmit={handleSubmit}>
                <input type="email" placeholder="email@address.com" value={email} onChange={handleEmail} />
                <input type="password" placeholder="Password." value={password} onChange={handlePassword} />
                <input type="submit" />
            </form>
            <Link to="/register">Register</Link>
        </>
    )
}