const express = require("express");
const router = express.Router();
const {
	createAdminAccount,
	createUserAccount,
	getAllUsersByUserType,
} = require("../database_queries/users_queries.js");
const { isLoggedIn } = require("../middlewares/index.js");

// Create admin account not implemented in application
router.post("/account", async (req, res) => {
	let { fullName, email, password } = req.body.data;

	const user = await createAdminAccount(fullName, email, password);
	if (!user) {
		res.status(500).json({
			message: "An account already exists with this Email.",
		});
	} else {
		res.status(200).json({
			message: `Account created successfully`,
		});
	}
});

// get all accounts of a certain userType
router.get("/accounts/:type", async (req, res) => {
	const users = await getAllUsersByUserType(req.params.type);
	if (!users) {
		res.status(500).json({
			message: `No users with this user type -> ${req.params.type}`,
		});
	} else {
		res.status(200).json({
			data: users,
		});
	}
});

// Create a new account
router.post("/account/create", async (req, res) => {
	const users = req.body;
	try {
		for (let user of users) {
			await createUserAccount(
				user.userFullName,
				user.userEmail.toLowerCase(),
				user.userPass,
				user.userType,
				user.userWorkshop
			);
		}
		res.status(200).json({
			message: "Users Created!",
		});
	} catch (error) {
		res.status(500).json({
			message: error,
		});
		console.log(error);
	}
});

module.exports = router;
