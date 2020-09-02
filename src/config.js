module.exports = {
	server: {
		port: 3000,
	},
	/**
	 * These options will be used to configure the cors middleware to add
	 * these response headers:
	 *
	 * Access-Control-Allow-Origin: https://example.com
	 * Vary: Origin
	 */
	corsOptions: {
		origin: "https://example.com",
	},
};
