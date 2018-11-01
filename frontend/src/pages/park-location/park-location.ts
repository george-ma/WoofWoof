import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MAX_PICKER_SPEED } from 'ionic-angular/umd/components/picker/picker-options';

/**
 * Generated class for the ParkLocationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-park-location',
  templateUrl: 'park-location.html',
})
export class ParkLocationPage {

  private map: google.maps.Map;
  private dogPark: google.maps.Marker;
  private event: any;
  private placesService: google.maps.places.PlacesService;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ParkLocationPage');
    console.log(this.navParams.get('event'));
    this.event = this.navParams.get('event');
    this.map = new google.maps.Map(document.getElementById('map1'), {
      center: {lat: 0, lng: 0},
      zoom: 15
    });
    this.placesService = new google.maps.places.PlacesService(this.map);
    this.placesService.textSearch({ query: this.event.location }, (result: any, status) => {
      this.map.setCenter({ lat: result[0].geometry.location.lat(), lng: result[0].geometry.location.lng()})
      this.dogPark = new google.maps.Marker({
        map: this.map,
        position: { 
          lat: result[0].geometry.location.lat(), 
          lng: result[0].geometry.location.lng()
        }
      })
    });
  }

}
