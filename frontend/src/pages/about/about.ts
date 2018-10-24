import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Geolocation } from '@ionic-native/geolocation';
import { } from 'google-maps';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  map: any;

  constructor(
    public navCtrl: NavController,
    private geolocation: Geolocation
  ) {

  }

  ionViewDidEnter() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.map = new google.maps.Map(
        document.getElementById('map'),
        {
          center: {
            lat: resp.coords.latitude,
            lng: resp.coords.longitude
          },
          zoom: 15
        }
      );
    });
  }

}
