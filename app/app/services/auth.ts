import { Injectable } from 'angular2/core';
import { Http } from 'angular2/http';
import * as Rx from 'rxjs/Rx';
import { tokenNotExpired, JwtHelper } from 'angular2-jwt';
import 'rxjs/add/operator/map';

declare var io;

@Injectable()
export class AuthService {
  jwtHelper: JwtHelper;
  io: any;
  
  constructor(public http: Http) {
    this.jwtHelper = new JwtHelper();
  }

  public getToken(name: string): any {
    return new Promise((resolve, reject) => {
      this.http.post('http://localhost:3357/api/generate-token', JSON.stringify({ name: name }))
        .map(res => res.json())
        .subscribe(data => resolve(this.saveToken(data)));
    });
  }

  private saveToken(data: any): boolean {
    if (data.status) {
      let decodedToken = this.jwtHelper.decodeToken(data.jwt);
      localStorage.setItem('profile', JSON.stringify(decodedToken));
      localStorage.setItem('id_token', data.jwt);
      return true;
    } else {
      return false;
    }
  }

  public logout(): void {
    localStorage.removeItem('profile');
    localStorage.removeItem('id_token');
  }
}
