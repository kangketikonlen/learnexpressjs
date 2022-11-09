const
	express = require('express'),
	controller = require('../../controllers/auth.controller');

let router = express.Router();

router.post('/', controller.loginRequest);
router.post('/register', controller.registerRequest);
router.delete('/logout', controller.logoutRequest);

module.exports = router;