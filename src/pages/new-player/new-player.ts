import { HomePage } from './../home/home';
import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { NavController, NavParams, Events  } from 'ionic-angular';

import { PlayerService } from '../../providers/player-service/player-service';
import { Player } from '../../providers/shared/player';
import { PlayersPage } from '../players/players';


@Component({
  selector: 'page-new-player',
  templateUrl: 'new-player.html'
})
export class NewPlayerPage implements OnInit {
  // Per si treballem amb injecció de paràmetres
  //@Input()
  private player: Player;


  constructor(private events: Events, private navController: NavController, private navParams: NavParams, private playerService: PlayerService) {

    this.player = new Player(null,null,null,null);

    this.events.subscribe('reloadPage1',() => {
      this.navController.push(PlayersPage);
     });
  }
  
  ngOnInit(): void {
    
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