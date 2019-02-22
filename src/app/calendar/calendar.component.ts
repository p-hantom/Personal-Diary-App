import { Component, OnInit } from '@angular/core';
import * as calendarModule from "nativescript-ui-calendar";
import { Color } from "color";
import { DbService } from '../db.service';
import { Router } from '@angular/router';
import { routerNgProbeToken } from '@angular/router/src/router_module';
import { CalendarEvent } from 'nativescript-ui-calendar';


@Component({
  selector: 'Calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
  moduleId: module.id,
})
export class CalendarComponent implements OnInit {
  calendarEvents = [];
  notes = [];

    constructor(private router: Router, private dbService: DbService) {
      this.getNotes();
    }

    getNotes(){
      this.dbService.getdbConnection()
        .then(db => {
          db.all("SELECT * FROM notes").then(rows => {
            for(var row in rows){
              let date: Date=new Date(rows[row][2]);
              this.notes.push({
                id: rows[row][0],
                noteContent: rows[row][1],
                createDate: date,
              });
            }

            let events = [];
            let startDate: Date;
            let endDate;
            let colors = [new Color(200, 188, 26, 214), new Color(220, 255, 109, 130), new Color(255, 55, 45, 255), new Color(199, 17, 227, 10), new Color(255, 255, 54, 3)];
            for (let note of this.notes) {
              startDate = note.createDate;
              let event = new calendarModule.CalendarEvent(note.noteContent, startDate, startDate);
              events.push(event);
            }
            this.calendarEvents = events;
          })
        })
    }

    ngOnInit(): void {
    }

    inlineEventSelected(event: calendarModule.CalendarEvent){
      console.dir(event)
      //this.router.navigate(["/display_page/"])
    }

    onDateSelected(args) {
        console.log("onDateSelected: " + args.date);
    }

    onDateDeselected(args) {
        console.log("onDateDeselected: " + args.date);
    }

    onNavigatedToDate(args) {
        console.log("onNavigatedToDate: " + args.date);
    }

    onNavigatingToDateStarted(args) {
        console.log("onNavigatingToDateStarted: " + args.date);
    }

    onViewModeChanged(args) {
        console.log("onViewModeChanged: " + args.newValue);
    }
}

