package me.ellewright.todolistapi.repositories;

import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import me.ellewright.todolistapi.entities.Todo;

@Repository
public interface TodoRepository extends MongoRepository<Todo, ObjectId> {
    List<Todo> findByUserId(String userId);
}
