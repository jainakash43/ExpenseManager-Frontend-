import { Component, OnInit } from '@angular/core';
import { AbstractControl, UntypedFormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { icon } from '@fortawesome/fontawesome-svg-core';
import { NgbCalendar, NgbDate, NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Expense } from 'src/app/MyClasses/expense';
import { ExpensesService } from 'src/app/MyServices/expenses.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.css']
})
export class ExpenseComponent implements OnInit {

  expense_Categories = ['', 'Bills & EMI', 'Food & Dining', 'Fuel', 'Groceries', 'Investment', 'Shopping', 'Travel', 'Others'];

  date!: string;

  model!: NgbDateStruct;

  isSubmitted: boolean = false;

  isButtonActive: boolean = false;

  todayDate: NgbDateStruct = this.calendar.getToday();

  firstDateOfMonth: NgbDateStruct = {
                                year:new Date().getFullYear(),
                                month:new Date().getMonth()+1,
                                 day:1
                              }

  expenseForm = this.fb.group({

    utr: ['', [Validators.required, Validators.maxLength(12)]],
    amount: ['', [Validators.required]],
    dp: ['', [Validators.required]],
    description: ['', [Validators.required]],
    category: ['', [Validators.required]]

  });




  constructor(private fb: UntypedFormBuilder, private router : Router, private calendar: NgbCalendar, private expensesService: ExpensesService, private modalService: NgbModal) { }


  submitForm() {
    const { utr, amount, dp, description, category }: { utr: number, amount: number, dp: NgbDate, description: string, category: string }
      = this.expenseForm.value;

    const dateofexpense = this.updateSelectedDate(dp);
    this.isSubmitted = true;
    this.isButtonActive = true;

    if (this.expenseForm.invalid) {
      setTimeout(() => {
        this.isButtonActive = false
      }, 500);
    }
    else {
      this.expensesService.postExpenses({ utr, amount, dateofexpense, description, category }).subscribe({
        next: () => {

        },
        error: (error) => {
          let errorMsg: string = error;
          this.isButtonActive = false;
          this.open(error);
        },
        complete: () => {
          this.isButtonActive = false;
          this.open('successfull')
        }
      })
    }

  }


  public updateSelectedDate(ngbDate: NgbDate): string {

    if (ngbDate == undefined) {
      return '';
    }

    const { day, month, year }: { day: number, month: number, year: number } = ngbDate;
    const mont = ["", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    this.date = day.toString() + " " + mont[month] + " " + year.toString();
    return this.date;

  }

  get f(): { [key: string]: AbstractControl } {

    return this.expenseForm.controls;

  }


  ngOnInit(): void {
  }


  open(status: string) {

    if (status == 'UTR Already Exists') {
      Swal.fire({ text: "UTR Already Exists", icon: "error" });
    }
    else if (status == 'Internal Server Error ') {
      Swal.fire({ text: "Internal Server ", icon: "error" })
    }
    else if (status == 'Unknown Server Error') {
      Swal.fire({ text: "Expense not entered, please try after some time", icon: "error" })
      .then((result)=>{
        if(result.isConfirmed)
        {
           this.isSubmitted=false;
           this.expenseForm.reset({
             utr:'',
             amount:'',
             dp:'',
             description:'',
             category:''
           });
        }
      })     
      ;
    }
    else if (status == 'successfull') {
      Swal.fire({ text: 'Expense Entered Successfully', icon: "success" })
          .then((result)=>{
            if(result.isConfirmed)
            {
               this.isSubmitted=false;
               this.expenseForm.reset({
                 utr:'',
                 amount:'',
                 dp:'',
                 description:'',
                 category:''
               });
            }

          });
    }
  }

}



