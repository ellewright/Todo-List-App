package me.ellewright.todolistapi.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import me.ellewright.todolistapi.entities.User;
import me.ellewright.todolistapi.services.UserService;

@RestController
@RequestMapping("/api/v1/users")
@CrossOrigin(origins = "*")
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> allUsers = userService.getAllUsers();
        return new ResponseEntity<List<User>>(allUsers, HttpStatus.OK);
    }
}
