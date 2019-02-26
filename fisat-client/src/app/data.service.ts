import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
dat:any;
  constructor(private httpClient:HttpClient) { }

  getOpenComplaint()
  {
    return this.httpClient.get('http://127.0.0.1:3000/openComplaint');
  }

  getAllComplaints()
  {
    return this.httpClient.get('http://127.0.0.1:3000/openComplaintUserView');
  }

  getDataCompleted()
  {
    return this.httpClient.get('http://127.0.0.1:3000/completedComplaint');
  }

  deleteSingleData(id){
    console.log("deleting dataservice==="+id);
    return this.httpClient.delete(`http://127.0.0.1:3000/deleteSingleData${id}`)
  }

  getMasterModule()
  {
   // return this.httpClient.get("http://127.0.0.1:3000/modulelist",{headers:httpOptions});
    return this.httpClient.get("http://127.0.0.1:3000/masterModulelist");
  }
  getMasterComplaint()
  {
    return this.httpClient.get("http://127.0.0.1:3000/masterComplaintlist");
  }

  onInsertComplaint(complaint:any)
  {
console.log(complaint);
return this.httpClient.post('http://127.0.0.1:3000/tsInsertComplaint',complaint);
  }

  onUpdateComplaint(complaint:any)
  {
console.log("test======-===="+complaint);
return this.httpClient.post('http://127.0.0.1:3000/tsUpdateComplaint',complaint);
  }
  
  onUpdateCloseStatus(id:any)
  {
    console.log("closing dataservice==="+id);
    var data={"compId":id};
    return this.httpClient.post('http://127.0.0.1:3000/testUpdate',data);

  }
  getClosedComplaint()
  {
    return this.httpClient.get('http://127.0.0.1:3000/closedComplaint');
  }

  getOtherComplaintData()
  {
    return this.httpClient.get('http://127.0.0.1:3000/getOtherComplaint');
  }
  othersInEdit(comptype:any)
  {
    return this.httpClient.get('http://127.0.0.1:3000/othersInEdit1');
  }
  getOthersCountInEdit(comptype:string){
    return this.httpClient.get(`http://127.0.0.1:3000/getOthersCountInEdit1${comptype}`);
  }
  onFeedbackService(com:any){
    
      console.log("haibbbbbbbbbbbbblllll"+com);
     return this.httpClient.post('http://127.0.0.1:3000/insertfeedback',com);
    
  }
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
  onInsertRemark(rem:any){
    // console.log("remarks service :"+JSON.stringify(rem));
    return this.httpClient.post('http://127.0.0.1:3000/insertRemarks',rem);
  }
  onCompleteStatusUpdate(comp:any){
    console.log("inside service : "+JSON.stringify(comp));
    return this.httpClient.post('http://127.0.0.1:3000/changeAdminStatus',comp);
  }
  loadRemarksOnComplete(compId:string){
    return this.httpClient.get(`http://127.0.0.1:3000/onLoadRemarks${compId}`);
  }
  loadComplaintsAfterAdminStatus_Complete(compId:string){
    return this.httpClient.get(`http://127.0.0.1:3000/ComplaintAfterAdminUpdateStatus_Complete${compId}`)
  }
  dateDifference(compId:string){
    return this.httpClient.get(`http://127.0.0.1:3000/getDateDiff${compId}`)
  }
=======

  updateProcessStatus(com:any){
    console.log("update process==="+com);
    return this.httpClient.post('http://127.0.0.1:3000/onProceed',com);
  }

>>>>>>> 55498830124d2feed55aeb7d0f1e1903c17699f8
 
=======

>>>>>>> 4d2e91a84e65bea59928b750222b829b6f3c7fad
=======
>>>>>>> 46da77e8ff9db1dcb6cae997ca0d107de4ca5315

}
