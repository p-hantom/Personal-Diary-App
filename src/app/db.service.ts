import { Injectable } from "@angular/core";
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { TextField } from "tns-core-modules/ui/text-field";
import { ListViewEventData, RadListView } from "nativescript-ui-listview";
import { NotePage } from "./notes/note-page.model"
import { NotepageComponent } from "./notepage/notepage.component";
import { Observable, of } from 'rxjs';
var Sqlite = require("nativescript-sqlite");

@Injectable({
    providedIn: 'root'
})
export class DbService{
    private database: any;
    public notes: Array<NotePage>;
    note: NotePage

    public constructor() {
        console.log("db-Constructor1")
        this.notes = [];
        (new Sqlite("noteDb")).then(db => {
            //db.execSQL("DROP TABLE notes");
            console.log("db-Constructor")
            db.execSQL("CREATE TABLE IF NOT EXISTS notes (id INTEGER PRIMARY KEY AUTOINCREMENT, noteContent TEXT, createDate DATETIME)").then(id => {
                console.log("db-Constructor-create db")
                this.database = db;
            }, error => {
                console.log("CREATE TABLE ERROR", error);
            });
        }, error => {
            console.log("OPEN DB ERROR", error);
        });
    }

    public getdbConnection() {
        return new Sqlite("noteDb");
    }

    // public fetchNotes(): Observable<NotePage[]>{
    //     this.notes = [];
        
    //     if(this.database){
    //         console.log("database.all");
    //     }
    //     this.database.all("SELECT * FROM notes").then(rows => {
    //         for(var row in rows) {
    //             let note: NotePage = {
    //                 id: rows[row][0],
    //                 noteContent: rows[row][1],
    //                 createDate: rows[row][2]
    //             }
    //             this.notes.push(note);
    //         } 
    //     }, error => {
    //         console.log("SELECT ERROR", error);
    //     });
    //     return of(this.notes)
    // }

    // public insert(): Observable<number> {
    //     let noteContent="";
    //     let id: number;
    //     this.database.execSQL(
    //         "INSERT INTO notes (noteContent) VALUES (?)", 
    //         [noteContent]).then(id1 => {   
    //             id=id1; 
    //         //this.noteContent = "";
    //     }, error => {
    //         console.log("INSERT ERROR", error);
    //     });
    //     return of(id);
    // }

    // fetchNote(id: number): Observable<NotePage>{
    //     this.note= new NotePage();
    //     console.log("id= "+id);
    //     this.database.all("SELECT * FROM notes WHERE id=?", [id]).then(rows =>{
    //         this.note = {
    //             id: rows[0][0],
    //             noteContent: rows[0][1],
    //         }
    //         console.log("fetchNote: "+this.note.noteContent);
    //         return of(this.note);
    //     }, error => {
    //         console.log("SELECT ERROR",error);
    //     });

    //     //return of(this.note);
    //     return of({id: 2, noteContent: "fromServer"});
    // }

    // delete(id: number) {
    //     this.database.execSQL("DELETE FROM notes WHERE id=?", [id]).then(() => {
    //         this.fetchNotes();
    //         console.log(" Item deleted successfully!")
    //     });

    // }
}