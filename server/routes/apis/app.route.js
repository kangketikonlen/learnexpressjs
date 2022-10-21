const
	express = require('express'),
	multer = require('multer'),
	path = require('path'),
	crypto = require('crypto'),
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

router.get('/', authToken, controller.getAll);
router.get('/:id', authToken, controller.getOne);
router.post('/', authToken, multer({ storage: diskStorage }).array("files", 2), controller.create);
router.put('/:id', authToken, multer({ storage: diskStorage }).array("files", 2), controller.update);
router.delete('/:id', authToken, controller.delete);

function authToken(req, res, next) {
	// Set token from header.
	const token = req.headers['authorization'];
	// Check if token exists.
	if (!token) return res.status(401).send({ status: "error", pesan: 'Token tidak ditemukan.' });
	// Verify token with JWTsecret.
	jwt.verify(token.replace(/Bearer /g, ""), JWTsecret, function (err, decode) {
		// Return error if expired or malfunction.
		if (err) return res.status(500).send({ status: "error", message: err.message });
		// Add session to requests.
		req.decode = decode;
		// Check if level eligible to access.
		if (decode.level.toLowerCase() == "admin") {
			next();
		} else {
			res.status(403).json({ status: "error", pesan: "Anda tidak berhak mengakses modul." })
		}
	})
}

module.exports = router;
