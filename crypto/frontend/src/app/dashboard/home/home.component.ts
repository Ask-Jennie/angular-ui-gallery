import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { SessionsService } from 'src/app/services/sessions.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  token = ""
  userinfo = ""
  constructor(private sm:SessionsService) { }

  ngOnInit(): void {
    this.token = this.sm.get_token();
    this.userinfo = this.sm.get_user_info();
  }

  show_json(jsonObj) {
    return JSON.stringify(jsonObj, null, 4);
  }

}
