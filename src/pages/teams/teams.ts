
import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


import { TeamService } from '../../providers/team-service/team-service';
import { Team } from '../../providers/shared/team';
import { TeamDetailPage } from '../team-details/team-detail';
import { NewTeamPage } from '../new-team/new-team';

import { AlertController } from 'ionic-angular';

 
 
@Component({
 selector: 'page-teams',
 templateUrl: 'teams.html'
})
 
 
 
export class TeamsPage implements OnInit {
 
  private teams: Team[];
  private selectedTeam: Team;
 
  //constructor(public navCtrl: NavController, public navParams: NavParams) {}
 
  constructor(private alertCtrl: AlertController, private navController: NavController, private navParams: NavParams, private teamService: TeamService) {
   }
 
  ngOnInit() {
    this.getTeams();
  }
 
  getTeams(): void {
    this.teamService.getAllTeamsP()
    .then(teams => this.teams = teams);
  }
 
  onSelect(team: Team): void {
    this.selectedTeam = team;
  }
 
  gotoDetail(team: Team): void {
    this.navController.push(TeamDetailPage, { paramteam: team });
  }

  gotoCreate(): void {
    this.navController.push(NewTeamPage);
  }
 

  add(s_id: string, s_name: string, s_desc: string): void {
    var id = s_id.trim();
    var name = s_name.trim();
    var desc = s_desc.trim();
    if ((!id)||(!name)||(!desc)) { return; }
    this.teamService.insert(new Team(id,name,desc))
      .then(team => {
        this.teams.push(team);
        this.selectedTeam = null;
      });
  }
 
  delete(team: Team): void {
    this.teamService
        .deleteP(team)
        .then(() => {
          this.teams = this.teams.filter(e => e !== team);
          if (this.selectedTeam === team) { this.selectedTeam = null; }
        });
  }

  presentConfirm(team: Team) {
    let alert = this.alertCtrl.create({
      title: 'Confirm remove',
      message: 'Do you want to remove this team?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Buy',
          handler: () => {
            console.log('Remove clicked');
            this.teamService
        .deleteP(team)
        .then(() => {
          this.teams = this.teams.filter(e => e !== team);
          if (this.selectedTeam === team) { this.selectedTeam = null; }
        });
          }
        }
      ]
    });
    alert.present();
  }
 
}