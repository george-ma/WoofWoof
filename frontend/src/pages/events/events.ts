import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { ParkEvent } from "./ParkEvent";
import { EventProvider } from "../../providers/event/event";
import { ParkLocationPage } from "../park-location/park-location";
import { EditEventPage } from "../edit-event/edit-event";
import { Storage } from "@ionic/storage";
EventProvider;

@Component({
  selector: "page-events",
  templateUrl: "events.html"
})
export class EventsPage {
  parkEvents: any;
  origEvents: any;
  rsvpButtonColour: string;
  events: string;

  attendedEvents: any[] = [];
  hostedEvents: any[] = [];

  imageURL: Object = {};

  constructor(
    public navCtrl: NavController,
    public eventProvider: EventProvider,
    public storage: Storage
  ) {
    this.eventProvider.getAllEvents().subscribe((result: any[]) => {
      this.parkEvents = result.filter(event => event.isPublic);
      this.origEvents = this.parkEvents;
      console.log("new events");
    });
    this.rsvpButtonColour = "primary";
    this.events = "Going";
  }

  ionViewDidLoad() {
    this.storage.get("user").then(res => {
      this.eventProvider
        .getAllAttendedEvents(res)
        .subscribe((result: any[]) => {
          this.attendedEvents = result;
          this.attendedEvents.forEach(ev => {
            this.eventProvider
              .getEventPhoto(ev.location, ev.eventName)
              .subscribe(res => {
                this.createImageFromBlob(res, ev.eventName);
              });
          });
        });
      this.eventProvider.getAllHostedEvents(res).subscribe((result: any[]) => {
        this.hostedEvents = result;
        this.hostedEvents.forEach(ev => {
          this.eventProvider
            .getEventPhoto(ev.location, ev.eventName)
            .subscribe(res => {
              this.createImageFromBlob(res, ev.eventName);
            });
        });
      });
    });
  }

  initializeEvents() {
    this.parkEvents = [
      new ParkEvent(
        "Doggo 2nd Birthday Party",
        "Feb, 3, 2019",
        "Queens park",
        "Come for treats and photobooth"
      ),
      new ParkEvent(
        "Halloween Costume Party",
        "Oct, 31, 2018",
        "park",
        "Come for treats and photobooth"
      ),
      new ParkEvent(
        "Obstacle Race",
        "Aug, 10, 2019",
        "park",
        "Come for treats and photobooth"
      )
    ];
  }

  searchEvents(ev) {
    // this.initializeEvents();

    const search: string = ev.target.value;

    // if the value is an empty string don't filter the items
    if (search && search.trim() != "") {
      this.parkEvents = this.parkEvents.filter(event => {
        return event.eventName.toLowerCase().indexOf(search.toLowerCase()) > -1;
      });
    } else {
      this.parkEvents = this.origEvents;
    }
  }

  goToMap(event) {
    this.navCtrl.push(ParkLocationPage, { event: event });
  }

  goToEdit(event) {
    console.log(event);
    this.navCtrl.push(EditEventPage, { parkName: event.parkName });
  }

  buttonClicked(currButton) {
    currButton.color = "secondary";
  }

  createImageFromBlob(image: Blob, key: string) {
    let reader = new FileReader();
    reader.addEventListener(
      "load",
      () => {
        this.imageURL[key] = reader.result;
      },
      false
    );

    if (image) {
      reader.readAsDataURL(image);
    }
  }
}
