import { Injectable } from '@angular/core';
import { Headers, Http, Response, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/toPromise';
 
import { Team } from '../shared/team';
 
import { Observable } from 'rxjs/Observable';
 
@Injectable()
export class TeamService {
  private server: string = 'http://localhost:8084';
  private serverApp = '/teamplayer';
  private servicesPath = '/services';
  private serviceName = '/team-service';
  private wsUrl: string;
 
  constructor(private http: Http) {
    //this.wsUrl = 'http://localhost:8084/teamplayer/services/team-service';
    this.wsUrl = this.server + this.serverApp + this.servicesPath + this.serviceName;
  }
 
  getAllTeamsP(): Promise<Team[]> {
    // return Promise.resolve(TEAMS);
    const url = `${this.wsUrl}/all`;
    console.log(url);
    return this.http.get(url)
           .toPromise()
           .then(response => response.json() as Team[])
           .catch(this.handleError);
  }
 
  getAllTeamsO(): Observable<Response> {
    // return Promise.resolve(TEAMS);
    const url = `${this.wsUrl}/all`;
    return this.http.get(url);
  }
 
  private handleError(error: any): Promise<any> {
     console.error('An error occurred', error); // for demo purposes only
     return Promise.reject(error.message || error);
   }
 
   Team(id: string): Promise<Team> {
     // return this.getAllTeams()
     //      .then(teams => teams.find(teamd => team.id === id));
     const url = `${this.wsUrl}/${id}`;
     return this.http.get(url)
       .toPromise()
       .then(response => response.json() as Team)
       .catch(this.handleError);
   }
 
   insert(team: Team): Promise<Team> {
     const url = `${this.wsUrl}/add`;
     // set query parameters from form data
      const body = new URLSearchParams();
      body.set('id', team.id);
      body.set('name', team.name);
      body.set('desc', team.desc);
     // configure headers for form data.
     const headers = new Headers();
     headers.append('Content-Type', 'application/x-www-form-urlencoded');
     // send request
     return this.http
       .post(url, body, {headers: headers})
       .toPromise()
       .then(res => res.json())
       .catch(this.handleError);
   }
 
   update(team: Team): Promise<Team> {
     const url = `${this.wsUrl}/${team.id}/update`;
     // set query parameters from form data
      const body = new URLSearchParams();
      body.set('id', team.id);
      body.set('name', team.name);
      body.set('desc', team.desc);
     // configure headers for form data.
     const headers = new Headers();
     headers.append('Content-Type', 'application/x-www-form-urlencoded');
     // send requestimport { Headers, Http, URLSearchParams } from '@angular/http';
     return this.http
       .post(url, body, {headers: headers})
       .toPromise()
       .then(() => team)
       .catch(this.handleError);
   }
 
   deleteP(team: Team): Promise<void> {
     const url = `${this.wsUrl}/${team.id}/delete`;
    // set query parameters from form data
    const body = new URLSearchParams();
   // configure headers for form data.
   const headers = new Headers();
   headers.append('Content-Type', 'application/x-www-form-urlencoded');
   // send requestimport { Headers, Http, URLSearchParams } from '@angular/http';
   return this.http
     .post(url, body, {headers: headers})
     .toPromise()
     .then(() => team)
     .catch(this.handleError);
   }
 
   deleteO(team: Team): Observable<Response> {
    const url = `${this.wsUrl}/${team.id}/delete`;
    // set query parameters from form data
    const body = new URLSearchParams();
    // configure headers for form data.
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    // send request
    return this.http
     .post(url, body, {headers: headers});
  }
 
}