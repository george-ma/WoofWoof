import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-events',
  templateUrl: 'events.html'
})
export class EventsPage {
  parkEvents;

  constructor(public navCtrl: NavController) {
    this.initializeEvents();

  }

  initializeEvents() {
    this.parkEvents = [
      'Doggo 2nd Birthday Party',
      'Halloween Costume Party',
      'Obstacle Race'
    ];
  }

  searchEvents(ev) {
    this.initializeEvents();

    var search = ev.target.value;

    // if the value is an empty string don't filter the items
    if (search && search.trim() != '') {
      this.parkEvents = this.parkEvents.filter((event) => {
        return (event.toLowerCase().indexOf(search.toLowerCase()) > -1);
      })
    }
  }

}
