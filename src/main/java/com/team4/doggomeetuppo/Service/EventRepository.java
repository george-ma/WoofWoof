package com.team4.doggomeetuppo.Service;

import com.team4.doggomeetuppo.Model.Event;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EventRepository {
    Event findByEventName(String eventName);

    Event findByEventId(String eventId);

    List<Event> findByPlaceName(String geocode);

    Event findByPlaceEventName(String geocode, String eventName);

    List<Event> getAllEvents();

    void saveEvent(Event event);

    void addEvent(Event event);

    void removeEvent(Event event);
}
