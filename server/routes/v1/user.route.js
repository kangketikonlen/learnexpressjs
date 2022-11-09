const
	express = require('express'),
	authLib = require('../../lib/auth.lib')(),
	controller = require('../../controllers/user.controller');

let router = express.Router();

router.get('/', authLib.authToken, controller.getAll);
router.get('/generate/code', authLib.authToken, controller.genCode);
router.get('/:id', authLib.authToken, controller.getOne);
router.post('/', authLib.authToken, controller.create);
router.put('/:id', authLib.authToken, controller.update);
router.delete('/:id', authLib.authToken, controller.delete);

module.exports = router;