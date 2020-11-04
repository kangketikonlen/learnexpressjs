'use strict';

const
	express = require('express'),
	infoRoute = require('./infoRoute')

let router = express.Router();

router.use('/', infoRoute);

module.exports = router;