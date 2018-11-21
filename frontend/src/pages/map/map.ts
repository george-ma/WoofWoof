import { ParkDetailsPage } from '../park-details/park-details';
import { Component, NgZone } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Geolocation } from '@ionic-native/geolocation';
import { } from '@types/googlemaps';

@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {

  map: google.maps.Map;
  allDogParks: google.maps.Marker[];

  currentLocation = { lat: 0, lng: 0 };
  currentMarker: google.maps.Marker;

  currentLocationName = 'High PArk Dog Off Leash Area';

  placeHolder: string = "Enter a Park";

  autocompleteItemsDescription = [];
  autocompleteItems = [];
  autocomplete = { query: '' };
  autoCompleteService = new google.maps.places.AutocompleteService();

  chosenLocation: any = '';

  views = 'Map';

  // SETUP NOTES
  // need to do a quick search to initialize green pin, don't ask why


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private geolocation: Geolocation,
    private zone: NgZone
  ) {
  }

  ionViewDidLoad() {
    this.allDogParks = [];
    this.autocompleteItems = [];
    this.currentLocationName = '';
    // this.autocomplete = {
    //   query: ''
    // };
    this.initMap(this.navCtrl);
  }

  switchSelector(event) {
    console.log(event);
    console.log('swithed');
    console.log(event._value);
    if (event._value === 'Map') {
      this.initMap(this.navCtrl);
    }
  }

  chooseItem(item: any) {
    console.log(item);
    console.log(item.split(',')[0]);
    this.currentLocationName = item.split(',')[0];
    const place: any = this.geoCode(item);
  }

  //convert Address string to lat and long

  // set new current pin to here and pan map to it
  geoCode(address: any) {
    let placesServices = new google.maps.places.PlacesService(this.map);
    const thisComp = this;
    placesServices.textSearch({ query: address }, (results, status) => {
      console.log(results[0]);
      const place: any = results[0];
      thisComp.currentLocationName = place.name;
      thisComp.currentLocation = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng()
      }
      thisComp.map.setCenter(
        thisComp.currentLocation
      );
      thisComp.currentMarker = this.setCurrentMarker(this.currentLocation, this.map);
    });
  }

  updateSearch() {
    if (this.autocomplete.query == '') {
      this.autocompleteItems = [];
      this.autocompleteItemsDescription = [];
      return;
    } else {
      let me = this;
      this.autoCompleteService.getPlacePredictions({
        input: this.autocomplete.query,
        componentRestrictions: { country: 'ca' },
        radius: 10000,
        location: new google.maps.LatLng(this.currentLocation.lat, this.currentLocation.lng),
      }, (predictions, status) => {
        me.autocompleteItems = [];
        me.autocompleteItemsDescription = [];
        me.zone.run(() => {
          if (predictions != null) {
            console.log(predictions);
            predictions.forEach((prediction) => {
              me.autocompleteItemsDescription.push(prediction.description);
              me.autocompleteItems.push(prediction);
            });
          }
        });
      });
    }
  }

  initMap(navCtrl) {
    this.geolocation.getCurrentPosition().then(result => {
      this.currentLocation = {
        lat: result.coords.latitude,
        lng: result.coords.longitude,
      }
      const map = new google.maps.Map(
        document.getElementById('map'), {
          center: this.currentLocation,
          zoom: 15
        }
      );

      this.map = map;

      this.currentMarker = this.setCurrentMarker(this.currentLocation, map);

      let dragging = false;
      let oldCenter = this.currentLocation;

      let parkList: google.maps.Marker[];

      const loadParks = this.loadNearbyParks;
      const currentPlace = this.currentLocationName;
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
          parkList = loadParks(currentPosition, map, navCtrl, currentPlace);
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

      parkList = this.loadNearbyParks(this.currentLocation, map, this.navCtrl, this.currentLocationName);

    });
  }

  getAddress(place: Object) {
    const address = place['formatted_address'];
    let location = place['geometry']['location'];
    console.log(address);
    console.log(place);
  }

  setCurrentMarker(currentPosition, map): google.maps.Marker {
    const newCurrent = new google.maps.Marker({
      position: currentPosition,
      map: map,
      icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
    });
    return newCurrent;
  }

  loadNearbyParks(currentPosition, map, navCtrl, currentPlace): google.maps.Marker[] {
    const placesService = new google.maps.places.PlacesService(map);
    const parkList: google.maps.Marker[] = [];
    placesService.nearbySearch({
      location: currentPosition,
      radius: 1000,
      type: 'park'
    }, (results, status, page) => {
      console.log(page);
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        console.log(results);
        results.forEach((place: any) => {
          // TODO: Check by place name

          console.log(place);
          let marker = '';
          if (place.name === currentPlace) {
            marker = 'http://maps.google.com/mapfiles/ms/icons/green-dot.png';
          } else {
            marker = 'http://maps.google.com/mapfiles/ms/icons/red-dot.png';
          }
          const newPark = new google.maps.Marker({
            map: map,
            icon: marker,
            position: place.geometry.location,
          });

          newPark.addListener('click', function () {
            navCtrl.push(ParkDetailsPage,
              {
                parentNav: navCtrl,
                parkName: place.name,
                parkAddress: place.plus_code.compound_code,
                parkPictures: place.photos,
                park: place,
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
}
