const expres = require('express')
const bodyParser = require('body-parser') 
const cors = require('cors')

// const port = process.env.PORT || 3000;

const api = require('./routes/api')
const app = expres()
app.use(cors())

app.use(bodyParser.json())

app.use('/api', api)
app.use(express.static(path.join(__dirname, '/dist')));

routes.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/index.html'));
  });

app.listen(process.env.PORT || 3000, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
  });