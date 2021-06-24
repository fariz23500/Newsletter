
//jshint esversion: 6
const express=require("express");
const bodyParser=require("body-parser");
const request=require("request");
const app=express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res){
   res.sendFile(__dirname + "/signup.html")

}
);
app.post("/",function(req,res){
const firstName=req.body.fname;
const lastName=req.body.lname;
const email1=req.body.email;
const https=require("https");

var data={
  members: [
    {
      email_address: email1,
      status:"subscribed",
      skip_merge_validation:true,
      merge_fields:{
        FNAME:firstName,
        LNAME:lastName
      }
    }
  ]
};
var jsonData=JSON.stringify(data);
const url="https://us6.api.mailchimp.com/3.0/lists/ed179dfb18";
const options={
  method:"POST",
  auth:"fariz:400f839990da5b6faeb1f0b1bfcfc4dd-us6"
}
const request=https.request(url,options,function(response){
if(response.statusCode===200){

  res.sendFile(__dirname +"/success.html");}
  else{
    res.sendFile(__dirname +"/failure.html");
  }
  response.on("data",function(data){
    console.log(JSON.parse(data));
  })
});
request.write(jsonData);
request.end();
}
);
app.post("/failure",function(req,res){
  res.redirect("/");
});

app.listen( process.env.PORT || 3000 ,function(){
  console.log("server running at 3000");
}
);
// 400f839990da5b6faeb1f0b1bfcfc4dd-us6 APIkey
// ed179dfb18 LIst id
