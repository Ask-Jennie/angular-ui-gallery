import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { SessionsService } from '../services/sessions.service';
import { FIELDS_SIGNUP } from '../variables';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  fields = FIELDS_SIGNUP;
  constructor(private sm: SessionsService, private router: Router, private api: ApiService) {
    if (this.sm.is_logged_in()) {
      router.navigate(["/"]);
    }
  }

  ngOnInit(): void {
    console.log(this.fields);
  }

  chnaged_input() {
    console.log("called");
  }

  register() {
    let signup_info = {};
    for (let i=0; i<this.fields.length; i++) {
      let curr = this.fields[i];
      if (curr.val.length < 3) {
        alert("Invalid " + curr.name);
        return;
      } else {
        signup_info[curr.name] = curr.val;
      }
    }
    this.api.signup(signup_info).subscribe(
      data => {
        this.continue_to_dashboard(data);
      }, error => {
        alert("Something Went Wrong");
      }
    )
  }

  continue_to_dashboard(payload) {
    this.sm.add_user_session(payload["payload"]["token"]); 
    this.sm.add_user_info(payload["payload"]); 
    window.location.reload();
  }
}
