
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';
 
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';

import { TabsPage } from '../pages/tabs/tabs';

import { PlayersPage } from '../pages/players/players';
import { PlayerDetailPage } from '../pages/player-details/player-detail';
import { PlayerService } from '../providers/player-service/player-service';
import { NewPlayerPage } from '../pages/new-player/new-player';


import { TeamsPage } from '../pages/teams/teams';
import { TeamDetailPage } from '../pages/team-details/team-detail';
import { TeamService } from '../providers/team-service/team-service';
import { NewTeamPage } from '../pages/new-team/new-team';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    PlayersPage,
    PlayerDetailPage,
    TeamsPage,
    TeamDetailPage,
    TabsPage,
    NewPlayerPage,
    NewTeamPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    PlayersPage,
    PlayerDetailPage,
    TeamsPage,
    TeamDetailPage,
    TabsPage,
    NewPlayerPage,
    NewTeamPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    PlayerService,
    TeamService
  ]
})
export class AppModule {}
