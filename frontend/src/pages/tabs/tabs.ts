import { Component } from '@angular/core';

import { MapPage } from '../map/map';
import { HomePage } from '../home/home';
import { EventsPage } from '../events/events';
import { NewsfeedPage } from '../newsfeed/newsfeed';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = MapPage;
  tab3Root = EventsPage;
  tab4Root = NewsfeedPage;

  constructor() {

  }
}
