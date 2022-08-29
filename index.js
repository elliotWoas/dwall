const express = require('express')
const fs = require('fs');
var cors = require('cors')
const { MongoClient } = require('mongodb');
const app = express();
const port = 3000;

const url = 'mongodb+srv://heftekharm:N2EObillaaFn6wjp@cluster0.02kqj.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(url);

app.use(cors())
app.use(express.json());
app.use(async (req,res,next)=>{
  await connectDb();
  next();
});

app.post('/api/v1/register', async function(req,res){// registers a user
  let email = req.body.email;
  await registerUser(email);
  res.json({
    "status":"User is registerd"   
  })
});

app.listen(port, () => {
  console.log(`DiaryOnWall app listening on port ${port}`)
});

let db;

async function connectDb(){
  await client.connect();
  console.log('Connected successfully to server');
  db = client.db("dwall");
}

async function registerUser(email){
  console.log("registering "+ email);
  const collection = db.collection('users');
  collection.insertOne({
    "email":email
  });
}

module.exports = app;