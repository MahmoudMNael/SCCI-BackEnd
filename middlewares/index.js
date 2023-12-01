const isLoggedIn = (req, res, next) => {
	if (req.isAuthenticated()) {
		next();
	} else {
		res.status(403).json({
			code: 403,
			message: "Not Logged In",
		});
	}
};

module.exports = { isLoggedIn };
