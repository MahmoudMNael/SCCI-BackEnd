const pool = require("../database_connection.js");

// get all weekly sessions
async function getAllSessionsOfWorkshop(sessionWorkshop) {
	const [rows] = await pool.execute(
		"SELECT * FROM WeeklySessions WHERE sessionWorkshop = ? ORDER BY sessionDate DESC",
		[sessionWorkshop]
	);
	if (rows !== undefined) {
		return rows;
	} else {
		return 0;
	}
}

// add a new session attendance
async function addNewSessionOfWorkshop(sessionType, sessionWorkshop) {
	let [result] = await pool.execute(
		`
		INSERT INTO WeeklySessions (sessionType, sessionWorkshop)
		VALUES (?, ?)
		`,
		[sessionType, sessionWorkshop]
	);

	return result;
}

// Add participant attendance either attended or not to a session by id
async function addParticipantAttendanceToSession(sessionID, participant) {
	let result = await pool.execute(
		`
		INSERT INTO Attendance (sessionID, participantID, attended)
		VALUES (?, ?, ?)
		`,
		[sessionID, participant.userID, participant.attended]
	);

	return result;
}

// get all participants attendance in a certain session by ID
async function getAttendanceOfSession(sessionID) {
	let [rows] = await pool.execute(
		`
		SELECT 
    		WeeklySessions.sessionID,
   			WeeklySessions.sessionDate,
    		WeeklySessions.sessionType,
    		userID,
    		userFullName,
    		userEmail,
    		userType,
    		userWorkshop,
    		attended
		FROM
    		WeeklySessions
        JOIN
    		Attendance ON WeeklySessions.sessionID = Attendance.sessionID
        JOIN
    		Users ON Attendance.participantID = userID
		WHERE
    		WeeklySessions.sessionID = ?
		ORDER BY userFullName
		`,
		[sessionID]
	);

	if (rows !== undefined) {
		return rows;
	} else {
		return 0;
	}
}

module.exports = {
	getAllSessionsOfWorkshop,
	addNewSessionOfWorkshop,
	addParticipantAttendanceToSession,
	getAttendanceOfSession,
};
