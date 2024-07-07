const express = require('express')
// we need express router here so we are requiring express here
const router = express.Router();
// get auth controller
const {check} = require('../controllers/Post');
const { verifyToken } = require('../middlewares/jwt');

router.get('/check',verifyToken,check)
module.exports = router;
