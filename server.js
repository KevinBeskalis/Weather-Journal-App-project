// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));


//Setup Server
const port = 8000;

app.get('/', (req, res) => {
    res.send(projectData);
})
app.post('/postData', (req, res) => {
    console.log(req.body)
    projectData = {
        temp: req.body.temp,
        date: req.body.date,
        content: req.body.content
    }
});

app.get('/getData', (req, res) =>{
   res.send(projectData)
})


app.listen(port, console.log(`Server is running on ${port}`));
