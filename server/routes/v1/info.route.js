const
	express = require('express'),
	controller = require("../../controllers/info.controller");

let router = express.Router();

router.get('/', controller.info);

module.exports = router;
