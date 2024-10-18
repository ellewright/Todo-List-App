import { useContext } from "react"
import { TodoContext } from "../../pages/TodoListPage/TodoListPage"
import TodoItem from "../TodoItem/TodoItem"
import "./TodoList.css"

export default function TodoList() {
    const { todos } = useContext(TodoContext)

    return (
        <>
            <div className="list-container">
                <ul id="list">
                    {todos.map(todo => {
                        return (
                            <TodoItem
                                key={todo.id}
                                {...todo}
                            />
                        )
                    })}
                </ul>
            </div>
        </>
    )
}