import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,FormBuilder} from '@angular/forms';
import { Employee } from '../_models'

@Component({
  selector: 'app-selfservice',
  templateUrl: './selfservice.component.html',
  styleUrls: ['./selfservice.component.css']
})
export class SelfserviceComponent implements OnInit {

  aboutMeForm: FormGroup;
  skillSet : FormGroup;
  basicInfo : FormGroup;
  aboutmecols : any;
  _employee : Employee;
  editAboutme : any = false;
  constructor(private fb: FormBuilder) { }
  editskillset: any = false;
  ngOnInit() {
    this._employee = this.employee;
    this.aboutMeForm = this.fb.group({
      Department : [this.employee.Id],
      Title : [this.employee.Title]
    });
    this.skillSet = this.fb.group({
      skillName: [this.employee.skills.skillName],
      experienceInYears: [this.employee.skills.experienceInYears]
    });
    this.basicInfo = this.fb.group({
      EmployeeID : [{value:this.employee.Id,disabled: true}],
      LastName : [this.employee.LastName],
      AddedBy :[this.employee.AddedBy],
      FirstName : [this.employee.FirstName],
      EmailId :[this.employee.EmailID],
      AddedDate : [this.employee.AddedDate],
      ModifiedBy : [this.employee.ModifiedBy],
      ModifiedDate : [this.employee.ModifiedDate]
    })
  }
  editAboutMe(){
    //this.editAboutMe = true;

  }
  editskill(){
    //this.editskill = true;
  }
  get f() { return this.skillSet.controls; }
  private employee : Employee =
    {"Id": 1 , "FirstName" : "Normal","LastName" : "user1","EmailID" : "user1@gmail.com","Department" : "IT","Title": "Associate","JoiningDate": "10/10/2020","AddedBy":"Admin1","AddedDate":"10/10/2020","ModifiedBy":"","ModifiedDate":"10/10/2020","skills":{"skillName":"c#","experienceInYears":2}}
  
}
