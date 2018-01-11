import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';
import {SuiModule } from 'ng2-semantic-ui';

import { AppComponent } from './app.component';
import { PollgroupListComponent } from './pollgroup-list/pollgroup-list.component';
import { StatusComponent } from './status/status.component';
import { HeaderMenuComponent } from './header-menu/header-menu.component';
import { PollGroupFormComponent } from './poll-group-form/poll-group-form.component';
import { CollectorApiService } from "./collector-api/collector-api.service";
import { CsvInputComponent } from './csv-input.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    PollgroupListComponent,
    StatusComponent,
    HeaderMenuComponent,
    PollGroupFormComponent,
    CsvInputComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    CommonModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({ 
        timeOut: 5000,
        positionClass: 'toast-top-right',
      }),
    SuiModule
  ],
  providers: [CollectorApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
