const express = require('express')
// we need express router here so we are requiring express here
const router = express.Router();
// get auth controller

const {register} = require('../controllers/Auth')

router.post('/register',register)


module.exports = router;