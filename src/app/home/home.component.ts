import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title = 'uigallery';
  ui_gallery = []
  tags = []
  counts = {}
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.get_ui_gallery().subscribe(
      data => {
        data: {
          this.ui_gallery = data["payload"]["data"];
          this.tags = data["payload"]["counts"];
          
        }
      }
    )
  }

  get_ui_gallery() {
    let req = this.http.get("https://api.ask-jennie.com/v1/angular/ui-lib/");
    return req;
  }

}
