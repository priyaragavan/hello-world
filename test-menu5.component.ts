import { Component } from '@angular/core';
import {MockServerResultsService} from "./mock-server-results-service";
import {PagedData} from "./paged-data";
import {CorporateEmployee} from "./corporate-employee";
import {Page} from "./page";

@Component({
  selector: 'server-paging-demo',
  providers: [
      MockServerResultsService
  ],
  template: `
    <div>
      <h3>
        Server-side Paging
        <small>
          <a href="https://github.com/swimlane/ngx-datatable/blob/master/demo/paging/paging-server.component.ts" target="_blank">
            Source
          </a>
        </small>
      </h3>
      <ngx-datatable
        class="material"
        [rows]="rows"
        [columns]="columns"
        [columnMode]="'force'"
        [headerHeight]="50"
        [footerHeight]="50"
        [rowHeight]="'auto'"
        [externalPaging]="true"
        [count]="page.totalElements"
        [offset]="page.pageNumber"
        [limit]="page.size"
        (page)='setPage($event)'>
      </ngx-datatable>
    </div>
  `
})
export class TestMenu5Component {

  columns = [
    {prop:"name", name:"User Name"},
    {prop:"gender", name:"Gender"},
    {prop:"company", name:"Company"},
    {prop:"age", name:"Age"}
]

  page = new Page();
  rows = new Array<CorporateEmployee>();

  constructor(private serverResultsService: MockServerResultsService) {
    this.page.pageNumber = 0;
    this.page.size = 2;
  }

  ngOnInit() {
    this.setPage({ offset: 0 });
  }

  /**
   * Populate the table with new data based on the page number
   * @param page The page to select
   */
  setPage(pageInfo){
    console.log(pageInfo);
    this.page.pageNumber = pageInfo.offset;
    this.serverResultsService.getResults(this.page).subscribe(pagedData => {
      this.page = pagedData.page;
      this.rows = pagedData.data;
      //alert(JSON.stringify(pagedData.data));
    });
  }

}