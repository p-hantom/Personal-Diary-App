import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { NotePage } from '../notes/note-page.model';
import { DbService } from '../db.service';

@Component({
  selector: 'ns-notepage',
  templateUrl: './notepage.component.html',
  styleUrls: ['./notepage.component.css'],
  moduleId: module.id,
})
export class NotepageComponent implements OnInit {
  @Input() notePage: NotePage;
  id: number;
  isNewFile: boolean;
  editState = true;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dbService: DbService
    ) { }

    ngOnInit() {
      this.isNewFile = true;
      this.notePage=new NotePage();
      this.notePage.noteContent = "";
      this.getNote();
    }
  
    getNote(){
      this.id = +this.route.snapshot.paramMap.get('id');
      if(this.id){
        this.isNewFile = false;
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
      
    }

  onGoBack(){
    this.router.navigate(["/home-page"]);
  }

  onSave(){
    this.dbService.getdbConnection()
      .then(db => {
        if(this.isNewFile){
          console.log("inserted");
          this.notePage.createDate = Date.now();
          db.execSQL(
            "INSERT INTO notes (noteContent, createDate) VALUES (?, ?)", 
            [this.notePage.noteContent, this.notePage.createDate]).then(id => {   
                this.router.navigate(["/display_page/"+id]);
            }, error => {
                console.log("INSERT ERROR", error);
            });
        }
        else{
          db.execSQL("UPDATE notes SET noteContent = ? WHERE id = ?",
          [this.notePage.noteContent, this.id]).then(id => {
            this.router.navigate(["/display_page/"+this.id]);
          })
        }
      });
      
  }

}
