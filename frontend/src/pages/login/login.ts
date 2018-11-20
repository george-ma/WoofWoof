import { Component, ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

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

    constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
    }

    ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    }

    loginUser(){
        if (this.username.value == "admin" && this.password.value == "admin") {
            const alert = this.alertCtrl.create({
                title: 'Login Successful!',
                subTitle: 'You are logged in.',
                buttons: [
                    {
                    text: 'OK',
                    handler: () => { this.navCtrl.push(TabsPage); }
                    }]
              });
              alert.present();
        }
    }

    redirectRegister(){
        this.navCtrl.push(RegisterFormPage);
    }


}
