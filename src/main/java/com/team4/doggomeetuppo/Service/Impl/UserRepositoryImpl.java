package com.team4.doggomeetuppo.Service.Impl;

import com.team4.doggomeetuppo.Model.User;
import com.team4.doggomeetuppo.Service.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.stereotype.Repository;
import org.springframework.data.mongodb.core.query.Query;

import java.util.List;

@Repository
public class UserRepositoryImpl implements UserRepository {
    @Autowired
    private MongoTemplate mongoTemplate;

    @Override
    public User findByUserName(String userName) {
        Query query = new Query().addCriteria(Criteria.where("userName").is(userName));
        return mongoTemplate.findOne(query, User.class);
    }

    @Override
    public User findByUserId(String userID) {
        Query query = new Query().addCriteria(Criteria.where("id").is(userID));
        return mongoTemplate.findOne(query, User.class);
    }

    @Override
    public List<User> getAllUsers() {
        return mongoTemplate.findAll(User.class);
    }

    @Override
    public void saveUser(User course) {
        mongoTemplate.save(course);
    }
}
