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
          this.ui_gallery.forEach(element => {
            if (this.tags.indexOf(element["tag"] === -1)) {
              this.tags.push(element["tag"])
              this.counts[element["tag"]] = 1;
            } else {
              this.counts[element["tag"]] += 1;
            }
          });
          console.log(this.ui_gallery);
          console.log(this.counts);
          console.log(this.tags);
        }
      }
    )
  }

  get_ui_gallery() {
    let req = this.http.get("https://api.ask-jennie.com/v1/angular/ui-lib/");
    return req;
  }

}
