import { ParkDetailsPage } from '../park-details/park-details';
import { Component, NgZone } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Geolocation } from '@ionic-native/geolocation';
import { } from '@types/googlemaps';

import { EventProvider } from '../../providers/event/event';
import { ParkLocationPage } from '../park-location/park-location';
EventProvider

@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {

  map: google.maps.Map;
  allDogParks: google.maps.Marker[];

  currentLocation = { lat: 0, lng: 0 };

  placeHolder: string = "Enter a Park";

  autocompleteItemsDescription = [];
  autocompleteItems = [];
  autocomplete = { query: '' };
  autoCompleteService = new google.maps.places.AutocompleteService();

  chosenLocation: any = '';

  views = 'Map';

  // Events segment
  parkEvents: any;
  origEvents: any;
  rsvpButtonColour: string;


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private geolocation: Geolocation,
    private zone: NgZone,
    public eventProvider: EventProvider
  ) {
    this.eventProvider.getAllEvents().subscribe((result: any[]) => {
      this.parkEvents = result.filter(event => event.isPublic);
      this.origEvents = this.parkEvents;
    })
    this.rsvpButtonColour = 'primary';
  }

  ionViewWillLeave() {
    console.log('left');
  }


  ionViewDidLoad() {
    this.allDogParks = [];
    this.autocompleteItems = [];
    this.autocomplete = {
      query: ''
    };
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
    const place: any = this.geoCode(item);
  }

  //convert Address string to lat and long

  // TODO: To navigate away from map,
  // 1. go to view events
  // 2. navigate to other page

  // set new current pin to here and pan map to it
  geoCode(address: any) {
    let placesServices = new google.maps.places.PlacesService(this.map);
    placesServices.textSearch({ query: address }, (results, status) => {
      // console.log({ lat: results[0].geometry.location.lat(), lng: results[0].geometry.location.lng() });
      console.log(results[0]);
      const place: any = results[0];
      this.navCtrl.push(ParkDetailsPage,
        {
          parentNav: this.navCtrl,
          parkName: address,
          parkAddress: place.plus_code.compound_code,
          parkPictures: place.photos,
          park: place,
          currentEvents: [], // rest calls
          upcomingEvents: [] // rest calls
        });
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

      let currentMarker: google.maps.Marker = this.setCurrentMarker(this.currentLocation, map);

      let dragging = false;
      let oldCenter = this.currentLocation;

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

      parkList = this.loadNearbyParks(this.currentLocation, map, this.navCtrl);

    });
  }

  getAddress(place: Object) {
    const address = place['formatted_address'];
    let location = place['geometry']['location'];
    console.log(address);
    console.log(place);
  }

  setCurrentMarker(currentPosition, map) {
    return new google.maps.Marker({
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

  searchEvents(ev) {
    // this.initializeEvents();

    const search: string = ev.target.value;

    // if the value is an empty string don't filter the items
    if (search && search.trim() != '') {
      this.parkEvents = this.parkEvents.filter((event) => {
        return (event.eventName.toLowerCase().indexOf(search.toLowerCase()) > -1);
      })
    } else {
      this.parkEvents = this.origEvents;
    }
  }

  goToMap(event) {
    this.navCtrl.push(
      ParkLocationPage,     
      {event: event}
    )
  }

  buttonClicked(currButton) {
    currButton.color = 'secondary';
  }

}
