import { Component, OnInit, Input } from "@angular/core";
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


  @Input() txt_uname;
  @Input() txt_passwrd;

  i:any;
  f:any;
  constructor(private router: Router,private dataService:DataService) {}
uname:any;
  pwd:any;
  userData:any;
  userDetails:Array<String>;
  ngOnInit() {}

  

  //onSubmit(e) {
  onLogin(e){
    console.log("hello");
    this.uname=e.target[0].value;
    this.uname=this.uname.toUpperCase();
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
      console.log("success "+JSON.stringify(data));
      // sessionStorage.setItem("username",data["staffName"]);
      // sessionStorage.setItem("personalId",data["personalId"]);
      sessionStorage.setItem("staffName",data["staffName"]);
      sessionStorage.setItem("username",data["personalId"]);
      //console.log("data : "+JSON.stringify(data));
      if(this.uname=="EMP59"){
        this.router.navigateByUrl('/test');
      }
     else
     {
          this.router.navigateByUrl('/userview');
        }
       
      })


  }
}
