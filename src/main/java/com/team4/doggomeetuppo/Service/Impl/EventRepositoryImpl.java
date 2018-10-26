package com.team4.doggomeetuppo.Service.Impl;

import com.team4.doggomeetuppo.Model.Event;
import com.team4.doggomeetuppo.Model.User;
import com.team4.doggomeetuppo.Service.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.stereotype.Repository;
import org.springframework.data.mongodb.core.query.Query;

import javax.annotation.Resource;
import java.util.List;

@Repository
public class EventRepositoryImpl implements EventRepository {
    @Autowired
    private MongoTemplate mongoTemplate;

    @Override
    public Event findByEventName(String eventName) {
        Query query = new Query().addCriteria(Criteria.where("eventName").is(eventName));
        return mongoTemplate.findOne(query, Event.class);
    }

    @Override
    public Event findByEventId(String eventId) {
        Query query = new Query().addCriteria(Criteria.where("id").is(eventId));
        return mongoTemplate.findOne(query, Event.class);
    }

    @Override
    public List<Event> getAllEvents() {
        return mongoTemplate.findAll(Event.class);
    }

    @Override
    public void saveEvent(Event event) {
        mongoTemplate.save(event);
    }

    @Override
    public void addEvent(Event event) {
        mongoTemplate.insert(event);
    }

    @Override
    public void removeEvent(Event event){
        mongoTemplate.remove(event);
    }
}
