import { EventProvider } from './../../providers/event/event';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the EventDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-event-details',
  templateUrl: 'event-details.html',
})
export class EventDetailsPage {

  title: string;
  description: string;
  location: string;
  pictureURI: any;
  imageToShow: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public eventProvider: EventProvider) {
  }

  ionViewDidLoad() {
    console.log(this.navParams);
    this.title = this.navParams.get('event').eventName;
    this.description = this.navParams.get('event').eventInfo;
    this.location = this.navParams.get('event').location;
    console.log(this.location, this.title);
    this.eventProvider.getEventPhoto(this.location, this.title).subscribe(res => {
      console.log(this.pictureURI);
      this.createImageFromBlob(res);
      // this.pictureURI = 'data:image/jpeg;base64,' + res;
      // console.log(res);
    })
  }


  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      this.pictureURI = reader.result;
    }, false);

    if (image) {
      reader.readAsDataURL(image);
    }
  }

}
