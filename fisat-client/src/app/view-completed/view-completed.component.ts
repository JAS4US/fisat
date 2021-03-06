
import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../data.service';
// import {   Inject, PLATFORM_ID, Injector } from '@angular/core';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { analyzeAndValidateNgModules } from '@angular/compiler';

@Component({
  selector: 'app-view-completed',
  templateUrl: './view-completed.component.html',
  styleUrls: ['./view-completed.component.scss']
})
export class ViewCompletedComponent implements OnInit {
  completedComplaints:any;
  closeResult: string;
  //openComplaints:any;

  @Input() lbl_complaintID;
  @Input() lbl_description;
  @Input() txt_remarks;
  @Input() lbl_errPath;
  @Input() lbl_remarks;
  @Input() lbl_completionDate;
  @Input() lbl_complaintDate;
  @Input() lbl_completionDateDiff;

  userSession:any;

  remarks:any;
  completed_status:any;
  r:any;

  

  constructor(private dataService:DataService,private modalService: NgbModal) {}
//completedComplaints
  ngOnInit() {

    this.userSession=sessionStorage.getItem("username");
    console.log("Completed View session : "+this.userSession);

    

    this.dataService. getDataCompleted().subscribe(data=>{
    console.log("lllllllllllllll"+JSON.stringify(data));
    this.completedComplaints=data;
    })
  }


  openCompletedViewRemarks(content:any,user:any) {
  
    console.log("user in completed  : "+JSON.stringify(user));
    this.lbl_complaintID=user["complaintId"];
    this.lbl_description=user["description"];
    this.lbl_errPath=user["error_path"];

    this.dataService.loadRemarksOnComplete(this.lbl_complaintID).subscribe(data=>{
      console.log("getting remarks : "+JSON.stringify(data));
      
      this.txt_remarks=data[0]["remarks"];
      console.log("test : "+data[0]["remarks"]);
      
      return true;
    },
    error=>{
      console.log("Error");
      return false;
    })


   
     this.modalService.open(content, {ariaLabelledBy: 'modal-edit-title', size:'lg'}).result.then((result) => {
     
     console.log("inside fun");
     //this.modal=this.userData;
   
     }, (reason) => {
      
     });
   }


   openCompletedView(content:any,user:any) {
  
    console.log("user in completed  : "+JSON.stringify(user));
    this.lbl_complaintID=user["complaintId"];
    this.lbl_description=user["description"];
    this.lbl_errPath=user["error_path"];
    this.lbl_remarks=user["remarks"];
    this.lbl_complaintDate=user["complaintDate"];
    
    this.dataService.loadComplaintsAfterAdminStatus_Complete(this.lbl_complaintID).subscribe(data=>{
      console.log("getting complete : "+JSON.stringify(data));
      
      this.lbl_completionDate=data;
      console.log("test : "+data);
      
      return true;
    },
    error=>{
      console.log("Error");
      return false;
    })

    ////////FINDING THE DATE DIFFERENCE/////////////////////////////////////////
    this.dataService.dateDifference(this.lbl_complaintID).subscribe(data=>{
     
      
      console.log("test date diff : "+JSON.stringify(data));
      this.lbl_completionDateDiff=JSON.stringify(data[0]["datedifference"]);

      return true;
    },
    error=>{
      console.log("Error");
      return false;
    })
     
     
     this.modalService.open(content, {ariaLabelledBy: 'modal-edit-title', size:'lg'}).result.then((result) => {
     
     
     //this.modal=this.userData;
    
     }, (reason) => {
      
     });
   }

   onRemarkSubmit(e){
     this.remarks={
      "compid":this.lbl_complaintID,
      "remarks":e.target[3].value
     };
     console.log("remarks : "+JSON.stringify(this.remarks));
     this.dataService.onInsertRemark(this.remarks).subscribe(data=>{
      
      
      return true;
     },
     error=>{
      console.error("Error");
      return false;
     })
     this.txt_remarks="";
     this.modalService.dismissAll();
     location.reload();
     
   }

   onCompleteComplaint(){
     this.r=this.txt_remarks;
     if(this.r==""){
       this.completed_status={
        "compid":this.lbl_complaintID,
        "remarks":null,
        "adm_status":"Completed"
       };
     }
     else if(this.r!=""){
       this.completed_status={
        "compid":this.lbl_complaintID,
        "remarks":this.txt_remarks,
        "adm_status":"Completed"
       };
     }
     console.log("inside complete : "+JSON.stringify(this.completed_status));
     this.dataService.onCompleteStatusUpdate(this.completed_status).subscribe(data=>{
        return true;
        },
      error=>{
      console.error("Error");
      return false;
      })
      this.txt_remarks="";
      
      this.modalService.dismissAll();
      location.reload();
      
   }


  close(user:any) {
    console.log("user"+user.complaintId);
    this.completedComplaints = this.completedComplaints.filter((obj: { complaintId: any; }) => obj.complaintId !== user.complaintId);
    this.dataService.onUpdateCloseStatus(user.complaintId).subscribe(data=>{
    if(!data){
      console.log("Not Deleted");
    }
    else{
      console.log("Closed"+data);
           this.completedComplaints = this.completedComplaints.filter((obj: { complaintId: any; }) => obj.complaintId !== user.complaintId);
        }
    }) 
    
   
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

}
