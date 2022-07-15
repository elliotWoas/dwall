const express = require('express')
const fs = require('fs');
const { MongoClient } = require('mongodb');
const app = express();
const port = 3000;

const url = 'mongodb+srv://heftekharm:N2EObillaaFn6wjp@cluster0.02kqj.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(url);

connectDb();
app.use(express.json());

app.get('/wall', function (req, res) {//returns all messages
  let messages=getMessagesFromDb();
  res.json(messages);
})

app.post('/wall/register', async function(req,res){// writes a new message submitted by a user
  let email = req.body.email;
  await registerUser(email);
  res.json({
    "status":"User is registerd"   
  })
})

app.get('/wall/:username',function (req,res){//returns messages written by a user
  let username = req.params.username;
  let userMessages=getMessagesFromDb(username);
  let response={};
  response[username]=userMessages;
  res.json(response);
})

app.post('/wall/:username',function(req,res){// writes a new message submitted by a user
  let username = req.params.username;
  let message = req.body.msg;
  writeMessageToDb(username,message);
  res.json({
    "status":"Your message was written on the databse"   
  })
})

app.delete('/wall/:username',function(req,res){// deletes a user messages
 
  let jsonDatabase=readDatabaseAsJson();  
  
  jsonDatabase[username]=[];
  
  fs.writeFileSync('database.json', JSON.stringify(jsonDatabase));
 
  res.json({
    "status":"Your message was written on the databse"   
  })

})

app.listen(port, () => {
  console.log(`DiaryOnWall app listening on port ${port}`)
})


function writeMessageToDb(username,message){//writes a message to the database
  let jsonDatabase=readDatabaseAsJson();
  
  let userMessages=jsonDatabase[username];

  if(userMessages == null){
    userMessages=[];   
  }
  
  userMessages.push(message);
  
  jsonDatabase[username]=userMessages;
  
  fs.writeFileSync('database.json', JSON.stringify(jsonDatabase));
}

function getMessagesFromDb(username){// get messages from the database 
  let jsonDatabase=readDatabaseAsJson();

  if(username==null) return jsonDatabase;
  
  let userMessages=jsonDatabase[username];

  if(userMessages == null){
    userMessages=[];   
  }

  return userMessages;
  
}

function readDatabaseAsJson(){
  let jsonDatabase = null;
  try{
    let rawDatabase = fs.readFileSync('database.json');
    jsonDatabase = JSON.parse(rawDatabase);  
  }catch(e){
    jsonDatabase={};
  }
  return jsonDatabase;
}

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