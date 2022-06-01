import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

   d : Date = new Date();

  constructor() { }

  

  ngOnInit(): void {
  }

  getCurrentYear():number
  {
    return this.d.getFullYear();
  }

  getCurrentMonth():string
  {
    const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];

    return month[this.d.getMonth()];
  }

}
