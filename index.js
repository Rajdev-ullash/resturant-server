const express = require('express')
const app = express()
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const ObjectID = require('mongodb').ObjectID;
require('dotenv').config();
const port = 5000;


app.use(cors());
app.use(bodyParser.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.q0wlb.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
console.log(uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const menuCollection = client.db("resturant").collection("menu");


  app.post('/addMenu', (req, res) =>{
      const menu = req.body;
      menuCollection.insertOne(menu)
      .then(result =>{
          console.log('inserted menu', result.insertedCount > 0);
          res.send(result.insertedCount > 0)
      })
  })

  app.get('/showMenu', (req, res) =>{
      menuCollection.find()
      .toArray((err, items) =>{
          res.send(items)
      })
  })
  // perform actions on the collection object
});


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(process.env.PORT || port);