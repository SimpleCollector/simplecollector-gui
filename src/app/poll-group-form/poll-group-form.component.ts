import { Component, OnInit } from '@angular/core';
import { PollGroup } from "../collector-api/poll-group";
import { SnmpConfigGroup } from "../collector-api/snmp-config-group";
import { HostGroup } from "../collector-api/host-group";
import { CollectorApiService } from "../collector-api/collector-api.service";
import { ActivatedRoute } from "@angular/router";
import { HttpErrorResponse } from "@angular/common/http";
import { ToastrService } from 'ngx-toastr';
import { ObjectPollType } from "../collector-api/object-poll-type";
import { TablePollType } from "../collector-api/table-poll-type";

@Component({
  selector: 'poll-group-form',
  templateUrl: './poll-group-form.component.html',
})
export class PollGroupFormComponent implements OnInit {
  group: PollGroup;
  hosttype: string = 's'; 
  collectionTypes: any[] = [ 
                             { value: 'OBJECT', display: 'Single objects' },
                             { value: 'INTERFACES', display: 'All interfaces' },
                             { value: 'TABLE', display: 'Table objects' }
                           ];
  hostgroups: string[] = []; // = ['JYC-switches', 'MCE-nodes', 'ETN', 'DSLAMs'];
  snmpconfigs: string[] = []; // = ['public', 'jyc-switches', 'GMN']
  originalName: string;
  apiMsg: string = '';
  isApiError: boolean = false;
    
  constructor(private collector: CollectorApiService, private route: ActivatedRoute, private toastr: ToastrService) {
      this.group = new PollGroup();
      //this.group.config = new SnmpConfigGroup();
      //this.group.hosts = new HostGroup();
      //this.group.mibs = [];//["first", "second", "third"];
  }

  ngOnInit() {
      this.collector.getHostGroups().subscribe(res => { this.hostgroups = res; });
      this.collector.getSnmpConfigs().subscribe(res => { this.snmpconfigs = res; });
            
      // This component will never be reused so snapshot can be used
      let id = this.route.snapshot.paramMap.get('id');
      console.log("id: " + id);
      if (id) {
          this.collector.getPollGroupById(id).subscribe(res => { 
              this.initGroup(res);
          });
      }
  }
  
  onSubmit(value: any) {
      console.log("saving " + JSON.stringify(value));
      this.collector.savePollGroup(this.group).subscribe(
          (pg:PollGroup) => { 
              this.initGroup(pg);
              this.toastr.success('Collection saved');
          },
          (res:HttpErrorResponse) => {
              console.log("Inside error part of subscribe onSubmit: " + res.error.message);
              this.toastr.error(res.error.message, 'Error');
          }
      ); 
  }

  initGroup (group: PollGroup) {
      this.group = group;
      this.originalName = this.group.name;
      if (this.group.host)
          this.hosttype = 's';
      else
          this.hosttype = 'g';
  }

  

  get diagnostic() { return JSON.stringify(this.group); }
}
