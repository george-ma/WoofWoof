package com.team4.doggomeetuppo.Service;

import org.springframework.stereotype.Repository;
import org.springframework.web.multipart.MultipartFile;

@Repository
public interface ImageRepository {
    boolean saveProfilePic(MultipartFile profilePic, String username);
    byte[] getProfilePic(String username);
    boolean saveDogPic(MultipartFile dogPic, String username, String dogname);
    byte[] getDogPic(String username, String dogname);
    boolean saveEventPic(MultipartFile eventPic, String parkName, String eventName);
    byte[] getEventPic(String parkName, String eventName);
}
