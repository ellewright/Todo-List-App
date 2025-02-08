package me.ellewright.todolistapi.services;

import java.util.List;
import java.util.Optional;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import me.ellewright.todolistapi.entities.Todo;
import me.ellewright.todolistapi.repositories.TodoRepository;

@Service
public class TodoService {
    @Autowired
    private TodoRepository todoRepository;

    public List<Todo> getAllTodos() {
        return todoRepository.findAll();
    }

    public Todo getTodoById(ObjectId objectId) {
        Optional<Todo> optionalRetrievedTodo = todoRepository.findById(objectId);

        if (optionalRetrievedTodo.isPresent()) {
            Todo retrievedTodo = optionalRetrievedTodo.get();
            return retrievedTodo;
        }

        return null;
    }

    public Todo createNewTodo(String name) {
        Todo newTodo = new Todo();
        newTodo.setName(name);
        return todoRepository.save(newTodo);
    }

    public Todo updateTodo(ObjectId objectId, Todo todo) {
        Optional<Todo> optionalUpdatingToDo = todoRepository.findById(objectId);

        if (optionalUpdatingToDo.isPresent()) {
            Todo updatingTodo = optionalUpdatingToDo.get();
            updatingTodo.setName(todo.getName());
            updatingTodo.setCompleted(todo.isCompleted());

            todoRepository.save(updatingTodo);

            return updatingTodo;
        }

        return null;
    }

    public void deleteTodo(ObjectId objectId) {
        todoRepository.deleteById(objectId);
    }
}
