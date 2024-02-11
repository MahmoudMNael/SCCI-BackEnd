const pool = require('../database_connection.js');

async function addNewTask(authorID, taskMessage, taskDeadline, taskWorkshop) {
	let [result] = await pool.execute(
		`
		INSERT INTO Tasks (authorID, taskMessage, taskDeadline, taskWorkshop)
		VALUES (?, ?, ?, ?)
		`,
		[authorID, taskMessage, taskDeadline, taskWorkshop]
	);

	return result;
}

async function getAllTasks(taskWorkshop) {
	let [rows] = await pool.execute(
		`
		SELECT taskID, Users.userFullName as authorName, taskMessage, taskDate, taskDeadline FROM Tasks
		JOIN Users ON Tasks.authorID=Users.userID
		WHERE taskWorkshop=? ORDER BY taskDate DESC
	`,
		[taskWorkshop]
	);

	if (rows !== undefined) {
		return rows;
	} else {
		return 0;
	}
}

async function deleteTask(taskID) {
	let [result] = await pool.execute(
		`
		DELETE FROM Tasks WHERE taskID=?
	`,
		[taskID]
	);
	if (result !== undefined) {
		return result;
	} else {
		return 0;
	}
}

async function updateTask(taskID, taskMessage, taskDeadline) {
	let [result] = await pool.execute(
		`
	UPDATE Tasks SET taskMessage=?, taskDeadline=? WHERE announcementID=?
	`,
		[taskMessage, taskDeadline, taskID]
	);
	if (result !== undefined) {
		return result;
	} else {
		return 0;
	}
}

async function getOneTask(taskID) {
	let [[result]] = pool.execute(
		`
	SELECT taskID, Users.userFullName as authorName, taskMessage, taskDate, taskDeadline FROM Tasks
	JOIN Users ON Tasks.authorID=Users.userID
	WHERE taskID=? ORDER BY taskDate DESC
	`,
		[taskID]
	);

	return result;
}

module.exports = {
	addNewTask,
	getAllTasks,
	deleteTask,
	updateTask,
	getOneTask,
};
