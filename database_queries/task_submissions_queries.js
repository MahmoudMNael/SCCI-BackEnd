const pool = require('../database_connection.js');

async function addNewTaskSubmission(authorID, taskID, submissionMessage) {
	let [result] = await pool.execute(
		`
		INSERT INTO TaskSubmissions (authorID, taskID, submissionMessage)
		VALUES (?, ?, ?)
	`,
		[authorID, taskID, submissionMessage]
	);

	return result;
}

async function getAllTaskSubmissions(taskID) {
	let [rows] = await pool.execute(
		`
		SELECT submissionID, Users.userFullName as authorName, submissionMessage, submissionDate FROM TaskSubmissions
		JOIN Users ON TaskSubmissions.authorID=Users.userID
		WHERE taskID=? ORDER BY submissionDate DESC
	`,
		[taskID]
	);

	if (rows !== undefined) {
		return rows;
	} else {
		return 0;
	}
}

async function deleteTaskSubmission(submissionID) {
	let [result] = await pool.execute(
		`
		DELETE FROM TaskSubmissions WHERE submissionID=?
	`,
		[submissionID]
	);
	if (result !== undefined) {
		return result;
	} else {
		return 0;
	}
}

async function getOneTaskSubmission(authorID) {
	let [[result]] = await pool.execute(
		`
		SELECT submissionID, Users.userFullName as authorName, submissionMessage, submissionDate FROM TaskSubmissions
		JOIN Users ON TaskSubmissions.authorID=Users.userID
		WHERE authorID=? ORDER BY submissionDate DESC
	`,
		[authorID]
	);

	return result;
}

module.exports = {
	addNewTaskSubmission,
	getAllTaskSubmissions,
	deleteTaskSubmission,
	getOneTaskSubmission,
};
