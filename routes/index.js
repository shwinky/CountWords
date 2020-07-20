const express = require('express');
const router = express.Router();
const wordCounterController =require('../controllers/WordCounterController');

router.get('/health', function (req, res) {
    res.sendStatus(200)
});
router.post('/count', wordCounterController.handleWordCountRequest);
router.get('/count/:word', wordCounterController.handleGetWordCountRequest);

module.exports = router;
