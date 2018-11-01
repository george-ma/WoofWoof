import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ParkEvent } from './ParkEvent';
import { EventProvider } from '../../providers/event/event';
EventProvider

@Component({
  selector: 'page-events',
  templateUrl: 'events.html'
})
export class EventsPage {
  parkEvents: any;// ParkEvent[];
  origEvents: any;

  constructor(public navCtrl: NavController, public eventProvider: EventProvider) {
    // this.initializeEvents();
    this.eventProvider.getEventsByLocation('High Park Dog Off Leash Area').subscribe(result => {
      this.parkEvents = result;
      this.origEvents = result;
    })

  }

  initializeEvents() {
    this.parkEvents = [
      new ParkEvent('Doggo 2nd Birthday Party', 'Feb, 3, 2019', 'Queens park', 'Come for treats and photobooth'),
      new ParkEvent('Halloween Costume Party', 'Oct, 31, 2018', 'park', 'Come for treats and photobooth'),
      new ParkEvent('Obstacle Race', 'Aug, 10, 2019', 'park', 'Come for treats and photobooth')
    ];
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

  goToMap(ev) {

  }

}
