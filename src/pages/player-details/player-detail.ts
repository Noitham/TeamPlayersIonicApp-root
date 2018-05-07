import { HomePage } from './../home/home';
import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { NavController, NavParams, Events  } from 'ionic-angular';

import { PlayerService } from '../../providers/player-service/player-service';
import { Player } from '../../providers/shared/player';
import { PlayersPage } from '../players/players';


@Component({
  selector: 'page-player-detail',
  templateUrl: 'player-detail.html'
})
export class PlayerDetailPage implements OnInit {
  // Per si treballem amb injecció de paràmetres
  //@Input()
  private player: Player;


  constructor(private events: Events, private navController: NavController, private navParams: NavParams, private playerService: PlayerService) {

    this.events.subscribe('reloadPage1',() => {
      this.navController.push(PlayersPage);
     });
  }
  
  ngOnInit(): void {
    this.player = this.navParams.get('paramplayer');
  }

  goBack(): void {
    this.events.publish('reloadPage1');
  }

  save(): void {
    this.playerService.update(this.player)
      .then(() => { this.goBack() });
  }

  create(): void {
    this.playerService.insert(this.player)
      .then(() => { this.goBack() });
  }

}