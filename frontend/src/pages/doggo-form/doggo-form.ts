import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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
    dogInfo = {
        name: '',
        description: '',
        imageURL: ''
    };

    constructor(public navCtrl: NavController, public navParams: NavParams) { }

    addNewDoggo(){
        
    }

    uploadImage(){
      
    }

}
