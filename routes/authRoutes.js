const express = require('express')
// we need express router here so we are requiring express here
const router = express.Router();
// get auth controller

const {register,resetMail,login} = require('../controllers/Auth')

router.post('/register',register)
router.post('/reset-mail',resetMail)
router.post('/login',login)




module.exports = router;