import { Injectable } from '@angular/core';
import { Headers, Http, Response, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/toPromise';
 
import { Player } from '../shared/player';
 
import { Observable } from 'rxjs/Observable';
 
@Injectable()
export class PlayerService {
  private server: string = 'http://localhost:8084';
  private serverApp = '/teamplayer';
  private servicesPath = '/services';
  private serviceName = '/player-service';
  private wsUrl: string;
 
  constructor(private http: Http) {
    //this.wsUrl = 'http://localhost:8084/teamplayer/services/player-service';
    this.wsUrl = this.server + this.serverApp + this.servicesPath + this.serviceName;
  }
 
  getAllPlayersP(): Promise<Player[]> {
    // return Promise.resolve(PLAYERS);
    const url = `${this.wsUrl}/all`;
    console.log(url);
    return this.http.get(url)
           .toPromise()
           .then(response => response.json() as Player[])
           .catch(this.handleError);
  }
 
  getAllPlayersO(): Observable<Response> {
    // return Promise.resolve(PLAYERS);
    const url = `${this.wsUrl}/all`;
    return this.http.get(url);
  }
 
  private handleError(error: any): Promise<any> {
     console.error('An error occurred', error); // for demo purposes only
     return Promise.reject(error.message || error);
   }
 
   getPlayer(id: string): Promise<Player> {
     // return this.getAllPlayers()
     //      .then(players => players.find(playerd => player.id === id));
     const url = `${this.wsUrl}/${id}`;
     return this.http.get(url)
       .toPromise()
       .then(response => response.json() as Player)
       .catch(this.handleError);
   }
 
   insert(player: Player): Promise<Player> {
    const url = `${this.wsUrl}/add`;
    // set query parameters from form data
     const body = new URLSearchParams();
     body.set('id', player.id);
     body.set('name', player.name);
     body.set('yearBirth', player.yearBirth.toString());
     body.set('teamId', player.teamId.toString());
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
 
   update(player: Player): Promise<Player> {
     const url = `${this.wsUrl}/${player.id}/update`;
     // set query parameters from form data
      const body = new URLSearchParams();
      body.set('id', player.id);
      body.set('name', player.name);
      body.set('yearBirth', player.yearBirth.toString());
      body.set('teamId', player.teamId.toString());
     // configure headers for form data.
     const headers = new Headers();
     headers.append('Content-Type', 'application/x-www-form-urlencoded');
     // send requestimport { Headers, Http, URLSearchParams } from '@angular/http';
     return this.http
       .post(url, body, {headers: headers})
       .toPromise()
       .then(() => player)
       .catch(this.handleError);
   }
 
   deleteP(player: Player): Promise<void> {
     const url = `${this.wsUrl}/${player.id}/delete`;
    // set query parameters from form data
    const body = new URLSearchParams();
   // configure headers for form data.
   const headers = new Headers();
   headers.append('Content-Type', 'application/x-www-form-urlencoded');
   // send requestimport { Headers, Http, URLSearchParams } from '@angular/http';
   return this.http
     .post(url, body, {headers: headers})
     .toPromise()
     .then(() => player)
     .catch(this.handleError);
   }
 
   deleteO(player: Player): Observable<Response> {
    const url = `${this.wsUrl}/${player.id}/delete`;
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