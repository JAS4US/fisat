
import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../data.service';
import { NgForm } from '@angular/forms';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { pureFunction1 } from '@angular/core/src/render3';
import { formArrayNameProvider } from '@angular/forms/src/directives/reactive_directives/form_group_name';
@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss']
})
export class UserRegisterComponent implements OnInit {
  modul:any;
  complaint:any;
  comp_details : any;
  comp_others:any;

  prompVal:any;
  newVal:any;

  @Input() selectedValue;
  @Input() selectedValue_comp;
  @Input() txt_description;
  @Input() txt_error;
  @Input() txt_others;
  @Input() lbl_others;
  
  
  constructor(private dataService:DataService) { }

  ngOnInit() {

    this.dataService.getMasterModule().subscribe(data=>{
      console.log("mod : "+JSON.stringify(data));
      //console.log(txteg);
      this.modul=data;

    })

    this.dataService.getMasterComplaint().subscribe(data=>{
      console.log("comp : "+JSON.stringify(data));
      //console.log(txteg);
      this.complaint=data;

    })
  }

  public onChange(event): void {  // event will give you full breif of action
    this.newVal = event.target.value;
    console.log(this.newVal);
    this.dataService.getOtherComplaintData().subscribe(data=>{
      // console.log("comp others : "+JSON.stringify(data));
      this.comp_others=data;
      // console.log("comp others : "+JSON.stringify(this.comp_others));
    }

    )

  }

  onRegisterSubmit(e){
     console.log("inside event fun"+e.target.value);
    
     this.comp_details={
          "module_type":e.target[0].value,
          "complaint_type":e.target[1].value,
          "description":e.target[2].value,
          "error_path":e.target[3].value,
          "other_Complaints":e.target[4].value
        };

console.log(this.comp_details);
     
  }



  //new register



}