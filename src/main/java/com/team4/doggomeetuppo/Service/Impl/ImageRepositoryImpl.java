package com.team4.doggomeetuppo.Service.Impl;

import com.mongodb.BasicDBObject;
import com.mongodb.DBObject;
import com.mongodb.client.gridfs.model.GridFSFile;
import com.team4.doggomeetuppo.Service.ImageRepository;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.gridfs.GridFsCriteria;
import org.springframework.data.mongodb.gridfs.GridFsResource;
import org.springframework.data.mongodb.gridfs.GridFsTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.util.StreamUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.util.Optional;

@Repository
public class ImageRepositoryImpl implements ImageRepository {

    private static final Logger logger = LogManager.getLogger(ImageRepository.class);

    @Autowired
    private GridFsTemplate gridFsTemplate;

    @Override
    public boolean saveProfilePic(MultipartFile profilePic, String username) {
        try (InputStream profilePicStream = profilePic.getInputStream()) {
            if (maybeLoadFile(username).isPresent()) {
                gridFsTemplate.delete(getFileByNameQuery(username));
                logger.info(String.format("Deleted existing profile pic for user: %s", username));
            }
//            InputStream in = getClass()
//                    .getResourceAsStream("/com/team4/doggomeetuppo/Resources/test_image.jpg");
            DBObject metadata = new BasicDBObject();
            metadata.put("username", username);
            gridFsTemplate.store(profilePicStream, metadata);
            logger.info(String.format("Stored new profile pic for user: %s", username));
            return true;
        } catch (IOException e) {
            logger.error(e.getCause());
            logger.error(e.getMessage());
            logger.error(e.getStackTrace());
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public byte[] getProfilePic(String username) {
        byte[] loaded = null;
        Query query = Query.query(GridFsCriteria.whereMetaData("username").is(username));
        GridFSFile resource = gridFsTemplate.findOne(query);
        if (resource != null) {
            logger.info(String.format("Retrieved profile pic for user: %s", username));
            try (InputStream inputStream = new GridFsResource(resource).getInputStream()) {
                loaded = StreamUtils.copyToByteArray(inputStream);
            } catch (IOException e) {
                logger.error(e.getCause());
                logger.error(e.getMessage());
                logger.error(e.getStackTrace());
                e.printStackTrace();
            }
        } else {
            logger.info(String.format("Could not find profile pic for user: %s", username));
        }
        return loaded;
    }

    @Override
    public boolean saveDogPic(MultipartFile dogPic, String username, String dogname){
        try (InputStream profilePicStream = dogPic.getInputStream()) {
            if (maybeLoadFile(username).isPresent()) {
                Query query = Query.query(GridFsCriteria.whereMetaData("username").is(username));
                query.addCriteria(GridFsCriteria.whereMetaData("dog").is(dogname));
                gridFsTemplate.delete(query);
                logger.info(String.format("Deleted existing dog pic for user: %s", username));
            }
//            InputStream in = getClass()
//                    .getResourceAsStream("/com/team4/doggomeetuppo/Resources/test_image.jpg");
            DBObject metadata = new BasicDBObject();
            metadata.put("username", username);
            metadata.put("dog", dogname);
            gridFsTemplate.store(profilePicStream, metadata);
            logger.info(String.format("Stored new dog pic for user: %s", username));
            return true;
        } catch (IOException e) {
            logger.error(e.getCause());
            logger.error(e.getMessage());
            logger.error(e.getStackTrace());
            e.printStackTrace();
            return false;
        }
    }

    public byte[] getDogPic(String username, String dogname) {
        byte[] loaded = null;
        Query query = Query.query(GridFsCriteria.whereMetaData("username").is(username));
        query.addCriteria(GridFsCriteria.whereMetaData("dog").is(dogname));
        GridFSFile resource = gridFsTemplate.findOne(query);
        if (resource != null) {
            logger.info(String.format("Retrieved dog pic for user: %s", username));
            try (InputStream inputStream = new GridFsResource(resource).getInputStream()) {
                loaded = StreamUtils.copyToByteArray(inputStream);
            } catch (IOException e) {
                logger.error(e.getCause());
                logger.error(e.getMessage());
                logger.error(e.getStackTrace());
                e.printStackTrace();
            }
        } else {
            logger.info(String.format("Could not find profile pic for user: %s", username));
        }
        return loaded;
    }

    private Optional<GridFSFile> maybeLoadFile(String username) {
        return Optional.ofNullable(gridFsTemplate.findOne(getFileByNameQuery(username)));
    }

    private Query getFileByNameQuery(String username) {
        return Query.query(GridFsCriteria.whereMetaData("username").is(username));
    }
}
