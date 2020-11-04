'use strict';

const
	express = require('express'),
	authRoute = require('./authRoute'),
	levelsRoute = require('./levelsRoute'),
	usersRoute = require('./usersRoute'),
	appsRoute = require('./appsRoute');

let router = express.Router();

router.use('/auth', authRoute);
router.use('/levels', levelsRoute);
router.use('/users', usersRoute);
router.use('/apps', appsRoute);

module.exports = router;