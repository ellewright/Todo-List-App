import { useContext, useRef, useState } from "react"
import { TodoContext } from "../../pages/TodoListPage/TodoListPage"
import "./TodoItem.css"

export default function TodoItem({ id, name, completed }) {
    const { toggleTodo, deleteTodo, updateTodo } = useContext(TodoContext)
    const [isEditing, setIsEditing] = useState(false)
    const nameRef = useRef()

    function handleSubmit(e) {
        e.preventDefault()

        if (nameRef.current.value === "") return
        updateTodo(id, nameRef.current.value)
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
                    />
                    <button>
                        Save
                    </button>
                </form>
            ) : (
                <>
                    <label className="list-item-label">
                        <input
                            checked={completed}
                            type="checkbox"
                            data-list-item-checkbox
                            onChange={e => toggleTodo(id, e.target.checked)}
                        />
                        <span data-list-item-text>{name}</span>
                    </label>
                    <button
                        data-button-edit
                        onClick={() => setIsEditing(true)}
                    >
                        Edit
                    </button>
                    <button
                        onClick={() => deleteTodo(id)}
                        data-button-delete
                    >
                        Delete
                    </button>
                </>
            )}
        </li>
    )
}