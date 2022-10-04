import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './MyComponents/admin/admin.component';
import { ExpenseComponent } from './MyComponents/expense/expense.component';
import { ExpensesComponent } from './MyComponents/expenses/expenses.component';
import { HomeComponent } from './MyComponents/home/home.component';
import { LoginComponent } from './MyComponents/login/login.component';
import { NavbarComponent } from './MyComponents/navbar/navbar.component';


const routes: Routes = [
  
  {path:"AddNewExpense",component:ExpenseComponent},
  {path:"home",component:HomeComponent},

  {path:"expenses",component:ExpensesComponent},
  {path:"admin", component:AdminComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [ExpenseComponent,ExpensesComponent,HomeComponent,AdminComponent];
