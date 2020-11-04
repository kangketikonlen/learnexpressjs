const
	express = require('express'),
	controller = require('../../controllers/authController');

let router = express.Router();

router.post('/', controller.loginRequest);
router.post('/token', controller.tokenRequest);
router.delete('/logout', controller.logoutRequest);

module.exports = router;