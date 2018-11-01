import { EventProvider } from './../../providers/event/event';
import { EditEventPage } from './../edit-event/edit-event';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ParkDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-park-details',
  templateUrl: 'park-details.html',
})
export class ParkDetailsPage {

  parkName: string;
  parkAddress: string;
  parkPictures: string[] = [];
  park: any;

  upcomingEvents: any;
  currentEvents: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public eventProvider: EventProvider) {
  }

  ionViewDidLoad() {
    this.parkName = this.navParams.get('parkName').split(',')[0];
    this.parkAddress = this.navParams.get('parkAddress');
    this.park = this.navParams.get('park');
    if (this.navParams.get('parkPictures') !== undefined) {
      this.navParams.get('parkPictures').forEach(picture => this.parkPictures.push(picture.getUrl({})));
    }
    console.log(this.navParams.get('parkName'));
    console.log(this.navParams.get('parkPictures'));
    console.log(this.navParams);
    console.log('ionViewDidLoad ParkDetailsPage');
    console.log(this.navParams.get('park'));
    console.log(this.parkName.split(',')[0]);
     this.eventProvider.getEventsByLocation(this.parkName).subscribe(result => {
      this.upcomingEvents = result.filter(event => event.status === 'PLANNED')
      console.log(this.upcomingEvents);
      this.currentEvents = result.filter(event => event.status === 'ACTIVE');
      console.log(this.currentEvents);
    });

    // this.eventProvider.getEventsByLocation(this.parkName).subscribe(result => {
    //   this.upcomingEvents = result;
    // });
  }

  rsvp(event) {
    console.log(event);
  }

  ionViewWillLeave() {
    // console.log(this.navParams.get('parentNav'));
    // this.navParams.get('parentNav').popToRoot();
  }

  newEvent() {
    this.navCtrl.push(EditEventPage,
      {
        parentNav: this.navParams.get('parentNav'),
        park: this.park
      }
    );
  }
}
