const createHttpError = require("http-errors");
const { ValidationError } = require("express-json-validator-middleware");

const defaultProblemDetails = {
	/**
	 * This is the only URI reserved as a problem type in the
	 * problem details spec. It indicates that the problem has
	 * no additional semantics beyond that of the HTTP status code.
	 */
	type: "about:blank",
	status: 500,
};

const problemTypes = [
	{
		matchErrorClass: createHttpError.BadRequest,
		details: {
			type: "https://example-api.com/problem/invalid-user-id",
			title: "User ID must be a number",
			status: 400,
		},
	},
	{
		matchErrorClass: ValidationError,
		details: {
			type: "https://example-api.com/problem/invalid-user-object",
			title: "Invalid user object in request body",
			status: 422,
		},
		occurrenceDetails(error) {
			return {
				invalid_params: error.validationErrors
			};
		}
	}
];

/**
 * Get the problem details which have been defined for an error.
 *
 * @param {Error} error
 * @return {Object} - Problem details (type, title, status)
 */
function getProblemDetailsForError(error) {
	const problemType = problemTypes.find((problemType) => {
		/**
		 * Test if the error object is an instance of the error
		 * class specified by the problem type.
		 *
		 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/instanceof
		 */
		return error instanceof problemType.matchErrorClass;
	});

	if (!problemType) {
		/**
		 * A problem type hasn't been defined for the type of error 
		 * this function has received so return fallback problem details.
		 */
		return defaultProblemDetails;
	}

	const problemDetails = { ...problemType.details };

	if (typeof problemType.occurrenceDetails === "function") {
		Object.assign(problemDetails, problemType.occurrenceDetails(error));
	}

	return problemDetails;
}

/**
 * Send an error response using the problem details format.
 *
 * @see https://tools.ietf.org/html/rfc7807
 *
 * @param {Error} error
 * @param {Object} request - Express request object
 * @param {Object} response - Express response object
 * @param {Function} next - Express callback function
 */
function problemDetailsResponseMiddleware(
	error,
	request,
	response,
	next
) {
	/**
	 * If response headers have already been sent,
	 * delegate to the default Express error handler.
	 */
	if (response.headersSent) {
		return next(error);
	}

	const problemDetails = getProblemDetailsForError(error);

	/**
	 * If the problem details don't contain an HTTP status code,
	 * let's check the error object for a status code. If the
	 * error object doesn't have one then we'll fall back to a
	 * generic 500 (Internal Server Error) status code.
	 */
	if (!problemDetails.status) {
		problemDetails.status = error.statusCode || 500;
	}

	/**
	 * Set the correct media type for a response containing a
	 * JSON formatted problem details object.
	 *
	 * @see https://tools.ietf.org/html/rfc7807#section-3
	 */
	response.set("Content-Type", "application/problem+json");

	/**
	 * Set the response status code and a JSON formatted body
	 * containing the problem details.
	 */
	response.status(problemDetails.status).json(problemDetails);

	/**
	 * Ensure any remaining middleware are run.
	 */
	next();
};

module.exports = problemDetailsResponseMiddleware;
