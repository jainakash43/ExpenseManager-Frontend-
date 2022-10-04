import { Component, OnInit } from '@angular/core';
import { Budget } from 'src/app/MyClasses/budget';
import { ExpensesService } from 'src/app/MyServices/expenses.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  d: Date = new Date();
  toggleBudget: boolean = false;
  budget: number = -1;
  newBudget!: number;
  loader: boolean = true;


  constructor(private expensesService: ExpensesService) { }

  ngOnInit(): void {
    this.expensesService.getBudget().subscribe({
      next: (data: Budget) => {
        this.budget = data.amount;
        this.resetLoader();
      },
      error: (error: any) => {
        console.log(error)
        this.resetLoader();

      }
    });

  }

  resetLoader(): void {
    this.loader = !this.loader;
  }

  setBudget(newBudget: number): void {
    this.budget = newBudget;
    this.expensesService.postBudget(this.budget).subscribe({
      next: () => {
        this.open("Budget Reset Successfully")
        this.enableBudget();

      },
      error: () => {

      },
      complete: () => {

      }
    });



  }

  getBudget(): number {

    return this.budget;
  }
  enableBudget() {
    this.toggleBudget = !this.toggleBudget;
  }

  getDate(): Date {

    const date = this.d;
    return date;
  }

  open(status:string)
  {
    Swal.fire({text:status,icon:"success"});
  }
  getCurrentMonth(): string {
    const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    return month[this.d.getMonth()];
  }


}
