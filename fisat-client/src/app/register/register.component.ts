import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../data.service';
import { NgForm } from '@angular/forms';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { pureFunction1 } from '@angular/core/src/render3';
import { formArrayNameProvider } from '@angular/forms/src/directives/reactive_directives/form_group_name';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})



export class RegisterComponent implements OnInit {
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

  onRegisterSubmit(complaint:any){
     console.log("inside fun");
     console.log("mod : "+this.selectedValue);
     console.log("comp : "+this.selectedValue_comp);
     console.log("desc : "+this.txt_description);
     console.log("error : "+this.txt_error);
     this.comp_details={
          "module_type":this.selectedValue,
          "complaint_type":this.selectedValue_comp,
          "description":this.txt_description,
          "error_path":this.txt_error,
          "other_Complaints":this.txt_others
        };


       // this.dataService.onSubmit1(this.comp_details).subscribe()
     this.dataService.onInsertComplaint(this.comp_details).subscribe(data=>{
       return true;
       },
       error=>{
        console.error("Error");
        return false;
       }
      
     )
     alert("Complaint registered Successfully");
     this.txt_description="";
     this.txt_error="";
     this.txt_others="";
     this.selectedValue="null";
     this.selectedValue_comp="null";
   
  }


}