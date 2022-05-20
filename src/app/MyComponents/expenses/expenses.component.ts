import { Component, OnInit } from '@angular/core';
import { ExpensesService } from 'src/app/MyServices/expenses.service';
import { delay, Observable } from 'rxjs';
import { Expense } from 'src/app/MyClasses/expense';
import * as moment from 'moment';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css']
})
export class ExpensesComponent implements OnInit {

  Expenses: Expense[] = [];
  loader: boolean = true;
  errorMsg: string = "";
  recordPerPages:number=10;
  currentPage:number=1;
  pageSizes = [5,10];
  constructor(private expensesService: ExpensesService) {

  }

  ngOnInit(): void {

    this.expensesService.getExpenses().subscribe({
      next: (data: any) => {
        this.Expenses = data;
        /*this.Expenses = this.Expenses.sort((a:Expense,b:Expense)=>{
          return this.convertToDate(a.dateofexpense).getTime()- this.convertToDate(b.dateofexpense).getTime();
        });*/
        this.Expenses = this.Expenses.sort(this.sortByDate);
      
        this.resetLoader();
      },
      error: (error) => {
        this.resetLoader();
        this.setDisplayBlock(error);
      }
    });

  }
  resetLoader(): void {
    this.loader = !this.loader;
  }


  setDisplayBlock(displayBlock: string): void {
    this.errorMsg = displayBlock;
  }
  
 sortByDate(a:Expense,b:Expense):number
  {
    var n:Date = new Date(a.dateofexpense.split(' ').join('-'));
    var m:Date =new Date(b.dateofexpense.split(' ').join('-'));
    
   
    

   // return( this.convertToDate(a.dateofexpense)- this.convertToDate(b.dateofexpense) );
    return n.getTime()-m.getTime();
  }
  

  convertToDate(n:string):any
  {
    n = n.split(' ').join('-');
   
    return moment(n,"DD-MMMM-YYYY");
  }

  handleRecordPerPage(event:any)
  {
    this.recordPerPages=event.target.value;
    this.currentPage=1;
  }

}
