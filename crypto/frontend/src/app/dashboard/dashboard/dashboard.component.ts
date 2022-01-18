import { Component, OnInit } from '@angular/core';
import { SessionsService } from 'src/app/services/sessions.service';
import { MENU } from './menu';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user_name = ""
  menus = MENU
  constructor(private sm: SessionsService) {
    this.user_name = this.sm.get_user_info()["name"];
    console.log(this.user_name);
  }

  ngOnInit(): void {
  }

  logout() {
    this.sm.logout();
    window.location.reload();
  }
}
