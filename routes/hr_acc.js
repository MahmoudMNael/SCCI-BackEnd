const express = require("express");
const { isLoggedIn } = require("../middlewares/index.js");
const {
	getAllParticipantsByWorkshop,
} = require("../database_queries/users_queries.js");
const {
	addNewSessionOfWorkshop,
	addParticipantAttendanceToSession,
	getAllSessionsOfWorkshop,
	getAttendanceOfSession,
} = require("../database_queries/attendance_queries.js");
const moment = require("moment");
const router = express.Router();

// Get all participants of a certain workshop
router.get("/:workshop/participants", async (req, res) => {
	const users = await getAllParticipantsByWorkshop(req.params.workshop);
	if (!users) {
		res.status(500).json({
			message: `No users with this user type -> ${req.params.workshop}`,
		});
	} else {
		res.status(200).json({
			data: users,
		});
	}
});

// Get all sessions of a certain workshop
router.get("/sessions/:workshop", async (req, res) => {
	let sessions = await getAllSessionsOfWorkshop(req.params.workshop);

	if (!sessions || sessions.length == 0) {
		res.status(404).json({
			message: "Could not find any session data!",
		});
	} else {
		let formattedSessions = sessions.map((session) => {
			return {
				...session,
				sessionDate: moment(session.sessionDate).format("DD MMM yyyy"),
			};
		});
		res.status(200).json({
			data: formattedSessions,
		});
	}
});

// Get a certain session by ID
router.get("/session/:ID", async (req, res) => {
	let rows = await getAttendanceOfSession(req.params.ID);
	if (!rows || rows.length == 0) {
		res.status(404).json({
			message: "Could not find any session data!",
		});
	} else {
		let formattedRows = rows.map((row) => {
			return {
				...row,
				sessionDate: moment(row.sessionDate).format("DD MMM yyyy"),
			};
		});
		res.status(200).json({
			data: formattedRows,
		});
	}
});

// Post a new session to a certain workshop
router.post("/sessions/:workshop", async (req, res) => {
	const { sessionType, participants } = req.body;
	try {
		let session = await addNewSessionOfWorkshop(
			sessionType,
			req.params.workshop
		);
		for (let participant of participants) {
			console.log(participant);
			await addParticipantAttendanceToSession(session.insertId, participant);
		}
		res.status(200).json({
			message: "Session Added!",
		});
	} catch (error) {
		res.status(500).json({
			message: error,
		});
		console.log(error);
	}
});

module.exports = router;
