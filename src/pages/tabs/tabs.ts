import { Component } from '@angular/core';
 
import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';

import { PlayersPage } from '../players/players';
import { TeamsPage } from '../teams/teams';
 
 
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
 
  tab1Root = HomePage;
  tab2Root = PlayersPage;
  tab3Root = TeamsPage;
 
  constructor() {
 
  }
}