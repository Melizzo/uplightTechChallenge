const express = require('express');
const app = express();
const bodyParser = require('body-parser'); 
app.use(bodyParser.json()); 
// installed hash.js for encryption
var hash = require('hash.js')
const key = "thisIsASuperSecureKeyUplight"

app.set('port', process.env.PORT || 8080);
app.locals.title = 'HMAC Auth';

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on http://localhost:${app.get('port')}.`);
});

app.post('/', (request, response) => {
  const requestData = request.body;
  console.log(requestData)
  const finalHash = hash.sha256().update(key).digest(requestData)
  const createToken = toHexString(finalHash)
  
  const originalRequest = Object.values(requestData)
  response.send(`id=${originalRequest}={${createToken}}`)
});

function toHexString(byteArray) {
  return Array.from(byteArray, function(byte) {
    return ('0' + (byte & 0xFF).toString(16)).slice(-2);
  }).join('')

}