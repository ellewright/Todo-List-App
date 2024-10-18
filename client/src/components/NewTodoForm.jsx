import { useContext, useRef } from "react"
import { TodoContext } from "../pages/TodoListPage/TodoListPage"

export default function NewTodoForm() {
    const nameRef = useRef()
    const { addNewTodo } = useContext(TodoContext)

    function handleSubmit(e) {
        e.preventDefault()

        if (nameRef.current.value === "") return

        addNewTodo(nameRef.current.value)

        nameRef.current.value = ""
    }

    return (
        <>
            <form onSubmit={handleSubmit} id="new-todo-form">
                <label htmlFor="todo-input">New: </label>
                <input
                    type="text"
                    id="todo-input"
                    ref={nameRef}
                    placeholder="Pick up groceries..."
                />
                <button>Add</button>
            </form>
        </>
    )
}