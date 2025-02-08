package me.ellewright.todolistapi.controllers;

import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import me.ellewright.todolistapi.entities.Todo;
import me.ellewright.todolistapi.services.TodoService;

@RestController
@RequestMapping("/api/v1/todos")
@CrossOrigin(origins = "*")
public class TodoController {

    @Autowired
    private TodoService todoService;

    @GetMapping
    public ResponseEntity<List<Todo>> getAllTodos() {
        List<Todo> result = todoService.getAllTodos();
        return new ResponseEntity<List<Todo>>(result, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Todo> getTodoById(@PathVariable String id) {
        ObjectId idToRetrieve = new ObjectId(id);
        Todo retrievedTodo = todoService.getTodoById(idToRetrieve);

        return new ResponseEntity<Todo>(retrievedTodo, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Todo> createNewTodo(@RequestBody String name) {
        Todo createdTodo = todoService.createNewTodo(name);
        return new ResponseEntity<Todo>(createdTodo, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Todo> updateTodo(@PathVariable String id, @RequestBody Todo todo) {
        ObjectId idToUpdate = new ObjectId(id);
        Todo updatedTodo = todoService.updateTodo(idToUpdate, todo);

        return new ResponseEntity<Todo>(updatedTodo, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteTodo(@PathVariable String id) {
        ObjectId idToDelete = new ObjectId(id);
        todoService.deleteTodo(idToDelete);
        return new ResponseEntity<String>("Deleted successfully.", HttpStatus.ACCEPTED);
    }
}
