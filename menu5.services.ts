import { Injectable } from '@angular/core';
import { Http, Response, Headers , RequestOptions} from '@angular/http';
import { Observable } from 'rxjs/Observable';

import {PagedData} from "./paged-data";
import {CorporateEmployee} from "./corporate-employee";
import {Page} from "./page";
//import { ErrorObservable } from 'rxjs/ErrorObservable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

const headers: Headers = new Headers();
   headers.append('Accept', 'application/json');
   headers.append('Content-Type', 'application/json');
   headers.append('Access-Control-Allow-Origin', '*');
   headers.append('Allow', 'GET,POST');

   const options = new RequestOptions({
     headers: headers
   });
   
@Injectable()
// =new Headers({'Content-Type': 'application/json'});
export class Menu5Service{
	//private _productUrl = 'api/products/products.json';
    private _productUrl = 'http://localhost/CI_3_x/RestPostController/';
    header=new Headers({'Content-Type': 'application/json'});
	cityData:any[];
	// header:Headers;

	constructor(private _http:Http){}

	getUsers():Observable<any[]>{
		return this._http.get(this._productUrl+'get_contact',this.header)
		.map((response:Response)=><any[]>response.json())
		.do(data=>console.log('All: '+ JSON.stringify(data)))
		.catch(this.handleError);
	}

	getOnScrollUsers():Observable<any[]>{
		return this._http.get(this._productUrl+'get_contact',this.header)
		.map((response:Response)=><any[]>response.json())
		.do(data=>console.log('All: '+ JSON.stringify(data)))
		.catch(this.handleError);
	}

	getCities():Observable<any[]>{
		return this._http.get(this._productUrl+'get_cities',this.header)
		.map((response:Response)=><any[]>response.json())
		// .do(data=>{this.cityData = data;})
		.catch(this.handleError);
	}


	getUsersData():Observable<any[]>{
		return this._http.get(this._productUrl+'get_users_data',this.header)
		.map((response:Response)=><any[]>response.json())
		.do(data=>{console.log(data);})
		.catch(this.handleError);
	}

	public getResults(page: Page): Observable<PagedData<CorporateEmployee>> {
		this.getCities().subscribe(cities=>{this.cityData = cities;})
        return Observable.of(this.cityData).map(data => this.getPagedData(page));
	}
	
	private getPagedData(page: Page): PagedData<CorporateEmployee> {
        let pagedData = new PagedData<CorporateEmployee>();
        page.totalElements = this.cityData.length;
        page.totalPages = page.totalElements / page.size;
        let start = page.pageNumber * page.size;
        let end = Math.min((start + page.size), page.totalElements);
        for (let i = start; i < end; i++){
            let jsonObj = this.cityData[i];
            let employee = new CorporateEmployee(jsonObj.name, jsonObj.gender, jsonObj.company, jsonObj.age);
            pagedData.data.push(employee);
        }
        pagedData.page = page;
        return pagedData;
    }
	// insertUsers(data:string):any{
	// 	alert(data);
	// 	return this._http.post(this._productUrl+'add_contact',data,headers)
	// 	.map((response:Response)=>response)
	// 	.do(data=>console.log('All:' +JSON.stringify(data)))
	// 	.catch(this.handleError);
    // }
    
    // private extractData(res: Response) {
    //     let body = res.json();
    //     return body.data || {};
    // }

	private handleError(error:Response):Observable<any[]>{
		console.error(error);
		return Observable.throw(error.json().error || 'server error');
		
	} 
}