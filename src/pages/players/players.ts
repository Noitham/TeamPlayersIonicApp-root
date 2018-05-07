import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { PlayerService } from '../../providers/player-service/player-service';
import { Player } from '../../providers/shared/player';
import { PlayerDetailPage } from '../player-details/player-detail';
import { NewPlayerPage } from '../new-player/new-player';
import { AlertController } from 'ionic-angular';
 
 
@Component({
 selector: 'page-players',
 templateUrl: 'players.html'
})
 
 
 
export class PlayersPage implements OnInit {
 
  private players: Player[];
  private selectedPlayer: Player;
 
  //constructor(public navCtrl: NavController, public navParams: NavParams) {}
 
  constructor(private alertCtrl: AlertController, private navController: NavController, private navParams: NavParams, private playerService: PlayerService) {
   }
 
  ngOnInit() {
    this.getPlayers();
  }
 
  getPlayers(): void {
    this.playerService.getAllPlayersP()
    .then(players => this.players = players);
  }
 
  onSelect(player: Player): void {
    this.selectedPlayer = player;
  }
 
  gotoDetail(player: Player): void {
    this.navController.push(PlayerDetailPage, { paramplayer: player });
  }

  gotoCreate(): void {
    this.navController.push(NewPlayerPage);
  }
 

  add(s_id: string, s_name: string, s_yearBirth: string, s_teamId: string): void {
    var id = s_id.trim();
    var name = s_name.trim();
    var s_yearBirth = s_yearBirth.trim();
    var s_teamId = s_teamId.trim();
    if ((!id)||(!name)||(!s_yearBirth)||(!s_teamId)) { return; }
    var yearBirth = parseInt(s_yearBirth);
    var teamId = parseInt(s_teamId);
    this.playerService.insert(new Player(id,name,yearBirth,teamId))
      .then(player => {
        this.players.push(player);
        this.selectedPlayer = null;
      });
  }
 
  delete(player: Player): void {
    this.playerService
        .deleteP(player)
        .then(() => {
          this.players = this.players.filter(e => e !== player);
          if (this.selectedPlayer === player) { this.selectedPlayer = null; }
        });
  }

  presentConfirm(player: Player) {
    let alert = this.alertCtrl.create({
      title: 'Confirm remove',
      message: 'Do you want to remove this player?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Remove',
          handler: () => {
            console.log('Remove clicked');
            this.playerService
        .deleteP(player)
        .then(() => {
          this.players = this.players.filter(e => e !== player);
          if (this.selectedPlayer === player) { this.selectedPlayer = null; }
        });
            
          }
        }
      ]
    });
    alert.present();
  }
 
}