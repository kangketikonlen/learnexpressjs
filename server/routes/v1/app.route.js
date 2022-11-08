const
	express = require('express'),
	multer = require('multer'),
	path = require('path'),
	crypto = require('crypto'),
	authLib = require('../../lib/auth.lib')(),
	controller = require("../../controllers/app.controller")

const diskStorage = multer.diskStorage({
	destination: function (_, _, cb) {
		cb(null, path.join(__dirname, "../../../public/uploads/images"));
	},
	filename: function (_, file, cb) {
		cb(null, crypto.createHash('md5').update(file.originalname).digest('hex') + path.extname(file.originalname));
	}
})

let router = express.Router();

router.get('/', authLib.authToken, controller.getAll);
router.get('/generate/code', authLib.authToken, controller.genCode);
router.get('/:id', authLib.authToken, controller.getOne);
router.post('/', authLib.authToken, multer({ storage: diskStorage }).array("files", 2), controller.create);
router.put('/:id', authLib.authToken, multer({ storage: diskStorage }).array("files", 2), controller.update);
router.delete('/:id', authLib.authToken, controller.delete);

module.exports = router;
