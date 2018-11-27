package com.team4.doggomeetuppo.Service;

import com.team4.doggomeetuppo.Model.User;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository {
    public User findByUserName(String userName);
    public User findByUserId(String userID);
    public List<User> getAllUsers();
    public void saveUser(User user);
}
