var express=require('express');
var path=require('path');
var app=express();
var mysql=require('mysql');
var bodyParser=require('body-parser');


var conn=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"myweb",
    port:'5000'
})
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
//app.use(express.static(path.join(__dirname,"../public")));

app.get('/',function(req,res){
    res.sendFile(__dirname+"/menu.html");
});

app.get('/test1',function(req,res){
    res.sendFile(__dirname+"/modify.html");
})

app.post('/register1',function(req,res){
    var sname=req.body.sname;
    var email=req.body.emails;
    var city=req.body.city;
    var state=req.body.state;
    var age=req.body.age;

    conn.connect(function(err){
        var sql="insert into student(stud_name,email_id,city,state,age) values('"+sname+"','"+email+"','"+city+"','"+state+"','"+age+"')";
        conn.query(sql,function(err,register){
            if(err) throw err;
            console.log("Record Inserted");
            res.redirect('test1');
        });
    });

});
app.listen(5000);
console.log("Server Stated");