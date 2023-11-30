import { pool } from "../database_connection.js";
import { encryptPassRandomSalt } from "../encryption.js";

// get all registered users
export async function getAllUsers() {
	const [rows] = await pool.execute("SELECT * FROM Users");
	return rows;
}

// get specific user by username (primary_key)
export async function getUser(email) {
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

// create admin
export async function createAdminAccount(fullName, email, password) {
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
export async function getAllUsersByUserType(type) {
	const [rows] = await pool.execute(
		`SELECT userID, userFullName, userEmail, userType, userWorkshop FROM Users WHERE userType = ?`,
		[type]
	);
	if (rows !== undefined) {
		return rows;
	} else {
		return 0;
	}
}

// get all participants of a workshop
export async function getAllParticipantsByWorkshop(workshop) {
	const [rows] = await pool.execute(
		`SELECT userID, userFullName, userEmail, userType, userWorkshop FROM Users WHERE userType = 'Participant' AND userWorkshop = ?`,
		[workshop]
	);
	if (rows !== undefined) {
		return rows;
	} else {
		return 0;
	}
}

// create user
export async function createUserAccount(
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
