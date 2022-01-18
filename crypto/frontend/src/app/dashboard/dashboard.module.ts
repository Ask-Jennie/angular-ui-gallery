import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';


@NgModule({
  declarations: [DashboardComponent, HomeComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule,
  ]
})
export class DashboardModule { }
