
var {MongoClient,ObjectId} = require('mongodb');
var url = "mongodb://localhost:27017/";

    function myfunc(){
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var database = db.db("emaildb");
        database.collection("mail").find({status:'active'}).toArray((err,result)=>{
        if(err) throw err
        var a=""
      
       for(let i=0;i<result.length;i++){
        //    console.log(result[i].last_updatedtime)
        var a=result[i].from
        var b=result[i].password
        var c=result[i].to
        var g=result[i].subject
        var e=result[i].text
        var f=result[i].freq
       
           const d = new Date();
           d.setHours(d.getHours() + 5);
           d.setMinutes(d.getMinutes() + 30); 
           let time = d.toISOString();
           console.log(d)
          //  console.log(result[i].freq)
           if(result[i].freq == "once only"){
            var d1= new Date(result[i].last_updatedtime);
            console.log(d1)
            }
           if(result[i].freq == "1 hour"){
             var d1= new Date(result[i].last_updatedtime);
             d1.setHours(d1.getHours()+1)
             console.log(d1)
           }
            if(result[i].freq == "2 hour"){
            var d1= new Date(result[i].last_updatedtime);
            d1.setHours(d1.getHours()+2)
            console.log(d1)
          }
           if(result[i].freq == "3 hour"){
            var d1= new Date(result[i].last_updatedtime);
            d1.setHours(d1.getHours()+3)
            console.log(d1)
          }
             if(result[i].freq == "4 hour"){
            var d1= new Date(result[i].last_updatedtime);
            d1.setHours(d1.getHours()+4)
            console.log(d1)
            }
            if(d1<=d){
                console.log('condition satisfied')
                var nodemailer = require('nodemailer');
                var transporter = nodemailer.createTransport({
              service: 'gmail',
              auth: {
                user: a,
                pass: b
              }
            });
            
            console.log(a)
            var mailOptions = {
              from: a,
              to:  c,
              subject: g,
              text: e
            };
            
            transporter.sendMail(mailOptions, function(error, info){
              if (error) {
                console.log(error);
              } else {
                console.log('Email sent: ' + info.response);
                if(result[i].freq=='once only')
                {
                const d2 = new Date();
                d2.setHours(d2.getHours() + 5); 
                d2.setMinutes(d2.getMinutes() + 30);
                var time = d2.toISOString(); 
                var oldvalue ={last_updatedtime :result[i].last_updatedtime }
                var newvalue = {$set: {last_updatedtime : time ,status : "Inactive"} };
                database.collection("mail").updateOne(oldvalue, newvalue, function(err, res) {
                if (err) throw err;
                 console.log(res);
            
                    });
                }
                else{
                    const d3 = new Date();
                    d3.setHours(d3.getHours() + 5); 
                    d3.setMinutes(d3.getMinutes() + 30);
                    var time = d3.toISOString(); 
                    var oldvalue ={last_updatedtime :result[i].last_updatedtime }
                    var newvalue = {$set: {last_updatedtime : time } };
                    database.collection("mail").updateOne(oldvalue, newvalue, function(err, res) {
                    if (err) throw err;
                     console.log(res);
                
                        });
                    
                }

              }
           
            });

            }     
  }})
})
    }
    
    setInterval(() => {
      myfunc()
  },5000);


 