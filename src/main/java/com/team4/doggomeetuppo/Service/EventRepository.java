package com.team4.doggomeetuppo.Service;

import com.team4.doggomeetuppo.Model.User;
import com.team4.doggomeetuppo.Model.Event;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EventRepository {
    public User findByEventName(String eventName);
    public List<Event> getAllEvents();
    public void saveEvent(Event event);
    public void addEvent(Event event);
}
