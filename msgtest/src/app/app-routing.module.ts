import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Mailtest1Component } from './mailtest1/mailtest1.component';
import { ImguploadtestComponent } from './imguploadtest/imguploadtest.component';

const routes: Routes = [
  {
    path: "testMail",
    component: Mailtest1Component
  },
  {
    path:"imgUpload",
    component:ImguploadtestComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
