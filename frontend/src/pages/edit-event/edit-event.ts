import { UserProvider } from './../../providers/user/user';
import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker';
import { Camera, CameraOptions } from '@ionic-native/camera';

import { Component, Provider } from '@angular/core';
import { NavController, NavParams, Toast, ActionSheetController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ToastController } from 'ionic-angular';
import { EventProvider } from '../../providers/event/event';
import { GalleryPage } from '../gallery/gallery';
import { INTERNAL_BROWSER_DYNAMIC_PLATFORM_PROVIDERS } from '@angular/platform-browser-dynamic/src/platform_providers';
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


  public eventForm: FormGroup;
  private eventName;
  private location;
  private description;

  public noImage = true;

  myDate: String = new Date().toISOString();
  pushMyDate;
  park;
  parkName;
  parkAddress;

  parkPictures: string[] = [];
  imgUrl;

  options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  };

  constructor(
    private actionSheetCtrl: ActionSheetController, 
    private camera: Camera, 
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private formBuilder: FormBuilder, 
    private eventProvider: EventProvider, 
    public toastCtrl: ToastController,
    private userProvider: UserProvider
  ) {

    this.eventForm = this.formBuilder.group({
      eventName: [''],
      location: [''],
      description: new FormControl('', Validators.compose([
        //Validators.required
        //Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')   //Ensure email is valid
      ]))
    })
  }

  presentActionSheet() {
    const actionSheet = this.actionSheetCtrl.create({
      title: 'Event Photo',
      buttons: [
        {
          text: 'Take Photo',
          handler: () => {
            console.log('Camera Picked');
            this.camera.getPicture(this.options).then((imageData) => {
              let base64Image = 'data:image/jpeg;base64,' + imageData
              this.userProvider.saveUserProfile(base64Image, 'amy4real').subscribe(result => {
                
                // this.navCtrl.push(GalleryPage, { image: base64Image });
              });
            },
              (err) => {
                console.log(err);
              });
          }
        }
      ]
    });
    actionSheet.present();
  }

  addPic() {
  }

  presentToast() {
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

    this.eventProvider.saveEvent(newEvent).subscribe(result => { });
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