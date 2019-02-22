import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { NotePage } from '../notes/note-page.model';
import { DbService } from '../db.service';


@Component({
  selector: 'ns-display-page',
  templateUrl: './display-page.component.html',
  styleUrls: ['./display-page.component.css'],
  moduleId: module.id,
})
export class DisplayPageComponent implements OnInit {
  notePage: NotePage;
  id: number;
  constructor(private router: Router,  private route: ActivatedRoute,
    private dbService: DbService) { }

  ngOnInit() {
    this.notePage=new NotePage();
    this.getNote();
  }

  getNote(){
    this.id = +this.route.snapshot.paramMap.get('id');
    this.dbService.getdbConnection()
      .then(db => {
        db.all("SELECT * FROM notes WHERE id=?", [this.id]).then(rows =>{
              this.notePage = {
                  id: rows[0][0],
                  noteContent: rows[0][1],
                  createDate: rows[0][2]
              }
              console.log("fetchNote: "+this.notePage.noteContent);
          }, error => {
              console.log("SELECT ERROR",error);
          });
      }) 
  }

  onClickEdit(){
    this.router.navigate(["/notepage/"+this.notePage.id]);
  }

  onGoBack(){
    this.router.navigate(["/home-page"]);
  }

  // getNote1(){
  //   this.id = +this.route.snapshot.paramMap.get('id');
  //   this.dbService.fetchNote(this.id)
  //     .subscribe(note => {
  //       this.notePage = note;
  //       console.log(note.noteContent);
  //     });
  //   console.log("2+ " + this.notePage.noteContent);
  // }

}


  