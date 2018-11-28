import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider {

  public API = 'https://doggo-meet-uppo.herokuapp.com';
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
