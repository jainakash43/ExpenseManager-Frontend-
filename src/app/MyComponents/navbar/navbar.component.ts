import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router) { }

   currentActive:string = 'expenses';
   temp:string="";

  onClick($event:any)
  {
    var target = $event.target || $event.srcElement || $event.currentTarget;
    var idAttr = target.attributes.id;
    var value = idAttr.nodeValue;
    this.currentActive = value;
    
  }

  ngOnInit(): void {
    this.router.navigateByUrl("/expenses");
  }

}
