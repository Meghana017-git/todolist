//connecting mongodb
const mongoose= require('mongoose')

function RunServer(){
    try{
        mongoose.connect(process.env.MONGO_URL);
        console.log('MongoDB Connected')
    }catch(error){
        console.log('Not Connected')
    }
}
module.exports = RunServer;