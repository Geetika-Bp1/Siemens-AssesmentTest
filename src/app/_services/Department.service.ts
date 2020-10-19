import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable,of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Department } from '../_models';
import { MessageService } from './Message.service'
//import { jsondata } from '.../assets/Department';

@Injectable({ providedIn: 'root' })
export class Departmentservice {
    private _jsonURL = 'assets/Department.json';
    private departments : Department[];
    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      };
    //DepartmentData : any = jsondata;
    constructor(
        private router: Router,
        private http: HttpClient,
        private messageService: MessageService
    ) {
        //this.getdepartments().subscribe(data => this.departments=data, error => console.log(error));
    }
    getdepartments() : Observable<Department[]>{
       // return of(Department);
        return this.http.get(this._jsonURL)
        .pipe(map((response:Department[]) => this.departments = (response)),
        catchError(this.handleError<Department[]>('getHeroes', [])));
        //.catch((error:any) => console.log(error));
    }
    getdepartment(id: number): Observable<Department> {
        const url = `${this._jsonURL}/${id}`;
        return this.http.get<Department>(url).pipe(
          map((response:Department) => response),
          catchError(this.handleError<Department>(`getHero id=${id}`))
        );
      }
    adddepartment(Department):Observable<any>{
        return this.http.post<Department>(this._jsonURL, Department, this.httpOptions).pipe(
            map((newdept: Department) => this.log(`added Department w/ id=${newdept.Id}`)),
            catchError(this.handleError<Department>('updatedepartment'))
          );
    }
    updatedepartment( Department ):Observable<any>{
        return this.http.put<Department>(this._jsonURL, Department, this.httpOptions).pipe(
            map((updatedept: Department) => this.log(`updated Department w/ id=${updatedept.Id}`)),
            catchError(this.handleError<Department>('updatedepartment'))
          );
    }
    deletedepartment(departmentId: number): Observable<any> {
        const url = `${this._jsonURL}/${departmentId}`;
    
        return this.http.delete<Department>(url, this.httpOptions).pipe(
          map(_ => this.log(`deleted Department id=${departmentId}`)),
          catchError(this.handleError<Department>('deleteHero'))
        );
      }
    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
    
          // TODO: send the error to remote logging infrastructure
          console.error(error); // log to console instead
    
          // TODO: better job of transforming error for user consumption
          this.log(`${operation} failed: ${error.message}`);
    
          // Let the app keep running by returning an empty result.
          return of(result as T);
        };
    }
    private log(message: string) {
        this.messageService.add(`HeroService: ${message}`);
      }
  
  }



// private _jsonURL = 'json/Department.json';
// constructor(
//     private router: Router,
//     private http: HttpClient
// ) {
// }
// getdepartments() : Observable<Department>{
// //     return this.http.get(this.url + '?_sort=id&_order=desc')
// //   .map(response => response.json());
//   //  this.Departments;
//   return this.http.get(this._jsonURL);
// // };