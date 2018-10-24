package com.team4.doggomeetuppo.Model;

import java.util.ArrayList;
import java.util.List;

public class Location {

  private float longitude;
  private float latitude;

  public Location() { }

  public Location(float longitude, float latitude){
    this.longitude = longitude;
    this.latitude = latitude;
  }

  public void setLongtitude(float longitude){
    this.longitude = longitude;
  }

  public float getLongitude(){
    return this.longitude;
  }

  public void setLatitude(float latitude){
    this.latitude = latitude;
  }

  public float getLatitude(){
    return this.latitude;
  }
}
