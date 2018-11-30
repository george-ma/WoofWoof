import { AllUsersPage } from './../all-users/all-users';
import { UserProvider } from "./../../providers/user/user";
import { EventProvider } from "./../../providers/event/event";
import { EditEventPage } from "./../edit-event/edit-event";
import { Component } from "@angular/core";
import { NavController, NavParams, ModalController } from "ionic-angular";
import { EventDetailsPage } from "../event-details/event-details";
import { Storage } from "@ionic/storage";

/**
 * Generated class for the ParkDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: "page-park-details",
  templateUrl: "park-details.html"
})
export class ParkDetailsPage {
  parkName: string;
  parkAddress: string;
  parkPictures: string[] = [];
  park: any;

  upcomingEvents: any;
  currentEvents: any;

  checkin = "danger";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public eventProvider: EventProvider,
    public modalController: ModalController,
    private storage: Storage,
    private userProvider: UserProvider
  ) {}

  ionViewDidEnter() {
    this.eventProvider.getEventsByLocation(this.parkName).subscribe(result => {
      this.upcomingEvents = result.filter(event => event.status === "PLANNED");
      console.log(this.upcomingEvents);
      this.currentEvents = result.filter(event => event.status === "ACTIVE");
      console.log(this.currentEvents);
    });
  }

  ionViewDidLoad() {
    this.parkName = this.navParams.get("parkName").split(",")[0];
    this.parkAddress = this.navParams.get("parkAddress");
    this.park = this.navParams.get("park");
    if (this.navParams.get("parkPictures") !== undefined) {
      this.navParams
        .get("parkPictures")
        .forEach(picture => this.parkPictures.push(picture.getUrl({})));
    }
    console.log(this.navParams.get("parkName"));
    console.log(this.navParams.get("parkPictures"));
    console.log(this.navParams);
    console.log("ionViewDidLoad ParkDetailsPage");
    console.log(this.navParams.get("park"));
    console.log(this.parkName.split(",")[0]);
    this.eventProvider.getEventsByLocation(this.parkName).subscribe(result => {
      this.upcomingEvents = result.filter(event => event.status === "PLANNED");
      console.log(this.upcomingEvents);
      this.currentEvents = result.filter(event => event.status === "ACTIVE");
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

  checkIn() {
    this.storage.get('user').then(val => {
      console.log(val);
      this.userProvider.userCheckin(val, this.parkName).subscribe(_ => {
        this.checkin = "primary";
      });
    });
  }

  usersCheckedIn() {
    this.navCtrl.push(AllUsersPage, { park: this.parkName })
    console.log("all checked in users");
  }

  newEvent() {
    let passImgUrl = this.parkPictures[0];
    console.log("fail");
    let passPark = this.park;
    let passParkName = this.parkName;
    let passParkAddress = this.parkAddress;
    let passParkPics = this.parkPictures;

    this.navCtrl.push(EditEventPage, {
      parentNav: this.navParams.get("parentNav"),
      imgUrl: passImgUrl,
      park: passPark,
      parkName: passParkName,
      parkAddress: passParkAddress,
      parkPictures: passParkPics
    });
    console.log(passParkPics);
  }

  showEvent(event) {
    this.navCtrl.push(EventDetailsPage, { event: event });
  }
		

}
