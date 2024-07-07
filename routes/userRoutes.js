const express = require('express')
// we need express router here so we are requiring express here
const router = express.Router();
// get auth controller

const {CreateUser} = require('../controllers/User')

router.post('/create',CreateUser)


module.exports = router;