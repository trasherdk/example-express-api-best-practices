const express = require("express");
require("express-async-errors");

const problemDetailsResponseMiddleware = require("./middleware/problem-details-response.js");
const config = require("./config.js");
const routes = require("./routes.js");

const app = express();
app.use("/", routes);
app.use(problemDetailsResponseMiddleware);

const server = app.listen(config.server.port, () => {
	console.log(`Example app listening at http://localhost:${server.address().port}`);
});
