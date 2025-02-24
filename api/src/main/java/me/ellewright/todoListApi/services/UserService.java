package me.ellewright.todolistapi.services;

import java.util.List;
import java.util.Optional;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import me.ellewright.todolistapi.entities.User;
import me.ellewright.todolistapi.exceptions.InvalidRegistrationException;
import me.ellewright.todolistapi.exceptions.UserNotFoundException;
import me.ellewright.todolistapi.repositories.UserRepository;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User getUserByUsernameAndPassword(String username, String password) {
        User retrievedUser = userRepository.findByUsernameAndPassword(username, password);

        if (retrievedUser == null) {
            throw new UserNotFoundException("Invalid credentials.");
        }

        return retrievedUser;
    }

    public User createUser(String username, String firstName, String lastName, String email, String password) {
        String defaultProfilePictureUrl = "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_1280.png";

        if (userRepository.findByEmail(email) != null) {
            throw new InvalidRegistrationException("Sorry, an account with that email already exists!");
        }

        if (userRepository.findByUsername(username) != null) {
            throw new InvalidRegistrationException("Sorry, an account with that username already exists!");
        }

        if ((username.equals("")) || (firstName.equals("")) || (lastName.equals("")) || (email.equals(""))
                || (password.equals(""))) {
            throw new InvalidRegistrationException("All fields must be completed to register.");
        }

        User newUser = new User();
        newUser.setProfilePictureUrl(defaultProfilePictureUrl);
        newUser.setUsername(username);
        newUser.setFirstName(firstName);
        newUser.setLastName(lastName);
        newUser.setEmail(email);
        newUser.setPassword(password);

        return userRepository.save(newUser);
    }

    public User updateUser(ObjectId objectId, User user) {
        Optional<User> optionalUpdatingUser = userRepository.findById(objectId);

        if (optionalUpdatingUser.isPresent()) {
            User updatingUser = optionalUpdatingUser.get();
            updatingUser.setUsername(user.getUsername());
            updatingUser.setFirstName(user.getFirstName());
            updatingUser.setLastName(user.getLastName());
            updatingUser.setEmail(user.getEmail());
            updatingUser.setPassword(user.getPassword());

            return userRepository.save(updatingUser);
        }

        return null;
    }

    public void deleteUser(ObjectId objectId) {
        userRepository.deleteById(objectId);
    }
}
