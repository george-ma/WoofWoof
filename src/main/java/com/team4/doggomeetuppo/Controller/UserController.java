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
import java.util.stream.Collectors;

@CrossOrigin(origins = "http://localhost:8100")
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

    @CrossOrigin
    @GetMapping(value = "/allUsers")
    public List<User> getAllUsers() {
        return userRepository.getAllUsers();
    }

    @CrossOrigin
    @PostMapping(value = "/save")
    public void saveUser(@RequestBody User user) {
        userRepository.saveUser(user);
    }

    @CrossOrigin
    @PostMapping(value = "/verifyLogin")
    public boolean verifyLogin(
            @RequestParam(value = "userName") String userName,
            @RequestParam(value = "password") String password
    ) {
        return userRepository.getAllUsers()
                .stream()
                .anyMatch(user -> user.getUserName().equals(userName) && user.getPassword().equals(password));
    }

    @CrossOrigin
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

    @CrossOrigin
    @GetMapping(value = "/getProfilePic/{username}", produces = MediaType.IMAGE_JPEG_VALUE)
    public @ResponseBody byte[] getProfilePic(@PathVariable String username) {
        return imageRepository.getProfilePic(username);
    }

    @CrossOrigin
    @PostMapping(value = "/saveDogPic", consumes = "multipart/form-data")
    public ResponseEntity saveDogPic(
        @RequestParam(value = "profilePic") MultipartFile profilePic,
        @RequestParam(value = "username") String username,
        @RequestParam(value = "dogname") String dogname,
        @RequestParam(value = "description") String description,
        @RequestParam(value = "breed") String breed
    ) {
        if (imageRepository.saveDogPic(profilePic, username, dogname)) {
            return new ResponseEntity(HttpStatus.OK);
        } else {
            return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @CrossOrigin
    @GetMapping(value = "/getDogPic/{username}/{dogname}", produces = MediaType.IMAGE_JPEG_VALUE)
    public @ResponseBody byte[] getDogPic(@PathVariable("username") String username,@PathVariable("dogname") String dogname) {
        return imageRepository.getDogPic(username,dogname);
    }

    @CrossOrigin
    @GetMapping(value = "/getLocation/{username}")
    public @ResponseBody String getLocation(@PathVariable("username") String userName){
         User user = userRepository.findByUserName(userName);
         return user.getGeocode();
    }

    @CrossOrigin
    @PostMapping(value = "/checkIn/{username}")
    public void checkIn(@PathVariable("username") String userName, @RequestParam(value = "geocode") String geocode){
        User user = userRepository.findByUserName(userName);
        user.setGeocode(geocode);
        userRepository.saveUser(user);
    }

    @CrossOrigin
    @PostMapping(value = "/allUsersAtPark")
    public @ResponseBody List<String> getAllUsersAtPark(@RequestParam(value = "geocode") String geocode) {
        return userRepository.findUserByLocation(geocode).stream().map(User::getUserName).collect(Collectors.toList());
    }
}
