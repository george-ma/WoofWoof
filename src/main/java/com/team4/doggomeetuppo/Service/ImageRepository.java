package com.team4.doggomeetuppo.Service;

import org.springframework.stereotype.Repository;
import org.springframework.web.multipart.MultipartFile;

@Repository
public interface ImageRepository {
    public boolean saveProfilePic(MultipartFile profilePic, String username);
    public byte[] getProfilePic(String username);
    public boolean saveDogPic(MultipartFile dogPic, String username, String dogname);
    public byte[] getDogPic(String username, String dogname);
}
