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

    public List<Todo> getTodosByUserId(String userId) {
        return todoRepository.findByUserId(userId);
    }

    public Todo getTodoById(ObjectId objectId) {
        Optional<Todo> optionalRetrievedTodo = todoRepository.findById(objectId);

        if (optionalRetrievedTodo.isPresent()) {
            Todo retrievedTodo = optionalRetrievedTodo.get();
            return retrievedTodo;
        }

        return null;
    }

    public Todo createNewTodo(String userId, Todo todo) {
        // Todo newTodo = new Todo();
        // newTodo.setUserId(userId);
        // newTodo.setName(name);
        // newTodo.setCompleted(false);
        // return todoRepository.save(newTodo);

        todo.setUserId(userId);
        return todoRepository.save(todo);
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
