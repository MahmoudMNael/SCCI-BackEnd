const express = require('express');
const passport = require('passport');
const session = require('express-session');
const mySQLSession = require('express-mysql-session');
const cors = require('cors');
const dotenv = require('dotenv');
const { createDatabaseSchema } = require('./database_schema.js');
const authRoutes = require('./routes/auth.js');
const adminAccRoutes = require('./routes/admin_acc.js');
const hrAccRoutes = require('./routes/hr_acc.js');
const announcementsRoutes = require('./routes/announcements.js');
const tasksRoutes = require('./routes/tasks.js');
const taskSubmissionsRoutes = require('./routes/task_submissions.js');

dotenv.config();

(async function () {
	await createDatabaseSchema();
})();

const MySQLStore = mySQLSession(session);

const options = {
	host: process.env.MYSQL_HOST,
	port: 3306,
	user: process.env.MYSQL_USER,
	password: process.env.MYSQL_PASSWORD,
	database: process.env.MYSQL_DATABASE,
};

const sessionStore = new MySQLStore(options);

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(
	session({
		key: 'session_cookie_name',
		secret: 'session_cookie_secret',
		store: sessionStore,
		resave: false,
		saveUninitialized: false,
	})
);
app.use(passport.authenticate('session'));
app.use('/app/24/api/auth', authRoutes);
app.use('/app/24/api/admin', adminAccRoutes);
app.use('/app/24/api/hr', hrAccRoutes);
app.use('/app/24/api/announcements', announcementsRoutes);
app.use('/app/24/api/tasks', tasksRoutes);
app.use('/app/24/api/tasks', taskSubmissionsRoutes);

app.get('/app/24', async (req, res) => {
	res.status(200).json({
		message: 'Welcome to the API',
	});
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
	console.log(`App has started on port ${port}`);
});
