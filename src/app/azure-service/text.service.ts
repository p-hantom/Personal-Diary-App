import { Injectable } from "@angular/core"
import { Config } from "../azure-service/config"
import { Http, Headers } from "@angular/http";
import { catchError, map, tap } from "rxjs/operators";

@Injectable()
export class TextService{
    documents = { 'documents': [
        { 'id': '1', 'text': 'This is a document written in English.' },
        { 'id': '2', 'text': 'Este es un document escrito en Español.' },
        { 'id': '3', 'text': '这是一个用中文写的文件' }
    ]};
    
    constructor( private http: Http) {
    }
    getLan() {
        console.log(JSON.stringify(this.documents))
        return this.http.post(
            Config.apiUrl + Config.lanPath,
            JSON.stringify(this.documents),
            { headers: this.getCommonHeaders() }
        )        
        .pipe(
            map(res => res.json()),
            map(data => {
                let dataList = [];
                data.documents.forEach((item) => {
                    dataList.push(item.id);
                });
                return dataList;
            })
        );
    }

    getSentiment(documents) {
        console.log(JSON.stringify(documents))
        return this.http.post(
            Config.apiUrl + Config.sentimentPath,
            JSON.stringify(documents),
            { headers: this.getCommonHeaders() }
        )        
        .pipe(
            map(res => res.json()),
            map(data => {
                let dataList = [];
                data.documents.forEach((item) => {
                    if(item.score<=0.1){
                        item.score=1;  //very negative
                    }
                    else if(item.score>0.1 && item.score<=0.4){
                        item.score=2;  //a little negative
                    }
                    else if(item.score>0.4 && item.score<=0.6){
                        item.score=3;  //neutral
                    }
                    else if(item.score>0.6 && item.score<=0.9){
                        item.score=4;  //positive
                    }
                    else if(item.score>0.9 && item.score<=1){
                        item.score=5;  //very positive
                    }
                    dataList.push(item.score);
                });
                return dataList;
            })
        );
    }

    getKeyPhrases(documents) {
        console.log(JSON.stringify(documents))
        return this.http.post(
            Config.apiUrl + Config.keyPhrasesPath,
            JSON.stringify(documents),
            { headers: this.getCommonHeaders() }
        )        
        .pipe(
            map(res => res.json()),
            map(data => {
                let dataList = [];
                
                data.documents.forEach((item) => {
                    let concatKeyPhrases: string = '';
                    item.keyPhrases.forEach((keyPhrases) => {
                        concatKeyPhrases=concatKeyPhrases+keyPhrases+"/ ";
                    })
                    dataList.push(concatKeyPhrases);
                });
                return dataList;
            })
        );
    }

    getCommonHeaders() {
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Ocp-Apim-Subscription-Key", Config.accessKey);
        return headers;
    }
}
// import { Injectable, OnInit } from "@angular/core"
// import { Http, Headers, RequestOptions } from "@angular/http"

// @Injectable()
// export class TextService implements OnInit{
//     apiKey = '9962000b173c4d58986270a2c0e7f029'
//     url = 'https://southcentralus.api.cognitive.microsoft.com/text/analytics/v2.0/keyPhrases?'

//     constructor(private http: Http){
//     }

//     test(){
//         const headers = new Headers({
//             'Content-Type': 'application/json',
//             'Ocp-Apim-Subscription-Key': this.apiKey
//         });
//         const options = new RequestOptions({headers});

//         return this.http.post(this.url, {})
//     }


//     ngOnInit(){
//         this.test2();
//     }

//     https = require ('https');

// // **********************************************
// // *** Update or verify the following values. ***
// // **********************************************

// // Replace the accessKey string value with your valid access key.
//     accessKey = '9962000b173c4d58986270a2c0e7f029';

// // Replace or verify the region.

// // You must use the same region in your REST API call as you used to obtain your access keys.
// // For example, if you obtained your access keys from the westus region, replace 
// // "westcentralus" in the URI below with "westus".

// // NOTE: Free trial access keys are generated in the westcentralus region, so if you are using
// // a free trial access key, you should not need to change this region.
//     uri = 'southcentralus.api.cognitive.microsoft.com';
//     path = '/text/analytics/v2.0/languages';

//     response_handler = function (response) {
//         let body = '';
//         response.on ('data', function (d) {
//             body += d;
//         });
//         response.on ('end', function () {
//             let body_ = JSON.parse (body);
//             let body__ = JSON.stringify (body_, null, '  ');
//             console.log (body__);
//         });
//         response.on ('error', function (e) {
//             console.log ('Error: ' + e.message);
//         });
//     };

//     get_language = function (documents) {
//         let body = JSON.stringify (documents);

//         let request_params = {
//             method : 'POST',
//             hostname : this.uri,
//             path : this.path,
//             headers : {
//                 'Ocp-Apim-Subscription-Key' : this.accessKey,
//             }
//         };

//         let req = this.https.request (request_params, this.response_handler);
//         req.write (body);
//         req.end ();
//     }

//     documents = { 'documents': [
//         { 'id': '1', 'text': 'This is a document written in English.' },
//         { 'id': '2', 'text': 'Este es un document escrito en Español.' },
//         { 'id': '3', 'text': '这是一个用中文写的文件' }
//     ]};

//     test2(){
//         this.get_language (this.documents);
//     }

    


// }
