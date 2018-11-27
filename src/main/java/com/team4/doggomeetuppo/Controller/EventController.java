package com.team4.doggomeetuppo.Controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.team4.doggomeetuppo.Model.Event;
import com.team4.doggomeetuppo.Model.User;
import com.team4.doggomeetuppo.Service.EventRepository;
import com.team4.doggomeetuppo.Service.Impl.UserRepositoryImpl;
import com.team4.doggomeetuppo.Service.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping(value = "/api/event")
public class EventController {

    @Autowired
    private EventRepository eventRepository;
    @Resource
    private UserRepository userRepository;

    @CrossOrigin
    @RequestMapping(value = "/{eventName}", method = RequestMethod.GET)
    public Event getEventByEventName(@PathVariable("eventName") String eventName) {
        return eventRepository.findByEventName(eventName);
    }

    @CrossOrigin
    @RequestMapping(value = "/geocode", method = RequestMethod.POST)
    public List<Event> getEventsByPlaceName(@RequestBody String geocode) {
        return eventRepository.findByPlaceName(geocode);
    }

    @CrossOrigin
    @RequestMapping(value = "/allEvents", method = RequestMethod.GET)
    public List<Event> getAllEvents() {
        return eventRepository.getAllEvents();
    }

    @CrossOrigin
    @RequestMapping(value = "/save", method = RequestMethod.POST)
    public void saveEvent(@RequestBody Event event) {
        eventRepository.saveEvent(event);
    }

    @CrossOrigin
    @RequestMapping(value = "/add", method = RequestMethod.PUT)
    public void addEvent(@RequestBody Event event) {
        event.setStatus(Event.status.PLANNED);
        eventRepository.addEvent(event);
    }

    @RequestMapping(value = "/attend", method = RequestMethod.POST)
    public String attendEvent(@RequestBody JsonNode requestNode) {
        String userID = requestNode.findValue("userID").asText();
        String eventID = requestNode.findValue("eventID").asText();
        Event event = eventRepository.findByEventId(eventID);
        User user = userRepository.findByUserId(userID);
        if (event != null && user != null) {
            event.addAttendingUser(user);
            eventRepository.saveEvent(event);
            return user.getUserName() + "added to" + event.getEventName();
        } else {
            return "User or event not found.";
        }
    }

    @RequestMapping(value = "/noAttend", method = RequestMethod.POST)
    public String unattendEvent(@RequestBody JsonNode requestNode) {
        String userID = requestNode.findValue("userID").asText();
        String eventID = requestNode.findValue("eventID").asText();
        Event event = eventRepository.findByEventId(eventID);
        User user = userRepository.findByUserId(userID);
        if (event != null && user != null) {
            event.removeAttendingUser(user);
            eventRepository.saveEvent(event);
            return user.getUserName() + " removed from " + event.getEventName();
        } else {
            return "User or event not found.";
        }
    }

    @RequestMapping(value = "/cancel", method = RequestMethod.POST)
    public String cancelEvent(@RequestBody JsonNode requestNode) {
        String userID = requestNode.findValue("userID").asText();
        String eventID = requestNode.findValue("eventID").asText();
        Event event = eventRepository.findByEventId(eventID);
        User user = userRepository.findByUserId(userID);
        if (event != null && user != null && user.id.equals(event.getHost().id)) {
            eventRepository.removeEvent(event);
            return event.getEventName() + " deleted by " + user.getUserName();
        } else {
            return "User or event not found, or user not host of event.";
        }
    }
}
