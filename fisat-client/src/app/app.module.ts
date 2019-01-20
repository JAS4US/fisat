import { BrowserModule } from "@angular/platform-browser";
import { NgModule  } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { RegisterComponent } from "./register/register.component";
import { LoginComponent } from "./login/login.component";
import { ViewComponent } from "./view/view.component";
import { UiModule } from "./ui/ui.module";
import { HttpClientModule } from "@angular/common/http";
import { ReopenComponent } from './reopen/reopen.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from "@angular/forms";
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { TestingItemsComponent } from './testing-items/testing-items.component';
import { MatTabsModule } from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ViewCompletedComponent } from './view-completed/view-completed.component';
import { UnitTestComponent } from './unit-test/unit-test.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {TabModule} from 'angular-tabs-component';
import { ViewclosedComponent } from './viewclosed/viewclosed.component';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { UserViewComponent } from './user-view/user-view.component';
import { UserRegisterComponent } from './user-register/user-register.component';


library.add(faCoffee);


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    ViewComponent,
    ReopenComponent,
    TestingItemsComponent,
    ViewCompletedComponent,
    UnitTestComponent,
    ViewclosedComponent,
    UserViewComponent,
    UserRegisterComponent
  ],

  imports: [BrowserModule,
     AppRoutingModule, 
     UiModule,
     HttpClientModule,
     FormsModule,
     FontAwesomeModule,
     MatTabsModule,
     BrowserAnimationsModule,
     NgbModule.forRoot(),
     TabModule,
     BootstrapModalModule
    //  ,
    //  NgSelectModule
  
     
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
