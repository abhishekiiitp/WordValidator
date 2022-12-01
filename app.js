const express = require('express');
var bodyParser = require('body-parser')
const app = express();
const fetch = require('node-fetch');
var urlencodedParser = bodyParser.urlencoded({ extended: false })
  
app.get('/', (req, res) => 
{
  res.sendFile(__dirname + '/index.html');
});
    
app.post('/', urlencodedParser, (req, res) => 
{
  fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/`+req.body.word_name)
     .then((res) => res.json())
        .then((json) =>
         {
            console.log(json)
           if(json.message=="Sorry pal, we couldn't find definitions for the word you were looking for.")
           {
            res.send({message: "NO"});
           }
            
          else
          {
              res.send({message: "YES"});
          }
            
          });
});
    
app.listen(3000);