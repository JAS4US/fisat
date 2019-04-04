import { Component, OnInit, Input } from "@angular/core";
import { Router } from "@angular/router";
import { DataService } from "../data.service";

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
  }
}
