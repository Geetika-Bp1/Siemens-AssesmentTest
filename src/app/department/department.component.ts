import { Component, OnInit } from '@angular/core';
import { Departmentservice } from '../_services';
import { Department,Lead,Parent, User } from '../_models';
import { FormGroup, FormControl,FormBuilder, Validators } from '@angular/forms';
import {formatDate, NgSwitchCase,NgSwitch} from '@angular/common';


@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {
  cols: any[];
  departments: Department[];
  department: Department;
  leads : Lead[];
  Parents: Parent[];
  CurrentDate: any;
  showcondition : any = false;
  editDept : any = false;
  user : any;
  parentDeptmap = new Map<string, string>();
  leadmap = new Map<string, string>();
  departmentForm: FormGroup;
  constructor(  
    private departmentservice : Departmentservice,
    private fb : FormBuilder
    ) { 
    
       this.user = JSON.parse(localStorage.getItem('user'));
  }

  ngOnInit() {
    this.leads = this._leads;
    this.Parents = this._parents;
    this.LeadMapping();
    this.parentdepartmentMapping();
    this.getdeparments();
    this.CurrentDate = formatDate(new Date(), 'yyyy/MM/dd', 'en');
    this.departmentForm = this.fb.group({
      Id: [{value : '',disabled: true}],
      departmentName : ['',Validators.required],
      markAlias : [''],
      addedBy : [{value: this.user.username, disabled: true},Validators.required],
      addedTime : [{value: this.CurrentDate, disabled: true},Validators.required],
      modifiedBy : [{value: this.user.username, disabled: true},Validators.required],
      modifiedTime : [{value: this.CurrentDate, disabled: true},Validators.required],
      departmentLead : [''],
      parentDepartment : ['']
    })
   // this.departments = this._departments;
   
    
    this.cols = [
      { field: 'Id', header: 'Id' },
      { field: 'DepartmentName', header: 'Name' },
      { field: 'MarkAlias', header: 'Alias' },
      { field: 'AddedBy', header: 'AddedBy' },
      {field : 'AddedTime',header:'AddedTime'},
      { field: 'ModifiedBy', header: 'ModifiedBy' },
      {field : 'ModifiedTime',header:'ModifiedTime'},
      { field: 'DepartmentLead', header: 'Lead' },
      {field : 'ParentDepartment',header:'ParentDepartment'}
    ]; 
    
  }

  // convenience getter for easy access to form fields
  get f() { return this.departmentForm.controls; }
 parentdepartmentMapping(){
   for (let i = 0; i < this._parents.length; i++) {
    this.parentDeptmap.set((this._parents[i].Id).toString(),this.Parents[i].Name)
  }
 }
 LeadMapping(){
  for (let i = 0; i < this._leads.length; i++) {
    this.leadmap.set((this._leads[i].Id).toString(),this._leads[i].Name)
  }
 }
 getMappingName( Id : number, value : string){
   if(value == "Lead")
   {
    return this.leadmap.get(Id.toString());
   }
   else if(value == "ParentDepartment")
   return this.parentDeptmap.get(Id.toString());
 }
 getparentName( Id : number){
  return this.parentDeptmap.get(Id.toString());
}
  getdeparments(){
    this.departmentservice.getdepartments().subscribe(data => {
     this.departments = data;
     });
  }
  //to Show Create Department html
  showadddepartment(){
    this.departmentForm.patchValue({
      "departmentName" : "",
      "markAlias" : "",
      "ModifiedTime":formatDate(new Date(), 'yyyy/MM/dd', 'en'),
      "departmentLead":"",
      "parentDepartment":""
    });
    this.editDept = false;
    this.showcondition = true;
    
  }
  //To add Department 
  addUpdateDepartment() {
    let depts : any = { DepartmentName :  this.f.departmentName.value,
      MarkAlias : this.f.markAlias.value,
      AddedBy : this.f.addedBy.value,
      AddedTime : this.f.addedTime.value,
      ModifiedBy : this.f.modifiedBy.value,
      ModifiedTime : this.f.modifiedTime.value,
      DepartmentLead : this.f.departmentLead.value,
      ParentDepartment : this.f.parentDepartment.value}
    //editDept == true then updatedepartment else savedepartment
    if(this.editDept){
      depts.Id =this.f.Id.value;
      this.updateDepartment(depts); 
    }
    else
    {
      // w/o service call
      depts.Id =  this.departments[this.departments.length-1].Id+1;
      depts.DepartmentLead = depts.DepartmentLead == "" ? 0 : depts.DepartmentLead;
      depts.ParentDepartment = depts.ParentDepartment == "" ? 0 : depts.ParentDepartment;
      this.departments.push(depts);
      this.showcondition = false;

      //TODO : uncoment this for service call
      // this.departmentservice.adddepartment(depts)
      // .subscribe(dept=> {
      //   this.departments.push(dept);
      //   this.getdeparments();
      //   this.showcondition = false;
      // });
    }
  }
  updateDepartment(dept : Department){
    let index = this.departments.map(function(e) { return e.Id}).indexOf(dept.Id);
    this.departments[index] = dept;
    this.showcondition = false;

    //TODO : uncoment this for service call
    // this.departmentservice.updatedepartment(dept)
    //   .subscribe(() => this.getdeparments());
    //   console.log("updatedept");
  }
  editDepartment(dept : Department){
    this.editDept = true;
    this.showcondition = true;
    this.f.Id.setValue(dept.Id),
    this.f.departmentName.setValue(dept.DepartmentName),
    this.f.markAlias.setValue(dept.MarkAlias),
    this.f.addedBy.setValue(dept.AddedBy),
    this.f.addedTime.setValue(dept.AddedTime),
    this.f.modifiedBy.setValue(this.user.username),
    this.f.modifiedTime.setValue(this.CurrentDate),
    this.f.departmentLead.setValue(dept.DepartmentLead),
    this.f.parentDepartment.setValue(dept.ParentDepartment)
  }
  deleteDepartment(id:number){
    let index = this.departments.map(function(e) { return e.Id}).indexOf(id);
    if (index !== -1) 
      this.departments.splice(index,1)
    //By Service call
    // this.departments = this.departments.filter(h => h !== this.department);
    // this.departmentservice.deletedepartment(id).subscribe();
  }
  private _parents: Parent[]=[
    {
      Id: 1 ,
      Name: "Marketing"
    },
    {
      Id: 2,
      Name: "Sales"
    },
    {
      Id: 3,
      Name: "IT"
    },
    {
      Id : 4,
      Name : "HR"
    }
  ]
  private _leads: Lead[]= [
    {
      "Id" : 1 ,
      "Name" : "Lead1"
    },
    {
      "Id" : 2 ,
      "Name" : "Lead2"
    },
    {
      "Id" : 3 ,
      "Name" : "Lead3"
    },
    {
      "Id" : 4 ,
      "Name" : "Lead4"
    },
    {
      "Id" : 5 ,
      "Name" : "Lead5"
    },
  ]
}
