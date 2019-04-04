import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Variable } from "@angular/compiler/src/render3/r3_ast";
import { DataService } from '../data.service';
import { ArrayType } from "@angular/compiler";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  constructor(private router: Router,private dataService:DataService) {}
  uname:String;
  pwd:String;
  userData:any;
  userDetails:Array<String>;
  ngOnInit() {}

  onSubmit(e) {
    console.log("hello");
    this.uname=e.target[0].value;
    this.pwd=e.target[1].value;
    this.userData={
                "userName":this.uname,
                "password":this.pwd  
              }

    this.userDetails=[this.uname,this.pwd];

    console.log("hello"+this.userDetails);
    //this.router.navigate(["view"]);
    this.dataService.onLogin(this.userData).subscribe(data=>{
    // this.dataService.onLogin(this.userDetails).subscribe(data=>{
      console.log("success");
      //this.completedComplaints=data;
      console.log("data : "+JSON.stringify(data));
      })

  }
}
