import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PollgroupListComponent } from "./pollgroup-list/pollgroup-list.component";
import { StatusComponent } from "./status/status.component";
import { PollGroupFormComponent } from "./poll-group-form/poll-group-form.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";

const routes: Routes = [
  { path: '',  redirectTo: 'collectors', pathMatch: 'full' },
  { path: 'collectors', component: PollgroupListComponent },
  { path: 'status', component: StatusComponent },
  { path: 'collector/:id',  component: PollGroupFormComponent },
  { path: 'collector',  component: PollGroupFormComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
