import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title = 'uigallery';
  ui_gallery:any = []
  all_ui_gallery:any = []
  tags = []
  counts = {}
  filter_tag = "";
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.get_ui_gallery().subscribe(
      data => {
        this.all_ui_gallery = data["payload"]["data"];
        this.tags = data["payload"]["counts"];
        this.show_data()
      }
    )
  }

  show_data() {
    this.ui_gallery = [];
    this.all_ui_gallery.forEach(element => {
      if (this.filter_tag === '') {
        this.ui_gallery.push(element)
      } else {
        if (element["tag"] === this.filter_tag) {
          this.ui_gallery.push(element)
        }
      }
    });  
    console.log(this.ui_gallery);    
  }

  get_ui_gallery() {
    let req = this.http.get("https://api.ask-jennie.com/v1/angular/ui-lib/");
    return req;
  }

  showTagItem(name) {
    this.filter_tag = name;
    this.show_data();
    console.log(name);
  }

  add_filter(tag_name) {
    this.filter_tag = tag_name;
  }
}
