import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-mailtest1',
  templateUrl: './mailtest1.component.html',
  styleUrls: ['./mailtest1.component.scss']
})
export class Mailtest1Component implements OnInit {

  @Input() txt_uname;
  @Input() txt_sub;
  @Input() txt_msg;

  msgDetails:any;

  constructor(private dataService:DataService) { }

  ngOnInit() {

  }

  onMailSubmit(){
    console.log("Username : "+this.txt_uname);
    console.log("Subject : "+this.txt_sub);
    console.log("Message : "+this.txt_msg);
    this.msgDetails={
      "uname":this.txt_uname,
      "subject":this.txt_sub,
      "message":this.txt_msg
    };
    console.log("in ts msgDetails : "+JSON.stringify(this.msgDetails));
    this.dataService.getMailMessage(this.msgDetails).subscribe(data=>{

      console.log("msgDetails inside function getMailMessage  : "+JSON.stringify(data));
      return true;
    },
    error=>{
      console.log("Error");
      return false;
    })
  }

  

}
