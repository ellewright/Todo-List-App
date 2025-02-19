import NewTodoForm from "../../components/NewTodoForm/NewTodoForm"
import { useEffect, useReducer, createContext, useState, useContext } from "react"
import TodoList from "../../components/TodoList/TodoList"
import TodoFilterForm from "../../components/TodoFilterForm/TodoFilterForm"
import { DarkModeContext } from "../../App"
import "./TodoListPage.css"
import { useAuth } from "../../contexts/AuthContext"
import { useNavigate } from "react-router-dom"
import { fetchTodosFromAPI, addTodoFromAPI, updateTodoFromAPI, deleteTodoFromAPI } from "../../api/axiosConfig"

const LOCAL_STORAGE_KEY = "TODOS"
const ACTIONS = {
    ADD: "ADD",
    TOGGLE: "TOGGLE",
    UPDATE: "UPDATE",
    REMOVE: "REMOVE"
}

export const TodoContext = createContext()

function reducer(todos, { type, payload }) {
    switch (type) {
        case ACTIONS.ADD:
            return [
                ...todos,
                ...payload.map(todo => ({
                    id: todo.id,
                    name: todo.name,
                    completed: todo.completed
                })),
            ]
        case ACTIONS.TOGGLE:
            return todos.map(todo => {
                if (todo.id === payload.id) return { ...todo, completed: payload.completed }

                return todo
            })
        case ACTIONS.UPDATE:
            return todos.map(todo => {
                if (todo.id === payload.id) {
                    return { ...todo, name: payload.todo.name, completed: payload.todo.completed }
                }

                return todo
            })
        case ACTIONS.REMOVE:
            return todos.filter(todo => todo.id !== payload.id)
        default:
            throw new Error(`No action found for ${type}.`)
    }
}

export default function TodoListPage() {
    const { user, logout } = useAuth()
    const [filter, setFilter] = useState("")
    const [hideCompleted, setHideCompleted] = useState(false)

    const { isDarkMode } = useContext(DarkModeContext)

    const [todos, dispatch] = useReducer(reducer, [])

    useEffect(() => {
        const loadTodos = async () => {
            if (!user?.id) return

            try {
                const retrievedTodos = await fetchTodosFromAPI(user?.id)
                dispatch({ type: ACTIONS.ADD, payload: retrievedTodos })
            } catch (e) {
                console.error("Failed to retrieve todos: " + e)
            }
        }

        loadTodos()
    }, [user?.id])

    const filteredTodos = todos.filter((todo) => {
        if (!todo || !todo.name) return false;

        if (hideCompleted && todo.completed) return false
        return todo.name.includes(filter)
    })

    async function addNewTodo(name) {
        if (!user?.id || name === "") return

        const newTodo = { name: name, completed: false }

        try {
            await addTodoFromAPI(user?.id, newTodo).then(addedTodo => {
                dispatch({ type: ACTIONS.ADD, payload: [addedTodo] })
            })
        } catch (e) {
            console.error("Failed to add todo: " + e)
        }
    }

    function toggleTodo(todoId, completed) {
        dispatch({
            type: ACTIONS.TOGGLE,
            payload: {
                id: todoId,
                completed
            }
        })
    }

    async function updateTodo(todoId, todo) {
        const response = await updateTodoFromAPI(todoId, todo)
        dispatch({
            type: ACTIONS.UPDATE,
            payload: {
                id: todoId,
                todo: todo
            }
        })
    }

    async function deleteTodo(todoId) {
        const response = await deleteTodoFromAPI(todoId)
        dispatch({ type: ACTIONS.REMOVE, payload: { id: todoId } })
    }

    function handleLogout() {
        logout()
    }

    return (
        <>
            <div className={`page-container ${!isDarkMode ? "light" : ""}`}>
                <TodoContext.Provider value={{
                    todos: filteredTodos,
                    addNewTodo,
                    toggleTodo,
                    updateTodo,
                    deleteTodo
                }}>
                    <TodoFilterForm
                        className="filter-form"
                        filter={filter}
                        setFilter={setFilter}
                        hideCompleted={hideCompleted}
                        setHideCompleted={setHideCompleted}
                    />
                    <TodoList
                        className="todo-list"
                    />
                    <NewTodoForm
                        className="new-todo-form"
                    />
                </TodoContext.Provider>
            </div>
            <div className="buttons-container">
                <button className={`settings button ${!isDarkMode ? "light" : ""}`}>
                    Settings
                </button>
                <button
                    className="logout button"
                    onClick={() => handleLogout()}
                >
                    Logout
                </button>
            </div>
        </>
    )
}