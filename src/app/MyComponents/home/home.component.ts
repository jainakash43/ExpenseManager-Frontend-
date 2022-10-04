import { Component, OnInit } from '@angular/core';
import { ExpensesService } from 'src/app/MyServices/expenses.service';
import {Budget} from 'src/app/MyClasses/budget';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

   d : Date = new Date();
   
   budgetThisMonth:number=-1
   totalExpensesOfCurrentMonth:number=-1;
   remainingBalanceOfCurrentMonth:number=0;
   loader:boolean=true;

  constructor(private expensesService: ExpensesService) {
  
   
    
   }

  

  ngOnInit(): void {
    
    this.getBudgetThisMonth();
   

  }
  getBudgetThisMonth():void
  {
    this.expensesService.getBudget().subscribe({
      next: (data: Budget) => {
         this.budgetThisMonth=data.amount;
         this.resetLoader();
         this.getTotalExpensesofCurrentMonth()

      },
      error: (error:any) => {
        console.log(error)
        this.resetLoader();
      
      }
    });
     
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

  

  getTotalExpensesofCurrentMonth():void
  {
    this.expensesService.getTotalExpensesofCurrentMonth().subscribe({
      next: (data: any) => {
        this.totalExpensesOfCurrentMonth=data;
        this.remainingBalanceOfCurrentMonth=this.budgetThisMonth-this.totalExpensesOfCurrentMonth;
        
      },
      error: (error:any) => {
        console.log(error)
        
      }
    });
  }


  resetLoader(): void {
    this.loader = !this.loader;
  }

}
