const pool = require('../database_connection.js');

async function addNewAnnouncement(
	authorID,
	announcementMessage,
	announcementType
) {
	let [result] = await pool.execute(
		`
		INSERT INTO Announcements (authorID, announcementMessage, announcementType)
		VALUES (?, ?, ?)
		`,
		[authorID, announcementMessage, announcementType]
	);

	return result;
}

async function getAllAnnouncements(announcementType) {
	let [rows] = await pool.execute(
		`
		SELECT announcementID, Users.userFullName as authorName, announcementMessage, announcementDate FROM Announcements
		JOIN Users ON Announcements.authorID=Users.userID
		WHERE announcementType=? ORDER BY announcementDate DESC
	`,
		[announcementType]
	);

	if (rows !== undefined) {
		return rows;
	} else {
		return 0;
	}
}

async function deleteAnnouncement(announcementID) {
	let [result] = await pool.execute(
		`
		DELETE FROM Announcements WHERE announcementID=?
	`,
		[announcementID]
	);
	if (result !== undefined) {
		return result;
	} else {
		return 0;
	}
}

async function updateAnnouncement(announcementID, announcementMessage) {
	let [result] = await pool.execute(
		`
	UPDATE Announcements SET announcementMessage=? WHERE announcementID=?
	`,
		[announcementMessage, announcementID]
	);
	if (result !== undefined) {
		return result;
	} else {
		return 0;
	}
}

async function getOneAnnouncement(announcementID) {
	let [[result]] = await pool.execute(
		`
	SELECT announcementID, Users.userFullName as authorName, announcementMessage, announcementDate FROM Announcements
	JOIN Users ON Announcements.authorID=Users.userID
	WHERE announcementID=? ORDER BY announcementDate DESC
	`,
		[announcementID]
	);

	return result;
}

module.exports = {
	addNewAnnouncement,
	getAllAnnouncements,
	deleteAnnouncement,
	updateAnnouncement,
	getOneAnnouncement,
};
