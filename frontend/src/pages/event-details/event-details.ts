import { UserProvider } from "./../../providers/user/user";
import { EventProvider } from "./../../providers/event/event";
import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { Storage } from "@ionic/storage";

/**
 * Generated class for the EventDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-event-details",
  templateUrl: "event-details.html"
})
export class EventDetailsPage {
  title: string;
  description: string;
  location: string;
  pictureURI: Object = {};
  imageToShow: any;
  attending: any[];

  going: boolean;

  event: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public eventProvider: EventProvider,
    public userProvider: UserProvider,
    public storage: Storage
  ) {}

  ionViewDidLoad() {
    console.log(this.navParams);
    this.title = this.navParams.get("event").eventName;
    this.event = this.navParams.get("event");
    this.description = this.navParams.get("event").eventInfo;
    this.location = this.navParams.get("event").location;
    this.attending = this.navParams.get("event").attending;
    console.log(this.attending);
    console.log(this.location, this.title);

    this.eventProvider
      .getEventPhoto(this.location, this.title)
      .subscribe(res => {
        this.createImageFromBlob(res, "event");
        // this.pictureURI = 'data:image/jpeg;base64,' + res;
        // console.log(res);
      });
    if (this.attending) {
      this.attending.forEach(user => {
        this.userProvider.getUserProfile(user).subscribe(res => {
          this.createImageFromBlob(res, user);
        });
      });
    }
    this.storage.get("user").then(val => {
      this.eventProvider.isAttending(this.location, this.title, val).subscribe(val => {
        this.going = val;
      });
    });
  }

  notGo() {
    this.storage.get("user").then(val => {
      this.eventProvider
        .removeAttend(this.location, this.title, val)
        .subscribe(u => {
          console.log("notGo");
          this.going = false;
        });
    });
  }

  go() {
    this.storage.get("user").then(val => {
      this.eventProvider
        .attendEvent(this.location, this.title, val)
        .subscribe(u => {
          console.log("go");
          this.going = true;
        });
    });
  }

  getProfilePic(username: string) {}

  createImageFromBlob(image: Blob, key: string) {
    let reader = new FileReader();
    reader.addEventListener(
      "load",
      () => {
        this.pictureURI[key] = reader.result;
      },
      false
    );

    if (image) {
      reader.readAsDataURL(image);
    }
  }
}
