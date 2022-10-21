const
	express = require('express'),
	controller = require('../../controllers/authController');

let router = express.Router();

router.post('/', controller.loginRequest);
router.post('/register', controller.registerRequest);
router.delete('/logout', controller.logoutRequest);

module.exports = router;