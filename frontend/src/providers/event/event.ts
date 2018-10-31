import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the EventProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class EventProvider {

  public API = 'http://localhost:8080';
  public PARK_DETAILS_API = this.API + '/api/event';

  constructor(public http: HttpClient) {
    console.log('Hello ParkDetailsServiceProvider Provider');
  }

  getAllEvents(): Observable<any> {
    return this.http.get(this.PARK_DETAILS_API + '/allEvents');
  }

  getEventsByLocation(location: string): Observable<Object> {
    return this.http.post(
      this.PARK_DETAILS_API + '/geocode',
      JSON.stringify({ location })
    )
  }
}
