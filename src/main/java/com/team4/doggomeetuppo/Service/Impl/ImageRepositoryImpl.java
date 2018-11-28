package com.team4.doggomeetuppo.Service.Impl;

import com.mongodb.BasicDBObject;
import com.mongodb.DBObject;
import com.mongodb.client.gridfs.model.GridFSDownloadOptions;
import com.mongodb.client.gridfs.model.GridFSFile;
import com.mongodb.gridfs.GridFS;
import com.mongodb.gridfs.GridFSDBFile;
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
            if (maybeLoadFile(getFileByNameQuery(username)).isPresent()) {
                gridFsTemplate.delete(getFileByNameQuery(username));
                logger.info(String.format("Deleted existing profile pic for user: %s", username));
            }
//            InputStream in = getClass()
//                    .getResourceAsStream("/com/team4/doggomeetuppo/Resources/test_image.jpg");
            DBObject metadata = new BasicDBObject();
            metadata.put("username", username);
            gridFsTemplate.store(profilePicStream, username, metadata);
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
        GridFSFile file = gridFsTemplate.findOne(query);
        assert file != null;
        GridFsResource resource = gridFsTemplate.getResource(file.getFilename());
        if (resource != null) {
            logger.info(String.format("Retrieved profile pic for user: %s", username));
            try (InputStream inputStream = resource.getInputStream()) {
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
    public boolean saveDogPic(MultipartFile dogPic, String username, String dogname) {
        try (InputStream profilePicStream = dogPic.getInputStream()) {
            Query query = Query.query(GridFsCriteria.whereMetaData("username").is(username))
                    .addCriteria(GridFsCriteria.whereMetaData("dog").is(dogname));
            if (maybeLoadFile(query).isPresent()) {
                gridFsTemplate.delete(query);
                logger.info(String.format("Deleted existing dog pic for user: %s", username));
            }
            DBObject metadata = new BasicDBObject();
            metadata.put("username", username);
            metadata.put("dog", dogname);
            logger.info(gridFsTemplate.store(profilePicStream, username + "_" + dogname, metadata));
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
        Query query = Query.query(GridFsCriteria.whereMetaData("dog").is(dogname)).addCriteria(GridFsCriteria.whereMetaData("username").is(username));
        GridFSFile file = gridFsTemplate.findOne(query);
        assert file != null;
        GridFsResource resource = gridFsTemplate.getResource(file.getFilename());
        if (resource != null) {
            logger.info(String.format("Retrieved dog: %s pic for user: %s", dogname, username));
            try (InputStream inputStream = resource.getInputStream()) {
                loaded = StreamUtils.copyToByteArray(inputStream);
                return loaded;
            } catch (IOException e) {
                logger.error(e.getCause());
                logger.error(e.getMessage());
                logger.error(e.getStackTrace());
                e.printStackTrace();
            }
        } else {
            logger.info(String.format("Could not find dog: %s pic for user: %s", dogname, username));
        }
        return loaded;
    }

    @Override
    public boolean saveEventPic(MultipartFile eventPic, String parkName, String eventName) {
        try (InputStream profilePicStream = eventPic.getInputStream()) {
            Query query = Query.query(GridFsCriteria.whereMetaData("parkName").is(parkName))
                    .addCriteria(GridFsCriteria.whereMetaData("eventName").is(eventName));
            if (maybeLoadFile(query).isPresent()) {
                gridFsTemplate.delete(query);
                logger.info(String.format("Deleted existing event: %s pic for park: %s", eventName, parkName));
            }
            DBObject metadata = new BasicDBObject();
            metadata.put("parkName", parkName);
            metadata.put("eventName", eventName);
            logger.info(gridFsTemplate.store(profilePicStream, parkName + "_" + eventName, metadata));
            logger.info(String.format("Stored new event: %s pic for park: %s", eventName, parkName));
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
    public byte[] getEventPic(String parkName, String eventName) {
        byte[] loaded = null;
        Query query = Query.query(GridFsCriteria.whereMetaData("parkName").is(parkName))
                .addCriteria(GridFsCriteria.whereMetaData("eventName").is(eventName));
        GridFSFile file = gridFsTemplate.findOne(query);
        assert file != null;
        GridFsResource resource = gridFsTemplate.getResource(file.getFilename());
        if (resource != null) {
            logger.info(String.format("Retrieved event: %s pic for user: %s", eventName, parkName));
            try (InputStream inputStream = resource.getInputStream()) {
                loaded = StreamUtils.copyToByteArray(inputStream);
                return loaded;
            } catch (IOException e) {
                logger.error(e.getCause());
                logger.error(e.getMessage());
                logger.error(e.getStackTrace());
                e.printStackTrace();
            }
        } else {
            logger.info(String.format("Could not find event: %s pic for user: %s", eventName, parkName));
        }
        return loaded;
    }

    private Optional<GridFSFile> maybeLoadFile(Query query) {
        return Optional.ofNullable(gridFsTemplate.findOne(query));
    }

    private Query getFileByNameQuery(String username) {
        return Query.query(GridFsCriteria.whereMetaData("username").is(username));
    }
}
