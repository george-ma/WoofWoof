import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { formArrayNameProvider } from '@angular/forms/src/directives/reactive_directives/form_group_name';

/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider {

  // public API = 'https://doggo-meet-uppo.herokuapp.com';
  public API = "http://localhost:8080";
  public USER_DETAIL_API = this.API + '/api/user';

  constructor(public http: HttpClient) {
    console.log('Hello UserProvider Provider');
  }

  saveUser(newUser: any): Observable<any> {
    return this.http.post(
      this.USER_DETAIL_API + '/save',
      newUser
    );
  }

  saveUserProfile(photo: any, username: string): Observable<any> {
    return this.http.post(
      this.USER_DETAIL_API + '/saveProfilePic',
      {
        profilePic: photo,
        username: username
      }

    );
  }

  saveDog(photo: any, username: string, dogName: string): Observable<any> {
    let formData: FormData = new FormData();
    formData.append('username', username);
    formData.append('dogname', dogName);
    formData.append('profilePic', this.dataURItoBlob(photo));
    return this.http.post(
      this.USER_DETAIL_API + '/saveDogPic', formData,
    );
  }

  getUserProfile(username: string): Observable<any> {
    return this.http.get(
      this.USER_DETAIL_API + '/getProfilePic/' + username,
      { responseType: 'blob' }
    );
  }

  userCheckin(username: string, place: string): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('geocode', place);
    return this.http.post(
      this.USER_DETAIL_API + '/checkIn/' + username,
      formData
      );
  }

  getUserLocation(username: string): Observable<string> {
    return this.http.get<string>(this.USER_DETAIL_API + '/getLocation/' + username);
  }

  getUsersAtLocation(geocode: string): Observable<string[]> {
    const formData: FormData = new FormData();
    formData.append('geocode', geocode);
    return this.http.post<string[]>(this.USER_DETAIL_API + '/allUsersAtPark', formData);
  }
  dataURItoBlob(dataURI) {
    // convert base64 to raw binary data held in a string
    var byteString = atob(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

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
