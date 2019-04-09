import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
dat:any;
  constructor(private httpClient:HttpClient) { }

  getOpenComplaint(username:any)
  {
    //console.log("user service : "+username);
    // return this.httpClient.get('http://127.0.0.1:3000/openComplaint');
    return this.httpClient.get(`http://127.0.0.1:3000/openComplaint${username}`);
  }

  getAllComplaints(username:any)
  {
    return this.httpClient.get(`http://127.0.0.1:3000/ComplaintUserView${username}`);
    // return this.httpClient.get(`http://127.0.0.1:3000/openComplaintUserView${username}`);
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
      console.log("haibbbbbbbbbbbbblllll    "+JSON.stringify(com));
     return this.httpClient.post('http://127.0.0.1:3000/insertfeedback',com);
    
  }
  onFeedbackComplaintService(com:any){
    console.log();
    return this.httpClient.post('http://127.0.0.1:3000/feedbackComplaintProcess',com);

  }

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
    return this.httpClient.get(`http://127.0.0.1:3000/getDateDiff${compId}`);
  }


  updateProcessStatus(com:any){
    console.log("update process==="+com);
    return this.httpClient.post('http://127.0.0.1:3000/onProceed',com);
  }

  insertModule(mod:any)
  {
  console.log("dataservice "+JSON.stringify(mod));
  return this.httpClient.post('http://127.0.0.1:3000/onaddmoduleser',mod);
  }
  insertComplaint(comp:any)
  {
    console.log('hhhhhh');
    return this.httpClient.post('http://127.0.0.1:3000/onaddcomplser',comp)
  }
  onLogin(userData:any){
  //console.log("teststts"+JSON.stringify(userData));
  userData=JSON.stringify(userData);
    return this.httpClient.get(`http://127.0.0.1:3000/ldapLogin${userData}`);
  }

  getUnreadCount(){
    return this.httpClient.get('http://127.0.0.1:3000/unreadCount');
  }
  getProcessingCount(){
    return this.httpClient.get('http://127.0.0.1:3000/processingCount');
  }
  getCompletedCount(){
    return this.httpClient.get('http://127.0.0.1:3000/completeCount');
  }
  getClosedCount(){
    return this.httpClient.get('http://127.0.0.1:3000/closedCount');
  }

  getOpenComplaintAdmin(){
    return this.httpClient.get('http://127.0.0.1:3000/complaintOpen_Admin');
  }

  gettingTheAdmin_StaffStatusUpdatedForClose(){
    console.log("inside service gettingTheAdmin_StaffStatusUpdatedForClose");
    return this.httpClient.get('http://127.0.0.1:3000/gettingTheAdmin_StaffStatusUpdatedForClose');
  }

  ///////////////////////////////////////////////////////////LOGIN////////////////////////////
  


}
