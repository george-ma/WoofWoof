package com.team4.doggomeetuppo.Model;

import org.springframework.data.annotation.Id;

public class Location {

  @Id
  public String id;

  private String geocode;

  public Location() { }

  public Location(String geocode){
      this.geocode = geocode;
  }

  public String getGeocode() {
    return this.geocode;
  }

  public void setGeocode(String geocode) {
    this.geocode = geocode;
  }
}
