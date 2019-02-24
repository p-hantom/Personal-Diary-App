import { Component, OnInit } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import { Observable, throwError } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";
import { Config } from "../azure-service/config"
import { TextService } from "../azure-service/text.service";

@Component({
  selector: 'text-analytics-test',
  templateUrl: './text-analytics-test.component.html',
  styleUrls: ['./text-analytics-test.component.css'],
  moduleId: module.id,
})
export class TextAnalyticsTestComponent implements OnInit {
    documents1 = { 'documents': [
        { 'id': '1', 'text': 'This is a document written in English.' },
        { 'id': '2', 'text': 'Este es un document escrito en Español.' },
        { 'id': '3', 'text': '这是一个用中文写的文件' }
    ]};
    documents = { 'documents': [
        { 'id': '1', 'text': 'This is a document written in English.' },
        { 'id': '2', 'text': 'Good.' },
        { 'id': '3', 'text': 'Bad.' }
    ]};
    constructor( private http: Http, private textService: TextService) {
    }

    ngOnInit(): void {
        //console.log(this.documents)
        //this.get_language (this.documents);
        console.log("init")
        //this.f();
        this.getSentiment(this.documents);
    }

    getLan(){
        this.textService.getLan()
            .subscribe(res => {
                console.log("get:")
                console.log(res);
            })
    }

    getSentiment(documents){
        this.textService.getSentiment(documents)
            .subscribe(resList => {
                console.log(resList);
            })
    }

    // f() {
    //     console.log(JSON.stringify(this.documents))
    //     this.http.post(
    //         Config.apiUrl + Config.lanPath,
    //         JSON.stringify(this.documents),
    //         { headers: this.getCommonHeaders() }
    //     )        
    //     .pipe(
    //         map(response => {
    //             console.log('.map')
    //             console.log(response)
    //             console.log(response.json())
    //         }),
    //         tap(data => {
    //             console.log('tap')
    //             console.log(data)
    //             //Config.token = data._kmd.authtoken
    //         }),
    //         //catchError()//this.handleErrors)
    //     )
    //     .subscribe((data) => {
    //         console.log('.subscribe')
    //         console.log(data)
    //     },(err)=>{
    //         console.log(err)
    //     })
    // }
    // getCommonHeaders() {
    //     let headers = new Headers();
    //     headers.append("Content-Type", "application/json");
    //     headers.append("Ocp-Apim-Subscription-Key", Config.accessKey);
    //     return headers;
    // }
}
// export class Config {
//     static apiUrl = "https://southcentralus.api.cognitive.microsoft.com";
//     static accessKey = "9962000b173c4d58986270a2c0e7f029";
//     static path ='/text/analytics/v2.0/languages';
//     //static authHeader = "Basic a2lkX0h5SG9UX1JFZjo1MTkxMDJlZWFhMzQ0MzMyODFjN2MyODM3MGQ5OTIzMQ";
//     //static token = "";
//   }
// export class TextAnalyticsTestComponent implements OnInit{
//     constructor(private http: Http) { }
//     ngOnInit(){
//         this.test();
//     }
//     test(){
//         this.http.post(
//             "http://127.0.0.1:8888/",
//             JSON.stringify({}),
//             { headers: this.getCommonHeaders() }
//         ).subscribe(
//             () => {
//                 console.log("success");
//             },
//             (error) => console.log("Unfortunately we could not find your account.")
//         )
//     }
//     getCommonHeaders() {
//         let headers = new Headers();
//         headers.append("Content-Type", "application/json");
//         //headers.append("Authorization", Config.authHeader);
//         return headers;
//     }
// }



// export class TextAnalyticsTestComponent implements OnInit {
// //   https = require ('https');
//  // request = require('request');

//   constructor() { }

//   ngOnInit(){
//     //this.test2();
//   }

//   // Replace the accessKey string value with your valid access key.
//   accessKey = '9962000b173c4d58986270a2c0e7f029';

//   // Replace or verify the region.

//   // You must use the same region in your REST API call as you used to obtain your access keys.
//   // For example, if you obtained your access keys from the westus region, replace 
//   // "westcentralus" in the URI below with "westus".

//   // NOTE: Free trial access keys are generated in the westcentralus region, so if you are using
//   // a free trial access key, you should not need to change this region.
//   uri = 'southcentralus.api.cognitive.microsoft.com';
//   path = '/text/analytics/v2.0/languages';

//   response_handler = function (response) {
//       let body = '';
//       response.on ('data', function (d) {
//           body += d;
//       });
//       response.on ('end', function () {
//           let body_ = JSON.parse (body);
//           let body__ = JSON.stringify (body_, null, '  ');
//           console.log (body__);
//       });
//       response.on ('error', function (e) {
//           console.log ('Error: ' + e.message);
//       });
//   };

//   get_language = function (documents) {
//       let body = JSON.stringify (documents);

//       let request_params = {
//           method : 'POST',
//           hostname : this.uri,
//           path : this.path,
//           headers : {
//               'Ocp-Apim-Subscription-Key' : this.accessKey,
//           }
//       };

//       let req = request (request_params, this.response_handler);
//     //   let req = this.https.request (request_params, this.response_handler);
//       req.write (body);
//       req.end ();
//   }

//   documents = { 'documents': [
//       { 'id': '1', 'text': 'This is a document written in English.' },
//       { 'id': '2', 'text': 'Este es un document escrito en Español.' },
//       { 'id': '3', 'text': '这是一个用中文写的文件' }
//   ]};

//   test2(){
//       this.get_language (this.documents);
//   }

// }
