package com.team4.doggomeetuppo.Model;

import org.springframework.data.annotation.Id;

import java.util.List;

public class User {
    @Id
    public String id;

    private String userName;

    private String firstName;

    private String lastName;

    private String password;

    private List<String> eventsHosted;

    private List<String> dogsOwned;

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

    public List<String> getEventsHosted() {
        return eventsHosted;
    }

    public void setEventsHosted(List<String> eventsHosted) {
        this.eventsHosted = eventsHosted;
    }

    public void addEvent(String event){
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

    public void setGeocode(String geocode){ this.geocode = geocode; }

    public String getGeocode(){ return this.geocode; }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
