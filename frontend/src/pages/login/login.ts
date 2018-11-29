import { Component, ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Events } from 'ionic-angular';


import { TabsPage } from './../tabs/tabs';
import { RegisterFormPage } from '../register-form/register-form';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

    @ViewChild('username') username;
    @ViewChild('password') password;
    
    loginSuccess = false;
    private accounts = {
        'admin': 'admin'
    };

    constructor(public navCtrl: NavController, public navParams: NavParams, 
        public alertCtrl: AlertController, public events: Events) {
    }

    loginUser(){
        var found = false;
        for (var userName in this.accounts){
            if (this.username.value === userName && this.password.value === this.accounts[userName]) {
                this.loginSuccess = true;
                this.navCtrl.push(TabsPage);
                found = true;
                return;
            }
        }
        if (!found){this.showPopup("Error", "Invalid Login Credentials.")}
    }

    redirectRegister(){
        this.events.subscribe('newUser', (user, password) => {
            console.log(`Register Info ${user} ${password}`);
            this.accounts[user] = password; // update users array

            this.events.unsubscribe('newUser')
        })
        this.navCtrl.push(RegisterFormPage);
    }
    
    showPopup(title, text) {
        let alert = this.alertCtrl.create({
          title: title,
          subTitle: text,
          buttons: [
            {
              text: 'OK',
              handler: () => { 
                    if (this.loginSuccess) {
                        this.navCtrl.push(TabsPage);
                    } 
                }
            }
          ]
        });
        alert.present();
    }

}
