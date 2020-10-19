import { Component, OnInit } from '@angular/core';
import { Employee } from '../_models';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  employees : Employee[];
  cols: any[];
  employeeForm: FormGroup;
  constructor( private fb: FormBuilder ) { }

  ngOnInit() {
    this.employees = this._employee;
    this.cols = [
      { field: 'Id', header: 'Id' },
      { field: 'FirstName', header: 'First Name' },
      { field: 'LastName', header: 'Last Name' },
      { field: 'EmailID', header: 'EmailID' },
      { field : 'Department',header:'Department'},
      { field : 'Title',header:'Title'},
      { field: 'JoiningDate', header: 'Joining Date'},
      {field :'AddedBy', header: 'AddedBy'},
      
    ]; 
    this.employeeForm =  this.fb.group({
      Id: [{value : '',disabled: true}],
      FirstName: ['',Validators.required],
      LastName :[''],
      EmailID : [''],
      Department : [''],
      Title : [''],
      JoiningDate : [''],
      skills: this.fb.group({
        skillName: [''],
        experienceInYears: ['']
      }),
    })
  }
private _employee : Employee[] = [
  {"Id": 1 , "FirstName" : "Normal","LastName" : "user1","EmailID" : "user1@gmail.com","Department" : "IT","Title": "Associate","JoiningDate": "10/10/2020","AddedBy":"Admin1","AddedDate":"10/10/2020","ModifiedBy":"","ModifiedDate":"10/10/2020","skills":{"skillName":"c#","experienceInYears":2}},
  {"Id": 2 ,"FirstName" : "Normal","LastName" : "user2","EmailID" : "user2@gmail.com","Department" : "sales","Title": "other","JoiningDate": "10/10/2020","AddedBy":"Admin2","AddedDate":"10/10/2020","ModifiedBy":"","ModifiedDate":"10/10/2020","skills":{"skillName":"","experienceInYears":0}},
  {"Id": 3 ,"FirstName" : "Normal","LastName" : "user3","EmailID" : "user3@gmail.com","Department" : "IT","Title": "Developer","JoiningDate": "10/10/2020","AddedBy":"Admin1","AddedDate":"10/10/2020","ModifiedBy":"","ModifiedDate":"10/10/2020","skills":{"skillName":"c#","experienceInYears":2}},
  {"Id": 4 ,"FirstName" : "Admin","LastName" : "admin1","EmailID" : "admin1@gmail.com","Department" : "Marketing","Title": "other","JoiningDate": "10/10/2020","AddedBy":"Admin1","AddedDate":"10/10/2020","ModifiedBy":"","ModifiedDate":"10/10/2020","skills":{"skillName":"","experienceInYears":0}},
  {"Id": 5 ,"FirstName" : "Normal","LastName" : "user4","EmailID" : "user4@gmail.com","Department" : "sales","Title": "Executive","JoiningDate": "10/10/2020","AddedBy":"Admin1","AddedDate":"10/10/2020","ModifiedBy":"","ModifiedDate":"10/10/2020","skills":{"skillName":"","experienceInYears":0}},
  {"Id": 6 ,"FirstName" : "Admin","LastName" : "admin2","EmailID" : "admin2@gmail.com","Department" : "sales","Title": "SeniorExecutive","JoiningDate": "10/10/2020","AddedBy":"Admin1","AddedDate":"10/10/2020","ModifiedBy":"","ModifiedDate":"10/10/2020","skills":{"skillName":"","experienceInYears":0}},
  {"Id": 7 ,"FirstName" : "Normal","LastName" : "user5","EmailID" : "user5@gmail.com","Department" : "sales","Title": "other","JoiningDate": "10/10/2020","AddedBy":"Admin1","AddedDate":"10/10/2020","ModifiedBy":"","ModifiedDate":"10/10/2020","skills":{"skillName":"","experienceInYears":0}}
  ]
}
