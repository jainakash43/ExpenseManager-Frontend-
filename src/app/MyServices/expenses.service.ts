import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, delay, Observable, throwError } from 'rxjs';
import { Expense } from '../MyClasses/expense';

@Injectable({
  providedIn: 'root'
})
export class ExpensesService {

  url : string ="http://50.16.176.111:8090/"; /*http://50.16.176.111:8090 */

  constructor(private http : HttpClient) { }
  

  getExpenses():Observable<Expense[]> /* To Display all the expenses */
  {
    return  this.http.get<any>(this.url+'all').pipe(delay(100),catchError(
      (err)=>{
        let errorMsg:string = '';
        errorMsg = this.getError(err);
        return throwError(()=>errorMsg);
      }
      ));
  }

  postExpenses(data:any):Observable<any> /* To Enter New Expense */
  {
     return this.http.post(this.url+'addExpense',data).pipe(delay(100),
       catchError((err) =>{ 

        let errorMsg: string = '';
        errorMsg = this.postError(err);
         return throwError(()=> errorMsg);
        }),
     );
  }


  getError(err : Error):string     /* To handle any HTTP GET Error */
  {
    if(err instanceof HttpErrorResponse)
    {
      if(err.status == 404)
      {
        return "No Data Available";
      }
      else if(err.status == 500)
      {
        return "Internal Server Error"
      }
      
    }
    return "Unknown Server Error";
  }

  postError(err :Error):string     /* To handle any HTTP Post Error */
  {
    if(err instanceof HttpErrorResponse)
    {
      if(err.status == 409)
      {
        return "UTR Already Exists";
      }
      else if(err.status == 500)
      {
        return "Internal Server Error";
      }
    }
    return "Unknown Server Error";
  }

  
}


