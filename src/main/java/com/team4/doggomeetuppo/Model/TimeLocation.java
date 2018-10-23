package com.team4.doggomeetuppo.Model;

import java.time.LocalTime;
import java.time.MonthDay;
import java.time.Year;

public class TimeLocation {
  private String location;
  private MonthDay monthDay;
  private Year year;
  private LocalTime localTime;

  public Year getYear() {
    return this.year;
  }
  public void setYear(Year newYear) {
    this.year = newYear;
  }
  public MonthDay getMonthDay() {
    return this.monthDay;
  }
  public void setMonthDay(MonthDay newMonthDay) {
    this.monthDay = newMonthDay;
  }
  public LocalTime getLocalTime() {
    return this.localTime;
  }
  public void setLocalTime(LocalTime newTime) {
    this.localTime = newTime;
  }
  public String getLocation() {
    return this.location;
  }
  public void setLocation(String newLocation) {
    this.location = newLocation;
  }
}
