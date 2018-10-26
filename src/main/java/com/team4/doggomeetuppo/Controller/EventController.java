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

@RestController
@RequestMapping(value = "/api/event")
public class EventController {

    @Autowired
    private EventRepository eventRepository;
    @Resource
    private UserRepository userRepository;

    @RequestMapping(value = "/{eventName}", method = RequestMethod.GET)
    public Event getEventByEventName(@PathVariable("eventName") String eventName) {
        return eventRepository.findByEventName(eventName);
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
}
