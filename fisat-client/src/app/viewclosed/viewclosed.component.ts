import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-viewclosed',
  templateUrl: './viewclosed.component.html',
  styleUrls: ['./viewclosed.component.scss']
})
export class ViewclosedComponent implements OnInit {
  closedComp:any;


  constructor(private dataService:DataService,private modalService: NgbModal) { }

  ngOnInit() {

    this.dataService.getClosedComplaint().subscribe(data=>{
      console.log("closed  : "+this.closedComp);
      this.closedComp=data;
    })
      
  }
}
