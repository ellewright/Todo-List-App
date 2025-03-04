import { Outlet } from "react-router-dom"
import "./SettingsPage.css"

export default function SettingsPage() {
    return (
        <>
            <div className="settings-page">
                <h1 className="settings-header">
                    Settings
                </h1>
                <Outlet />
            </div>
        </>
    )
}