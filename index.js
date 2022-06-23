const express = require('express')
const path = require('path');
const fs = require('fs');
const app = express()
const port = 3000

app.use(express.json());

app.get('/wall', function (req, res) {//returns all messages

})

app.get('/wall/:username',function (req,res){//returns messages written by a user

})

app.post('/wall/:username',function(req,res){// writes a new message submitted by a user

})

app.listen(port, () => {
  console.log(`DiaryOnWall app listening on port ${port}`)
})


function writeMessageToDb(username,message){//writes a message to the database
  
}

function getMessagesFromDb(username){// get messages from the database 
  
}