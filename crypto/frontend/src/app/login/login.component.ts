import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { SessionsService } from '../services/sessions.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email = "";
  password = "";
  constructor(private sm: SessionsService, private router: Router, private api: ApiService) {
    if (this.sm.is_logged_in()) {
      router.navigate(["/"]);
    }
  }

  ngOnInit(): void {
  }

  nativate_signup() {
    this.router.navigate(["signup"]);
  }

  login() {
    if (this.email.length < 3) {
      alert("Invalid Email");
      return;
    }

    if (this.password.length < 6) {
      alert("Invalid Password, Password should be of minimum 6 characters");
      return;
    }
    this.api.login({
      "email": this.email,
      "password": this.password
    }).subscribe(
      data => {
        this.continue_to_dashboard(data);
      }, error => {
        try {
          alert(error.error.message);
        } catch(e) {
          alert("Something went wront, is backend up and running.")
        }
        console.log();
        // alert("Something Went Wrong");
      }
    )
  }

  continue_to_dashboard(payload) {
    this.sm.add_user_session(payload["payload"]["token"]); 
    this.sm.add_user_info(payload["payload"]); 
    window.location.reload();
  }

}
