var express= require('express');
var router = express.Router();

var usuarioController = require('../../controllers/api/usuarioControllerAPI');

router.get('/',usuarioController.usuarios_list);
router.post('/create',usuarioController.usuarios_create);
//router.delete('/delete',usuarioController.usu);
//router.patch('/update',usuarioController.usu);

module.exports = router;