import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { NotePage } from '../notes/note-page.model';
import { DbService } from '../db.service';
import { TextService } from '../azure-service/text.service';

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
    private dbService: DbService,
    private textService: TextService
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
                    createDate: rows[0][2],
                    sentiment: rows[0][3],
                    keyPhrases: rows[0][4],
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
    let documents = { 'documents': [
      {'id': 0, 'language': 'en', 'text': this.notePage.noteContent}
    ]};
    this.textService.getSentiment(documents)
      .subscribe(res => {
        this.notePage.sentiment = res[0];
        console.log("sentiment1: "+this.notePage.sentiment);

        this.textService.getKeyPhrases(documents)
          .subscribe(res => {
            this.notePage.keyPhrases = res[0];
            console.log("key1: "+this.notePage.keyPhrases);

            this.dbService.getdbConnection()
            .then(db => {
              if(this.isNewFile){
                console.log("inserted");
                this.notePage.createDate = Date.now();
  
                console.log("sentiment2: "+this.notePage.sentiment);
  
                db.execSQL(
                  "INSERT INTO notes (noteContent, createDate, sentiment, keyPhrases) VALUES (?, ?, ?, ?)", 
                  [this.notePage.noteContent, this.notePage.createDate, this.notePage.sentiment, this.notePage.keyPhrases]).then(id => {   
                      this.router.navigate(["/display_page/"+id]);
                  }, error => {
                      console.log("INSERT ERROR", error);
                  });
                }
                else{
                  db.execSQL("UPDATE notes SET noteContent = ?, sentiment = ?, keyPhrases = ? WHERE id = ?",
                  [this.notePage.noteContent, this.notePage.sentiment, this.notePage.keyPhrases, this.id]).then(id => {
                    this.router.navigate(["/display_page/"+this.id]);
                  })
                }
            });
          })

        // this.dbService.getdbConnection()
        //   .then(db => {
        //     if(this.isNewFile){
        //       console.log("inserted");
        //       this.notePage.createDate = Date.now();

        //       console.log("sentiment2: "+this.notePage.sentiment);

        //       db.execSQL(
        //         "INSERT INTO notes (noteContent, createDate, sentiment, keyPhrases) VALUES (?, ?, ?, ?)", 
        //         [this.notePage.noteContent, this.notePage.createDate, this.notePage.sentiment, this.notePage.keyPhrases[0]]).then(id => {   
        //             this.router.navigate(["/display_page/"+id]);
        //         }, error => {
        //             console.log("INSERT ERROR", error);
        //         });
        //       }
        //       else{
        //         db.execSQL("UPDATE notes SET noteContent = ?, sentiment = ?, keyPhrases = ? WHERE id = ?",
        //         [this.notePage.noteContent, this.notePage.sentiment, this.notePage.keyPhrases[0], this.id]).then(id => {
        //           this.router.navigate(["/display_page/"+this.id]);
        //         })
        //       }
        //   });
      });
    

    // this.dbService.getdbConnection()
    //   .then(db => {
    //     if(this.isNewFile){
    //       console.log("inserted");
    //       this.notePage.createDate = Date.now();

    //       console.log("sentiment2: "+this.notePage.sentiment);

    //       db.execSQL(
    //         "INSERT INTO notes (noteContent, createDate, sentiment, keyPhrases) VALUES (?, ?, ?, ?)", 
    //         [this.notePage.noteContent, this.notePage.createDate, this.notePage.sentiment, this.notePage.keyPhrases[0]]).then(id => {   
    //             this.router.navigate(["/display_page/"+id]);
    //         }, error => {
    //             console.log("INSERT ERROR", error);
    //         });
    //     }
    //     else{
    //       db.execSQL("UPDATE notes SET noteContent = ?, sentiment = ?, keyPhrases = ? WHERE id = ?",
    //       [this.notePage.noteContent, this.notePage.sentiment, this.notePage.keyPhrases[0], this.id]).then(id => {
    //         this.router.navigate(["/display_page/"+this.id]);
    //       })
    //     }
    //   });
      
  }

}
