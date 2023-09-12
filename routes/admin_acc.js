import express from "express";
const router = express.Router();
import { createAdminAccount } from "../database_queries/users_queries.js";

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

export { router };
