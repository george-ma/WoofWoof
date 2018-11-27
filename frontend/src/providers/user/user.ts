import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
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

  saveDog(photo: File, username: string, dogName: string): Observable<any> {
    return this.http.post(
      this.USER_DETAIL_API + '/saveDogPic',
      {
        profilePic: photo,
        username: username,
        dogname: dogName
      }
    );
  }

}
