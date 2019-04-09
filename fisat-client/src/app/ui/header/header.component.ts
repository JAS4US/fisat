import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  userNameSession:any;
  userWelcome:boolean;
  logoutMenu:any;

  constructor() {
    this.userWelcome=false;
    this.logoutMenu=false;
   }

  ngOnInit() {

    this.userNameSession=sessionStorage.getItem("username");
    console.log("username header : "+this.userNameSession);
    if(this.userNameSession!=null){
      this.userWelcome=true;
      this.logoutMenu=true;
    }
    else{
      this.userWelcome=false;
      this.logoutMenu=false;
    }

  }
  onLogoutService(){
    console.log("logout!!!!");
    sessionStorage.removeItem("username");
  }

}
