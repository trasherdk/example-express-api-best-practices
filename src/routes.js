const { Router } = require("express");
const bodyParserMiddleware = require("body-parser");
const corsMiddleware = require("cors");

const config = require("./config.js");
const userController = require("./controllers/user.controller.js");

const router = Router();

router.use(corsMiddleware(config.corsOptions));
router.use(bodyParserMiddleware.json());

router.post("/user", userController.createUser);
router.get("/user/:user_id", userController.getUser);
router.put("/user/:user_id", userController.updateUser);
router.delete("/user/:user_id", userController.deleteUser);

module.exports = router;
