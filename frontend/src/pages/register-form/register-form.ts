import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Events } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-register-form',
  templateUrl: 'register-form.html',
})
export class RegisterFormPage {

  createSuccess = false;
  registerCredentials = {
    name: '',
    email: '',
    password: '',
    confirmation_password: ''
  };

  constructor(
      public navCtrl: NavController, 
      public navParams: NavParams,
      private alertCtrl: AlertController,
      public events: Events
      ) {}

  public register() {
    if (this.registerCredentials.name === "" || this.registerCredentials.email === "" || this.registerCredentials.password === "" || this.registerCredentials.confirmation_password === ""){
        this.showPopup("Error", "Incomplete registration form.")
    }
    else if (this.registerCredentials.password != this.registerCredentials.confirmation_password) {
      this.showPopup("Error", "The password confirmation does not match.");
    } else {
        this.createSuccess = true;
        this.showPopup("Success", "Account created.");
    }
  }

  showPopup(title, text) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: [
        {
          text: 'OK',
          handler: () => { 
                if (this.createSuccess) {
                    this.navCtrl.pop().then( () => {
                        this.events.publish('newUser', this.registerCredentials.name, this.registerCredentials.password)
                    });
                } 
            }
        }
      ]
    });
    alert.present();
  }

}
