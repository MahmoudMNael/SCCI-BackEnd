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

// register a new user
