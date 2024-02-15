const express = require('express');
const {
	addNewAnnouncement,
	getAllAnnouncements,
	deleteAnnouncement,
	updateAnnouncement,
	getOneAnnouncement,
} = require('../database_queries/announcements_queries.js');
const moment = require('moment-timezone');
const { isLoggedIn } = require('../middlewares/index.js');
const router = express.Router();

router.post('/:announcementType', isLoggedIn, async (req, res) => {
	let body = req.body;
	try {
		let announcement = await addNewAnnouncement(
			req.user.userID,
			body.announcementMessage,
			req.params.announcementType
		);
		if (announcement) {
			res.status(200).json({
				message: 'Announcement Added!',
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

router.get('/:announcementType', async (req, res) => {
	try {
		let announcements = await getAllAnnouncements(req.params.announcementType);
		let formattedAnnouncements = announcements.map((row) => {
			return {
				...row,
				announcementDate: moment(row.announcementDate)
					.tz('africa/cairo')
					.format('DD MMM yyyy, h:mm a'),
			};
		});
		if (announcements) {
			res.status(200).json(formattedAnnouncements);
		} else {
			res.status(404).json({
				message: 'no announcements found',
			});
		}
	} catch (e) {
		res.status(500).json({
			message: e,
		});
	}
});

router.delete('/:announcementID', isLoggedIn, async (req, res) => {
	const announcementID = req.params.announcementID;
	try {
		let announcement = await deleteAnnouncement(announcementID);
		if (announcement) {
			res.status(200).json({
				message: 'announcement deleted!',
			});
		}
	} catch (e) {
		res.status(500).json({
			message: e,
		});
	}
});

router.put('/:announcementID', isLoggedIn, async (req, res) => {
	const announcementID = req.params.announcementID;
	const announcementMessage = req.body.announcementMessage;
	try {
		let announcement = await updateAnnouncement(
			announcementID,
			announcementMessage
		);
		if (announcement) {
			res.status(200).json({
				message: 'announcement updated!',
			});
		}
	} catch (e) {
		res.status(500).json({
			message: e,
		});
	}
});

router.get('/one/:announcementID', async (req, res) => {
	const announcementID = req.params.announcementID;
	try {
		let announcement = await getOneAnnouncement(announcementID);
		let formattedAnnouncement = {
			...announcement,
			announcementDate: moment(announcement.taskDate)
				.tz('africa/cairo')
				.format('DD MMM yyyy, h:mm a'),
		};
		if (announcement) {
			res.status(200).json(formattedAnnouncement);
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
