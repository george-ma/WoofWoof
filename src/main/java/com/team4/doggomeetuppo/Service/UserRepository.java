package com.team4.doggomeetuppo.Service;

import com.team4.doggomeetuppo.Model.User;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository {
    User findByUserName(String userName);

    List<User> findUserByLocation(String geocode);

    List<User> getAllUsers();
    void saveUser(User user);
}
