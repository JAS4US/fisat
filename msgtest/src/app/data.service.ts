import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private httpClient:HttpClient) { }

  getMailMessage(msgDetails:any){
    console.log("inside service msgDetails : "+JSON.stringify(msgDetails));
    return this.httpClient.post('http://127.0.0.1:3000/sendMessageDemo',msgDetails);
  }
  uploadImg(img:any){
    console.log("in service : "+JSON.stringify(img));
    return this.httpClient.post('http://127.0.0.1:3000/sendImageDemo',img);
  }
}
