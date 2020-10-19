import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Employee } from '../_models';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataEmployeeService implements InMemoryDbService {
    createDb() {
        const employees = [
            {"Id": 1 , "FirstName" : "Normal","LastName" : "user1","EmailID" : "user1@gmail.com","Department" : "Marketing","Title": "Executive","JoiningDate": "10/10/2020"},
            {"Id": 2 ,"FirstName" : "Normal","LastName" : "user2","EmailID" : "user2@gmail.com","Department" : "sales","Title": "other","JoiningDate": "10/10/2020"},
            {"Id": 3 ,"FirstName" : "Normal","LastName" : "user3","EmailID" : "user3@gmail.com","Department" : "IT","Title": "Developer","JoiningDate": "10/10/2020"},
            {"Id": 4 ,"FirstName" : "Admin","LastName" : "admin1","EmailID" : "admin1@gmail.com","Department" : "Marketing","Title": "other","JoiningDate": "10/10/2020"},
            {"Id": 5 ,"FirstName" : "Normal","LastName" : "user4","EmailID" : "user4@gmail.com","Department" : "sales","Title": "Executive","JoiningDate": "10/10/2020"},
            {"Id": 6 ,"FirstName" : "Admin","LastName" : "admin2","EmailID" : "admin2@gmail.com","Department" : "sales","Title": "SeniorExecutive","JoiningDate": "10/10/2020"},
            {"Id": 7 ,"FirstName" : "Normal","LastName" : "user5","EmailID" : "user5@gmail.com","Department" : "sales","Title": "other","JoiningDate": "10/10/2020"}
        ];
        return {employees};
      }
      // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (1).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId(employees: Employee[]): number {
    return employees.length > 0 ? Math.max(...employees.map(employee => employee.Id)) + 1 : 1;
  }
}