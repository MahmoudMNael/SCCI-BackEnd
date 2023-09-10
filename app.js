import express from "express";
import passport from "passport";
import session from "express-session";
import mySQLSession from "express-mysql-session";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

// const MySQLStore = mySQLSession(session);

// const options = {
// 	host: process.env.MYSQL_HOST,
// 	port: 3306,
// 	user: process.env.MYSQL_USER,
// 	password: process.env.MYSQL_PASSWORD,
// 	database: process.env.MYSQL_DATABASE,
// };

// const sessionStore = new MySQLStore(options);

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
// app.use(
// 	session({
// 		key: "session_cookie_name",
// 		secret: "session_cookie_secret",
// 		store: sessionStore,
// 		resave: false,
// 		saveUninitialized: false,
// 	})
// );
// app.use(passport.authenticate("session"));

app.get("/", async (req, res) => {
	res.status(200).json({
		message: "Welcome to the API",
	});
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
	console.log(`App has started on port ${port}`);
});
