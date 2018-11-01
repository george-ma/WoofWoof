import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { EditProfilePage } from '../edit-profile/edit-profile';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
    nav: string = "myDoggos"
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
  editProfile(){
    
    ////console.log('fail');
    
    this.navCtrl.push(EditProfilePage,
      {
        parentNav: this.navParams.get('parentNav')
      }
    );
    
  }
  
}

