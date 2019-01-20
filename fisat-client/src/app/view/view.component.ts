import { Component, OnInit, ɵConsole } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
openComplaints:any;
  constructor(private dataService:DataService) { }

  ngOnInit() {
    this.dataService.getOpenComplaint().subscribe(data=>{
      console.log("data--"+data);
this.openComplaints=data;

    })
  }

  onDelete(user:any){
    console.log("user"+user.complaintId);
    
    this.dataService.deleteSingleData(user.complaintId).subscribe(data => {
     
    if(!data){
      console.log("Not Deleted");
    }
    else{
           this.openComplaints = this.openComplaints.filter(obj => obj.complaintId !== user.complaintId);
        }
        return true;
    }) 
    

    
  }

}
