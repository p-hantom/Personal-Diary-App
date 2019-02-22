import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ns-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
  moduleId: module.id,
})
export class HomePageComponent implements OnInit {
  currentComponent: string = "ExtractPage";
  componentsArray: Array<string> = ["ExtractPage", "Calendar"];

  constructor(private router: Router) { }

  ngOnInit() {
  }

  navigationButtonClasses(component: string): string{
    if(component == this.currentComponent){
      //return "tapped-button";
      return "fas nav-btn tapped-button";
    }
    else{
      //return "not-tapped-button";
      return "fas nav-btn";
    }
  }

  onClickNewFile(){
    this.router.navigate(["/notepage"]);
  }

}
