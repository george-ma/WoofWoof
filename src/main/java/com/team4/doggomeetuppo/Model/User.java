package com.team4.doggomeetuppo.Model;

import org.springframework.data.annotation.Id;

import java.util.List;

public class User {
    @Id
    public String id;

    private String userName;

    private String firstName;

    private String lastName;

    private List<Event> eventsHosted;

    private List<String> dogsOwned;

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

    public List<Event> getEventsHosted() {
        return eventsHosted;
    }

    public void setEventsHosted(List<Event> eventsHosted) {
        this.eventsHosted = eventsHosted;
    }

    public void addEvent(Event event){
        this.eventsHosted.add(event);
    }

    public List<String> getDogsOwned() {
        return dogsOwned;
    }

    public void setDogsOwned(List<String> dogsOwned) {
        this.dogsOwned = dogsOwned;
    }

    public void addDog(String dog){
        this.dogsOwned.add(dog);
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }
}
