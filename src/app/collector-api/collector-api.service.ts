import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { PollGroupSummary } from "./poll-group-summary";
import { HttpErrorResponse } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { PollGroup } from "./poll-group";
import { Page } from "./page";

@Injectable()
export class CollectorApiService {

  constructor(private http: HttpClient) { }

  logError = function (res: HttpErrorResponse) {
      if ( res.error instanceof Error ) {
          console.log( "Client-side error occured: " + res.error.message);
      } else {
          console.log( "Server-side error occured: " + res.error.message);
      }
  }
 
  getPollGroupSummaryList(page: number): Observable<Page> {
      return this.http.get<Page>('/api/config/pollgroup-summary?page=' + page).do(null, this.logError);
  }
  
  getPollGroupById(id: string): Observable<PollGroup> {
      return this.http.get<PollGroup>('/api/config/pollgroup/' + id).do(null, this.logError);
  }
 
  getHostGroups(): Observable<string[]> {
      return this.http.get<string[]>('/api/config/hostgroups').do(null, this.logError);
  }
  
  getSnmpConfigs(): Observable<string[]> {
      return this.http.get<string[]>('/api/config/snmpconfigs').do(null, this.logError);
  }
  
  savePollGroup(pgroup: PollGroup): Observable<PollGroup|HttpErrorResponse> {
      let url: string = '/api/config/pollgroup';
      if (pgroup.id != null) {
          url += '/' + pgroup.id;
          return this.http.put<PollGroup>(url, pgroup).do(null, this.logError);
      } else {
          return this.http.post<PollGroup>(url, pgroup).do(null, this.logError);
        }
      
  }
  
  deletePollGroup(id: string): Observable<boolean> {
      return this.http.delete<boolean>('/api/config/pollgroup/' + id).do(null, this.logError);
  }
  
}
