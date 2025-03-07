import LoginForm from "../../components/LoginForm/LoginForm"
import "./LoginPage.css"

export default function LoginPage() {
    return (
        <>
            <div className="login-page">
                <h1 className="login-header">
                    Welcome!
                </h1>
                <p className="login-subheader">
                    Please log in:
                </p>
                <LoginForm />
            </div>
        </>
    )
}