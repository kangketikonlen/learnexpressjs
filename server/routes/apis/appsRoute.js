const
	express = require('express'),
	multer = require('multer'),
	path = require('path'),
	crypto = require('crypto'),
	controller = require("../../controllers/appsController")

const diskStorage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, path.join(__dirname, "../../../public/uploads/images"));
	},
	filename: function (req, file, cb) {
		cb(
			null,
			crypto.createHash('md5').update(file.fieldname).digest('hex') + path.extname(file.originalname)
		);
	}
})

let router = express.Router();

router.get('/', authToken, controller.getAll);
router.put('/:id', authToken, controller.update);
router.post('/upload/:id', authToken, multer({ storage: diskStorage }).single("logo"), controller.upload);

function authToken(req, res, next) {
	const token = req.headers['authorization'];
	if (!token) return res.status(401).send({ auth: false, message: 'Token 含めてください! UwU.' });
	jwt.verify(token.replace(/Bearer /g, "").replace(/kangketik /g, ""), JWTsecret, function (err, decode) {
		if (err) return res.status(500).send({ auth: false, message: 'Token 認証に失敗しました OwO' });
		req.decode = decode["sessions"];
		if (req.decode.level == 1) {
			next();
		} else {
			res.status(401).json({ status: "error", pesan: "Anda tidak berhak untuk mengakses modul ini." })
		}
	})
}

module.exports = router;
