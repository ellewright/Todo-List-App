import RegisterForm from "../../components/RegisterForm/RegisterForm"
import "./RegisterPage.css"

export default function RegisterPage() {
    return (
        <>
            <div className="register-page">
                <h1 className="register-header">
                    Welcome!
                </h1>
                <p className="register-subheader">
                    Please register your account below:
                </p>
                <RegisterForm />
            </div>
        </>
    )
}