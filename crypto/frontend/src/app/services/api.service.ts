import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse, HttpParams} from '@angular/common/http';
import { SessionsService } from './sessions.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  BASE_DOMAIN = "http://localhost:8000/"
  constructor(public http: HttpClient, public sm: SessionsService) { }

  login(logininfo) {
    return this.http.post(this.BASE_DOMAIN + "v1/login/", logininfo);
  }

  signup(signupinfo) {
    return this.http.post(this.BASE_DOMAIN + "v1/signup/", signupinfo);
  }

  get_headers() {
    let token = this.sm.get_token();
    if (token == false) {
      this.sm.logout();
      window.location.reload();
    }
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    };
  }

  get_headers_with_body(data) {
    let token = this.sm.get_token();
    if (token == false) {
      this.sm.logout();
      window.location.reload();
    }
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      }),
      body: data
    };
  }
}
