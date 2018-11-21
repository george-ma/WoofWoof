import { GalleryPage } from './../pages/gallery/gallery';
import { HttpClientModule } from '@angular/common/http';
import { ParkDetailsPage } from './../pages/park-details/park-details';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { LoginPage } from '../pages/login/login'
import { MapPage } from '../pages/map/map';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Geolocation } from '@ionic-native/geolocation';
import { Camera } from '@ionic-native/camera';
import { ImagePicker } from '@ionic-native/image-picker';

import { EventsPage } from '../pages/events/events';
import { EditEventPage } from './../pages/edit-event/edit-event';

import { EditProfilePage } from '../pages/edit-profile/edit-profile';
import { EventProvider } from '../providers/event/event';
import { ParkLocationPage } from '../pages/park-location/park-location';
import { NewsfeedPage } from '../pages/newsfeed/newsfeed';


@NgModule({
  declarations: [
    MyApp,
    MapPage,
    HomePage,
    LoginPage,
    TabsPage,
    ParkDetailsPage,
    EventsPage,
    EditEventPage,
    EditProfilePage,
    ParkLocationPage,
    NewsfeedPage,
    GalleryPage,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp, { swipeBackEnabled: true })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MapPage,
    HomePage,
    LoginPage,
    TabsPage,
    ParkDetailsPage,
    EventsPage,
    EditEventPage,
    EditProfilePage,
    ParkLocationPage,
    NewsfeedPage,
    GalleryPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    EventProvider,
    Camera,
    ImagePicker,
  ]
})
export class AppModule { }
