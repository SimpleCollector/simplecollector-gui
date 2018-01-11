import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { PollGroupSummary } from '../collector-api/poll-group-summary'
import { CollectorApiService } from "../collector-api/collector-api.service";
import { ToastrService } from "ngx-toastr";
import {SuiModalService, TemplateModalConfig, ModalTemplate} from 'ng2-semantic-ui';

export interface IContext {
    data:string;
}

@Component({
  selector: 'pollgroup-list',
  templateUrl: './pollgroup-list.component.html',
})
export class PollgroupListComponent implements OnInit {
    @ViewChild('modalTemplate')
    public modalTemplate:ModalTemplate<IContext, string, string>
    pollGroups: PollGroupSummary[];
    total: number = 1;
    maxOnPage: number = 1;

  constructor(private collectorApi: CollectorApiService, private toastr: ToastrService, public modalService:SuiModalService){
  }

  ngOnInit() {
      this.loadPage(1);
  }
  
  loadPage(page: number) {
      this.collectorApi.getPollGroupSummaryList(page).subscribe(
              (page) => {
                  this.pollGroups = page.items;
                  this.total = page.total;
                  this.maxOnPage = page.pgsize;
              }
      );
  }
  
  deletePollGroup(id: string, name: string) {
      const config = new TemplateModalConfig<IContext, string, string>(this.modalTemplate);

      config.isClosable = false;
      config.size = 'small';
      config.context = { data: name };

      this.modalService
          .open(config)
          .onApprove(result => {
                         this.collectorApi.deletePollGroup(id).subscribe(
                             (success) => {
                                 if (success) this.toastr.success('Collection group "' + name + '" deleted');
                             }
                         );
                     });
  }
  
}
