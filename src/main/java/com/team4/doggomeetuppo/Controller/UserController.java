package com.team4.doggomeetuppo.Controller;

import com.team4.doggomeetuppo.Model.User;
import com.team4.doggomeetuppo.Service.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/api/user")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @RequestMapping(value = "/{userName}", method = RequestMethod.GET)
    public User getUserByUserName(@PathVariable("userName") String userName){
        return userRepository.findByUserName(userName);
    }

    @RequestMapping(value = "/allUsers", method = RequestMethod.GET)
    public List<User> getAllUsers(){
        return userRepository.getAllUsers();
    }

    @RequestMapping(value = "/save", method = RequestMethod.POST)
    public void saveUser(@RequestBody User user) {
        userRepository.saveUser(user);
    }
}
