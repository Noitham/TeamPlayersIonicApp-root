
import { HomePage } from './../home/home';
import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { NavController, NavParams, Events  } from 'ionic-angular';

import { TeamService } from '../../providers/team-service/team-service';
import { Team } from '../../providers/shared/team';
import { TeamsPage } from '../teams/teams';


@Component({
  selector: 'page-new-team',
  templateUrl: 'new-team.html'
})
export class NewTeamPage implements OnInit {
  // Per si treballem amb injecció de paràmetres
  //@Input()
  private team: Team;


  constructor(private events: Events, private navController: NavController, private navParams: NavParams, private teamService: TeamService) {

    this.team = new Team(null,null,null);

    this.events.subscribe('reloadPage1',() => {
      this.navController.push(TeamsPage);
     });
  }
  
  ngOnInit(): void {
    
  }

  goBack(): void {
    this.events.publish('reloadPage1');
  }

  save(): void {
    this.teamService.update(this.team)
      .then(() => { this.goBack() });
  }

  create(): void {
    this.teamService.insert(this.team)
      .then(() => { this.goBack() });
  }

}