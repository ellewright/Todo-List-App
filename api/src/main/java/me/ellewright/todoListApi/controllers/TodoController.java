package me.ellewright.todolistapi.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
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

    @PostMapping
    public ResponseEntity<Todo> createNewTodo(@RequestBody String name) {
        Todo createdTodo = todoService.createNewTodo(name);
        return new ResponseEntity<Todo>(createdTodo, HttpStatus.OK);
    }
}
