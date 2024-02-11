const express = require('express');
const moment = require('moment-timezone');
const { isLoggedIn } = require('../middlewares/index.js');
const {
	addNewTaskSubmission,
	getAllTaskSubmissions,
	deleteTaskSubmission,
	getOneTaskSubmission,
} = require('../database_queries/task_submissions_queries.js');
const router = express.Router();

router.post('/submissions', isLoggedIn, async (req, res) => {
	let taskID = req.params.taskID;
	let body = req.body;
	try {
		let submission = await addNewTaskSubmission(
			req.user.userID,
			taskID,
			body.submissionMessage
		);
		if (submission) {
			res.status(200).json({
				message: 'submission Added!',
			});
		} else {
			res.status(500).json({
				message: 'Something bad happened!',
			});
		}
	} catch (e) {
		res.status(500).json({
			message: e,
		});
	}
});

router.get('/submissions', async (req, res) => {
	let taskID = req.params.taskID;
	try {
		let submissions = await getAllTaskSubmissions(taskID);
		let formattedSubmissions = submissions.map((row) => {
			return {
				...row,
				submissionDate: moment(row.submissionDate)
					.tz('africa/cairo')
					.format('DD MMM yyyy, h:mm a'),
			};
		});
		if (submissions) {
			res.status(200).json({
				data: formattedSubmissions,
			});
		} else {
			res.status(404).json({
				message: 'no submissions found',
			});
		}
	} catch (e) {
		res.status(500).json({
			message: e,
		});
	}
});

router.delete('/:submissionID', isLoggedIn, async (req, res) => {
	const submissionID = req.params.submissionID;
	try {
		let submission = await deleteTaskSubmission(submissionID);
		if (submission) {
			res.status(200).json({
				message: 'submission deleted!',
			});
		}
	} catch (e) {
		res.status(500).json({
			message: e,
		});
	}
});

router.get('/submissions/user', async (req, res) => {
	let authorID = req.user.userID;
	try {
		if (submission) {
			let submission = await getOneTaskSubmission(authorID);
			let formattedSubmission = {
				...submission,
				submissionDate: moment(submission.submissionDate)
					.tz('africa/cairo')
					.format('DD MMM yyyy, h:mm a'),
			};
			res.status(200).json({
				data: formattedSubmission,
			});
		} else {
			res.status(404).json({
				message: 'no submissions found',
			});
		}
	} catch (e) {
		res.status(500).json({
			message: e,
		});
	}
});

module.exports = router;
