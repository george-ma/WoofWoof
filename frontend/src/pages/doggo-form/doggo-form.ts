import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Events } from 'ionic-angular';

/**
 * Generated class for the DoggoFormPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-doggo-form',
  templateUrl: 'doggo-form.html',
})
export class DoggoFormPage {

    createSuccess = false;

    // TODO: image upload integration
    dogInfo = {
        name: '',
        description: '',
        breed: '',
        imageURL: ''
    };

    constructor(
        public navCtrl: NavController, 
        public navParams: NavParams,
        private alertCtrl: AlertController,
        public events: Events
        ) {}
        
    public submitNewDoggo(){
        if (this.dogInfo.name === "" || this.dogInfo.description === "" || this.dogInfo.breed === ""){
            this.showPopup("Error", "Incomplete information.")
        } else {
            this.createSuccess = true;
            this.showPopup("Success", "New dog added.");
        }
    }

    uploadImage(){
      
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
                            this.events.publish('newDoggo', 
                            this.dogInfo.name, 
                            this.dogInfo.breed,
                            this.dogInfo.description,
                            this.dogInfo.imageURL)
                        });
                    } 
                }
            }
          ]
        });
        alert.present();
      }

}
