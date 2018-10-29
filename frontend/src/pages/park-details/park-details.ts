import { Component } from '@angular/core';
import { NavController, NavParams, ItemSliding } from 'ionic-angular';

/**
 * Generated class for the ParkDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-park-details',
  templateUrl: 'park-details.html',
})
export class ParkDetailsPage {

  parkName: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.parkName = this.navParams.get('parkName');
    console.log(this.navParams.get('parkName'));
    console.log('ionViewDidLoad ParkDetailsPage');
  }

  ionViewWillLeave() {
    // console.log(this.navParams.get('parentNav'));
    this.navParams.get('parentNav').popToRoot();
  }
}
