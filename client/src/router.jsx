import { createBrowserRouter, Navigate } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import TodoListPage from "./pages/TodoListPage/TodoListPage";
import App from "./App";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import SettingsPage, { MainSettings } from "./pages/SettingsPage/SettingsPage";
import EditProfileForm from "./components/EditProfileForm/EditProfileForm";
import PasswordResetForm from "./components/PasswordResetForm/PasswordResetForm";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                index: true,
                element: <Navigate to="/login" />
            },
            {
                path: "register",
                element: <RegisterPage />
            },
            {
                path: "login",
                element: <LoginPage />
            },
            {
                path: "todos",
                element: (
                    <ProtectedRoute>
                        <TodoListPage />
                    </ProtectedRoute>
                )
            },
            {
                path: "settings",
                element: (
                    <ProtectedRoute>
                        <SettingsPage />
                    </ProtectedRoute>
                ),
                children: [
                    {
                        index: true,
                        element: <MainSettings />
                    },
                    {
                        path: "password-reset",
                        element: (
                            <ProtectedRoute>
                                <PasswordResetForm />
                            </ProtectedRoute>
                        )
                    },
                    {
                        path: "edit-profile",
                        element: (
                            <ProtectedRoute>
                                <EditProfileForm />
                            </ProtectedRoute>
                        )
                    }
                ]
            }
        ]
    }
])