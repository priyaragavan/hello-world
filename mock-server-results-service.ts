import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {PagedData} from "./paged-data";
import {CorporateEmployee} from "./corporate-employee";
import {Page} from "./page";

import { Menu5Service } from './menu5.services';
// var companyData = [
//     {
//         "name": "Ethel Price",
//         "gender": "female",
//         "company": "Johnson, Johnson and Partners, LLC CMP DDC",
//         "age": 22
//     },
//     {
//         "name": "Claudine Neal",
//         "gender": "female",
//         "company": "Sealoud",
//         "age": 55
//     },
//     {
//         "name": "Beryl Rice",
//         "gender": "female",
//         "company": "Velity",
//         "age": 67
//     },
//     {
//         "name": "Wilder Gonzales",
//         "gender": "male",
//         "company": "Geekko",
//         "age": 67
//     },
//     {
//         "name": "Georgina Schultz",
//         "gender": "female",
//         "company": "Suretech",
//         "age": 67
//     },
//     {
//         "name": "Carroll Buchanan",
//         "gender": "male",
//         "company": "Ecosys",
//         "age": 67
//     }
// ]

/**
 * A server used to mock a paged data result from a server
 */
@Injectable()
export class MockServerResultsService {
    public companyData:CorporateEmployee[];
    /**
     * A method that mocks a paged server response
     * @param page The selected page
     * @returns {any} An observable containing the employee data
     */
    constructor(private _menu5Service:Menu5Service){}
    public getResults(page: Page ): Observable<PagedData<CorporateEmployee>> {
        this._menu5Service.getUsersData().subscribe(users=>{ this.companyData = users['info']; alert(JSON.stringify(this.companyData)); });
        alert(JSON.stringify(this.companyData));
        return Observable.of(this.companyData).map(data => this.getPagedData(page,this.companyData));
        // this.getUsers();
    }

    /**
     * Package companyData into a PagedData object based on the selected Page
     * @param page The page data used to get the selected data from companyData
     * @returns {PagedData<CorporateEmployee>} An array of the selected data and page
     */
    private getPagedData(page: Page,companyData:CorporateEmployee[]): PagedData<CorporateEmployee> {
        //alert(JSON.stringify(companyData));
        let pagedData = new PagedData<CorporateEmployee>();
        page.totalElements = companyData.length;
        page.totalPages = page.totalElements / page.size;
        let start = page.pageNumber * page.size;
        let end = Math.min((start + page.size), page.totalElements);
        for (let i = start; i < end; i++){
            let jsonObj = companyData[i];
            let employee = new CorporateEmployee(jsonObj.name, jsonObj.gender, jsonObj.company, jsonObj.age);
            pagedData.data.push(employee);
        }
        pagedData.page = page;
        return pagedData;
    }


    private getUsers():any[]{
        var companyDetails = [];
        
        this._menu5Service.getUsersData().subscribe(users=>{ companyDetails = users['info'];  });
        
        //alert(JSON.stringify(data));
        
        this.companyData = companyDetails;
        alert(JSON.stringify(this.companyData));
        return this.companyData;
    }

}