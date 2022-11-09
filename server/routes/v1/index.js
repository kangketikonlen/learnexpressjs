'use strict';

const
	express = require('express'),
	infoRoute = require('./info.route'),
	authRoute = require('./auth.route'),
	levelsRoute = require('./level.route'),
	usersRoute = require('./user.route'),
	appsRoute = require('./app.route');

let router = express.Router();

router.use('/', infoRoute);
router.use('/auth', authRoute);
router.use('/levels', levelsRoute);
router.use('/users', usersRoute);
router.use('/apps', appsRoute);

module.exports = router;