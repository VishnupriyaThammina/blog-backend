const express = require('express')
// we need express router here so we are requiring express here
const router = express.Router();
// get auth controller
const {check,verifyStatus, CreatePost, getAllPosts,getFullPost, get5Posts,getUserPosts, EditPost, DeletePost} = require('../controllers/Post');
const { verifyToken } = require('../middlewares/jwt');

router.get('/check',verifyToken,check)
router.get('/check2',verifyToken,verifyStatus,check)
router.post('/create-post',verifyToken,verifyStatus,CreatePost)
router.post('/edit-post',verifyToken,verifyStatus,EditPost)
router.post('/delete-post',verifyToken,verifyStatus,DeletePost)
router.get('/get-all-post',verifyToken,verifyStatus,getAllPosts)
router.get('/get-full-post',verifyToken,verifyStatus,getFullPost)
router.get('/get-5-post',verifyToken,verifyStatus,get5Posts)
router.get('/get-user-post',verifyToken,verifyStatus,getUserPosts)






module.exports = router;
