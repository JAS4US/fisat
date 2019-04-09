import { Component, OnInit,Input } from '@angular/core';
import { DataService } from '../data.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
  @Input() title;
  @Input() txt_Module;
  @Input() txt_Complaint;
  @Input() txt_Description;
  @Input() txt_path;
  @Input() lbl_complaintDate;
  
  lblComplaintId:any;
  openComplaints:any;
  userData:any;
  data:any;
  userNameSession:any;
  constructor(private dataService:DataService,private modalService: NgbModal) { }

  ngOnInit() {
    this.userNameSession=sessionStorage.getItem("username");
//     this.dataService.getOpenComplaint(this.userNameSession).subscribe(data=>{
//       console.log("data--===hhhhhhhhhhhhhh====%%%%"+JSON.stringify(data));
//       this.openComplaints=data;

//     })

this.dataService.getOpenComplaintAdmin().subscribe(data=>{
  console.log("data--===hhhhhhhhhhhhhh====%%%%"+JSON.stringify(data));
this.openComplaints=data;

})
  }

 
    

  onView(contentView,user:any){
    //console.log("user=="+JSON.stringify(user);
    this.userData=JSON.stringify(user);
    console.log(this.userData["module_type"]);
    //this.txt_View=user.complaintId;
    this.title=user.complaintId;
    this.txt_Module=user["module_type"];;
    this.txt_Complaint=user["complaint_type"];
    this.txt_Description=user["description"];
    this.txt_path=user["error_path"];
    this.lbl_complaintDate=user["complaintDate"];
    this.modalService.open(contentView, {ariaLabelledBy: 'modal-confirm-title', size:'lg'}).result.then((result) => {
      
      console.log("inside fun");
    
    })

  }

  onProceed(e){
    alert("On process...");
    //this.dataService.updateProcessStatus(complaintId)
    this.data={
      "complaintId":this.title
    };
console.log("Onproceed-----"+this.data);
    this.dataService.updateProcessStatus(this.data).subscribe(data=>{
      return true;
      },
      error=>{
       console.error("Error "+error);
       return false;
      }
     
    )
    
    this.modalService.dismissAll();
    location.reload();
  }

    
  }


