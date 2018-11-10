const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const matches = require('./routes/api/matches');

const app = express();

//Bodyparser Middleware
app.use(bodyParser.json());

//DB Config
const db = require('./config/keys').mongoURI;

//Connect to Mongo
mongoose
	.connect(db)
	.then(() => console.log('MongoDB Connected...'))
	.catch((err) => console.log('Nope: ', err));

//Declare static files path
//app.use(express.static(buildDir));

if(process.env.NODE_ENV === 'production'){
	//Set static folder
	app.use(express.static('client/build'));

	app.get('/', (req, res) =>{
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	})
}

//Use routes
//First parameter is URL route, second is path var above
app.use(express.static('client/build'));

app.get('/', (req, res) =>{
	res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
})
app.use('/api/matches', matches);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}!`));



