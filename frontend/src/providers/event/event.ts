import { ParkDetailsPage } from './../../pages/park-details/park-details';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { EventListener } from "@angular/core/src/debug/debug_node";

/*
  Generated class for the EventProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class EventProvider {
  public API = "https://doggo-meet-uppo.herokuapp.com";
  // public API = "http://localhost:8080";
  public PARK_DETAILS_API = this.API + "/api/event";

  constructor(public http: HttpClient) {
    console.log("Hello ParkDetailsServiceProvider Provider");
  }

  getAllEvents(): Observable<any> {
    return this.http.get(this.PARK_DETAILS_API + "/allEvents");
  }

  getAllHostedEvents(username: string): Observable<any> {
    return this.http.get(this.PARK_DETAILS_API + '/getAllHosted/' + username);
  }

  getAllAttendedEvents(username: string): Observable<any> {
    return this.http.get(this.PARK_DETAILS_API + '/getAllAttending/' + username);
  }

  getEventsByLocation(location: string): Observable<any> {
    return this.http.post(this.PARK_DETAILS_API + "/geocode", location);
  }

  addEvent(newEvent: any): Observable<any> {
    return this.http.put(this.PARK_DETAILS_API + "/add", newEvent);
  }

  saveEvent(newEvent: any): Observable<any> {
    return this.http.put(this.PARK_DETAILS_API + "/save", newEvent);
  }

  attendEvent(
    park: string,
    eventName: string,
    username: string
  ): Observable<any> {
    const formData: FormData = new FormData();
    formData.append("geocode", park);
    formData.append("eventName", eventName);
    formData.append("username", username);

    return this.http.post(this.PARK_DETAILS_API + "/attendEvent", formData);
  }

  removeAttend(
    park: string,
    eventName: string,
    username: string
  ): Observable<any> {
    const formData: FormData = new FormData();
    formData.append("geocode", park);
    formData.append("eventName", eventName);
    formData.append("username", username);

    return this.http.post(this.PARK_DETAILS_API + "/removeAttend", formData);
  }

  getEventPhoto(park: string, eventName: string): Observable<any> {
    const formData: FormData = new FormData();
    formData.append("parkName", park);
    formData.append("eventName", eventName);
    return this.http.post(this.PARK_DETAILS_API + "/getEventPic", formData, {
      responseType: "blob"
    });
  }

  saveEventPhoto(photo: any, park: string, eventName: string): Observable<any> {
    const formData: FormData = new FormData();
    formData.append("parkName", park);
    formData.append("eventName", eventName);
    formData.append('eventPic', this.dataURItoBlob(photo));
    return this.http.post(this.PARK_DETAILS_API + "/saveEventPic", formData, {
      responseType: "blob"
    });
  }

  isAttending(
    park: string,
    eventName: string,
    username: string
  ): Observable<any> {
    const formData: FormData = new FormData();
    formData.append("geocode", park);
    formData.append("eventName", eventName);
    formData.append("username", username);

    return this.http.post(this.PARK_DETAILS_API + "/isGoing", formData);
  }

  dataURItoBlob(dataURI) {
    // convert base64 to raw binary data held in a string
    var byteString = atob(dataURI.split(",")[1]);

    // separate out the mime component
    var mimeString = dataURI
      .split(",")[0]
      .split(":")[1]
      .split(";")[0];

    // write the bytes of the string to an ArrayBuffer
    var arrayBuffer = new ArrayBuffer(byteString.length);
    var _ia = new Uint8Array(arrayBuffer);
    for (var i = 0; i < byteString.length; i++) {
      _ia[i] = byteString.charCodeAt(i);
    }

    var dataView = new DataView(arrayBuffer);
    var blob = new Blob([dataView], { type: mimeString });
    return blob;
  }
}
