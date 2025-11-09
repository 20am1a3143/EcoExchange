const express = require('express');
const router = express.Router();
const controller = require('../controllers/itemsController');

router.post('/', controller.createItem);
router.get('/', controller.getItems);
router.put('/:id', controller.updateStatus);

module.exports = router;
