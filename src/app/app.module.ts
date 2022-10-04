import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './MyComponents/navbar/navbar.component';
import { FooterComponent } from './MyComponents/footer/footer.component';
import { HomeComponent } from './MyComponents/home/home.component';
import { ExpensesComponent } from './MyComponents/expenses/expenses.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { LoginComponent } from './MyComponents/login/login.component';
import { AdminComponent } from './MyComponents/admin/admin.component';





@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    routingComponents,
    HomeComponent,

    ExpensesComponent,
    LoginComponent,
    AdminComponent,
  
    

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
