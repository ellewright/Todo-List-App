import { useState } from "react"
import api from "../../api/axiosConfig"
import "./LoginPage.css"

export default function LoginPage() {
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
            const data = response.data
            console.log("Submitted: ", email, password)
            console.log(data)
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
        </>
    )
}