const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');

const { checkPollsLock } = require('./src/controllers/controller.clubs');

//Scheduler library
const cron = require('node-cron');

app.use(morgan('dev'));

require('dotenv').config();

const keys = require('./src/config/keys');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static('public'));

app.use(cors());

//Import routes
const clubs = require('./src/routes/routes.clubs');
const users = require('./src/routes/routes.users');
const books = require('./src/routes/routes.books');

cron.schedule('* * * * *', () => {
	checkPollsLock();
	console.log('Task is running for lock voting polls at ' + new Date());
});

app.listen(keys.PORT || keys.PORT, () => {
	console.log(`Server started at ${keys.PORT}`);

	//Connect to the database
	mongoose.Promise = global.Promise;
	mongoose.connect(
		keys.MONGO_URI,
		{
			useNewUrlParser: true,
			useUnifiedTopology: true,
		},
		(err, db) => {
			if (!err) {
				console.log('MongoDB Connected Successfully!!');
			} else {
				console.log(err);
			}
		},
	);
});

app.get('/', (req, res) => {
	res.send('index');
});

app.use('/clubs', clubs);
app.use('/users', users);
app.use('/books', books);
