package com.team4.doggomeetuppo.Model;

import org.springframework.data.annotation.Id;

import java.util.List;

public class User {
    @Id
    public String id;

    private String userName;

    private String pathToPicture;

    private String phoneNumber;

    private List<Event> eventsHosted;

    private List<Dog> dogsOwned;

    private String geocode;

    public User() {}

    public User(String userName){
        this.userName = userName;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public List<Event> getEventsHosted() {
        return eventsHosted;
    }

    public void setEventsHosted(List<Event> eventsHosted) {
        this.eventsHosted = eventsHosted;
    }

    public void addEvent(Event event){
        this.eventsHosted.add(event);
    }

    public List<Dog> getDogsOwned() {
        return dogsOwned;
    }

    public void setDogsOwned(List<Dog> dogsOwned) {
        this.dogsOwned = dogsOwned;
    }

    public void addDog(Dog dog){
        this.dogsOwned.add(dog);
    }

    public void setGeocode(String geocode){ this.geocode = geocode; }

    public String getGeocode(){ return this.geocode; }

}
