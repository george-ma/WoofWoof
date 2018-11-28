import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

/*
  Generated class for the EventProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class EventProvider {

  public API = 'https://doggo-meet-uppo.herokuapp.com'
  public PARK_DETAILS_API = this.API + '/api/event';

  constructor(public http: HttpClient) {
    console.log('Hello ParkDetailsServiceProvider Provider');
  }

  getAllEvents(): Observable<any> {
    return this.http.get(this.PARK_DETAILS_API + '/allEvents');
  }

  getEventsByLocation(location: string): Observable<any> {
    return this.http.post(
      this.PARK_DETAILS_API + '/geocode',
      location
    )
  }

  saveEvent(newEvent : any): Observable<any> {
    return this.http.put(
      this.PARK_DETAILS_API + '/add',
      newEvent
      )
  }

  getEventPhoto(park: string, eventName: string): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('parkName', park);
    formData.append('eventName', eventName);
    return this.http.post(
      this.PARK_DETAILS_API + '/getEventPic',
      formData
    )
  }
}
