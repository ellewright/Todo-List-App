import { useContext, useRef, useState } from "react"
import { TodoContext } from "../../pages/TodoListPage/TodoListPage"
import "./TodoItem.css"
import { useDarkMode } from "../../contexts/DarkModeContext"

export default function TodoItem({ id, name, completed }) {
    const { toggleTodo, deleteTodo, updateTodo } = useContext(TodoContext)
    const [isEditing, setIsEditing] = useState(false)
    const nameRef = useRef()

    const { isDarkMode } = useDarkMode()

    function handleSubmit(e) {
        e.preventDefault()

        if (nameRef.current.value === "") return
        updateTodo(id, {
            name: nameRef.current.value,
            completed: completed
        })
        setIsEditing(false)
    }

    return (
        <li className="list-item">
            {isEditing ? (
                <form
                    onSubmit={handleSubmit}
                >
                    <input
                        autoFocus
                        type="text"
                        defaultValue={name}
                        ref={nameRef}
                        className={`${!isDarkMode ? "light" : ""}`}
                    />
                    <button>
                        Save
                    </button>
                </form>
            ) : (
                <>
                    <div>
                        <label className="list-item-label">
                            <input
                                checked={completed}
                                type="checkbox"
                                data-list-item-checkbox
                                onChange={e => {
                                    toggleTodo(id, e.target.checked)
                                    updateTodo(id, {
                                        name: name,
                                        completed: e.target.checked
                                    })
                                }}
                            />
                            <span
                                data-list-item-text
                                className={`todo-name ${completed ? "completed" : ""}`}
                            >{name}</span>
                        </label>
                        <div className="button-container">
                            <button
                                className={`edit-button ${!isDarkMode ? "light" : ""}`}
                                data-button-edit
                                onClick={() => setIsEditing(true)}
                            >
                                Edit
                            </button>
                            <button
                                className="delete-button"
                                onClick={() => deleteTodo(id)}
                                data-button-delete
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </>
            )}
        </li>
    )
}