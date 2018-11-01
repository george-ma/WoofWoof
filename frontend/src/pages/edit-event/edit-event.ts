
import { Component, Provider } from '@angular/core';
import { NavController, NavParams, Toast } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ToastController } from 'ionic-angular';
import { EventProvider } from '../../providers/event/event';
/**
 * Generated class for the EditEventPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-edit-event',
  templateUrl: 'edit-event.html',
})



export class EditEventPage {


  private eventForm: FormGroup;
  private eventName;
  private location;
  private description;
  
  myDate;
  pushMyDate;
  park;
  parkName;
  parkAddress;

  parkPictures: string[] = [];
  imgUrl;

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, private eventProvider: EventProvider, public toastCtrl: ToastController) {
    
    this.eventForm = this.formBuilder.group({
      eventName: ['', Validators.required],
      location: ['', Validators.required],
      description: new FormControl('', Validators.compose([
        Validators.required
        //Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')   //Ensure email is valid
      ]))
    })


  }

  presentToast(){
    const toast = this.toastCtrl.create({
      message: 'Event successfully created!',
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }

  logForm() {
    //console.log(this.todo);
    console.log(this.eventForm.value);
    const newEvent = {
      

      //pushMyDate: this.myDate,
      eventName: this.eventForm.value.eventName,
      location: this.eventForm.value.location,
      eventInfo: this.eventForm.value.description,
      isPublic: true
    }
    
    this.eventProvider.saveEvent(newEvent).subscribe(result => {});
    this.navCtrl.pop();
    this.presentToast();
  }

  ionViewDidLoad() {
    
    //this.parkPictures = this.navParams.get('parkPictures');
    //console.log(this.navParams.get('park'));
    console.log(this.navParams.get('parkPictures'));
    this.park = this.navParams.get('park');
    this.parkName = this.navParams.get('parkName');
    this.parkAddress = this.navParams.get('parkAddress');
    this.imgUrl = this.navParams.get('imgUrl');
    console.log("imgurl: " + this.imgUrl);

    console.log("park: " + this.park);
    console.log("parkName: " + this.parkName);
    console.log("parkAddress: " + this.parkAddress);
    console.log("parkPictures: " + this.parkPictures);


    console.log('ionViewDidLoad EditEventPage');


    
  }

}