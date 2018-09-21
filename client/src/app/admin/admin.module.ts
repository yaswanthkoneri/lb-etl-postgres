import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminComponent } from './admin.component';
import { NavbarComponent } from '../common/navbar/navbar.component';
import { MaterialModule } from '../material/material.module';
import { JobsComponent } from './jobs/jobs.component';
import { HistoryComponent } from './history/history.component';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule
  ],
  declarations: [
    AdminComponent,
    DashboardComponent,
    NavbarComponent,
    JobsComponent,
    HistoryComponent],
  providers: [],
  bootstrap: [AdminComponent],
  exports: [AdminComponent]
})
export class AdminModule { }
