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
        {name:'Luna', breed: 'Rottweiler', description:'bestest boyo', imageURL:'assets/imgs/home/puppy-1.jpg'},
        {name:'Milo', breed: 'Golden Retriever', description:'second bestest boyo', imageURL:'assets/imgs/home/puppy-2.jpg'},
        {name:'Bandit', breed: 'Golden Retriever', description:'', imageURL:'assets/imgs/home/puppy-3.jpg'},
        {name:'Nala', breed: 'Shetland Sheepdog', description:'', imageURL:'assets/imgs/home/puppy-4.jpg'}];

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
      this.events.subscribe('newDoggo', (name, breed, description, imageURL) => {
          console.log(`Dog info: ${name} ${breed} ${description} ${imageURL}`);

          if (imageURL === ""){
              imageURL = 'assets/imgs/home/puppy-default.png'
          }
          
          this.doggos.push({name: name, breed: breed, description: description, imageURL: imageURL})
          
          this.events.unsubscribe('newDoggo')
      })
      this.navCtrl.push(DoggoFormPage);//{ parentNav: this.navParams.get('parentNav') });
  }

  
  
}

