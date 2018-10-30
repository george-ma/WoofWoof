import { ParkDetailsPage } from '../park-details/park-details';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Geolocation } from '@ionic-native/geolocation';
import { } from '@types/googlemaps';

@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {

  map: google.maps.Map;
  currentMarker: google.maps.Marker;
  allDogParks: google.maps.Marker[];


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private geolocation: Geolocation
  ) {
    this.allDogParks = [];
  }

  ionViewWillLeave() {
    console.log('left');
  }

  ionViewDidLoad() {
    this.initMap(this.navCtrl);
  }

  initMap(navCtrl) {
    this.geolocation.getCurrentPosition().then(result => {
      const currentPosition = {
        lat: result.coords.latitude,
        lng: result.coords.longitude,
      }
      const map = new google.maps.Map(
        document.getElementById('map'), {
          center: currentPosition,
          zoom: 15
        }
      );

      let dragging = false;
      let oldCenter = currentPosition;

      let parkList: google.maps.Marker[];

      const loadParks = this.loadNearbyParks;
      map.addListener('idle', function () {
        const currentPosition = {
          lat: map.getCenter().lat(),
          lng: map.getCenter().lng()
        }
        if (!dragging && oldCenter && oldCenter !== currentPosition) {
          parkList.forEach((park) => {
            park.setMap(null);
          })
          parkList = [];
          parkList = loadParks(currentPosition, map, navCtrl);
          console.log(parkList);
        }
        if (!dragging) {
          oldCenter = currentPosition;
        }
        console.log(parkList);
      });

      map.addListener('dragstart', function () {
        dragging = true;
      })

      map.addListener('dragend', function () {
        dragging = false;
      })

      this.setCurrentMarker(currentPosition, map);
      parkList = this.loadNearbyParks(currentPosition, map, this.navCtrl);
      console.log(parkList);
    });
  }

  setCurrentMarker(currentPosition, map) {
    this.currentMarker = new google.maps.Marker({
      position: currentPosition,
      map: map,
      icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
    });
  }

  loadNearbyParks(currentPosition, map, navCtrl): google.maps.Marker[] {
    const placesService = new google.maps.places.PlacesService(map);
    const parkList: google.maps.Marker[] = []
    placesService.nearbySearch({
      location: currentPosition,
      radius: 1000,
      type: 'park'
    }, (results, status, page) => {
      console.log(page);
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        console.log(results);
        results.forEach((place: any) => {
          console.log(place);
          const newPark = new google.maps.Marker({
            map: map,
            icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
            position: place.geometry.location,
          });

          newPark.addListener('click', function () {
            navCtrl.push(ParkDetailsPage,
              {
                parentNav: navCtrl,
                parkName: place.name,
                parkAddress: place.plus_code.compound_code,
                parkPictures: place.photos,
                currentEvents: [], // rest calls
                upcomingEvents: [] // rest calls
              });
          });
          parkList.push(newPark);
          console.log(parkList);
        });
      }
    });
    return parkList;
  }

  showParkDetails(navCtrl: NavController) {
    console.log('double click');
    // this.navCtrl.push(ParkDetailsPage, {});
  }

  showParkModal() {
    /**
     * - Need to make ParkEvents component
     * - make backend requests to see current and upcoming and past events.
     */
    // let parkModal = this.modalCtrl.create(ParkEvents, {});
    // parkModal.present();
  }
}
