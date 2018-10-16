package com.team4.doggomeetuppo.Model;

public class Dog {

    private String name;

    private String pathToPicture;

    /* Can choose to add more traits such as breed, size etc. later*/

    public Dog() {}

    public Dog(String name){
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
