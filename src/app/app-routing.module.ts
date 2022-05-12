import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExpenseComponent } from './MyComponents/expense/expense.component';
import { ExpensesComponent } from './MyComponents/expenses/expenses.component';
import { HomeComponent } from './MyComponents/home/home.component';
import { NavbarComponent } from './MyComponents/navbar/navbar.component';
import { ReportComponent } from './MyComponents/report/report.component';

const routes: Routes = [
  
  {path:"AddNewExpense",component:ExpenseComponent},
  {path:"home",component:HomeComponent},
  {path:"report",component:ReportComponent},
  {path:"expenses",component:ExpensesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [ExpenseComponent];
