var express=require('express');
var path=require('path');
var app=express();
var mysql=require('mysql');
var ejs=require('ejs');
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
var bodyParser=require('body-parser');


var conn=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"myweb"
    
})
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(express.static((__dirname+'/public')));
//app.use(express.static((__dirname+"/public")));
app.get('/',function(req,res){
    res.sendFile(__dirname+"/home.html");

});
app.get('/home',function(req,res){
    res.sendFile(__dirname+"/home.html");

});

app.get('/menu',function(req,res){
    res.sendFile(__dirname+"/menu.html");
});
app.get('/about_us', function(request, response) {
    response.sendFile(__dirname + '/about_us.html');
});



/*----------------------Contact Us----------------------*/
app.get('/contactus.html', function(request, response) {
    response.sendFile(__dirname + '/contactus.html');
});
app.post('/contactus',function(req,res){
    var name=req.body.name;
    var email=req.body.email;
    var mno=req.body.mno;
    var msg=req.body.msg;
    conn.connect(function(err){
        var sql="insert into contactFrm(name,email,mno,msg) values('"+name+"','"+email+"','"+mno+"','"+msg+"')";
        conn.query(sql,function(err,contactus){
            if(err) throw err;
            console.log("Record Inserted");
            res.redirect('contactus.html');
        });
    });

});

/*----------------------User registration----------------------*/

app.get('/test',function(req,res){
    res.sendFile(__dirname+"/register.html");
})

app.post('/register',function(req,res){
    var sname=req.body.sname;
    var addr=req.body.addr;
    var zip=req.body.zip;
    var email=req.body.email;
    var mno=req.body.mno;
    var city=req.body.city;
    var state=req.body.state;
    var country=req.body.country;
    var gender=req.body.gender;
    var dob=req.body.dob;
    var quali=req.body.quali;
    var course=req.body.course;

    conn.connect(function(err){
        var sql="insert into studreg(sname,addr,zip,email,mno,city,state,country,gender,dob,quali,course) values('"+sname+"','"+addr+"','"+zip+"','"+email+"','"+mno+"','"+city+"','"+state+"','"+country+"','"+gender+"','"+dob+"','"+quali+"','"+course+"')";
        conn.query(sql,function(err,register){
            if(err) throw err;
            console.log("Record Inserted");
            res.redirect('menu');
        });
    });

});


/*-------------Update Operation-------------*/
app.get('/test1',function(req,res){
    res.sendFile(__dirname+"/modify.html");
})
app.post('/updatedata',function(req,res){
    var id=req.body.sid;
    var sname=req.body.sname;
    var addr=req.body.addr;
    var zip=req.body.zip;
    var email=req.body.email;
    var mno=req.body.mno;

    conn.connect(function(err){
        var sql="update studreg set sname='"+sname+"',addr='"+addr+"',zip='"+zip+"',email='"+email+"',mno='"+mno+"' where id='"+id+"'";
        conn.query(sql,function(err,register){
            if(err) throw err;
            console.log("Record Updated");
            res.redirect('menu');
        });
    });

});


/*------------Delete record------------*/
app.get('/test2',function(req,res){
    res.sendFile(__dirname+"/Delete.html");
})
app.post('/deletedata',function(req,res){

    var id=req.body.id;

    conn.connect(function(err){
        var sql="delete from studreg where id='"+id+"'";
        conn.query(sql,function(err,register){
            if(err) throw err;
            console.log("Record Deleted");
            res.redirect('menu');
        });
    });

});
/*-------------------View operation-----------------*/

app.get('/test4',function(req,res){
    var sql="select * from studreg";
    conn.query(sql,function(err,rows){
        if(err) throw err;
        res.render('select',{
            studs:rows
        });
    });
});



app.get('/login.html', function(request, response) {
    response.sendFile(__dirname + '/login.html');
});

app.get('/test5', function(request, response) {
   response.sendFile(__dirname + '/logout.html');
  // req.logout();
  // res.redirect('/');
});

app.post('/auth', function(request, response) {
    var username = request.body.eid;
    var password = request.body.pass;
    if (username && password) {
        conn.query('SELECT * FROM loginfo WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
            if (results.length > 0) {
                
                response.redirect('/menu');
            } else {
                response.send('Incorrect Username and/or Password!');
            }           
            response.end();
        });
    } else {
        response.send('Please enter Username and Password!');
        response.end();
    }
});
app.listen(5000);
console.log("Server Stated");