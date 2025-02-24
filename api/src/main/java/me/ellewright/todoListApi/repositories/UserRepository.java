package me.ellewright.todolistapi.repositories;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import me.ellewright.todolistapi.entities.User;

@Repository
public interface UserRepository extends MongoRepository<User, ObjectId> {
    User findByEmail(String email);

    User findByUsername(String username);

    User findByUsernameAndPassword(String email, String password);
}
