var express = require('express');
var app = express();
app.use(express.json())
var bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
let cors = require("cors");
app.use(cors());
var {MongoClient,ObjectId} = require('mongodb');
var url = "mongodb://localhost:27017/";


app.post('/get_user', function (req, res) {
 
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("emaildb");
      var myobj=req.body;
      const d = new Date();
        d.setHours(d.getHours() + 5);
        d.setMinutes(d.getMinutes() + 30); 
        let time = d.toISOString();
        myobj.last_updatedtime=time
      

      myobj.status="active"
     
      // console.log(myobj)
      dbo.collection("mail").insertOne(myobj, function(err, res1) {
        //  console.log(res1)
        if (err) throw err;
        console.log("1 document inserted");
        db.close();
        res.send('user added');})})

})
var database

app.get('/',(req,res) => {

    database.collection('mail').find({}).toArray((err,result)=>{
        if(err) throw err
        res.send(result)  
  })
}
)

var server = app.listen(8084, function () {
  var host = server.address().address
  var port = server.address().port
  console.log("Example app listening at http://%s:%s", host, port)
})