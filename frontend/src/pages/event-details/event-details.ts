import { UserProvider } from "./../../providers/user/user";
import { EventProvider } from "./../../providers/event/event";
import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";

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

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public eventProvider: EventProvider,
    public userProvider: UserProvider
  ) {}

  ionViewDidLoad() {
    console.log(this.navParams);
    this.title = this.navParams.get("event").eventName;
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
