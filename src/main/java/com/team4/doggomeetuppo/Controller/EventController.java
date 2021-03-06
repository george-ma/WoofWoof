package com.team4.doggomeetuppo.Controller;

import com.team4.doggomeetuppo.Model.Event;
import com.team4.doggomeetuppo.Service.EventRepository;
import com.team4.doggomeetuppo.Service.ImageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin
@RestController
@RequestMapping(value = "/api/event")
public class EventController {

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private ImageRepository imageRepository;

    @CrossOrigin
    @RequestMapping(value = "/getEventByName", method = RequestMethod.GET)
    public Event getEventByEventName(
            @RequestParam(value = "eventName") String eventName
    ) {
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
    @RequestMapping(value = "/getAllHosted/{username}", method = RequestMethod.GET)
    public List<Event> getAllHosted(@PathVariable("username") String username) {
        return eventRepository.getAllHosted(username);
    }

    @CrossOrigin
    @RequestMapping(value = "/getAllAttending/{username}", method = RequestMethod.GET)
    public List<Event> getAllAttending(@PathVariable("username") String username) {
        List<Event> allEvents = eventRepository.getAllEvents();
        return allEvents.stream().filter(event -> event.isAttending(username)).collect(Collectors.toList());
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

    @CrossOrigin
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

    @CrossOrigin
    @PostMapping(value = "/getEventPic", produces = MediaType.IMAGE_JPEG_VALUE)
    public @ResponseBody
    byte[] getDogPic(
            @RequestParam("parkName") String parkName,
            @RequestParam("eventName") String eventName
    ) {
        return imageRepository.getEventPic(parkName, eventName);
    }

    @CrossOrigin
    @PostMapping(value = "/attendEvent")
    public ResponseEntity attendEvent(
            @RequestParam(value = "geocode") String geocode,
            @RequestParam(value = "eventName") String eventName,
            @RequestParam(value = "username") String username
    ) {
        Event event = eventRepository.findByPlaceEventName(geocode, eventName);
        event.addAttending(username);
        eventRepository.saveEvent(event);
        return new ResponseEntity(HttpStatus.OK);
    }

    @CrossOrigin
    @PostMapping(value = "/removeAttend")
    public ResponseEntity removeAttend(
            @RequestParam(value = "geocode") String geocode,
            @RequestParam(value = "eventName") String eventName,
            @RequestParam(value = "username") String username
    ) {
        Event event = eventRepository.findByPlaceEventName(geocode, eventName);
        event.removeAttending(username);
        eventRepository.saveEvent(event);
        return new ResponseEntity(HttpStatus.OK);
    }

    @CrossOrigin
    @PostMapping(value = "/isGoing")
    public @ResponseBody boolean isGoing(
            @RequestParam(value = "geocode") String geocode,
            @RequestParam(value = "eventName") String eventName,
            @RequestParam(value = "username") String username
    ) {
        Event event = eventRepository.findByPlaceEventName(geocode, eventName);
        return event.getAttending().contains(username);
    }
}
