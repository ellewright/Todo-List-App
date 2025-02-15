import axios from "axios"

const baseURL = import.meta.env.VITE_API_BASE_URL

if (!baseURL) throw new Error("Database URL is required but not defined.")

export default axios.create({ baseURL })

export async function fetchTodos(userId) {
    const response = await fetch(`${baseURL}/api/v1/todos/user/${userId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    if (!response.ok) throw new Error("Failed to fetch todos.")
    return await response.json()
}

export async function addTodo(userId, newTodo) {
    const response = await fetch(`${baseURL}/api/v1/todos/${userId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTodo)
    })

    if (!response.ok) throw new Error("Failed to add todo.")
    return await response.json()
}

export async function deleteTodoFromAPI(id) {
    return await fetch(`${baseURL}/api/v1/todos/${id}`, {
        method: 'DELETE',
    })
}