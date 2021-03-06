const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");

/* const { checkPollsLock } = require('./src/controllers/controller.clubs');
 */
//Scheduler library
/* const cron = require('node-cron');
 */
app.use(morgan("dev"));

require("dotenv").config();

const keys = require("./src/config/keys");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static("public"));

app.use(cors());

app.use(function (req, res, next) {
	res.header('Access-Control-Allow-Origin', 'https://www.booktubes.club'); // update to match the domain you will make the request from
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept',
	);
	next();
});

//Import routes
const clubs = require("./src/routes/routes.clubs");
const users = require("./src/routes/routes.users");
const books = require("./src/routes/routes.books");

/* cron.schedule('* * * * *', () => {
	checkPollsLock();
	console.log('Task is running for lock voting polls at ' + new Date());
});
 */

app.listen(process.env.PORT || keys.PORT, () => {
  console.log(`Server started at ${process.env.PORT}`);

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
        console.log("MongoDB Connected Successfully!!");
      } else {
        console.log(err);
      }
    }
  );
});

app.get("/", (req, res) => {
  res.send("index");
});

app.use("/clubs", clubs);
app.use("/users", users);
app.use("/books", books);
