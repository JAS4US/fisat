import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { DataService } from '../data.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import {NgbPaginationConfig} from '@ng-bootstrap/ng-bootstrap';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.scss']
})
export class UserViewComponent implements OnInit {
//REGISTER
page = 3;
  isDisabled = true;
modul:any;
complaint:any;
complaints1:any;
comp_details : any;
comp_others:any;
prompVal:any;
newVal:any;

newVal2_module:any;
// newVal2_complaint:any;

modalReference: any;
userData :any ;
mod:any;
User:any;
testResult:any;
complaintOthers:any;
complaintNo:any;
i:any;
comptype:any;
otherCount:any;
confirmhidden:any;

regForm:any;

divVisible:boolean;
divVisibleOthers:boolean;
updtBtn:boolean;
spanModule:boolean;
spanComplaint:boolean;
reg_comp:boolean;
reg_mod:boolean;


@Input() selectedValue;
@Input() selectedValue_comp;
@Input() txt_description;
@Input() txt_error;
@Input() txt_others;
@Input() lbl_others;
@Input() txt_module;
//@Input() txt_description;
@Input() txt_complaint;
@Input() fdbktext;
@ViewChild('encasUnPwModal') public modal: BootstrapModalModule;

//register


  complaints:any;
  constructor(private dataService:DataService,private modalService: NgbModal,config: NgbPaginationConfig) { config.size = 'sm';
  config.boundaryLinks = true;}

  ngOnInit() {

   ///////////////Showing & hiding error message for module Type/////////////////////
    this.newVal2_module="Select Module Type";
    this.modCheck();
   ///////////////Showing & hiding error message for module Type/////////////////////

   ///////////////Showing & hiding error message for complaint Type/////////////////////
   this.newVal="Select Complaint Type";
   this.compCheck();
  ///////////////Showing & hiding error message for complaint Type/////////////////////

    this.dataService.getOpenComplaint().subscribe(data=>{
      console.log("data--"+data);
this.complaints=data;


    })

    this.dataService.getAllComplaints().subscribe(data=>{
      
      console.log("data get--"+JSON.stringify(data));
      console.log("length datatatata : "+Object.keys(data).length);
      
      this.complaints1=data;
      console.log("admin status : "+this.complaints1['adm_status']);
    })
//register starts..........
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
//register ends..........
  }


/**regsiter starts */

 ///////////////Showing & hiding error message for Complaint Type/////////////////////
public onChange(event): void {  // event will give you full breif of action
  this.reg_comp=true;
  this.newVal = event.target.value;
  this.selectedValue_comp=this.newVal;
  console.log("llllllllllllll"+this.newVal);

  if(this.newVal=="Select Complaint Type")
  {
    this.spanComplaint=true;
  }
  else{
    this.spanComplaint=false;
  }

  this.dataService.getOtherComplaintData().subscribe(data=>{
     console.log("comp others lllllllllllll: "+JSON.stringify(data));
    this.comp_others=data;
   
  }

  )
}
public compCheck():void{
  console.log("comp check : "+this.newVal);
  if(this.newVal=="Select Complaint Type")
  {
    this.spanComplaint=true;
    
  }
  else{
    this.spanComplaint=false;
    
  }
}
 ///////////////Showing & hiding error message for Complaint Type/////////////////////

 ///////////////Showing & hiding error message for module Type/////////////////////
public onChange1(event):void{
  this.reg_mod=true;
  this.newVal2_module=event.target.value;
  console.log("inchange  : "+this.newVal2_module);
  // console.log("inside onchange : "+this.modCheck());
  //return this.newVal2_module;
  if(this.newVal2_module=="Select Module Type")
  {
    this.spanModule=true;
    //return true;
  }
  else{
    this.spanModule=false;
    //return false;
  }
}
public modCheck():void{
  console.log("mod check : "+this.newVal2_module);
  if(this.newVal2_module=="Select Module Type")
  {
    this.spanModule=true;
    
  }
  else{
    this.spanModule=false;
    
  }
}
 ///////////////Showing & hiding error message for module Type/////////////////////


public onEditModChange(e):void{
  console.log(e.target.value)
  this.txt_module=e.target.value;
}
onEditCompChange(e){
  this.txt_complaint=e.target.value;
}

open(content) {
  
   this.modalService.open(content, {ariaLabelledBy: 'modal-register-title', size:'lg'}).result.then((result) => {
   
  }, (reason) => {
   
  });
}


openFeedback(contentfeedback:any,user:any) {
  this.complaintNo=user["complaintId"];
   this.modalService.open(contentfeedback, {ariaLabelledBy: 'modal-feedback-title', size:'lg'}).result.then((result) => {
   
   console.log("inside fun");
   //this.modal=this.userData;
   this.txt_complaint=JSON.stringify(user);
   }, (reason) => {
    
   });
 }






openEdit(contentEdit:any,user:any) {
  
  console.log("user : "+JSON.stringify(user));
  this.complaintNo=user["complaintId"];
 //  this.userData=JSON.stringify(contentEdit);
 //  console.log("userData==="+this.userData);
 this.txt_module=user["module_type"];
 this.txt_complaint=user["complaint_type"];
 this.txt_description=user["description"];
 this.txt_error=user["error_path"];
 
 this.comptype=user["complaint_type"];
 this.dataService.getOthersCountInEdit(this.comptype).subscribe(data=>{
   this.otherCount=data;
   console.log("other count : "+JSON.stringify(this.otherCount));
   if(parseInt(JSON.stringify(this.otherCount))>0)
   {
     //console.log("othersssss");
     this.divVisible=false;
     this.divVisibleOthers=true;
     this.dataService.othersInEdit(this.comptype).subscribe(data=>{
     this.complaintOthers=data;
     //console.log("after others : "+JSON.stringify(this.complaintOthers));
     return true;
   },
   error=>{
     //console.error("Error");
     return false;
   })
 }
 else{
     //console.log("elseeeeeee others");
     this.divVisible=true;
     this.divVisibleOthers=false;
    //  this.dataService.getAllComplaints().subscribe(data=>{
    //  //console.log("data--"+JSON.stringify(data));
    //  this.complaints=data;
    //  })
   
   }
   return true;
 },
 error=>{
   console.log("Error");
   return false;
 })
 
 
   this.modalService.open(contentEdit, {ariaLabelledBy: 'modal-edit-title', size:'lg'}).result.then((result) => {
   
   console.log("inside fun");
   //this.modal=this.userData;
   this.txt_complaint=this.userData["complaint_type"];
   }, (reason) => {
    
   });
 }



 public decline() {
  this.modalService.dismissAll();
}

public accept() {
console.log("dddddddddddddddddd=="+this.confirmhidden);
  this.dataService.deleteSingleData(this.confirmhidden).subscribe(data => {
     
    if(!data){
      console.log("Not Deleted");
    }    
    else{
      
           this.complaints1 = this.complaints1.filter(obj => obj.complaintId !== this.confirmhidden);
           
        
        }
        return true;
    })
  this.modalService.dismissAll();
}

public dismiss() {
  this.modalService.dismissAll();
}



onRegisterSubmit(e){
  console.log("selectedValue_comp-----------"+this.selectedValue_comp);
 
  this.comp_details={
       "module_type":e.target[0].value,
       "complaint_type":e.target[1].value,
       "description":e.target[2].value,
       "error_path":e.target[3].value,
       "other_Complaints":e.target[4].value
     };

console.log("sdfsdfg"+JSON.stringify(this.comp_details));
  //this.dataService.onSubmit1(this.comp_details).subscribe()
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
 this.modalService.dismissAll();
 location.reload();
}


/**register ends */

/*Update....*/

onUpdateSubmit(e){
console.log("secomplaint ID===-vxsdvgdfgfhgdefhf---"+this.User);
 
  this.comp_details={
      "complaintId":this.complaintNo,
       "module_type":e.target[1].value,
       "complaint_type":e.target[3].value,
       "description":e.target[4].value,
       "error_path":e.target[5].value,
       "other_Complaints":e.target[6].value
     };

//console.log("sdfsdfg******777777777**"+JSON.stringify(this.comp_details));
  //this.dataService.onSubmit1(this.comp_details).subscribe()
   this.dataService.onUpdateComplaint(this.comp_details).subscribe(data=>{
    return true;
    },
    error=>{
     console.error("Error");
     return false;
    }
   
  )
   alert(" Updated Successfully");
 
 this.modalService.dismissAll();
 location.reload();
}


//   onDeleteRow(contentConfirm,user:any){
//     alert("sfsf");
//     console.log("user=="+user.complaintId);
//     this.confirmhidden=user.complaintId;
//     this.modalService.open(contentConfirm, {ariaLabelledBy: 'modal-confirm-title', size:'sm'}).result.then((result) => {
//       this.confirmhidden=user;
//       console.log("inside fun");
    
//     })

// })
//   };

onDeleteRow(contentConfirm,user:any){
  alert("dsdsdf");
  console.log("user === "+user.complaintId);
  this.confirmhidden=user.complaintId;
  this.modalService.open(contentConfirm,{ariaLabelledBy:'modal-confirm-title',size:'sm'}).result.then((result)=>{
    this.confirmhidden=user;
    console.log("inside fun");
  })
};
///FEED BACK

onFeedback(e){
  // console.log("secomplaint ID===-vxsdvgdfgfhgdefhf---"+this.User);
    console.log("jjjjjj  :  "+this.complaintNo);
     this.comp_details={
         "complaintId":this.complaintNo,
          "personalid":"p2",
          "comments":e.target[0].value
          
        };
   
   console.log("sdfsdfg******777777777**"+JSON.stringify(this.comp_details));
    //  this.dataService.onSubmit1(this.comp_details).subscribe()
      this.dataService.onFeedbackService(this.comp_details).subscribe(data=>{
        alert(" thank u for feedback");
       return true;
       },
       error=>{
        console.error("Error");
        return false;
       }
      
     )
      alert(" thank u for feedback");
    
    this.modalService.dismissAll();
    location.reload();
   }
 
 
 
 //FEEDBACK ENDSS


 public actionDisplay(){
  //  console.log("actionnnnnn : "+JSON.stringify(this.complaints1[""]));
   return true;
 }

public onKeyPress(e)
{
  console.log("pressed success");
  this.updtBtn=true;
}
public getbtnUpdate(){
  if(this.updtBtn==true){
    return false;
  }
  else{
    
    return true;
  }
}


///////Enabling the Register button after selecting the module type and complaint type////////////////////
public getbtnRegister(){
  
    if( (this.reg_comp==true && this.newVal!="Select Complaint Type") &&
        (this.reg_mod==true && this.newVal2_module!="Select Module Type")
      )
  {
        return false;

  }
  else{
    return true;
  }
}
///////Enabling the Register button after selecting the module type and complaint type////////////////////


}
