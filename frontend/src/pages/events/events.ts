import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ParkEvent } from './ParkEvent';

@Component({
  selector: 'page-events',
  templateUrl: 'events.html'
})
export class EventsPage {
  parkEvents: ParkEvent[];

  constructor(public navCtrl: NavController) {
    this.initializeEvents();

  }

  initializeEvents() {
    this.parkEvents = [
      new ParkEvent('Doggo 2nd Birthday Party', 'Feb, 3, 2019', 'Come for treats and photobooth'),
      new ParkEvent('Halloween Costume Party', 'Oct, 31, 2018', 'Come for treats and photobooth'),
      new ParkEvent('Obstacle Race', 'Aug, 10, 2019', 'Come for treats and photobooth')
    ];
  }

  searchEvents(ev) {
    this.initializeEvents();

    var search = ev.target.value;

    // if the value is an empty string don't filter the items
    if (search && search.trim() != '') {
      this.parkEvents = this.parkEvents.filter((event) => {
        return (event.name.toLowerCase().indexOf(search.toLowerCase()) > -1);
      })
    }
  }

}
