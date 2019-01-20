import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { ViewComponent } from "./view/view.component";
import { ReopenComponent } from "./reopen/reopen.component";
import { TestingItemsComponent } from "./testing-items/testing-items.component";
import { ViewCompletedComponent } from "./view-completed/view-completed.component";
import { UnitTestComponent } from "./unit-test/unit-test.component";
import { UserViewComponent } from "./user-view/user-view.component";
import { UserRegisterComponent } from "./user-register/user-register.component";




const routes: Routes = [
  {
    path: "",
    redirectTo: "/login",
    pathMatch: "full"
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "register",
    component: UserRegisterComponent
  },
  {
    path: "view",
    component: ViewComponent
  },
  {
    path:"reopen",
    component: ReopenComponent

  },
  {
    path:"test",
    component:TestingItemsComponent
  },
  {path:"completed-view",
  component:ViewCompletedComponent
},
{
  path:"unittest",
  component:UnitTestComponent
},
{
  path:"userview",
  component:UserViewComponent
},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
