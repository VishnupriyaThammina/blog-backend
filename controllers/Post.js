
const Post = require('../models/post')
const User = require('../models/user')
const {uploadToCloudinary,deleteFromCloudinary, removeFromCloudinary} = require('../services/cloudinary')
const verifyStatus = async(req,res,next)=>{
    try{
        const email = req.email;
        const user = await User.findOne({email:req.email}); 

        if(user.status !== 'verified'){
         return   res.status(400).json({message:"User registration incomplete "})

        }
        next()
    }catch(e){
return res.status(500).json({message:"verfiy didnt work :("})
    }
}


const check = async(req,res,next)=>{
    try{
return res.status(200).json({message:"jwt verify function is a hit",email:req.email})
    }catch(e){
return res.status(500).json({message:"verfiy didnt work"})
    }
}


// create post
const CreatePost = async(req,res)=>{
    try{
        const email = req.email;
        const title = req.body.title;
        const subtitle = req.body.subtitle;
        const content = req.body.content;
        const thumbnail = req.body.thumbnailUrl;

        const user = await User.findOne({email:req.email}); 


        const post = new Post({  
            title:title,
            subTitle:subtitle,
            thumbnail:   thumbnail,
            content:content,
            userid:user.email,
        })
        await post.save()
        return res.status(200).json({message:"post creation successfull "})
    }catch(error){
        return res.status(500).json({message:"Internal server error",error:error.message})
    }
}
// get post
const getFullPost = async(req,res)=>{
    try{
const id = req.body.postid;
const email = req.email;
const post = await Post.findById(id)
if(!post){
    return res.status(400).json({message:"no post found"})
}
let isowner = false;
if(post.userid==email){
    isowner = true;
}
res.status(200).json({post:post, owner:isowner})
  }catch(error){
        return res.status(500).json({message:"Internal server error"})
    }
}

// get all posts thumbnail
const getAllPosts = async(req,res)=>{
    try{
        const postss = await Post.find();
        const email = req.email;
        const posts = postss.map(post=>{
            const isOwner = post.userid===email
            return{
                ...post.toObject(),
                    isOwner
            }
        })
        return res.status(200).json({posts:posts, message:"all posts fetched"})
    }catch(error){
        return res.status(500).json({message:"Internal server error"})
    }
}
// get recent 5 posts thumbnail
const get5Posts = async(req,res)=>{
    try{
const postss = await Post.find().sort({createTime: 1}).limit(5);
// the posts should only be edited by the owner 
const email = req.email;
const posts = postss.map(post=>{
    const isOwner = post.userid===email
    return{
        ...post.toObject(),
            isOwner
    }
})
return res.status(200).json({posts:posts, message:"recent posts fetched"})
    }catch(error){
        return res.status(500).json({message:"Internal server error"})
    }
}

// get your posts thumbnail
const getUserPosts = async(req,res)=>{
    try{
const email = req.email;

const posts = await Post.find({userid:email}).sort({createTime: -1});

res.status(200).json({posts:posts})
    }catch(error){
        return res.status(500).json({message:"Internal server error"})
    }
}

// edit post

const EditPost = async(req,res)=>{
    try{
        const email = req.email;
        const postid= req.body.postid;
        const title = req.body.title;
        const subtitle = req.body.subtitle;
        const content = req.body.content;
        const thumbnail = req.body.thumbnail;
        const post = await Post.findById(postid)

        if(!post){
            return res.status(400).json({unauthorized})
        } 
        if(email!==post.userid ){
            return res.status(400).json({unauthorized})
        } 
        const postupdated = await Post.findByIdAndUpdate(postid,{
            title:title,
            subTitle:subtitle,
            thumbnail:thumbnail,
            content:content
         
        },{new:true})


        return res.status(200).json({post:postupdated,message:"updated post "})

    }catch(error){
        return res.status(500).json({message:"Internal server error",error:error.message})
    }
}
// delete post 

const DeletePost = async(req,res)=>{
    try{
        const email = req.email;
const postid = req.body.postid;
  const post = await Post.findById(postid)
        if(email!=post.userid || !post){
            res.status(400).json({unauthorized})
        }
        await Post.findByIdAndDelete(post._id)
        return res.status(200).json({message: "post deleted successfully"})
    }catch(error){
        return res.status(500).json({message:"Internal server error"})
    }
}
module.exports ={check,verifyStatus, CreatePost, getAllPosts,getFullPost, get5Posts,getUserPosts, EditPost, DeletePost}