const validate = require("../middleware/validate.js");

const userSchema = require("../schemas/user.schema.js");
const userModel = require("../models/user.model.js");

function getUser(request, response) {
	const userId = request.params.user_id;
	const user = userModel.get(userId);

	response.json(user);
}

function createUser(request, response) {
	const newUser = userModel.create(request.body);
	if (!newUser) {
		throw new Error("Error creating user");
	}

	response.status(201).json(newUser);
}

function updateUser(request, response) {
	const userId = request.params.user_id;
	const updatedUser = userModel.update(userId, request.body);
	if (!updatedUser) {
		throw new Error("Error updating user");
	}

	response.status(200).json(updatedUser);
}

function deleteUser(request, response) {
	const userId = request.params.user_id;
	const deletedUser = userModel.delete(userId);
	if (!deletedUser) {
		throw new Error("Error deleting user");
	}

	response.status(200);
}

module.exports = {
	getUser: [getUser],
	createUser: [validate({ body: userSchema }), createUser],
	updateUser: [validate({ body: userSchema }), updateUser],
	deleteUser: [deleteUser],
};
