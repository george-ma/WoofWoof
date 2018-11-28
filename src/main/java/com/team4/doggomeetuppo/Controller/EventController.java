package com.team4.doggomeetuppo.Controller;

import com.sun.deploy.net.HttpResponse;
import com.team4.doggomeetuppo.Model.Event;
import com.team4.doggomeetuppo.Service.EventRepository;
import com.team4.doggomeetuppo.Service.ImageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Base64;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin
@RestController
@RequestMapping(value = "/api/event")
public class EventController {

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private ImageRepository imageRepository;

    @RequestMapping(value = "/getEventByName", method = RequestMethod.GET)
    public Event getEventByEventName(
            @RequestParam(value = "eventName") String eventName
    ) {
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
        event.setStatus(Event.status.PLANNED);
        eventRepository.addEvent(event);
    }

    @RequestMapping(value = "/saveEventPic", method = RequestMethod.PUT)
    public ResponseEntity addEventPic(
            @RequestParam(value = "eventPic") MultipartFile eventPic,
            @RequestParam(value = "parkName") String parkName,
            @RequestParam(value = "eventName") String eventName
    ) {
        if (imageRepository.saveEventPic(eventPic, parkName, eventName)) {
            return new ResponseEntity(HttpStatus.OK);
        } else {
            return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping(value = "/getEventPic", produces = MediaType.IMAGE_JPEG_VALUE)
    public @ResponseBody ResponseEntity<byte[]> getDogPic(
            @RequestParam("parkName") String parkName,
            @RequestParam("eventName") String eventName
    ) {
        byte[] encodeImage = imageRepository.getEventPic(parkName, eventName);
        HttpHeaders headers = new HttpHeaders();
        headers.set("Content-Type", "image/jpg");
        return new ResponseEntity<>(encodeImage, headers, HttpStatus.OK);
    }

//    @RequestMapping(value = "/attend", method = RequestMethod.POST)
//    public ResponseEntity attendEvent(@RequestBody JsonNode requestNode) {
//        String userID = requestNode.findValue("userID").asText();
//        String eventID = requestNode.findValue("eventID").asText();
//        Event event = eventRepository.findByEventId(eventID);
//        User user = userRepository.findByUserId(userID);
//        if (event != null && user != null) {
//            event.addAttendingUser(user);
//            eventRepository.saveEvent(event);
//            return user.getUserName() + "added to" + event.getEventName();
//        } else {
//            return "User or event not found.";
//        }
//    }
//
//    @RequestMapping(value = "/noAttend", method = RequestMethod.POST)
//    public String unattendEvent(@RequestBody JsonNode requestNode) {
//        String userID = requestNode.findValue("userID").asText();
//        String eventID = requestNode.findValue("eventID").asText();
//        Event event = eventRepository.findByEventId(eventID);
//        User user = userRepository.findByUserId(userID);
//        if (event != null && user != null) {
//            event.removeAttendingUser(user);
//            eventRepository.saveEvent(event);
//            return user.getUserName() + " removed from " + event.getEventName();
//        } else {
//            return "User or event not found.";
//        }
//    found}

//    @RequestMapping(value = "/cancel", method = RequestMethod.POST)
//    public String cancelEvent(@RequestBody JsonNode requestNode) {
//        String userID = requestNode.findValue("userID").asText();
//        String eventID = requestNode.findValue("eventID").asText();
//        Event event = eventRepository.findByEventId(eventID);
//        User user = userRepository.findByUserId(userID);
//        if (event != null && user != null && user.id.equals(event.getHost().id)) {
//            eventRepository.removeEvent(event);
//            return event.getEventName() + " deleted by " + user.getUserName();
//        } else {
//            return "User or event not found, or user not host of event.";
//        }
//    }
}
