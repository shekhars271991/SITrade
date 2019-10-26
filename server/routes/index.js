const express = require('express');

const router = express.Router();

//const db = require('../db');


router.get('/health', async (req, res, next) => {

    res.json({ msg: "Server is up." });
});

module.exports = router;
