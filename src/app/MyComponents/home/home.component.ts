import { Component, OnInit } from '@angular/core';
import { ExpensesService } from 'src/app/MyServices/expenses.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

   d : Date = new Date();
   
   budgetThisMonth:number=30000;
   totalExpensesOfCurrentMonth:number=0;
   loader:boolean=true;

  constructor(private expensesService: ExpensesService) {
  
    this.getTotalExpensesofCurrentMonth();
   }

  

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

  getTotalExpensesofCurrentMonth():void
  {
    this.expensesService.getTotalExpensesofCurrentMonth().subscribe({
      next: (data: any) => {
        this.totalExpensesOfCurrentMonth=data;
        this.resetLoader();
      },
      error: (error:any) => {
        console.log(error)
        this.resetLoader();
      }
    });
  }

  resetLoader(): void {
    this.loader = !this.loader;
  }

}
