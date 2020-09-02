const express = require("express");
require("express-async-errors");
const errorMiddleware = require("./middleware/error.js");
const config = require("./config.js");
const routes = require("./routes.js");

const app = express();
app.use("/", routes);
app.use(errorMiddleware);

const port = process.env.PORT || config.server.port;

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
