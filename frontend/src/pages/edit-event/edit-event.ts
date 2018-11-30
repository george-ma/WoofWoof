import { Camera, CameraOptions } from "@ionic-native/camera";

import { File } from "@ionic-native/file";
import { Component, Provider } from "@angular/core";
import {
  NavController,
  NavParams,
  Toast,
  ActionSheetController,
  Platform,
  LoadingController,
  Loading
} from "ionic-angular";
import {
  Validators,
  FormBuilder,
  FormGroup,
  FormControl
} from "@angular/forms";
import { ToastController } from "ionic-angular";
import { EventProvider } from "../../providers/event/event";
import { FilePath } from "@ionic-native/file-path";
/**
 * Generated class for the EditEventPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

declare var cordova: any;

@Component({
  selector: "page-edit-event",
  templateUrl: "edit-event.html"
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
  parkName = "";
  parkAddress;
  lastImage: string = null;
  loading: Loading;
  parkPictures: string[] = [];
  imgUrl;

  options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  };
  eventInfo: any;

  constructor(
    private actionSheetCtrl: ActionSheetController,
    private camera: Camera,
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private eventProvider: EventProvider,
    private file: File,
    private filePath: FilePath,
    public toastCtrl: ToastController,
    public platform: Platform,
    public loadingCtrl: LoadingController
  ) {
    this.eventForm = this.formBuilder.group({
      eventName: [""],
      location: [""],
      description: new FormControl(
        "",
        Validators.compose([
          //Validators.required
          //Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')   //Ensure email is valid
        ])
      )
    });
  }
  public presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: "Select Image Source",
      buttons: [
        {
          text: "Load from Library",
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: "Use Camera",
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: "Cancel",
          role: "cancel"
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
    this.camera.getPicture(options).then(
      imagePath => {
        this.imgUrl = "data:image/jpeg;base64," + imagePath;
        // Special handling for Android library
        if (
          this.platform.is("android") &&
          sourceType === this.camera.PictureSourceType.PHOTOLIBRARY
        ) {
          this.filePath.resolveNativePath(imagePath).then(filePath => {
            let correctPath = filePath.substr(0, filePath.lastIndexOf("/") + 1);
            let currentName = imagePath.substring(
              imagePath.lastIndexOf("/") + 1,
              imagePath.lastIndexOf("?")
            );
            this.copyFileToLocalDir(
              correctPath,
              currentName,
              this.createFileName()
            );
          });
        } else {
          var currentName = imagePath.substr(imagePath.lastIndexOf("/") + 1);
          var correctPath = imagePath.substr(0, imagePath.lastIndexOf("/") + 1);
          this.copyFileToLocalDir(
            correctPath,
            currentName,
            this.createFileName()
          );
        }
      },
      err => {
        this.presentToast("Error while selecting image.");
      }
    );
  }

  private createFileName() {
    var d = new Date(),
      n = d.getTime(),
      newFileName = n + ".jpg";
    return newFileName;
  }

  private copyFileToLocalDir(namePath, currentName, newFileName) {
    this.file
      .copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName)
      .then(
        success => {
          this.lastImage = newFileName;
          // this.dogInfo.imageURL = this.pathForImage(this.lastImage);
        },
        error => {
          this.presentToast("Error while storing file.");
        }
      );
  }

  // Always get the accurate path to your apps folder
  public pathForImage(img) {
    if (img === null) {
      return "";
    } else {
      return cordova.file.dataDirectory + img;
    }
  }
  addPic() {}

  presentToast(msg: string) {
    const toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: "bottom"
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
      attending: []
    };

    this.eventProvider.addEvent(newEvent).subscribe(result => {});
    this.eventProvider.saveEventPhoto(this.imgUrl, this.parkName, this.eventName).subscribe(result => { });
    this.navCtrl.pop();
    this.presentToast('event saved!!');
  }

  ionViewDidLoad() {
    //this.parkPictures = this.navParams.get('parkPictures');
    //console.log(this.navParams.get('park'));
    console.log(this.navParams);
    console.log(this.navParams.get("parkPictures"));
    this.park = this.navParams.get("park");
    this.parkName = this.navParams.get("parkName");
    this.parkAddress = this.navParams.get("parkAddress");
    this.imgUrl = this.navParams.get("imageUrl");
    this.eventInfo = this.navParams.get("description");
    this.eventName = this.navParams.get("eventName")
    console.log("imgurl: " + this.imgUrl);

    console.log("park: " + this.park);
    console.log("parkName: " + this.parkName);
    console.log("parkAddress: " + this.parkAddress);
    console.log("parkPictures: " + this.parkPictures);

    console.log("ionViewDidLoad EditEventPage");
  }
}
