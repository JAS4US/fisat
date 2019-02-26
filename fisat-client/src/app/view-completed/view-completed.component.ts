import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
// import {   Inject, PLATFORM_ID, Injector } from '@angular/core';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-view-completed',
  templateUrl: './view-completed.component.html',
  styleUrls: ['./view-completed.component.scss']
})
export class ViewCompletedComponent implements OnInit {
  completedComplaints:any;
  closeResult: string;
  //openComplaints:any;
  constructor(private dataService:DataService,private modalService: NgbModal) {}
//completedComplaints
  ngOnInit() {
    
    this.dataService. getDataCompleted().subscribe(data=>{
      console.log(data);
this.completedComplaints=data;

    })
  }

  open(content,user:any) {
    console.log("USER="+JSON.stringify(user));
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title',size:'lg'}).result.then((result) => {
      
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
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
