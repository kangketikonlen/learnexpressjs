const
	express = require('express'),
	controller = require('../../controllers/usersController');

let router = express.Router();

router.get('/', authToken, controller.getAll);
router.get('/:id', authToken, controller.getOne);
router.post('/', authToken, controller.create);
router.put('/:id', authToken, controller.update);
router.patch('/:id', authToken, controller.softDel);
router.delete('/:id', authToken, controller.hardDel);

function authToken(req, res, next) {
	const token = req.headers['authorization'];
	if (!token) return res.status(401).send({ auth: false, message: 'Token 含めてください! UwU.' });
	jwt.verify(token.replace(/Bearer /g, "").replace(/kangketik /g, ""), JWTsecret, function (err, decode) {
		if (err) return res.status(500).send({ auth: false, message: 'Token 認証に失敗しました OwO.' });
		req.decode = decode["sessions"];
		if (req.decode.level == 1) {
			next();
		} else {
			res.status(401).json({ status: "error", pesan: "Anda tidak berhak untuk mengakses modul ini." })
		}
	})
}

module.exports = router;