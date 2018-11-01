package com.team4.doggomeetuppo.Controller;

import com.team4.doggomeetuppo.Model.Event;
import com.team4.doggomeetuppo.Service.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/api/event")
public class EventController {

    @Autowired
    private EventRepository eventRepository;

    @RequestMapping(value = "/{eventName}", method = RequestMethod.GET)
    public Event getEventByEventName(@PathVariable("eventName") String eventName) {
        return eventRepository.findByEventName(eventName);
    }

    @RequestMapping(value = "/geocode", method = RequestMethod.POST)
    public List<Event> getEventsByPlaceName(@RequestBody String geocode) {
        return eventRepository.findByPlaceName(geocode);
    }

    @RequestMapping(value = "/allEvents", method = RequestMethod.GET)
    public List<Event> getAllEvents() {
        return eventRepository.getAllEvents();
    }

    @RequestMapping(value = "/save", method = RequestMethod.POST)
    public void saveEvent(@RequestBody Event event) {
        eventRepository.saveEvent(event);
    }

    @RequestMapping(value = "/add", method = RequestMethod.PUT)
    public void addEvent(@RequestBody Event event) {
        eventRepository.addEvent(event);
    }
}
