import { createBrowserRouter, Navigate } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import TodoListPage from "./pages/TodoListPage/TodoListPage";
import App from "./App";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

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
            }
        ]
    }
])