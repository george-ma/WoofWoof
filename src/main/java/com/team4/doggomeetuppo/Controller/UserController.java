package com.team4.doggomeetuppo.Controller;

import com.team4.doggomeetuppo.Model.User;
import com.team4.doggomeetuppo.Service.ImageRepository;
import com.team4.doggomeetuppo.Service.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping(value = "/api/user")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ImageRepository imageRepository;

    @GetMapping(value = "/{userName}")
    public User getUserByUserName(@PathVariable("userName") String userName){
        return userRepository.findByUserName(userName);
    }

    @GetMapping(value = "/allUsers")
    public List<User> getAllUsers() {
        return userRepository.getAllUsers();
    }

    @PostMapping(value = "/save")
    public void saveUser(@RequestBody User user) {
        userRepository.saveUser(user);
    }

    @PostMapping(value = "/saveProfilePic")
    public ResponseEntity saveProfilePic(
            @RequestParam(value = "profilePic") MultipartFile profilePic,
            @RequestParam(value = "username") String username
    ) {
        if (imageRepository.saveProfilePic(profilePic, username)) {
            return new ResponseEntity(HttpStatus.OK);
        } else {
            return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping(value = "/getProfilePic/{username}", produces = MediaType.IMAGE_JPEG_VALUE)
    public @ResponseBody byte[] getProfilePic(@PathVariable String username) {
        return imageRepository.getProfilePic(username);
    }

//    <img [src]="'data:image/JPEG;base64,' + result.arrayofbytes" />
    // display images

}
