import { Component, OnInit } from '@angular/core';
import { NgbCalendar, NgbDate, NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

   d : Date = new Date();
   
   model!:NgbDateStruct;

  constructor() { }

  

  ngOnInit(): void {
  }

  
  getTodayDate():string
  {
    const date = this.d;
    let day = date.getDate();
    let month = this.getCurrentMonth();
    let year = date.getFullYear();
    return day+" "+month+" "+year;
  }  

  getCurrentMonth():string
  {
    const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];

    return month[this.d.getMonth()];
  }

  getBudgetThisMonth():number
  {
    return 30000 ;
  }

}
