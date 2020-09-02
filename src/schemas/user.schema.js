module.exports = {
	type: "object",
	required: ["first_name", "last_name", "age"],
	properties: {
		first_name: {
			type: "string",
			minLength: 1,
		},
		last_name: {
			type: "string",
			minLength: 1,
		},
		age: {
			type: "number",
		},
	},
};
