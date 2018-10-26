package com.team4.doggomeetuppo.Service;

import com.team4.doggomeetuppo.Model.Event;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EventRepository {
    public Event findByEventName(String eventName);
    public Event findByEventId(String eventId);
    public List<Event> getAllEvents();
    public void saveEvent(Event event);
    public void addEvent(Event event);
    public void removeEvent(Event event);
}
