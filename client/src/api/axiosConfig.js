import axios from "axios"

const baseURL = import.meta.env.VITE_API_BASE_URL

if (!baseURL) throw new Error("Database URL is required but not defined.")

export default axios.create({ baseURL })

export async function fetchTodosFromAPI(userId) {
    const response = await fetch(`${baseURL}/api/v1/todos/user/${userId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    if (!response.ok) throw new Error("Failed to fetch todos.")
    return await response.json()
}

export async function addTodoFromAPI(userId, newTodo) {
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

export async function updateTodoFromAPI(id, updatedTodo) {
    const response = await fetch(`${baseURL}/api/v1/todos/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify(updatedTodo)
    })

    if (!response.ok) throw new Error("Failed to update todo.")
    return await response.json()
}

export async function updateUserFromAPI(id, updatedUser) {
    const response = await fetch(`${baseURL}/api/v1/users/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedUser)
    })

    if (!response.ok) throw new Error("Failed to update user")

    return await response.json()
}