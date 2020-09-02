/**
 * This is a fake user model for the purpose of this example application.
 *
 * Normally you would handle database interaction with a third-party library.
 */
module.exports = {
	get(userId) {
		return {
			first_name: "Rosa",
			last_name: "Parks",
			age: 42,
		};
	},
	create(user) {
		return user;
	},
	update(userId, user) {
		return user;
	},
};
