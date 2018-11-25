import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { EditProfilePage } from '../edit-profile/edit-profile';
import { DoggoFormPage } from '../doggo-form/doggo-form';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
    nav: string = "myDoggos"
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }


  editProfile(){
    this.navCtrl.push(EditProfilePage,
      {
        parentNav: this.navParams.get('parentNav')
      }
    );
  }

  addNewDoggo(){
      this.navCtrl.push(DoggoFormPage,
        { parentNav: this.navParams.get('parentNav') }
      );
  }
  
}

