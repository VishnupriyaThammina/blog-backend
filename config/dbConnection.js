const mongoose = require('mongoose');
 
// writing a function that connects with the mongo db 

async function connectDb(uri){
    try{
        // we should wait till mongoose connection is successfull which why we use async programming
    await mongoose.connect(uri);
    console.log(' mongo connection successful');


    }catch(error){
console.log('Error in DB connection')
    }
}

// to export this code
module.exports= connectDb