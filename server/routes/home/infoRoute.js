const
	express = require('express'),
	controller = require("../../controllers/home/infoController");

let router = express.Router();

router.get('/', controller.info);

module.exports = router;
