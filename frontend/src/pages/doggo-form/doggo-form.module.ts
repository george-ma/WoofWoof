import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DoggoFormPage } from './doggo-form';

@NgModule({
  declarations: [
    DoggoFormPage,
  ],
  imports: [
    IonicPageModule.forChild(DoggoFormPage),
  ],
})
export class DoggoFormPageModule {}
