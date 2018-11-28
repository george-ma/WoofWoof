package com.team4.doggomeetuppo.Model;

import java.util.ArrayList;
import java.util.List;
import org.springframework.data.annotation.Id;

public class Event {
    @Id
    public String id;

    private String eventName;
    private String eventInfo;
    private String location;
    private TimeLocation timeLocation;
    public enum status {
        ACTIVE, PLANNED, NONE
    }
    private status eventStatus;
    private String host;
    private ArrayList<String> attending;

    public Event() {}

    public Event(String location, String eventName, TimeLocation timeLocation, String host) {
        this.location = location;
        this.eventName = eventName;
        this.timeLocation = timeLocation;
        this.host = host;
        this.eventStatus = status.PLANNED;
    }
    public String getEventName() {
        return this.eventName;
    }
    public void setEventName(String newEventName) {
        this.eventName = newEventName;
    }
    public String getEventInfo() {
        return this.eventInfo;
    }
    public void setEventInfo(String newEventInfo) {
        this.eventInfo = newEventInfo;
    }
    public status getStatus() {
        return this.eventStatus;
    }
    public void setStatus(status newStatus) {
        this.eventStatus = newStatus;
    }
    public String getHost() {
        return this.host;
    }
    public String getLocation() {
        return this.location;
    }
    public void setLocation(String location) {
        this.location = location;
    }
}
