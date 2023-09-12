let middlewareObj = {};

middlewareObj.isLoggedIn = (req, res, next) => {
	if (req.isAuthenticated()) {
		next();
	} else {
		res.status(403).json({
			code: 403,
			message: "Not Logged In",
		});
	}
};

middlewareObj.isAdmin = (req, res, next) => {
	if (req.user.userType == "Admin") {
		next();
	} else {
		res.status(403).json({
			code: 403,
			message: "Not Authorized as Admin",
		});
	}
};

export { middlewareObj };
