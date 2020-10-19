import { Component, Injector, OnInit, PLATFORM_ID } from '@angular/core';
import { formatDate, isPlatformBrowser } from '@angular/common';
import {MatDialog} from '@angular/material/dialog';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  Todaysdate : string;
  Todaybirthdays ;
  closeResult = '';
  modalService:any;
  // constructor(@Inject(PLATFORM_ID) private platformId : object,private injector : Injector)
  // { 
  //   if(isPlatformBrowser(this.platformId)){
  //     this.modalService = this.injector.get(NgbModal);
  //   }
  // }
  constructor(public dialog: MatDialog){

  }

  ngOnInit() {
    this.Todaysdate  = formatDate(new Date(), 'MM/dd', 'en');
    console.log(this.Todaysdate);
     this.Todaybirthdays = this.birthdays.filter(x=>x.BirthdayDate == this.Todaysdate);
    console.log(this.Todaybirthdays);
  }
  openDialog() {
    const dialogRef = this.dialog.open(DialogContent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  // open(content) {
  //   this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
  //     this.closeResult = `Closed with: ${result}`;
  //   }, (reason) => {
  //     this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  //   });
  // }

  // private getDismissReason(reason: any): string {
  //   if (reason === ModalDismissReasons.ESC) {
  //     return 'by pressing ESC';
  //   } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
  //     return 'by clicking on a backdrop';
  //   } else {
  //     return `with: ${reason}`;
  //   }
  //}
  //please today's date
 birthdays :any= [
  {"BirthdayDate":"10/19","Name": "Nmae1","Department" : "Marketing", "Location" : "Bangalore","profileimg":"https://s3.eu-central-1.amazonaws.com/bootstrapbaymisc/blog/24_days_bootstrap/fox.jpg"},
  {"BirthdayDate":"10/20","Name":"Nmae2","Department" : "Marketing", "Location" : "Bangalore","profileimg":""},
  {"BirthdayDate":"10/21", "Name":"Nmae3","Department" : "Marketing", "Location" : "Bangalore","profileimg":""}
]
}
@Component({
  selector: 'dialog-content',
  templateUrl: 'dialog-content.html',
})
export class DialogContent {}