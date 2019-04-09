var express  = require('express');
var bodyParser=require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: true });

var ldap = require('ldapjs');

//var app = express();
var cors = require('cors') ;
 app = express();
 app.use(bodyParser.urlencoded({'extended':'true'}));
 app.use(bodyParser.json());
 app.use(bodyParser.json({type:'application/vnd.api+json'}));

 var nodemailer = require('nodemailer');


  app.use(cors()); 
  var cid,mid1,comid1;
  var rem,adm_status;
  var val=[];
 var comp_date;
 var valCType=[];
var valUpdate=[];
var comp_crt_date;
  const pg  = require('pg');
  // const config = {
  //     user: 'postgres',
  //     database: 'postgres',
  //     password: 'root',
  //     port: 5432
  // };
  const config = {
    user: 'postgres',
    database: 'postgres',
    password: 'root',
    port: 5432
};
  const pool = new pg.Pool(config);


  
//Master Module List
 app.get('/masterModulelist',function(req,res,next){
    pool.connect(function (err, client, done) {
     client.query('SELECT "moduleId", "moduleType" FROM public."ssSoftwareModules"', function (err, result) {
                done();
                if (err)
                    res.send(err)
                  //  console.log(result);
               //console.log(result.rows);
                    res.json(result.rows);
   });
 
   })
 });
 

//get Complaint List

app.get('/masterComplaintlist',function(req,res,next){
  var c_others='Others';
   pool.connect(function (err, client, done) {
    client.query('SELECT "complaintTypeId", "complaintType" FROM public."ssSoftwareComplaint" where "complaintothers"is null', function (err, result) {
               done();
               if (err)
                   res.send(err)
                  // console.log(result);
             // console.log(result.rows);
                   res.json(result.rows);
  });

  })
});

 
 //open Complaint lists

//  app.get('/openComplaint',function(req,res,next){
//   console.log("TTTETETSTETTETD");

 

 app.get('/openComplaint:uname',function(req,res,next){
 
  var list1=[];
  var open_list=[];

  console.log("req param url : "+req.url);
  
  var uname=req.params.uname;
  console.log("Parms== : "+uname);
  
  pool.connect(function (err, client, done) {
    //'select scm."complaintId",sm."moduleType",sc."complaintType",sc."complaintothers",scm."complaintDescription",to_jsonb(scm."complaintDate"),scm."errorPath",scm."remarks",scm."staffStatus",scm."adminStatus" from public."ssSoftwareModules" sm,public."ssSoftwareComplaint" sc,public."ssComplaintMaster" scm,public."ssStaffLogin" ss where sc."complaintTypeId"=scm."complainttypeId" and sm."moduleId"=scm."moduleId" and ss."employeecode"=scm."personalId" and scm."adminStatus"!=$1 order by scm."complaintDate" desc',["Closed"]
   client.query('select scm."complaintId",sm."moduleType",sc."complaintType",sc."complaintothers",scm."complaintDescription",to_jsonb(scm."complaintDate"),scm."errorPath",scm."remarks",scm."staffStatus",scm."adminStatus" from public."ssSoftwareModules" sm,public."ssSoftwareComplaint" sc,public."ssComplaintMaster" scm where sc."complaintTypeId"=scm."complainttypeId" and sm."moduleId"=scm."moduleId" and scm."personalId"=$1 and scm."adminStatus"=$2 order by scm."complaintDate" desc' ,[uname,"Unread"], function (err, result) {
              done();
              if (err)
                  res.send(err)
                 
             for(i=0;i<result.rows.length;i++)
             {
                // data1=JSON.stringify(result.rows[i]["complaintDate"]);


                
                // data1=data1.substring(1, 11);

                data1=JSON.stringify(result.rows[i]["to_jsonb"]);

                
                console.log("parsed date : "+result.rows[i]["to_jsonb"]);
                data1=data1.substring(1, 11);

                console.log("date openComplaintUserView  : "+data1);
                //console.log("date "+data1);
                list1={
                  "eid":result.rows[i]["employeecode"],
                  "complaintId":result.rows[i]["complaintId"],
                  "module_type":result.rows[i]["moduleType"],
                  "complaint_type":result.rows[i]["complaintType"],
                  "comp_others":result.rows[i]["complaintothers"],
                  "description":result.rows[i]["complaintDescription"],
                  "complaintDate":data1,
                  "error_path":result.rows[i]["errorPath"],
                  "remarks":result.rows[i]["remarks"],
                  "stf_status":result.rows[i]["staffStatus"],
                  "adm_status":result.rows[i]["adminStatus"]
                };
                open_list.push(list1);
             }
           
            res.json(open_list);
            
            
 });

 }) 

 
});

/////////////////////////OPEN COMPLAINT ADMIN VIEW/////////////////////////////////////////////
app.get('/complaintOpen_Admin',function(req,res,next){
  
  var list1=[];
  var open_list=[];

  console.log("req param url : "+req.url);
  
  var uname=req.params.uname;
  console.log("Parms== : "+uname);
  
  pool.connect(function (err, client, done) {
    client.query('select hrm."fullname",scm."complaintId",sm."moduleType",sc."complaintType",sc."complaintothers",scm."complaintDescription",to_jsonb(scm."complaintDate"),scm."errorPath",scm."remarks",scm."staffStatus",scm."adminStatus",acd."departmentname" from public."ssSoftwareModules" sm,public."ssSoftwareComplaint" sc,public."ssComplaintMaster" scm,public."accdepartments" acd,public."hrmbasicinfo" hrm where acd."departmentid"=hrm."did" and sc."complaintTypeId"=scm."complainttypeId" and sm."moduleId"=scm."moduleId" and hrm."personalid"=scm."personalId" and scm."adminStatus"=$1 order by scm."complaintDate" desc' ,["Unread"], function (err, result) {
              done();
              if (err)
                  res.send(err)
                 
             for(i=0;i<result.rows.length;i++)
             {
                // data1=JSON.stringify(result.rows[i]["complaintDate"]);


                
                // data1=data1.substring(1, 11);

                data1=JSON.stringify(result.rows[i]["to_jsonb"]);

                
                console.log("parsed date : "+result.rows[i]["to_jsonb"]);
                data1=data1.substring(1, 11);

                console.log("date openComplaintUserView  : "+data1);
                //console.log("date "+data1);
                list1={
                  "eid":result.rows[i]["employeecode"],
                  "empname":result.rows[i]["fullname"],
                  "departmentName":result.rows[i]["departmentname"],
                  "complaintId":result.rows[i]["complaintId"],
                  "module_type":result.rows[i]["moduleType"],
                  "complaint_type":result.rows[i]["complaintType"],
                  "comp_others":result.rows[i]["complaintothers"],
                  "description":result.rows[i]["complaintDescription"],
                  "complaintDate":data1,
                  "error_path":result.rows[i]["errorPath"],
                  "remarks":result.rows[i]["remarks"],
                  "stf_status":result.rows[i]["staffStatus"],
                  "adm_status":result.rows[i]["adminStatus"]
                };
                open_list.push(list1);
             }
           
            res.json(open_list);
            
            
 });

 })  
});
////////////////////////////////////OPEN COMPALINT ADMIN VIEW END///////////////////////////////
 
//completed complaintlist
app.get('/completedComplaint',function(req,res,next){
  var stat=[];
  var stat1="Completed";
  var stat2="Processing";
  //var stat="Completed";
  stat.push(stat1,stat2);
  var list1=[];
  var completed_list=[];
  pool.connect(function (err, client, done) {

   //client.query('select scm."complaintId",sm."moduleType",sc."complaintType",scm."complaintDescription",scm."complaintDate",scm."errorPath",scm."remarks" from public."ssSoftwareModules" sm,public."ssSoftwareComplaint" sc,public."ssComplaintMaster" scm,public."ssStaffLogin" ss where sc."complaintTypeId"=scm."complainttypeId" and sm."moduleId"=scm."moduleId" and ss."employeecode"=scm."personalId" and scm."adminStatus"=$1',[stat], function (err, result) {
  // client.query('select scm."complaintId",sm."moduleType",sc."complaintType",scm."complaintDescription",to_jsonb(scm."complaintDate"),scm."errorPath",scm."remarks",scm."adminStatus",scm."staffStatus" from public."ssSoftwareModules" sm,public."ssSoftwareComplaint" sc,public."ssComplaintMaster" scm,public."ssStaffLogin" ss where sc."complaintTypeId"=scm."complainttypeId" and sm."moduleId"=scm."moduleId" and ss."employeecode"=scm."personalId" and (scm."adminStatus"=$1 or scm."adminStatus"=$2) order by scm."complaintDate" desc',stat, function (err, result) {
    client.query('select hrm."fullname",acd."departmentname",scm."complaintId",sm."moduleType",sc."complaintType",scm."complaintDescription",to_jsonb(scm."complaintDate"),scm."errorPath",scm."remarks",scm."adminStatus",scm."staffStatus" from public."ssSoftwareModules" sm,public."ssSoftwareComplaint" sc,public."ssComplaintMaster" scm,public."accdepartments" acd,public."hrmbasicinfo" hrm where acd."departmentid"=hrm."did" and sc."complaintTypeId"=scm."complainttypeId" and sm."moduleId"=scm."moduleId" and hrm."personalid"=scm."personalId" and (scm."adminStatus"=$1 or scm."adminStatus"=$2) order by scm."complaintDate" desc',stat, function (err, result) {
              done();
              if (err)
                  res.send(err)
             
                  for(i=0;i<result.rows.length;i++)
                  {
                    data1=JSON.stringify(result.rows[i]["to_jsonb"]);
                    data1=data1.substring(1, 11);
                  //  console.log("date "+data1);
                    list1={
                      "empname":result.rows[i]["fullname"],
                      "departmentName":result.rows[i]["departmentname"],
                      "complaintId":result.rows[i]["complaintId"],
                      "module_type":result.rows[i]["moduleType"],
                      "complaint_type":result.rows[i]["complaintType"],
                      "description":result.rows[i]["complaintDescription"],
                      "complaintDate":data1,
                      "error_path":result.rows[i]["errorPath"],
                      "remarks":result.rows[i]["remarks"],
                      "adm_status":result.rows[i]["adminStatus"]
                    };
                  completed_list.push(list1);
                 }
             // console.log("leng json : "+Object.keys(completed_list));
              //  console.log("open list : "+JSON.stringify(open_list));
              res.json(completed_list);


           
 });

 })
});

//complaint listOthers
app.get('/getOtherComplaint',function(req,res,next){
  var c_others='Others';
  
   pool.connect(function (err, client, done) {
    // client.query('SELECT "complaintothers" FROM public."ssSoftwareComplaint" where "complaintType"=$1',[c_others], function (err, result) {
      client.query('SELECT "complaintType" FROM public."ssSoftwareComplaint" where "complaintothers"=$1',[c_others], function (err, result) {
               done();
               if (err)
                   res.send(err)
                else if(!result){
                  //console.log("null");
                }
                else{
                 //  console.log(result);
              console.log("others 14-03-19 : "+JSON.stringify(result.rows));
                   res.json(result.rows);
                }
  });

  })
});


//complaint listOthers
// app.get('/getOtherComplaint',function(req,res,next){
//   var c_others='Others';
//    pool.connect(function (err, client, done) {
//     //client.query('SELECT "complaintothers" FROM public."ssSoftwareComplaint" where "complaintType"=$1',[c_others], function (err, result) {
//       client.query('SELECT "complaintothers" FROM public."ssSoftwareComplaint" where "complaintothers"=$1',[c_others], function (err, result) {
//                done();
//                if (err)
//                    res.send(err)
//                 else if(!result){
//                   //console.log("null");
//                 }
//                 else{
//                    //console.log(result);
//               //console.log(result.rows);
//                    res.json(result.rows);
//                 }
//   });

//   })
// });


// function getModuleId(moduleType)
//   {
//     console.log("Inside function--moduleType"+moduleType);
//     pool.connect(function(err,client,done){
//       console.log("Inside function--moduleType2"+moduleType);
//       client.query('select "moduleId" from public."ssSoftwareModules" where "moduleType"=$1',[moduleType],function(err,result){
//         console.log("Inside function--moduleType3"+moduleType);
//         if (err) {
//                       console.log(err);
//                       return;
//                   } else {
//                     console.log("moduleid==========="+result.rows[0]["moduleId"])
//                     console.log("select mid : "+JSON.stringify(result.rows[0]["moduleId"]));
//                     mid1=JSON.stringify(result.rows[0]["moduleId"]);
//                     mid1 = mid1.replace(/^"(.*)"$/, '$1');
//                     console.log("mid : "+mid1);
//                     return mid1;
//                   }
//       })
     
      
//     });
//   }

 //////////////////new other Refister 17-01-19

 app.post('/tsInsertComplaint',urlencodedParser,function(req,res,next){

  console.log("test tsInsertComplaint");
  

  // console.log("test req : "+JSON.stringify(req.body));
  var data=JSON.stringify(req.body);

  dataKey=JSON.parse(data);
  // console.log(dataKey["module_type"]);
  

  pool.connect(function(err,client,done){


    var mid=dataKey["module_type"];
    var pid=dataKey["personalId"];
    comid=dataKey["complaint_type"];
    // console.log("ctype test   : "+comid);
    var comp_des=dataKey["description"];
    
    var err_path=dataKey["error_path"];
    var img="img1";
    var ad_stat="Unread";
    var stf_stat="Opened";
    var lvl="0";
    var rmks="By sir";

    other_CompDescription=dataKey["other_Complaints"];
    // console.log("other desc : "+other_CompDescription);

    var currentdate = new Date();
    //comp_date=currentdate.getDate()+'-'+(currentdate.getMonth())+'-'+(currentdate.getFullYear());
    comp_date=(currentdate.getFullYear())+'-'+(currentdate.getMonth()+1)+'-'+currentdate.getDate();
    console.log("year : "+(currentdate.getFullYear()));
    console.log("month : "+(currentdate.getMonth()));
    console.log("date : "+currentdate.getDate());
    //types.setTypeParser(1114, str => moment.utc(str).format());
    
    console.log("date new 1 comp_date : "+comp_date); 

    // //////////////////////////////////////////SEQUENCE//////////////////////////////////////////////////////////////////////////////
cid;


client.query('SELECT * from compl_id()',function(err,result){
  if (err) {
                console.log(err);
                return;
            } else {
              //console.log("select compid : "+JSON.stringify(result.rows[0]["compl_id"]));
              cid="comp";
              cid+=JSON.stringify(result.rows[0]["compl_id"]);
              // console.log("cid : "+cid);
              return cid;
                //console.log('row inserted with id: ' + result.rows[0].id);
            }
})   
//    // //////////////////////////////////////////SEQUENCE//////////////////////////////////////////////////////////////////////////////
    mid1;
    client.query('select "moduleId" from public."ssSoftwareModules" where "moduleType"=$1',[mid],function(err,result){
      if (err) {
                    console.log(err);
                    return;
                } else {
                  // console.log("moduleid==========="+result.rows[0]["moduleId"])
                  // console.log("select mid : "+JSON.stringify(result.rows[0]["moduleId"]));
                  mid1=JSON.stringify(result.rows[0]["moduleId"]);
                  mid1 = mid1.replace(/^"(.*)"$/, '$1');
                  // console.log("mid : "+mid1);
                  return mid1;
                }
    })
   
    client.query('select current_date',function(err,result){
              if (err) {
                            console.log(err);
                            return;
                        } else {
                          console.log("insert date  : "+JSON.stringify(result.rows));
                          // var dd=JSON.stringify(result.rows["current_date"]);
                          // console.log("insert date111  : "+JSON.stringify(result.rows["current_date"]));
                          if(comid=="Others")
                          //if(other_CompDescription=="Others")
                          {
                            console.log("others");
                            client.query('SELECT * from public."ssSoftwareComplaint" where "complaintType"=$1',[comp_des],function(err,result){
                            //client.query('SELECT * from public."ssSoftwareComplaint" where "complaintType"=$1',[comid],function(err,result){
                             if (err) {
                                               console.log(err);
                                               return;
                                           } else {
                                             
                                             c=result.rows.length;
                                             console.log("count in first fun : "+c);
                                             //return cid;
                                               //console.log('row inserted with id: ' + result.rows[0].id);
                                               if(c==0){
                                                 console.log("other's c==0 if");
                                                 client.query('SELECT * from compltype_id()',function(err,result){
                                                   if (err) {
                                                                 console.log(err);
                                                                 return;
                                                             } else {
                                                               
                                                               compType_cid=JSON.stringify(result.rows[0]["compltype_id"]);
                                                               compType_cid = compType_cid.replace(/^"(.*)"$/, '$1');
                                                              //  console.log("cid type  eeeeee : "+compType_cid);
                                                               other_CompDescription=other_CompDescription.replace(/^"(.*)"$/, '$1');
                                                              //  console.log("in if comid : "+comid);
                                                               //valCType.push(compType_cid,other_CompDescription,comid);
                                                               valCType.push(compType_cid,comp_des,comid);
                                                               val.push(cid,mid1,pid,compType_cid,comp_des,comp_date,err_path,img,ad_stat,stf_stat,lvl,rmks);
                                                               return compType_cid;
                                                                 //console.log('row inserted with id: ' + result.rows[0].id);
                                                             }
                                                 })
                                                 client.query('insert into public."ssSoftwareComplaint"("complaintTypeId","complaintType","complaintothers")values($1,$2,$3)',valCType,function(err,result){
                                                   if (err) {
                                                           console.log(err);
                                                     return;
                                                     } else {
                                                                 console.log("success");
                                                                 valCType=[];
                                             
                                                             }
                                                 })
                                                 client.query('insert into public."ssComplaintMaster"("complaintId","moduleId","personalId","complainttypeId","complaintDescription","complaintDate","errorPath","image","adminStatus","staffStatus","level","remarks")values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)',val,function(err,result){
                                                   if (err) {
                                                           console.log(err);
                                                     return;
                                                     } else {
                                                                 console.log("success");
                                                                 val=[];
                                             
                                                             }
                                                   })
                 
                                               } 
                                               else{
                                                 console.log("other's c==0 else");
                                                 //client.query('select "complaintTypeId" from public."ssSoftwareComplaint" where "complaintType"=$1',[comid],function(err,result){
                                                  client.query('SELECT * from public."ssSoftwareComplaint" where "complaintType"=$1',[comp_des],function(err,result){
                                                   if (err) {
                                                                 console.log(err);
                                                                 return;
                                                             } else {
                                                               console.log("select compid : "+JSON.stringify(result.rows[0]["complaintTypeId"]));
                                                               var demo=result.rows[0];

                                                               comid1=JSON.stringify(demo["complaintTypeId"]);
                                                               comid1 = comid1.replace(/^"(.*)"$/, '$1');

                                                               //return comid1;
                                                               val.push(cid,mid1,pid,comid1,comp_des,comp_date,err_path,img,ad_stat,stf_stat,lvl,rmks);
                                                               client.query('insert into public."ssComplaintMaster"("complaintId","moduleId","personalId","complainttypeId","complaintDescription","complaintDate","errorPath","image","adminStatus","staffStatus","level","remarks")values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)',val,function(err,result){
                                                                 if (err) {
                                                                         console.log(err);
                                                                   return;
                                                                   } else {
                                                                               console.log("success");
                                                                               val=[];
                                                           
                                                                           }
                                                                 })
                                                             }
                                                 })
                                                 
                 
                 
                                               }
                                           }
                           })  
                          
                          }
                          else{
                          //  console.log("out");
                           client.query('select "complaintTypeId" from public."ssSoftwareComplaint" where "complaintType"=$1',[comid],function(err,result){
                           //client.query('select "complaintTypeId" from public."ssSoftwareComplaint" where "complaintType"=$1',[comid],function(err,result){
                             if (err) {
                                           console.log(err);
                                           return;
                                       } else {
                                         //console.log("select compid : "+JSON.stringify(result.rows[0]["complaintTypeId"]));
                                         var demo=result.rows[0];
                                         //comid1=JSON.stringify(result.rows[0]["complaintTypeId"]);
                                         comid1=JSON.stringify(demo["complaintTypeId"]);
                                         comid1 = comid1.replace(/^"(.*)"$/, '$1');

                                         val.push(cid,mid1,pid,comid1,comp_des,comp_date,err_path,img,ad_stat,stf_stat,lvl,rmks);
                                        
                                         client.query('insert into public."ssComplaintMaster"("complaintId","moduleId","personalId","complainttypeId","complaintDescription","complaintDate","errorPath","image","adminStatus","staffStatus","level","remarks")values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)',val,function(err,result){
                                                   if (err) {
                                                           console.log(err);
                                                     return;
                                                     } else {
                                                                 console.log("success");
                                                                 val=[];
                                             
                                                             }
                                           })
                                         return comid1;
                                       }
                           })
                            // console.log("out comid1 : "+comid1);
                           
                                
                          }
                         
                        }
            })
  })//pool.connect
})



///INSERT COMPLAINT
app.post('/tsInsertDummySample',urlencodedParser,function(req,res,next){

   console.log("test tsInsertDummySample");

  console.log("test req : "+JSON.stringify(req.body));
  var data=JSON.stringify(req.body);

  dataKey=JSON.parse(data);
  // console.log(dataKey["module_type"]);
  

  pool.connect(function(err,client,done){


    var mid=dataKey["module_type"];
    var pid="p1";//dataKey["personalId"];
    comid=dataKey["complaint_type"];
    // console.log("ctype test   : "+comid);
    var comp_des=dataKey["description"];
    
    var err_path=dataKey["error_path"];
    var img="img1";
    var ad_stat="Unread";
    var stf_stat="Opened";
    var lvl="0";
    var rmks="By sir";
    

    other_CompDescription=dataKey["other_Complaints"];

    var currentdate = new Date();
    //comp_date=currentdate.getDate()+'-'+(currentdate.getMonth())+'-'+(currentdate.getFullYear());
    comp_date=(currentdate.getFullYear())+'-'+(currentdate.getMonth()+1)+'-'+currentdate.getDate();
    console.log("year : "+(currentdate.getFullYear()));
    console.log("month : "+(currentdate.getMonth()));
    console.log("date : "+currentdate.getDate());
    console.log("date insertdummy comp_date : "+comp_date); 

    // //////////////////////////////////////////SEQUENCE//////////////////////////////////////////////////////////////////////////////
cid;


client.query('SELECT * from compl_id()',function(err,result){
  if (err) {
                console.log(err);
                return;
            } else {
              //console.log("select compid : "+JSON.stringify(result.rows[0]["compl_id"]));
              cid="comp";
              cid+=JSON.stringify(result.rows[0]["compl_id"]);
              // console.log("cid : "+cid);
              return cid;
                //console.log('row inserted with id: ' + result.rows[0].id);
            }
})   
//    // //////////////////////////////////////////SEQUENCE//////////////////////////////////////////////////////////////////////////////
    mid1;
    client.query('select "moduleId" from public."ssSoftwareModules" where "moduleType"=$1',[mid],function(err,result){
      if (err) {
                    console.log(err);
                    return;
                } else {
                  // console.log("moduleid==========="+result.rows[0]["moduleId"])
                  // console.log("select mid : "+JSON.stringify(result.rows[0]["moduleId"]));
                  mid1=JSON.stringify(result.rows[0]["moduleId"]);
                  mid1 = mid1.replace(/^"(.*)"$/, '$1');
                  // console.log("mid : "+mid1);
                  return mid1;
                }
    })
   
    client.query('select current_date',function(err,result){
              if (err) {
                            console.log(err);
                            return;
                        } else {
                          comp_crt_date=JSON.stringify(result.rows);
                          console.log("datee insert1 : "+comp_crt_date);
                          if(comid=="Others")
                          {
                            console.log("others");
                            client.query('SELECT * from public."ssSoftwareComplaint" where "complaintothers"=$1',[other_CompDescription],function(err,result){
                             if (err) {
                                               console.log(err);
                                               return;
                                           } else {
                                             
                                             c=result.rows.length;
                                            //  console.log("count in first fun : "+c);
                                             //return cid;
                                               //console.log('row inserted with id: ' + result.rows[0].id);
                                               if(c==0){
                                                //  console.log("other's c==0 if");
                                                 client.query('SELECT * from compltype_id()',function(err,result){
                                                   if (err) {
                                                                 console.log(err);
                                                                 return;
                                                             } else {
                                                               
                                                               compType_cid=JSON.stringify(result.rows[0]["compltype_id"]);
                                                               compType_cid = compType_cid.replace(/^"(.*)"$/, '$1');
                                                              //  console.log("cid type  eeeeee : "+compType_cid);
                                                               other_CompDescription=other_CompDescription.replace(/^"(.*)"$/, '$1');
                                                              //  console.log("in if comid : "+comid);
                                                               valCType.push(compType_cid,comid,other_CompDescription);
                                                               val.push(cid,mid1,pid,compType_cid,comp_des,comp_date,err_path,img,ad_stat,stf_stat,lvl,rmks);
                                                               return compType_cid;
                                                                 //console.log('row inserted with id: ' + result.rows[0].id);
                                                             }
                                                 })
                                                 client.query('insert into public."ssSoftwareComplaint"("complaintTypeId","complaintType","complaintothers")values($1,$2,$3)',valCType,function(err,result){
                                                   if (err) {
                                                           console.log(err);
                                                     return;
                                                     } else {
                                                                 console.log("success");
                                                                 valCType=[];
                                             
                                                             }
                                                 })
                                                 client.query('insert into public."ssComplaintMaster"("complaintId","moduleId","personalId","complainttypeId","complaintDescription","complaintDate","errorPath","image","adminStatus","staffStatus","level","remarks")values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)',val,function(err,result){
                                                   if (err) {
                                                           console.log(err);
                                                     return;
                                                     } else {
                                                                 console.log("success");
                                                                 val=[];
                                             
                                                             }
                                                   })
                 
                                               } 
                                               else{
                                                 console.log("other's c==0 else");
                                                 client.query('select "complaintTypeId" from public."ssSoftwareComplaint" where "complaintType"=$1',[comid],function(err,result){
                                                   if (err) {
                                                                 console.log(err);
                                                                 return;
                                                             } else {
                                                              //  console.log("select compid : "+JSON.stringify(result.rows[0]["complaintTypeId"]));
                                                               
                                                               comid1=JSON.stringify(result.rows[0]["complaintTypeId"]);
                                                               
                                                               comid1 = comid1.replace(/^"(.*)"$/, '$1');

                                                               //return comid1;
                                                               val.push(cid,mid1,pid,comid1,comp_des,comp_date,err_path,img,ad_stat,stf_stat,lvl,rmks);
                                                               client.query('insert into public."ssComplaintMaster"("complaintId","moduleId","personalId","complainttypeId","complaintDescription","complaintDate","errorPath","image","adminStatus","staffStatus","level","remarks")values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)',val,function(err,result){
                                                                 if (err) {
                                                                         console.log(err);
                                                                   return;
                                                                   } else {
                                                                               console.log("success");
                                                                               val=[];
                                                           
                                                                           }
                                                                 })
                                                             }
                                                 })
                                                 
                 
                 
                                               }
                                           }
                           })  
                          
                          }
                          else{
                           console.log("out");
                           
                           client.query('select "complaintTypeId" from public."ssSoftwareComplaint" where "complaintType"=$1',[comid],function(err,result){
                             if (err) {
                                           console.log(err);
                                           return;
                                       } else {
                                         console.log("select compid : "+JSON.stringify(result.rows[0]["complaintTypeId"]));
                                         
                                         comid1=JSON.stringify(result.rows[0]["complaintTypeId"]);
                                         
                                         comid1 = comid1.replace(/^"(.*)"$/, '$1');

                                         val.push(cid,mid1,pid,comid1,comp_des,comp_date,err_path,img,ad_stat,stf_stat,lvl,rmks);
                                         client.query('insert into public."ssComplaintMaster"("complaintId","moduleId","personalId","complainttypeId","complaintDescription","complaintDate","errorPath","image","adminStatus","staffStatus","level","remarks")values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)',val,function(err,result){
                                                   if (err) {
                                                           console.log(err);
                                                     return;
                                                     } else {
                                                                 console.log("success");
                                                                 val=[];
                                             
                                                             }
                                           })
                                         return comid1;
                                       }
                           })
                            console.log("out comid1 : "+comid1);
                           
                                
                          }
                         
                        }
            })
  })//pool.connect
})

   //closed complaintlist
   app.get('/closedComplaint',function(req,res,next){
    
    var stat="Closed";
    var list1=[];
    var closed_list=[];
    pool.connect(function (err, client, done) {
     client.query('select hrm."fullname",acd."departmentname",scm."complaintId",sm."moduleType",sc."complaintType",scm."complaintDescription",scm."complaintDate",scm."errorPath",scm."remarks" from public."ssSoftwareModules" sm,public."ssSoftwareComplaint" sc,public."ssComplaintMaster" scm,public."accdepartments" acd,public."hrmbasicinfo" hrm where acd."departmentid"=hrm."did" and hrm."personalid"=scm."personalId"  and sc."complaintTypeId"=scm."complainttypeId" and sm."moduleId"=scm."moduleId" and (scm."staffStatus"=$1 and scm."adminStatus"=$1) order by scm."complaintDate" desc limit 15',[stat], function (err, result) {
                done();
                if (err)
                    res.send(err)
                    // console.log("result closedComplaint: "+result);
                    console.log("result closedComplaint: ");
                    // console.log("length row : "+result.rows.length);
                    for(i=0;i<result.rows.length;i++)
                    {
                      data1=JSON.stringify(result.rows[i]["complaintDate"]);
                      data1=data1.substring(1, 11);
                      console.log("date  closed Complaitn  : "+data1);
                      list1={
                        "empname":result.rows[i]["fullname"],
                        "departmentName":result.rows[i]["departmentname"],
                        "complaintId":result.rows[i]["complaintId"],
                        "module_type":result.rows[i]["moduleType"],
                        "complaint_type":result.rows[i]["complaintType"],
                        "description":result.rows[i]["complaintDescription"],
                        "complaintDate":data1,
                        "error_path":result.rows[i]["errorPath"],
                        "remarks":result.rows[i]["remarks"]
                      };
                    closed_list.push(list1);
                   }
                // console.log("leng json : "+Object.keys(closed_list));
                //  console.log("open list : "+JSON.stringify(open_list));
                console.log("list=====> : "+JSON.stringify(closed_list));
                res.json(closed_list);
  
  
             
   });
  
   })
  });

  app.post('/tsUpdateComplaint',urlencodedParser,function(req,res,next){

    var data=JSON.stringify(req.body);
  
    dataKey=JSON.parse(data);
   // console.log("hfhfghfghfgh "+dataKey["module_type"]);
    
  
    pool.connect(function(err,client,done){
  
      
  
      cno=dataKey["complaintId"];
      var mid=dataKey["module_type"];
      console.log("before going to query : "+mid);

      var pid=dataKey["personalId"];

      comid=dataKey["complaint_type"];
      // console.log("ctype test   : "+comid);
      var comp_des=dataKey["description"];
      
      var err_path=dataKey["error_path"];
      var img="img1";
      var rmks="By sir";
  
      other_CompDescription=dataKey["other_Complaints"];
  
      var currentdate = new Date();
     
      comp_date=(currentdate.getFullYear())+'-'+(currentdate.getMonth()+1)+'-'+currentdate.getDate();
      
     
  
      mid1;
      client.query('select "moduleId" from public."ssSoftwareModules" where "moduleType"=$1',[mid],function(err,result){
        if (err) {
                      //console.log(err);
                      return;
                  } else {
                   // console.log("moduleid==========="+result.rows[0]["moduleId"])
                    //console.log("select mid : "+JSON.stringify(result.rows[0]["moduleId"]));
                    mid1=JSON.stringify(result.rows[0]["moduleId"]);
                    mid1 = mid1.replace(/^"(.*)"$/, '$1');
                    // console.log("mid : "+mid1);
                    return mid1;
                  }
      })
      // console.log("mid 1 : "+mid1);
     
      client.query('select current_date',function(err,result){
                if (err) {
                              console.log(err);
                              return;
                          }
                            else{
                             console.log("out");
                            client.query('select "complaintTypeId" from public."ssSoftwareComplaint" where "complaintType"=$1',[comid],function(err,result){
                            //client.query('select "complaintTypeId" from public."ssSoftwareComplaint" ',function(err,result){
                               if (err) {
                                             console.log(err);
                                             return;
                                         } else {
                                          //  console.log("comid inside : "+comid);
                                          //  console.log("count : "+result.rowCount);
                                          //  console.log("inside comid val : "+JSON.stringify(result.rows));
                                           var demo=result.rows[0];
                                           
                                          comid1=JSON.stringify(result.rows[0]["complaintTypeId"]);
                                          comid1=JSON.stringify(demo["complaintTypeId"]);
                                           comid1 = comid1.replace(/^"(.*)"$/, '$1');
                                           //console.log("out comid1 : "+comid1);
                                           val.push(mid1,pid,comid1,comp_des,comp_date,err_path,img,rmks,cno);
                                           //client.query('insert into public."ssComplaintMaster"("complaintId","moduleId","personalId","complainttypeId","complaintDescription","complaintDate","errorPath","image","adminStatus","staffStatus","level","remarks")values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)',val,function(err,result){
                                            client.query('update public."ssComplaintMaster" set "moduleId"=$1,"personalId"=$2,"complainttypeId"=$3,"complaintDescription"=$4,"complaintDate"=$5,"errorPath"=$6,"image"=$7,"remarks"=$8 where "complaintId"=$9',val,function(err,result){
                                                     if (err) {
                                                             console.log("err update : "+err);
                                                       return;
                                                       } else {
                                                                   console.log("success update");
                                                                   val=[];
                                               
                                                               }
                                             })
                                           return comid1;
                                         }
                             })
                              console.log("out comid1 : "+comid1);
                             
                                  
                            }
                           
                          })
                        })
    })//pool.connect


// Update an existing user's status
app.post('/testUpdate',urlencodedParser, (request, response) => {
  console.log("completediddd== testUpdate");

  // console.log("test req : "+JSON.stringify(request.body));
  var data=JSON.stringify(request.body);

  dataKey=JSON.parse(data);
  // console.log(dataKey["compId"]);
  var cId=dataKey["compId"];

  // console.log("completediddd=="+cId);
status="Closed";
pstatus="opened";
  pool.connect(function (err, client, done) {
    // console.log("connect==");
    client.query('UPDATE public."ssComplaintMaster" SET "staffStatus"=$1 where "complaintId"=$2',[status,cId],(error, result) => {//  WHERE complaintId = ?', [request.body, id], (error, result) => {
      if (error){
        console.log("error===>"+error);
        return 0;
      } 
      else{
       
      response.send('User updated successfully.');
      return 1;
    }
  });

})
});




//delete...
app.delete('/deleteSingleData:complaintId', function(req, res,next) {
    
    var id=req.params.complaintId;
      console.log("iddd== delete : "+id);
         pool.connect(function (err, client, done) {
           client.query('delete from public."ssComplaintMaster" where "complaintId"=$1',[id], function (err, result) {
                           done();
                           if (err)
                               res.send(err)
                              //  console.log(result);
                          // console.log(result.rows);
                               res.json(result.rows);
});
});




console.log("deleting..........");

 });


 app.get('/othersInEdit1',function(req,res,next){
  pool.connect(function (err, client, done) {
  //  client.query('SELECT "complaintothers" FROM public."ssSoftwareComplaint" where "complaintType"=$1',["Others"], function (err, result) {
    client.query('SELECT "complaintType" FROM public."ssSoftwareComplaint" where "complaintothers"=$1',["Others"], function (err, result) {
              done();
              if (err)
                  res.send(err);
                  res.json(result.rows);
 });

 })
});

///Othercomplant count for enabling select option in userview edit
app.get('/getOthersCountInEdit1:comptype',function(req,res,next){
  var c_others=req.params.comptype;
  console.log("other count====> getOthersCount  :  "+c_others);
   pool.connect(function (err, client, done) {
    //client.query('SELECT "complaintothers" FROM public."ssSoftwareComplaint" where "complaintType"=$1',[c_others], function (err, result) {
      client.query('SELECT * FROM public."ssSoftwareComplaint" where "complaintType"=$1 and "complaintothers" IS NOT NULL',[c_others],function (err, result) {
               done();
               if (err)
                   res.send(err)
                // else if(!result){
                //   console.log("null");
                // }
                else{
                  otherscount=result.rowCount;
                  // console.log("count others : "+result.rowCount);
                  //console.log(result.rows);
                   res.json(result.rowCount);
                }
  });

  })
});


//////Complaint View For User///////////////////////////
// app.get('/openComplaintUserView',function(req,res,next){
  app.get('/ComplaintUserView:uname',function(req,res,next){
  // var stat="Opened";
  var list1=[];
  var open_list=[];
  var uname=req.params.uname;
  console.log("openComplaintUserView  : "+uname);
  pool.connect(function (err, client, done) {
//select scm."complaintId",sm."moduleType",sc."complaintType",sc."complaintothers",scm."complaintDescription",to_jsonb(scm."complaintDate"),scm."errorPath",scm."remarks",scm."staffStatus",scm."adminStatus" from public."ssSoftwareModules" sm,public."ssSoftwareComplaint" sc,public."ssComplaintMaster" scm where sc."complaintTypeId"=scm."complainttypeId" and sm."moduleId"=scm."moduleId" and scm."personalId"=$1 and scm."adminStatus"=$2 order by scm."complaintDate" desc' ,[uname,"Unread"]
  // client.query('select scm."complaintId",sm."moduleType",sc."complaintType",sc."complaintothers",scm."complaintDescription",scm."complaintDate",scm."errorPath",scm."remarks",scm."staffStatus" from public."ssSoftwareModules" sm,public."ssSoftwareComplaint" sc,public."ssComplaintMaster" scm,public."ssStaffLogin" ss where sc."complaintTypeId"=scm."complainttypeId" and sm."moduleId"=scm."moduleId" and ss."employeecode"=scm."personalId" and scm."staffStatus"=$1',[stat], function (err, result) {
 // client.query('select scm."complaintId",sm."moduleType",sc."complaintType",sc."complaintothers",scm."complaintDescription",to_jsonb(scm."complaintDate"),scm."errorPath",scm."remarks",scm."staffStatus",scm."adminStatus" from public."ssSoftwareModules" sm,public."ssSoftwareComplaint" sc,public."ssComplaintMaster" scm,public."ssStaffLogin" ss where sc."complaintTypeId"=scm."complainttypeId" and sm."moduleId"=scm."moduleId"  and ss."employeecode"=scm."personalId" and ss.employeecode=$2 and scm."adminStatus"!=$1 order by scm."complaintDate" desc',["Closed",uname], function (err, result) {

    client.query('select scm."complaintId",sm."moduleType",sc."complaintType",sc."complaintothers",scm."complaintDescription",to_jsonb(scm."complaintDate"),scm."errorPath",scm."remarks",scm."staffStatus",scm."adminStatus" from public."ssSoftwareModules" sm,public."ssSoftwareComplaint" sc,public."ssComplaintMaster" scm where sc."complaintTypeId"=scm."complainttypeId" and sm."moduleId"=scm."moduleId" and scm."personalId"=$1 and scm."adminStatus"=$2 order by scm."complaintDate" desc' ,[uname,"Unread"], function (err, result) {
              done();
              if (err)
                  res.send(err)
                  console.log("result openComplaintuserView : "+JSON.stringify(result.rows));
           
 
                  //console.log("result openComplaintuserView : "+JSON.stringify(result.rows));
            
            
             for(i=0;i<result.rows.length;i++)
             {
                //data1=JSON.stringify(result.rows[i]["complaintDate"]);
                data1=JSON.stringify(result.rows[i]["to_jsonb"]);

                
                console.log("parsed date : "+result.rows[i]["to_jsonb"]);
                data1=data1.substring(1, 11);

                console.log("date openComplaintUserView  : "+data1);

                list1={
                  "complaintId":result.rows[i]["complaintId"],
                  "module_type":result.rows[i]["moduleType"],
                  "complaint_type":result.rows[i]["complaintType"],
                  "comp_others":result.rows[i]["complaintothers"],
                  "description":result.rows[i]["complaintDescription"],
                  "complaintDate":data1,
                  "error_path":result.rows[i]["errorPath"],
                  "remarks":result.rows[i]["remarks"],
                  "stf_status":result.rows[i]["staffStatus"],
                  "adm_status":result.rows[i]["adminStatus"]
                };
                open_list.push(list1);
             }
           
            res.json(open_list);
 });


})
  });


/////////////////////////////////INSERT REMARKS///////////////////////////////////////////////////////
app.post('/insertRemarks',urlencodedParser,function(req,res,next){
  console.log("remarks : "+JSON.stringify(req.body));
  var rem1=JSON.parse(JSON.stringify(req.body));
  rem=rem1["remarks"];
  var cid1=rem1["compid"];
  console.log("rem : "+rem);
  pool.connect(function (err, client, done) {
    client.query('update public."ssComplaintMaster" set "remarks"=$1 where "complaintId"=$2',[rem,cid1],function( err,result){
      if (err){
      console.log("error"+err);
      val=[];
      return;
      }

      else
      {
        console.log("success");
        
        //val=[];
      }
    });
  })
});
////////////////////////////////INSERT REMARKS END////////////////////////////////////////////////////

////////////////////////////CHANGING ADMIN STATUS ON COMPLETE////////////////////////////////////////////////////////////////////////// 
app.post('/changeAdminStatus',urlencodedParser,function(req,res,next){
  console.log("remarks : "+JSON.stringify(req.body));
  var rem1=JSON.parse(JSON.stringify(req.body));
  rem=rem1["remarks"];
  var cid1=rem1["compid"];
  adm_status=rem1["adm_status"];
  console.log("rem : "+rem);

  var currentdate = new Date();
  var completion_date=(currentdate.getFullYear())+'-'+(currentdate.getMonth()+1)+'-'+currentdate.getDate();
  console.log("date new 1 comp_date : "+completion_date); 

  pool.connect(function (err, client, done) {
    if(rem==null){
      client.query('update public."ssComplaintMaster" set "adminStatus"=$1,"completiondate"=$2 where "complaintId"=$3',[adm_status,completion_date,cid1],function( err,result){
        if (err){
         console.log("error"+err);
          //val=[];
          return;
        }
  
        else
        {
          console.log("success");
          
          //val=[];
        }
      });

    }
    else{
      client.query('update public."ssComplaintMaster" set "adminStatus"=$1,"remarks"=$2,"completiondate"=$3 where "complaintId"=$4',[adm_status,rem,completion_date,cid1],function( err,result){
        if (err){
          console.log("error"+err);
          //val=[];
          return;
        }

        else
        {
          console.log("success");
          
          //val=[];
        }
      });
    }
  })

  pool.connect(function (err, client, done) {
    client.query('SELECT scm."complaintDescription",hrm."email" FROM public."ssComplaintMaster" scm,public."hrmbasicinfo" hrm where scm."complaintId"=$1 and scm."personalId"=hrm."personalid"',[cid1],function (err, result) {
             done();
             
      des=JSON.stringify(result.rows[0]["complaintDescription"]);
      des = des.replace(/^"(.*)"$/, '$1');

      emailId=JSON.stringify(result.rows[0]["email"]);
      emailId=emailId.replace(/^"(.*)"$/, '$1');

      console.log("description : "+des);
      console.log("email : "+emailId);

      sendMailMsg(des,emailId);
});

})

});
////////////////////////////CHANGING ADMIN STATUS ON COMPLETE END////////////////////////////////////////////////////////////////////////// 

////////////////////////////Getting the Remarks if any/////////////////////////////////////////////////////////////////////////////////////
app.get('/onLoadRemarks:compId',function(req,res,next){
  var c_id=req.params.compId;
  // console.log("other count====> getOthersCount  :  "+c_id);
   pool.connect(function (err, client, done) {
    //client.query('SELECT "complaintothers" FROM public."ssSoftwareComplaint" where "complaintType"=$1',[c_others], function (err, result) {
      client.query('SELECT "remarks" FROM public."ssComplaintMaster" where "complaintId"=$1',[c_id],function (err, result) {
               done();
               if (err)
                   res.send(err)
                
                else{
                  console.log("result in load : "+JSON.stringify(result.rows));
                  res.json(result.rows);
                 
                }
  });

  })
});
////////////////////////////Getting the Remarks if any END/////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////GETTING THE COMPLETED COMPLAINT DETAILS AFTER UPDATING THE ADMIN STATUS TO COMPLETE////////////////////////
app.get('/ComplaintAfterAdminUpdateStatus_Complete:compId',function(req,res,next){
  var c_id=req.params.compId;
  var stat=[];
  var stat1="Completed";
  
  console.log("inside check!!!!!!!"+c_id);

  stat.push(stat1,c_id);
  var list1=[];
  var completed_list=[];
  pool.connect(function (err, client, done) {
  //  client.query('select scm."complaintId",sm."moduleType",sc."complaintType",scm."complaintDescription",scm."complaintDate",scm."errorPath",scm."remarks",scm."adminStatus",scm."staffStatus",to_jsonb(scm."completiondate") from public."ssSoftwareModules" sm,public."ssSoftwareComplaint" sc,public."ssComplaintMaster" scm,public."ssStaffLogin" ss where sc."complaintTypeId"=scm."complainttypeId" and sm."moduleId"=scm."moduleId" and ss."employeecode"=scm."personalId" and scm."adminStatus"=$1 and scm."complaintId"=$2 order by scm."complaintDate" desc',stat, function (err, result) {
    client.query('select to_jsonb(scm."completiondate") from public."hrmbasicinfo" hrm,public."ssSoftwareModules" sm,public."ssSoftwareComplaint" sc,public."ssComplaintMaster" scm where  hrm."personalid"=scm."personalId" and scm."adminStatus"=$1 and scm."complaintId"=$2 ',stat, function (err, result) {
              done();
              if (err)
                  res.send(err)
               
              //res.json(result.rows);
              var cdate=JSON.stringify(result.rows[0]["to_jsonb"]);
              cdate=cdate.substring(1, 11);
              console.log("dte : "+cdate);
              res.json(cdate);


           
 });

 })
});
////////////////////////////////////////GETTING THE COMPLETED COMPLAINT DETAILS AFTER UPDATING THE ADMIN STATUS TO COMPLETE END////////////////////////


////////////////////////////////////////GETTING THE DATE DIFFERENCE BETWEEN COMPLAINT DATE AND COMPLETED DATE////////////////////////
app.get('/getDateDiff:compId',function(req,res,next){
  var c_id=req.params.compId;
  
 
  pool.connect(function (err, client, done) {
  //  client.query('select scm."complaintId",sm."moduleType",sc."complaintType",scm."complaintDescription",scm."complaintDate",scm."errorPath",scm."remarks",scm."adminStatus",scm."staffStatus",to_jsonb(scm."completiondate") from public."ssSoftwareModules" sm,public."ssSoftwareComplaint" sc,public."ssComplaintMaster" scm,public."ssStaffLogin" ss where sc."complaintTypeId"=scm."complainttypeId" and sm."moduleId"=scm."moduleId" and ss."employeecode"=scm."personalId" and scm."adminStatus"=$1 and scm."complaintId"=$2 order by scm."complaintDate" desc',stat, function (err, result) {
    client.query('select public.dateDifference($1)',[c_id], function (err, result) {
              done();
              if (err)
                  res.send(err)
               
              //res.json(result.rows);
              
              console.log("dte : "+JSON.stringify(result.rows));
              res.json(result.rows);


           
 });

 })
});
////////////////////////////////////////GETTING THE DATE DIFFERENCE BETWEEN COMPLAINT DATE AND COMPLETED DATE END////////////////////////



///////////////////////////////////////////////////////
 ///FEED BACK

 app.post('/insertfeedback',urlencodedParser,function(req,res,next){
  // console.log("hai");
   console.log("hhhh"+JSON.stringify(req.body));
   d=JSON.stringify(req.body);
   var dk=JSON.parse(d);

   var currentdate = new Date();
   var comp_date=(currentdate.getFullYear())+'-'+(currentdate.getMonth()+1)+'-'+currentdate.getDate();
   console.log("year : "+(currentdate.getFullYear()));
   console.log("month : "+(currentdate.getMonth()));
   console.log("date : "+currentdate.getDate());
   console.log("comp_date : "+comp_date);
   pool.connect(function(err,client,done){
    
    //  console.log("fgggg"+f);
     var f=dk["comments"];
        var s=dk["complaintId"];
        console.log("sssssss"+s);
          val.push(s,f);
          client.query('INSERT INTO public."ssfeedback"("comp_id","feedback") VALUES ($1,$2)',val,function( err,result){
           if (err){
           console.log("error"+err);
           val=[];
           return;
           }
   
           else
           {
             console.log("success insert feedback");
             val=[];
           }
          })
          //update tables/////////////////////////////////////////
          //client.query('update public."ssComplaintMaster" set "adminStatus"=$1,"staffStatus"=$2,"completiondate"=$3 where "complaintId"=$4',["Closed","Closed",comp_date,s],function( err,result){
            client.query('update public."ssComplaintMaster" set "adminStatus"=$1,"staffStatus"=$2 where "complaintId"=$3',["Closed","Closed",s],function( err,result){
            if (err){
            console.log("error"+err);
            val=[];
            return;
            }
    
            else
            {
              console.log("success update insertfeedback");
              val=[];
            }
           })
          ////////////////////////////////////////////////////////
          
       })
     });

/////////////INSERTING THE COMPLAINT DESCRIPTION IF THE PROBLEM SOLVED IN THE FEEDBACK ICON IS ON/////////////////////////
app.post('/feedbackComplaintProcess',urlencodedParser,function(req,res,next){
  // console.log("hai");
   console.log("hhhh COMP DESCRIPTION : "+JSON.stringify(req.body));
   d=JSON.stringify(req.body);
   var dk=JSON.parse(d);
 
   pool.connect(function(err,client,done){

    var f=dk["comments"];

    var s=dk["complaintId"];
    console.log("sssssss"+s);
    var ad_status="Unread";
    var completedDate=null;
    // val.push(s,f);

    var currentdate = new Date();
    comp_date=(currentdate.getFullYear())+'-'+(currentdate.getMonth()+1)+'-'+currentdate.getDate();
    console.log("year : "+(currentdate.getFullYear()));
    console.log("month : "+(currentdate.getMonth()));
    console.log("date : "+currentdate.getDate());
    
    console.log("date new 1 comp_date : "+comp_date); 

    // client.query('update public."ssComplaintMaster" set "complaintDescription"=$1,"complaintDate"=$3,"adminStatus"=$4,completiondate=$5 where "complaintId"=$2',[f,s,comp_date,ad_status,completedDate],function( err,result){
      client.query('update public."ssComplaintMaster" set "complaintDate"=$1,"adminStatus"=$2,completiondate=$3 where "complaintId"=$4',[comp_date,ad_status,completedDate,s],function( err,result){

      if (err){
        console.log("error"+err);
        val=[];
        return;
      }
      else
      {

        console.log("success update feedbackprocess");

      }
   })

   
          
  })
});
/////////////INSERTING THE COMPLAINT DESCRIPTION IF THE PROBLEM SOLVED IN THE FEEDBACK ICON IS ON END/////////////////////////////

     //////onProceed...starts.............................

     app.post('/onProceed',urlencodedParser, (request, response) => {
      
      console.log("test req on proceed================ : "+JSON.stringify(request.body));
      var data=JSON.stringify(request.body);

      var emailId;
    
      dataKey=JSON.parse(data);
      // console.log(dataKey["compId"]);
      var cId=dataKey["complaintId"];
    
      console.log("completediddd=="+cId);
      status="Processing";
    
      pool.connect(function (err, client, done) {
        console.log("connect==kjkjlkjjk"+cId);
        client.query('UPDATE public."ssComplaintMaster" SET "adminStatus"=$1 where "complaintId"=$2',[status,cId],(error, result) => {//  WHERE complaintId = ?', [request.body, id], (error, result) => {
          if (error){
            console.log("error===>"+error);
            return 0;
          } 
          else{
           
          response.send('User updated successfully.');
          return 1;
        }
      });
    
    })

    pool.connect(function (err, client, done) {
      //client.query('SELECT "complaintDescription" FROM public."ssComplaintMaster" where "complaintId"=$1',[cId],function (err, result) {
      client.query('SELECT ss."complaintDescription",hrm."email" FROM public."ssComplaintMaster" ss,public."hrmbasicinfo" hrm where ss."complaintId"=$1 and ss."personalId"=hrm."personalid" ',[cId],function (err, result) {
               done();
               
        des=JSON.stringify(result.rows[0]["complaintDescription"]);
        des = des.replace(/^"(.*)"$/, '$1');

        emailId=JSON.stringify(result.rows[0]["email"]);
        emailId=emailId.replace(/^"(.*)"$/, '$1');

        console.log("description : "+des);
        console.log("email : "+emailId);
        
        sendMailMsg(des,emailId,status);
  });
  
  })
    
    });

    var sendMailMsg=function(des,emailId,status1)
    {
      var sub;
      // console.log("inside function sendMailMsg(c_id) : "+des);
      if(status1=="Processing")
      {
        //console.log("processing");
        sub="Software Complaint Registered Under Processing"
        des="Your complaint : "+des+"\n is now in processing!!!";
      }
      else{
        sub="Software Complaint Resolved";
        des="Your complaint : "+des+"\n is now resolved.\nPlease check it!!!";
        
      }
        
        var transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: 'mailjas4us@gmail.com',
            pass: '#m1nd1lla#'
          }
        });
      
        var mailOptions = {
          from: 'mailjas4us@gmail.com',
          //to: 'cslifisat17@gmail.com',
          to:emailId,
          // to:details["uname"],
          // subject: 'Sending Email using Node.js',
          subject:sub,
          // text: 'That was easy!'
          text:des
        };
        transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
        });
      
    }


    //insert module
app.post('/onaddmoduleser',urlencodedParser,function(req,res,next){
  console.log('jjini');
  var m=JSON.stringify(req.body);
  dataKey=JSON.parse(m);
  // console.log("m in module : "+m["moduleType"]);
  pool.connect(function(err,client,done){

/////////sequence////
//mid
client.query('SELECT * from modidnewf()',function(err,result){
  if (err) {
                console.log(err);
                return;
            } else {
              //console.log("select compid : "+JSON.stringify(result.rows[0]["compl_id"]));
              
              md=JSON.stringify(result.rows[0]["modidnewf"]);
              md ="m"+md.replace(/^"(.*)"$/, '$1');
              console.log("mid1 : "+md);
              var m1=dataKey["moduleType"];
              console.log("jinnni md  "+m1);
              var v=[];
              v.push(md,m1);
              //return md;
              client.query('insert into public."ssSoftwareModules"("moduleId", "moduleType")values($1,$2)',v,function(err,result){
                if(err)
                       console.log(err);
              })
                //console.log('row inserted with id: ' + result.rows[0].id);
            }
})  


  }) 
}
)

///insert new complaint

//insert module
app.post('/onaddcomplser',urlencodedParser,function(req,res,next){
  console.log('jjini');
  var n=JSON.stringify(req.body);
  dataKey=JSON.parse(n);
  // console.log("m in module : "+m["moduleType"]);
  pool.connect(function(err,client,done){

    var m1=dataKey["complaintType"];
    console.log("jinnni md  "+m1);
    client.query('SELECT * from compidnewf()',function(err,result){
      if (err) {
                    console.log(err);
                    return;
                } else {
                  //console.log("select compid : "+JSON.stringify(result.rows[0]["compl_id"]));
                  cid="comp";
                  cid+=JSON.stringify(result.rows[0]["compidnewf"]);
                  console.log("cid : "+cid);
                  console.log("mid2 : "+cid);
                  var v=[];
                 // var a='m10';
                  v.push(cid,m1);
                 //console.log("ddddddd"+v);
                 // 'insert into public."ssSoftwareModules"("moduleId", "moduleType")VALUES("m15","hjkk")'
                  client.query('insert into public."ssSoftwareComplaint"("complaintTypeId","complaintType")values($1,$2)',v,function(err,result){
                    if(err)
                           console.log(err);
                  })
                  //return cid;
                    //console.log('row inserted with id: ' + result.rows[0].id);
                }
    }) 
  

  
  })
})

app.get('/ldapLogin:userData',function(req,res,next){
var d=JSON.parse(req.params.userData);
console.log("d : "+d.userName+d.password);
var userName=d.userName;
var resp;
var password=d.password;
var staffName;
var personalId;
var ldap_server = ldap.createClient({url: 'ldap://cim.fisat.edu'});
var dn='uid='+userName+',ou=Users,dc=fisat,dc=edu';
console.log("DN=================> : "+dn);
ldap_server.bind(dn, password, function(err) {
  if (err) {
    console.log('LDAP binding failed... disconnecting',err);
    resp={"msg":0};
    res.send(resp);
  }else{
   
   console.log("Bind Success");
    //query to get username



      pool.connect(function (err,client,done){
        client.query('select personalid,fullname FROM public."hrmbasicinfo" where empcode=$1',[userName], function (err, result) {
          done();
          if (err)
            console.log("not found");
          else
            console.log("here is"+result.rows[0]["personalid"]+result.rows[0]["fullname"]);
            personalId=result.rows[0]["personalid"];
            staffName=result.rows[0]["fullname"];
            resp={"staffName":staffName,
                  "personalId":personalId};
            console.log(resp);
            res.send(resp);
        })
       
      })
  
  
  }
});

})

///////////////////////////////////////Unread Count////////////////////////////////////////////////////////////////
app.get('/unreadCount',function(req,res,next){
  var unread='Unread';
  
 
  pool.connect(function (err, client, done) {
  
    client.query('select count("adminStatus") from public."ssComplaintMaster" where "adminStatus"=$1',[unread], function (err, result) {
              done();
              if (err)
                  res.send(err)
               
              //res.json(result.rows);
              
              console.log("Unread count : "+JSON.stringify(result.rows));
              res.json(result.rows);


           
 });

 })
});
///////////////////////////////////////Unread Count End///////////////////////////////////////////////////////////

///////////////////////////////////////Processing Count////////////////////////////////////////////////////////////////
app.get('/processingCount',function(req,res,next){
  var proCount='Processing';
  
 
  pool.connect(function (err, client, done) {
  
    client.query('select count("adminStatus") from public."ssComplaintMaster" where "adminStatus"=$1',[proCount], function (err, result) {
              done();
              if (err)
                  res.send(err)
               
              //res.json(result.rows);
              
              console.log("Processing count : "+JSON.stringify(result.rows));
              res.json(result.rows);


           
 });

 })
});
///////////////////////////////////////Processing Count End///////////////////////////////////////////////////////////

///////////////////////////////////////Completed Count////////////////////////////////////////////////////////////////
app.get('/completeCount',function(req,res,next){
  var completedCount='Completed';
  
 
  pool.connect(function (err, client, done) {
  
    client.query('select count("adminStatus") from public."ssComplaintMaster" where "adminStatus"=$1',[completedCount], function (err, result) {
              done();
              if (err)
                  res.send(err)
               
              //res.json(result.rows);
              
              console.log("Completed count : "+JSON.stringify(result.rows));
              res.json(result.rows);


           
 });

 })
});
///////////////////////////////////////Completed Count End///////////////////////////////////////////////////////////

///////////////////////////////////////Closed Count////////////////////////////////////////////////////////////////
app.get('/closedCount',function(req,res,next){
  var closedCount='Closed';
  
 
  pool.connect(function (err, client, done) {
  
    client.query('select count("adminStatus") from public."ssComplaintMaster" where "adminStatus"=$1',[closedCount], function (err, result) {
              done();
              if (err)
                  res.send(err)
               
              //res.json(result.rows);
              
              console.log("Closed count : "+JSON.stringify(result.rows));
              res.json(result.rows);


           
 });

 })
});



   

/////////////////////////////////////////////////////////////////RemoveCompletedComplaintAfter5Days/////////////////////////
app.get('/gettingTheAdmin_StaffStatusUpdatedForClose',function(req,res,next){
  console.log('inside remove complaint');
  console.log("username : "+JSON.stringify(req.body));
 
  pool.connect(function(err,client,done){
    client.query('update public."ssComplaintMaster" set "adminStatus"=$1,"staffStatus"=$2 where (current_date::date-"complaintDate"::date)>5 and "adminStatus"=$3',["Closed","Closed","Completed"],function(err,result){
      if (err) {
                    console.log(err);
                    return;
                } else {
                  var msg="successfully updated!!!";
                  res.json(msg);
                }
    }) 
  })
})
/////////////////////////////////////////////////////////////////RemoveCompletedComplaintAfter5Days END/////////////////////////

app.listen(3000);
console.log('Listening on port 3000...');