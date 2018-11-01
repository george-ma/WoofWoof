import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { HomePage } from './../home/home';
import { PasswordValidation } from './password-validation';
/**
 * Generated class for the EditProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html',
})
export class EditProfilePage {

  private profileForm: FormGroup;
  private username;
  private password;
  private confirmPassword;
  private email;

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder) {
    this.profileForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')   //Ensure email is valid
      ]))
    },
    {
      validator: PasswordValidation.MatchPassword // your validation method
    })
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditProfilePage');
    
  }

  logForm() {
    //console.log(this.todo);
    console.log(this.profileForm.value);
    this.username = this.profileForm.value.username;
    this.password = this.profileForm.value.password;
    this.email = this.profileForm.value.email;
    console.log(this.username);
    console.log(this.password);
    console.log(this.email);
    this.navCtrl.push(HomePage,
      {
        parentNav: this.navParams.get('parentNav')
      }
    );
  }

}
