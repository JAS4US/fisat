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
uname:String;
  pwd:String;
  userData:any;
  userDetails:Array<String>;
  ngOnInit() {}

  // onSubmit() {
  //   console.log("hello");
  //   this.router.navigate(["view"]);
  // }

  onLogin(){
    this.f=0
    this.dataService.getOnLogin().subscribe(data=>{
      console.log("Length : "+Object.keys(data).length);
      for(this.i=0;this.i<Object.keys(data).length;this.i++)
      {
        if((data[this.i]["employeecode"]==this.txt_uname) && (data[this.i]["password"]==this.txt_passwrd)){
          //sessionStorage.setItem("username",this.txt_uname);
          sessionStorage.setItem("username",this.txt_uname);
          this.f=0;
          
          if(this.txt_uname=="admin"){
            this.router.navigateByUrl('/test');
            break;
          }
          else{
            this.router.navigateByUrl('/userview');
            break;
          }
        }
        else{
          this.f=1;
        }
      }
      if(this.f==1){
        //location.reload();
      }
      return true;
      },
    error=>{
    console.error("Error : "+error);
    return false;
    })


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
      console.log("success"+data);
      
      console.log("data : "+JSON.stringify(data));
      })


  }
}
