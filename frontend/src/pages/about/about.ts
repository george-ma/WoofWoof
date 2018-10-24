import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Geolocation } from '@ionic-native/geolocation';
import {  } from '@types/googlemaps';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  map: any;
  currentMarker: any;
  allDogParks: google.maps.Marker[];

  GooglePlaces: any;

  constructor(
    public navCtrl: NavController,
    private geolocation: Geolocation
  ) {
    this.allDogParks = [];
  }

  ionViewDidEnter() {
    this.initMap();
  }

  initMap() {
    this.geolocation.getCurrentPosition().then((resp) => {
      const currentPosition = {
        lat: resp.coords.latitude,
        lng: resp.coords.longitude
      }
      this.map = new google.maps.Map(
        document.getElementById('map'),
        {
          center: currentPosition,
          zoom: 15
        }
      );
      this.currentMarker = new google.maps.Marker({
        position: currentPosition,
        map: this.map,
        title: 'I am here!'
      });
      const placeService = new google.maps.places.PlacesService(this.map);
      placeService.nearbySearch({
        location: currentPosition,
        radius: 1000,
        type: 'park'
      }, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          results.forEach((place) => {
            this.allDogParks.push(new google.maps.Marker({
              map: this.map,
              position: place.geometry.location,
            }));
          });
        }
      });
    });
  }

  createMarker(place) {

  }

  // loadDogParks() {
  //   this.GooglePlaces.
  // }

}
