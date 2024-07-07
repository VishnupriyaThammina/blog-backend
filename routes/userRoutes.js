const express = require('express')
// we need express router here so we are requiring express here
const router = express.Router();
// get auth controller

const {resetPassword,verifyUser} = require('../controllers/User')

router.post('/reset',resetPassword)
router.post('/verify-token',verifyUser)




module.exports = router;