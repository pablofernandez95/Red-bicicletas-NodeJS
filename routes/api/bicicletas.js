var express= require('express');
var router = express.Router();

var bicletaController = require('../../controllers/api/bicicletaControlerAPI');

router.get('/',bicletaController.bicicleta_list);
router.post('/create',bicletaController.bicicleta_create);
router.delete('/delete',bicletaController.bicicleta_delete);

module.exports = router;