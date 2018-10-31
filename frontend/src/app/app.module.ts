import { HttpClientModule } from '@angular/common/http';
import { ParkDetailsPage } from './../pages/park-details/park-details';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { MapPage } from '../pages/map/map';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Geolocation } from '@ionic-native/geolocation';
import { EventsPage } from '../pages/events/events';
import { EditEventPage } from './../pages/edit-event/edit-event';
import { EventProvider } from '../providers/event/event';


@NgModule({
  declarations: [
    MyApp,
    MapPage,
    HomePage,
    TabsPage,
    ParkDetailsPage,
    EventsPage,
    EditEventPage
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
    TabsPage,
    ParkDetailsPage,
    EventsPage,
    EditEventPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    EventProvider,
  ]
})
export class AppModule {}
