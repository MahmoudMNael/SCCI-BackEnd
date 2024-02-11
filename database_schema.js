const pool = require('./database_connection.js');

async function createDatabaseSchema() {
	try {
		await pool.execute(`
			CREATE TABLE IF NOT EXISTS Users (
				userID INT AUTO_INCREMENT PRIMARY KEY,
				userFullName VARCHAR(255) NOT NULL,
				userEmail VARCHAR(255) NOT NULL UNIQUE,
				password TEXT NOT NULL,
				salt TEXT NOT NULL,
				userType ENUM('Admin', 'HR', 'Participant', 'AC', 'Head', 'Head AC', 'Member') NOT NULL,
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
		await pool.execute(`
			CREATE TABLE IF NOT EXISTS Announcements (
				announcementID INT AUTO_INCREMENT PRIMARY KEY,
				authorID INT NOT NULL,
				announcementMessage TEXT NOT NULL,
				announcementDate DATETIME DEFAULT CURRENT_TIMESTAMP,
				announcementType ENUM('General', 'Appsplash', 'Techsolve', 'Investeneur', 'Devology', 'Markative'),
				FOREIGN KEY (authorID) REFERENCES Users(userID)
			);
		`);
		await pool.execute(`
			CREATE TABLE IF NOT EXISTS Tasks (
				taskID INT AUTO_INCREMENT PRIMARY KEY,
				authorID INT NOT NULL,
				taskMessage TEXT NOT NULL,
				taskDate DATETIME DEFAULT CURRENT_TIMESTAMP,
				taskDeadline DATETIME NOT NULL,
				taskWorkshop ENUM('Appsplash', 'Techsolve', 'Investeneur', 'Devology', 'Markative'),
				FOREIGN KEY (authorID) REFERENCES Users(userID)
			);
		`);
		await pool.execute(`
			CREATE TABLE IF NOT EXISTS TaskSubmissions (
				submissionID INT AUTO_INCREMENT PRIMARY KEY,
				authorID INT NOT NULL,
				taskID INT NOT NULL,
				submissionMessage TEXT NOT NULL,
				submissionDate DATETIME DEFAULT CURRENT_TIMESTAMP,
				FOREIGN KEY (authorID) REFERENCES Users(userID),
				FOREIGN KEY (taskID) REFERENCES Tasks(taskID)
			);
		`);
	} catch (e) {
		console.error(e);
	}
}

module.exports = {
	createDatabaseSchema,
};
