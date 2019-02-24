import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { DbService } from "../db.service"
import { NotePage } from '../notes/note-page.model'
import { TextField } from "tns-core-modules/ui/text-field";
import { ListViewEventData, RadListView } from "nativescript-ui-listview";
import { View } from "tns-core-modules/ui/core/view"; 

@Component({
  selector: 'ExtractPage',
  templateUrl: './extract-page.component.html',
  styleUrls: ['./extract-page.component.css'],
  moduleId: module.id,
})
export class ExtractPageComponent implements OnInit {
  //notes: Array<NotePage>;
  notes = []
  
  constructor(private router: Router, private dbService: DbService) { }

  ngOnInit() { 
    console.log("extract onInit")
    this.notes = [];
    this.getNotes();
  }

  onClickNewFile(){
    this.router.navigate(["/notepage"]);
  }

  onClick(id: number){
    this.router.navigate(["/display_page/"+id]);
  }

  getNotes(){
    this.dbService.getdbConnection()
      .then(db => {
        db.all("SELECT * FROM notes").then(rows => {
          for(var row in rows) {
              let note = {
                  id: rows[row][0],
                  noteContent: rows[row][1],
                  createDate: rows[row][2],
                  sentiment: rows[0][3],
                  keyPhrases: rows[0][4],
              }
              this.notes.push(note);
          } 
          }, error => {
              console.log("SELECT ERROR", error);
          });
      })

  }

  navigationButtonClasses(): string{
    console.log("button");
    return "fa nav-btn purple";
  }

}
