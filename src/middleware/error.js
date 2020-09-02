const { ValidationError } = require("express-json-validator-middleware");

module.exports = function errororMiddleware(error, request, response, next) {
	if (error instanceof ValidationError) {
		response.set("Content-Type", "application/problem+json");

		response.status(400).json({
			type: "https://example.com/validation-errors/user",
			title: "The request parameters were invalid.",
			invalid_properties: error.validationErrors.body.map((error) => {
				return {
					name: (error.dataPath || error.params.missingProperty).replace(
						".",
						""
					),
					reason: error.message,
				};
			}),
		});

		return next();
	}

	next(error);
};
