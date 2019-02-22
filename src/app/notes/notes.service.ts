import { Injectable } from "@angular/core";
import { NotePage } from './note-page.model'
import { NOTES } from '../mock-notes'
import { Observable, of } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class NotesService{

    constructor(){}

    getNotes(): Observable<NotePage[]>{
        return of(NOTES);
    }

    getNote(id: number): Observable<NotePage>{
        return of(NOTES.find(notePage => notePage.id == id));
    }

    // addNewNote(){
    //     let notePage = new NotePage();
    //     notePage.id = this.notesList.length + 1;
    //     this.presentNoteId = notePage.id;
    //     notePage.noteContent = "";
    //     this.notesList.push(notePage);
    //     console.log(this.notesList.length);
    // }
}