package com.team4.doggomeetuppo.Model;

import java.util.ArrayList;
import java.util.List;
import org.springframework.data.annotation.Id;

public class Event {
    @Id
    public String id;
    private String eventName;
    private List<String> pathsToPictures;
    private String eventInfo;
    private String location;
    private TimeLocation timeLocation;
    private boolean isPublic;
    private boolean isCanceled = false;
    public enum status {
        ACTIVE, PLANNED, NONE
    }
    private status eventStatus;
    private int capacity;
    private User host;
    private ArrayList<User> attending;
    private ArrayList<User> invited;
    private ArrayList<Dog> expectedDogs;
    private ArrayList<Dog> checkedInDogs;

    public Event() {}

    public Event(String location, String eventName, TimeLocation timeLocation, boolean isPublic, User host) {
        this.location = location;
        this.eventName = eventName;
        this.timeLocation = timeLocation;
        this.isPublic = isPublic;
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
    public boolean getIsPublic() {
        return this.isPublic;
    }
    public void setIsPublic(boolean isPublic) {
        this.isPublic = isPublic;
    }
    public status getStatus() {
        return this.eventStatus;
    }
    public void setStatus(status newStatus) {
        this.eventStatus = newStatus;
    }
    public User getHost() {
        return this.host;
    }
    public int getCapacity() {
        return this.capacity;
    }
    public void setCapacity(int newCapacity) {
        this.capacity = newCapacity;
    }
    public ArrayList<User> getAttending() {
        return this.attending;
    }
    public ArrayList<User> getInvited() {
        return this.invited;
    }
    public ArrayList<Dog> getExpectedDogs() {
        return this.expectedDogs;
    }
    public ArrayList<Dog> getCheckedInDogs() {
        return this.checkedInDogs;
    }
    public void inviteUser(User invitee) {
        this.invited.add(invitee);
    }
    public String getLocation() {
        return this.location;
    }
    public void setLocation(String location) {
        this.location = location;
    }
}
