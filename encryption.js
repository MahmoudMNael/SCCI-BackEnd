const crypto = require("node:crypto");

// hash a given password using a randomized salt
function encryptPassRandomSalt(password) {
	const salt = crypto.randomBytes(16).toString("hex");
	const hashedPassword = crypto
		.pbkdf2Sync(password, salt, 310000, 64, "sha512")
		.toString("hex");
	return { hashedPassword, salt };
}

// hash a given password with a given salt
function encryptPassWithSalt(password, salt) {
	const hashedPassword = crypto
		.pbkdf2Sync(password, salt, 310000, 64, "sha512")
		.toString("hex");
	return hashedPassword;
}

// check 2 passwords if they match
function isPasswordMatched(hashedPasswordDB, saltDB, password) {
	const hashed = encryptPassWithSalt(password, saltDB);
	return hashed === hashedPasswordDB;
}

module.exports = {
	encryptPassRandomSalt,
	encryptPassWithSalt,
	isPasswordMatched,
};
