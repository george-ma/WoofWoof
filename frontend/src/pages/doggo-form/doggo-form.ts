import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Events, ActionSheetController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { CameraOptions, Camera } from '@ionic-native/camera';

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

    image: any = null;

    public noImage = true;
    // TODO: image upload integration
    dogInfo = {
        name: '',
        description: '',
        breed: '',
        imageURL: ''
    };

    options: CameraOptions = {
        quality: 100,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE
    };

    constructor(
        private camera: Camera,
        public navCtrl: NavController,
        public navParams: NavParams,
        private alertCtrl: AlertController,
        public events: Events,
        private userProvider: UserProvider,
        private actionSheetCtrl: ActionSheetController,
    ) { }

    public submitNewDoggo() {
        if (this.dogInfo.name === "" || this.dogInfo.description === "" || this.dogInfo.breed === "" || this.image !== null) {
            this.showPopup("Error", "Incomplete information.")
        } else {
            this.createSuccess = true;
            this.userProvider.saveDog(this.image, 'amy4real', this.dogInfo.name).subscribe(result => {
                
                // this.navCtrl.push(GalleryPage, { image: base64Image });
            });
            this.showPopup("Success", "New dog added.");

        }
    }

    uploadImage() {

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
                            this.navCtrl.pop().then(() => {
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

    presentActionSheet() {
        const actionSheet = this.actionSheetCtrl.create({
            title: 'Doggo Photo',
            buttons: [
                {
                    text: 'Take Photo',
                    handler: () => {
                        console.log('Camera Picked');
                        this.camera.getPicture(this.options).then((imageData) => {
                            this.dogInfo.imageURL = 'data:image/jpeg;base64,' + imageData

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

}
