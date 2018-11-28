package com.team4.doggomeetuppo.Controller;

import com.team4.doggomeetuppo.Model.Event;
import com.team4.doggomeetuppo.Model.User;
import com.team4.doggomeetuppo.Service.EventRepository;
import com.team4.doggomeetuppo.Service.ImageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.UnsatisfiedServletRequestParameterException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.jws.soap.SOAPBinding;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping(value = "/api/event")
public class EventController {

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private ImageRepository imageRepository;

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

    @GetMapping(value = "/getEventPic", produces = MediaType.IMAGE_JPEG_VALUE)
    public @ResponseBody byte[] getDogPic(
            @RequestParam("parkName") String parkName,
            @RequestParam("eventName") String eventName
    ) {
        return imageRepository.getEventPic(parkName, eventName);
    }
}
