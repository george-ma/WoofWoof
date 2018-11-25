import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, Events } from 'ionic-angular';
import { EditProfilePage } from '../edit-profile/edit-profile';
import { DoggoFormPage } from '../doggo-form/doggo-form';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
    nav: string = "myDoggos"

    public doggos: any = [
        {name:'Luna', description:'bestest boyo', imageURL:'assets/imgs/home/puppy-1.jpg'},
        {name:'Milo', description:'second bestest boyo', imageURL:'assets/imgs/home/puppy-2.jpg'},
        {name:'Bandit', description:'', imageURL:'assets/imgs/home/puppy-3.jpg'},
        {name:'Nala', description:'', imageURL:'assets/imgs/home/puppy-4.jpg'}];

    constructor(public navCtrl: NavController, public navParams: NavParams, 
        public alertCtrl: AlertController, public events: Events) {
    }


  editProfile(){
    this.navCtrl.push(EditProfilePage,
      {
        parentNav: this.navParams.get('parentNav')
      }
    );
  }

  redirectNewDoggo(){
      this.events.subscribe('newDoggo', (name, description, imageURL) => {
          console.log(`Dog info: ${name} ${description} ${imageURL}`);

          if (imageURL === ""){
              imageURL = 'assets/imgs/home/puppy-default.png'
          }
          
          this.doggos.push({name: name, description: description, imageURL: imageURL})
          
          this.events.unsubscribe('newDoggo')
      })
      this.navCtrl.push(DoggoFormPage);//{ parentNav: this.navParams.get('parentNav') });
  }

  
  
}

