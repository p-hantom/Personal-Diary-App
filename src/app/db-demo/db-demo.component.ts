import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { TextField } from "tns-core-modules/ui/text-field";
import { ListViewEventData, RadListView } from "nativescript-ui-listview";

var Sqlite = require("nativescript-sqlite");

@Component({
  selector: 'ns-db-demo',
  templateUrl: './db-demo.component.html',
  styleUrls: ['./db-demo.component.css'],
  moduleId: module.id,
})
export class DbDemoComponent implements OnInit {
  private database: any;
  public notes: Array<any>;
  noteContent: string;

  public constructor() {
    this.notes = [];
    (new Sqlite("noteDb")).then(db => {
        db.execSQL("DROP TABLE notes");
        db.execSQL("CREATE TABLE IF NOT EXISTS notes (id INTEGER PRIMARY KEY AUTOINCREMENT, noteContent TEXT, createDate DATETIME)").then(id => {
            this.database = db;
        }, error => {
            console.log("CREATE TABLE ERROR", error);
        });
    }, error => {
        console.log("OPEN DB ERROR", error);
    });
}

  ngOnInit() {
  }

  public insert() {
    console.log("insert: "+this.noteContent)
    if(this.noteContent===''){
      alert('Please enter first name!');
      return;
    }
    // if(this.lastName.trim()===''){
    //   alert('Please enter last name!');
    //   return;
    // }
    // let textField = <TextField>this.lastNameTextField.nativeElement;
    // textField.dismissSoftInput();
    
      this.database.execSQL(
        "INSERT INTO notes (noteContent) VALUES (?)", 
        [this.noteContent]).then(id => {     
          //this.notes.unshift({ id: id, noteContent: this.noteContent });
          this.fetch();
          this.noteContent = "";
      }, error => {
          console.log("INSERT ERROR", error);
      });
  }

  public fetch() {
      this.database.all("SELECT * FROM notes").then(rows => {
          this.notes = [];
          for(var row in rows) {
              this.notes.push({
                  "id": rows[row][0],
                  "noteContent": rows[row][1],
              });
              console.log("fetch: "+rows[row][1]);
          }
      }, error => {
          console.log("SELECT ERROR", error);
      });
  }

  delete(args: ListViewEventData) {
    let person = <any>args.object.bindingContext;
    this.database.execSQL("DELETE FROM notes WHERE id=?", [person.id]).then(() => {
      let index = this.notes.indexOf(person);
      this.notes.splice(index, 1);
      console.log(" Item deleted successfully!")
    });

  }

  delete2(id: number) {
    //let person = <any>args.object.bindingContext;
    this.database.execSQL("DELETE FROM notes WHERE id=?", [id]).then(() => {
      //let index = this.notes.indexOf(person);
      //this.notes.splice(index, 1);
      this.fetch();
      console.log(" Item deleted successfully!")
    });

  }
}


