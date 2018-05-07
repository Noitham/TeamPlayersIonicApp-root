import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';
 

import { TeamService } from '../../providers/team-service/team-service';
import { Team } from '../../providers/shared/team';
import { TeamsPage } from '../teams/teams';
 
 
@Component({
  selector: 'page-team-detail',
  templateUrl: 'team-detail.html'
})
export class TeamDetailPage implements OnInit {
  // Per si treballem amb injecció de paràmetres
  //@Input()
  private team: Team;
 
 
  constructor(private events: Events,private navController: NavController, private navParams: NavParams, private teamService: TeamService) {
 
    this.events.subscribe('reloadPage1',() => {
      this.navController.push(TeamsPage);
     });
   }
 
  ngOnInit(): void {
    this.team = this.navParams.get('paramteam'); 
  }
 
  goBack(): void {
    this.events.publish('reloadPage1');
  }
 
    save(): void {
      this.teamService.update(this.team)
        .then(() => {this.goBack()});
    }
 
    create(): void {
      this.teamService.insert(this.team)
        .then(() => {this.goBack()});
    }
 
}