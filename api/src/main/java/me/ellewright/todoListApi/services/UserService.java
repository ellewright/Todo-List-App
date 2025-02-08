package me.ellewright.todolistapi.services;

import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import me.ellewright.todolistapi.entities.User;
import me.ellewright.todolistapi.repositories.UserRepository;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User createUser(String firstName, String lastName, String email, String password) {
        User newUser = new User();
        newUser.setFirstName(firstName);
        newUser.setLastName(lastName);
        newUser.setEmail(email);
        newUser.setPassword(password);

        return userRepository.save(newUser);
    }

    public void deleteUser(ObjectId objectId) {
        userRepository.deleteById(objectId);
    }
}
