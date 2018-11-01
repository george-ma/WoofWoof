
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ParkDetailsPage } from './../park-details/park-details';
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


  private todo: FormGroup;
  private eventName;
  private location;
  private description;

  park;
  parkName;
  parkAddress;

  parkPictures: string[] = [];
  imgUrl;

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder) {
    
    this.todo = this.formBuilder.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      email: new FormControl('', Validators.compose([
        Validators.required
        //Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')   //Ensure email is valid
      ]))
    })


  }



  logForm() {
    //console.log(this.todo);
    console.log(this.todo.value);
    this.eventName = this.todo.value.name;
    this.location = this.todo.value.email;
    this.description = this.todo.value.username;
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
/*
    if (this.navParams.get('parkPictures') !== undefined) {
      
      this.navParams.get('parkPictures').forEach(picture => 
        this.parkPictures.push(picture));    

      }
    */
    console.log("park: " + this.park);
    console.log("parkName: " + this.parkName);
    console.log("parkAddress: " + this.parkAddress);
    console.log("parkPictures: " + this.parkPictures);


    console.log('ionViewDidLoad EditEventPage');


    
  }

}