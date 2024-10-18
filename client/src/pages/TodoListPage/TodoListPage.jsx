import NewTodoForm from "../../components/NewTodoForm"
import TodoItem from "../../components/TodoItem"
import { useEffect, useReducer, createContext, useState } from "react"
import TodoList from "../../components/TodoList"
import TodoFilterForm from "../../components/TodoFilterForm"

const LOCAL_STORAGE_KEY = "TODOS"
const ACTIONS = {
    ADD: "ADD",
    TOGGLE: "TOGGLE",
    UPDATE: "UPDATE",
    DELETE: "DELETE"
}

export const TodoContext = createContext()

function reducer(todos, { type, payload }) {
    switch (type) {
        case ACTIONS.ADD:
            return [
                ...todos,
                { name: payload.name, completed: false, id: crypto.randomUUID() },
            ]
        case ACTIONS.TOGGLE:
            return todos.map(todo => {
                if (todo.id === payload.id) return { ...todo, completed: payload.completed }

                return todo
            })
        case ACTIONS.DELETE:
            return todos.filter(todo => todo.id !== payload.id)
        default:
            throw new Error(`No action found for ${type}.`)
    }
}

export default function TodoListPage() {
    const [filter, setFilter] = useState("")
    const [hideCompleted, setHideCompleted] = useState(false)

    const [todos, dispatch] = useReducer(reducer, [], (initialValue) => {
        const value = localStorage.getItem(LOCAL_STORAGE_KEY)
        if (value == null) return initialValue

        return JSON.parse(value)
    })

    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
    }, [todos])

    const filteredTodos = todos.filter((todo) => {
        if (hideCompleted && todo.completed) return false
        return todo.name.includes(filter)
    })

    function addNewTodo(name) {
        if (name === "") return
        dispatch({ type: ACTIONS.ADD, payload: { name: name } })
    }

    function toggleTodo(todoId, completed) {
        dispatch({
            type: ACTIONS.TOGGLE, payload: {
                id: todoId,
                completed
            }
        })
    }

    function deleteTodo(todoId) {
        dispatch({ type: ACTIONS.DELETE, payload: { id: todoId } })
    }

    return (
        <>
            <TodoContext.Provider value={{
                todos: filteredTodos,
                addNewTodo,
                toggleTodo,
                deleteTodo
            }}>
                <TodoFilterForm
                    filter={filter}
                    setFilter={setFilter}
                    hideCompleted={hideCompleted}
                    setHideCompleted={setHideCompleted}
                />
                <TodoList />
                <NewTodoForm />
            </TodoContext.Provider>
        </>
    )
}