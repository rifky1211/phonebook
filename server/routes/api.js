var express = require('express');
var router = express.Router();

const controllers = require("../controllers/apiController")

router.get('/', controllers.getContact);
router.post('/', controllers.createContact);
router.put('/:id', controllers.updateContact);
router.delete('/:id', controllers.deleteContact);

module.exports = router;
