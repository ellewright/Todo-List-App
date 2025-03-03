import { useContext, useRef } from "react"
import { TodoContext } from "../../pages/TodoListPage/TodoListPage"
import "./NewTodoForm.css"
import { useDarkMode } from "../../contexts/DarkModeContext"

export default function NewTodoForm() {
    const nameRef = useRef()
    const { addNewTodo } = useContext(TodoContext)
    const { isDarkMode } = useDarkMode()

    function handleSubmit(e) {
        e.preventDefault()

        if (nameRef.current.value === "") return

        addNewTodo(nameRef.current.value)

        nameRef.current.value = ""
    }

    return (
        <>
            <form
                onSubmit={handleSubmit}
                id="new-todo-form"
                className="new-todo-form"
            >
                <label htmlFor="todo-input"></label>
                <input
                    autoFocus
                    type="text"
                    id="todo-input"
                    ref={nameRef}
                    placeholder="Go to gym..."
                    className={`${!isDarkMode ? "light" : ""}`}
                />
                <button>Add</button>
            </form>
        </>
    )
}