const express = require('express')
const app = express()
const bodyParser = require('body-parser')
var path = require('path');

//Db connection
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://user:user@cluster0.1e7wu.mongodb.net/user?retryWrites=true&w=majority";
const client = new MongoClient(url, { useNewUrlParser: true }, {poolSize: 20},
    {socketTimeoutMS: 480000},
    {keepAlive: 300000},    
    { ssl: true },
    { sslValidate: false });


//parser 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', express.static(path.join(__dirname, 'public')))

app.get("/", (req, res) => {
    res.sendFile(__dirname+'/index.html');
});

app.get("/signin.html", (req, res) => {
    res.sendFile(__dirname+'/signin.html');
});

app.get("/product.html", (req, res) => {
    res.sendFile(__dirname+'/product.html');
});

app.listen(3000);

client.connect(err => {
    console.log('Connected to Database')
    // perform actions on the collection object
   
 
    app.post('/auth', (req, res) => {
        MongoClient.connect(url, function (err, db) {
            if (err) throw err;
            var dbo = db.db("user");
            dbo.collection("account").insertOne({
                name: req.body.name,
                password: req.body.password,
                phone: req.body.phone
            },
                function (err, result) {
                    if (err) throw err;
                    res.sendFile(__dirname + '/index.html');
                    db.close();
                   
                });
            
        })
        
    })
    
});



