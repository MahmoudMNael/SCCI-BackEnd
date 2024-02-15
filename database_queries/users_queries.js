const pool = require('../database_connection.js');
const { encryptPassRandomSalt } = require('../encryption.js');

// get all registered users
async function getAllUsers() {
	const [rows] = await pool.execute('SELECT * FROM Users');
	return rows;
}

// get specific user by username (primary_key)
async function getUser(email) {
	const [[row]] = await pool.execute(
		`SELECT * FROM Users WHERE userEmail = ?`,
		[email]
	);
	if (row !== undefined) {
		return row;
	} else {
		return 0;
	}
}

async function getUserById(userID) {
	const [[row]] = await pool.execute(`SELECT * FROM Users WHERE userID = ?`, [
		userID,
	]);
	if (row !== undefined) {
		return row;
	} else {
		return 0;
	}
}

// create admin
async function createAdminAccount(fullName, email, password) {
	let result;
	const { hashedPassword, salt } = encryptPassRandomSalt(password);
	try {
		result = await pool.execute(
			`
			INSERT INTO Users (userFullName, userEmail, password, salt, userType)
			VALUES (?, ?, ?, ?, 'Admin')
		`,
			[fullName, email, hashedPassword, salt]
		);
	} catch (error) {
		console.log(error);
		return 0;
	}
	return result;
}

// get all users of certain type
async function getAllUsersByUserType(type) {
	const [rows] = await pool.execute(
		`SELECT userID, userFullName, userEmail, userType, userWorkshop FROM Users WHERE userType = ? ORDER BY userWorkshop, userFullName`,
		[type]
	);
	if (rows !== undefined) {
		return rows;
	} else {
		return 0;
	}
}

// get all participants of a workshop
async function getAllParticipantsByWorkshop(workshop) {
	const [rows] = await pool.execute(
		`SELECT userID, userFullName, userEmail, userType, userWorkshop FROM Users WHERE userType = 'Participant' AND userWorkshop = ? ORDER BY userFullName`,
		[workshop]
	);
	if (rows !== undefined) {
		return rows;
	} else {
		return 0;
	}
}

// create user
async function createUserAccount(
	fullName,
	email,
	password,
	userType,
	userWorkshop
) {
	let result;
	const { hashedPassword, salt } = encryptPassRandomSalt(password);
	result = await pool.execute(
		`
		INSERT INTO Users (userFullName, userEmail, password, salt, userType, userWorkshop)
		VALUES (?, ?, ?, ?, ?, ?)
	`,
		[fullName, email, hashedPassword, salt, userType, userWorkshop]
	);

	return result;
}

async function updateUser(fullName, email, userID) {
	let result;
	result = await pool.execute(
		`
	UPDATE Users SET userFullName=?, userEmail=? WHERE userID=?
	`,
		[fullName, email, userID]
	);

	return result;
}

module.exports = {
	getAllUsers,
	getUser,
	createAdminAccount,
	getAllUsersByUserType,
	getAllParticipantsByWorkshop,
	createUserAccount,
	getUserById,
	updateUser,
};
