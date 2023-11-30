import express from "express";
const router = express.Router();
import { getUser } from "../database_queries/users_queries.js";
import { isPasswordMatched } from "../encryption.js";
import passport from "passport";
import LocalStrategy from "passport-local";
import { middlewareObj } from "../middlewares/index.js";

// authentication:: local strategy creation with the verification
passport.use(
	new LocalStrategy(async function verify(email, password, cb) {
		const user = await getUser(email);
		if (user) {
			if (isPasswordMatched(user.password, user.salt, password)) {
				return cb(null, user);
			} else {
				console.log("Incorrect email or PASSWORD");
				return cb(null, false, {
					message: "Incorrect email or PASSWORD",
				});
			}
		} else {
			console.log("Incorrect email or password!");
			return cb(null, false, {
				message: "Incorrect email or password",
			});
		}
	})
);
passport.serializeUser(function (user, cb) {
	process.nextTick(function () {
		cb(null, { userID: user.userID, userType: user.userType });
	});
});

passport.deserializeUser(function (user, cb) {
	process.nextTick(function () {
		return cb(null, user);
	});
});
// end authentication

// routes for the authentication login and register and logout (POST)
router.post("/login", passport.authenticate("local"), (req, res) => {
	console.log(req.body);
	res.status(200).json({
		code: 200,
		message: "ok",
		data: {
			userID: req.user.userID,
			userFullName: req.user.userFullName,
			userEmail: req.user.userEmail,
			userType: req.user.userType,
			userWorkshop: req.user.userWorkshop,
		},
	});
});

router.get("/currentUser", middlewareObj.isLoggedIn, async (req, res) => {
	res.status(200).json({
		code: 200,
		data: {
			userID: req.user.userID,
			userFullName: req.user.userFullName,
			userEmail: req.user.userEmail,
			userType: req.user.userType,
			userWorkshop: req.user.userWorkshop,
		},
	});
});

router.post("/logout", (req, res, next) => {
	req.session.destroy((err) => {
		if (err) {
			console.log(err);
		} else {
			console.log("Logged out!");
			res.status(200).json({
				message: "Logged out!",
			});
		}
	});
});

export { router };
