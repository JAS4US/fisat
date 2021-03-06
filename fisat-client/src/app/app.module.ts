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
import { FormsModule,ReactiveFormsModule } from "@angular/forms";
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { TestingItemsComponent } from './testing-items/testing-items.component';
import { MatTabsModule } from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ViewCompletedComponent } from './view-completed/view-completed.component';
import { UnitTestComponent } from './unit-test/unit-test.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
//import { ConfirmationDialogService } from './confirmation-dialog/confirmation-dialog.service';
import {TabModule} from 'angular-tabs-component';
import { ViewclosedComponent } from './viewclosed/viewclosed.component';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { UserViewComponent } from './user-view/user-view.component';
import { UserRegisterComponent } from './user-register/user-register.component';
import { UserFeedbackComponent } from './user-feedback/user-feedback.component';
import { FilterdataPipe } from './filterdata.pipe';
import { FilterdataModPipe } from './filterdata-mod.pipe';
import { FiltermodPipe } from './filtermod.pipe';
import { FilterstatusPipe } from './filterstatus.pipe';
import { TestComponent } from './test/test.component';




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
    UserRegisterComponent,
    UserFeedbackComponent,
    FilterdataPipe,
    FilterdataModPipe,
    FiltermodPipe,
    FilterstatusPipe,
    TestComponent
  ],

  imports: [BrowserModule,
     AppRoutingModule, 
     UiModule,
     HttpClientModule,
     FormsModule,
     ReactiveFormsModule,
     FontAwesomeModule,
     MatTabsModule,
     BrowserAnimationsModule,
     NgbModule.forRoot(),
     TabModule,
     BootstrapModalModule
     
    //  NgSelectModule
  
     
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
