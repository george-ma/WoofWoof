import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Events, ActionSheetController, ToastController, Platform, LoadingController, Loading } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { CameraOptions, Camera } from '@ionic-native/camera';
import { Transfer, TransferObject } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { File } from '@ionic-native/file';

/**
 * Generated class for the DoggoFormPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

declare var cordova: any;

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

    lastImage: string = null;
    loading: Loading;

    options: CameraOptions = {
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
        private transfer: Transfer,
        private file: File,
        private filePath: FilePath,
        public actionSheetCtrl: ActionSheetController,
        public toastCtrl: ToastController,
        public platform: Platform,
        public loadingCtrl: LoadingController
    ) { }

    public submitNewDoggo() {
        if (this.dogInfo.name === "" || this.dogInfo.description === "" || this.dogInfo.breed === "" || this.image !== null) {
            this.showPopup("Error", "Incomplete information.")
        } else {
            this.createSuccess = true;
            this.userProvider.saveDog(this.dogInfo.imageURL, 'amy4real', this.dogInfo.name).subscribe(result => {

                // this.navCtrl.push(GalleryPage, { image: base64Image });
            });
            this.showPopup("Success", "New dog added.");

        }
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

    public presentActionSheet() {
        let actionSheet = this.actionSheetCtrl.create({
            title: 'Select Image Source',
            buttons: [
                {
                    text: 'Load from Library',
                    handler: () => {
                        this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
                    }
                },
                {
                    text: 'Use Camera',
                    handler: () => {
                        this.takePicture(this.camera.PictureSourceType.CAMERA);
                    }
                },
                {
                    text: 'Cancel',
                    role: 'cancel'
                }
            ]
        });
        actionSheet.present();
    }


    public takePicture(sourceType) {
        // Create options for the Camera Dialog
        var options = {
            quality: 100,
            sourceType: sourceType,
            saveToPhotoAlbum: false,
            correctOrientation: true,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE
        };

        // Get the data of an image
        this.camera.getPicture(options).then((imagePath) => {
            this.dogInfo.imageURL = 'data:image/jpeg;base64,' + imagePath;
            // Special handling for Android library
            if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
                this.filePath.resolveNativePath(imagePath)
                    .then(filePath => {
                        let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
                        let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
                        this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
                    });
            } else {
                var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
                var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
                this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
            }
        }, (err) => {
            this.presentToast('Error while selecting image.');
        });
    }

    private createFileName() {
        var d = new Date(),
            n = d.getTime(),
            newFileName = n + ".jpg";
        return newFileName;
    }

    private copyFileToLocalDir(namePath, currentName, newFileName) {
        this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
            this.lastImage = newFileName;
            // this.dogInfo.imageURL = this.pathForImage(this.lastImage);
        }, error => {
            this.presentToast('Error while storing file.');
        });
    }

    private presentToast(text) {
        let toast = this.toastCtrl.create({
            message: text,
            duration: 3000,
            position: 'top'
        });
        toast.present();
    }

    // Always get the accurate path to your apps folder
    public pathForImage(img) {
        if (img === null) {
            return '';
        } else {
            return cordova.file.dataDirectory + img;
        }
    }

    public uploadImage() {
        // Destination URL
        var url = 'https://doggo-meet-uppo.herokuapp.com/api/user/saveDogPic';

        // File for Upload
        var targetPath = this.pathForImage(this.lastImage);

        // File name only
        var filename = this.lastImage;

        var options = {
            fileKey: "file",
            fileName: this.dogInfo.name, // filename,
            chunkedMode: false,
            mimeType: "multipart/form-data",
            params: { 'fileName': filename }
        };

        const fileTransfer: TransferObject = this.transfer.create();

        this.loading = this.loadingCtrl.create({
            content: 'Uploading...',
        });
        this.loading.present();

        // Use the FileTransfer to upload the image
        fileTransfer.upload(targetPath, url, options).then(data => {
            this.loading.dismissAll()
            this.presentToast('Image succesful uploaded.');
        }, err => {
            this.loading.dismissAll()
            this.presentToast('Error while uploading file.');
        });
    }

}
