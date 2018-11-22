const express = require('express')
const bodyParser = require('body-parser') 
const cors = require('cors')
const path = require('path')

// const port = process.env.PORT || 3000;

const api = require('./routes/api')
const app = express()
app.use(cors())

app.use(bodyParser.json())

app.use('/api', api)
app.use(express.static(path.join(__dirname, '../dist/ngApp')));

app.listen(process.env.PORT || 3000, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
  });