import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { DataService } from '../data.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import {NgbPaginationConfig} from '@ng-bootstrap/ng-bootstrap';
import { analyzeAndValidateNgModules } from '@angular/compiler';

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
comp_details : any;
comp_others:any;
prompVal:any;
newVal:any;
modalReference: any;
userData :any ;
mod:any;
User:any;
testResult:any;
complaintOthers:any;
complaintNo:any;
divVisible:boolean;
divVisibleOthers:boolean;
updtBtn:boolean;
i:any;
comptype:any;
otherCount:any;

@Input() selectedValue;
@Input() selectedValue_comp;
@Input() txt_description;
@Input() txt_error;
@Input() txt_others;
@Input() lbl_others;
@Input() txt_module;
//@Input() txt_description;
@Input() txt_complaint;

@ViewChild('encasUnPwModal') public modal: BootstrapModalModule;

//register


  complaints:any;
  constructor(private dataService:DataService,private modalService: NgbModal,config: NgbPaginationConfig) { config.size = 'sm';
  config.boundaryLinks = true;}

  ngOnInit() {
    this.dataService.getOpenComplaint().subscribe(data=>{
      console.log("data--"+data);
this.complaints=data;


    })

    this.dataService.getAllComplaints().subscribe(data=>{
      
      console.log("data--"+JSON.stringify(data));
      console.log("length datatatata : "+Object.keys(data).length);
      this.complaints=data;
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
public onChange(event): void {  // event will give you full breif of action
  this.newVal = event.target.value;
  this.selectedValue_comp=this.newVal
  console.log("llllllllllllll"+this.newVal);
  this.dataService.getOtherComplaintData().subscribe(data=>{
     console.log("comp others lllllllllllll: "+JSON.stringify(data));
    this.comp_others=data;
   
  }

  )

}


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
     this.dataService.getAllComplaints().subscribe(data=>{
     //console.log("data--"+JSON.stringify(data));
     this.complaints=data;
     })
   
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


  onDeleteRow(user:any){
    console.log("user"+user.complaintId);
    
    this.dataService.deleteSingleData(user.complaintId).subscribe(data => {
     
    if(!data){
      console.log("Not Deleted");
    }    
    else{
           this.complaints = this.complaints.filter(obj => obj.complaintId !== user.complaintId);
        }
        return true;
    })

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


}
