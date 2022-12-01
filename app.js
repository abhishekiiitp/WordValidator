const express = require('express');
var bodyParser = require('body-parser')
const app = express();
const fetch = require('node-fetch');
var urlencodedParser = bodyParser.urlencoded({ extended: false })
  
app.get('/', (req, res) => 
{
  res.sendFile(__dirname + '/index.html');
});

const path = require('path')
app.use('/static', express.static(path.join(__dirname, 'public')))
    
app.post('/', urlencodedParser, (req, res) => 
{
  fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/`+req.body.word_name)
     .then((res) => res.json())
        .then((json) =>
         {
            console.log(json)
           if(json.message=="Sorry pal, we couldn't find definitions for the word you were looking for.")
           {
            // res.send({message: "NO"});
            res.sendFile('/failure.html', {root: __dirname });
           }
            
          else
          {
              // res.send({message: "YES"});
              res.sendFile('/success.html', {root: __dirname });
          }
            
          });
});
    
app.listen(3000);