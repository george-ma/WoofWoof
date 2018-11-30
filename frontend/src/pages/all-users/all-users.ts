import { UserProvider } from "./../../providers/user/user";
import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";

/**
 * Generated class for the AllUsersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-all-users",
  templateUrl: "all-users.html"
})
export class AllUsersPage {
  park = "";
  allUsers: string[] = [];
  pictureURI: Object = {};

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public userProvider: UserProvider
  ) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad AllUsersPage");
    this.park = this.navParams.get("park");
    console.log(this.park);
    this.userProvider.getUsersAtLocation(this.park).subscribe(users => {
      console.log(users);
      this.allUsers = users;
      this.allUsers.forEach(user => {
        this.userProvider.getUserProfile(user).subscribe(res => {
          this.createImageFromBlob(res, user);
        });
      });
    });
  }

  createImageFromBlob(image: Blob, key: string) {
    let reader = new FileReader();
    reader.addEventListener(
      "load",
      () => {
        this.pictureURI[key] = reader.result;
      },
      false
    );

    if (image) {
      reader.readAsDataURL(image);
    }
  }
}
