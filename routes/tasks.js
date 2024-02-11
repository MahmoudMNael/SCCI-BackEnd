const express = require('express');
const moment = require('moment-timezone');
const { isLoggedIn } = require('../middlewares/index.js');
const {
	addNewTask,
	getAllTasks,
	deleteTask,
	updateTask,
	getOneTask,
} = require('../database_queries/tasks_queries.js');
const router = express.Router();

router.post('/:taskWorkshop', isLoggedIn, async (req, res) => {
	let body = req.body;
	try {
		let task = await addNewTask(
			req.user.userID,
			body.taskMessage,
			new Date(body.taskDeadline),
			req.params.taskWorkshop
		);
		if (task) {
			res.status(200).json({
				message: 'Task Added!',
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

router.get('/:taskWorkshop', async (req, res) => {
	try {
		let tasks = await getAllTasks(req.params.taskWorkshop);
		let formattedTasks = tasks.map((row) => {
			return {
				...row,
				taskDate: moment(row.taskDate)
					.tz('africa/cairo')
					.format('DD MMM yyyy, h:mm a'),
			};
		});
		if (tasks) {
			res.status(200).json({
				data: formattedTasks,
			});
		} else {
			res.status(404).json({
				message: 'no tasks found',
			});
		}
	} catch (e) {
		res.status(500).json({
			message: e,
		});
	}
});

router.delete('/:taskID', isLoggedIn, async (req, res) => {
	const taskID = req.params.taskID;
	try {
		let task = await deleteTask(taskID);
		if (task) {
			res.status(200).json({
				message: 'task deleted!',
			});
		}
	} catch (e) {
		res.status(500).json({
			message: e,
		});
	}
});

router.put('/:taskID', isLoggedIn, async (req, res) => {
	const taskID = req.params.taskID;
	try {
		let task = await updateTask(
			taskID,
			req.body.taskMessage,
			new Date(req.body.taskDeadline)
		);
		if (task) {
			res.status(200).json({
				message: 'task updated!',
			});
		}
	} catch (e) {
		res.status(500).json({
			message: e,
		});
	}
});

router.get('/one/:taskID', async (req, res) => {
	const taskID = req.params.taskID;
	try {
		let task = await getOneTask(taskID);
		let formattedTask = {
			...task,
			taskDate: moment(task.taskDate)
				.tz('africa/cairo')
				.format('DD MMM yyyy, h:mm a'),
		};
		if (task) {
			res.status(200).json({
				data: formattedTask,
			});
		} else {
			res.status(404).json({
				message: 'no tasks found',
			});
		}
	} catch (e) {
		res.status(500).json({
			message: e,
		});
	}
});

module.exports = router;
