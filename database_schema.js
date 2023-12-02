const pool = require("./database_connection.js");

async function createDatabaseSchema() {
	try {
		await pool.execute(`
			CREATE TABLE IF NOT EXISTS Users (
				userID INT AUTO_INCREMENT PRIMARY KEY,
				userFullName VARCHAR(255) NOT NULL,
				userEmail VARCHAR(255) NOT NULL UNIQUE,
				password TEXT NOT NULL,
				salt TEXT NOT NULL,
				userType ENUM('Admin', 'HR', 'Participant') NOT NULL,
				userWorkshop ENUM('Appsplash', 'Techsolve', 'Investeneur', 'Devology', 'Markative')
			);
		`);
		await pool.execute(`
			CREATE TABLE IF NOT EXISTS WeeklySessions (
				sessionID INT AUTO_INCREMENT PRIMARY KEY,
				sessionDate DATETIME DEFAULT CURRENT_TIMESTAMP,
				sessionType ENUM('Technical', 'Softskills') NOT NULL,
				sessionWorkshop ENUM('Appsplash', 'Techsolve', 'Investeneur', 'Devology', 'Markative') NOT NULL
			);
		`);
		await pool.execute(`
			CREATE TABLE IF NOT EXISTS Attendance (
				sessionID INT NOT NULL,
				participantID INT NOT NULL,
				attended BOOLEAN NOT NULL,
				PRIMARY KEY (sessionID, participantID),
				FOREIGN KEY (sessionID) REFERENCES WeeklySessions(sessionID),
				FOREIGN KEY (participantID) REFERENCES Users(userID)
			);
		`);
	} catch (e) {
		console.error(e);
	}
}

module.exports = {
	createDatabaseSchema,
};
