// J2KgldxoQiGz8dRI

// mongodb+srv://kulalmeghu:J2KgldxoQiGz8dRI@cluster0.p3kb7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

//connecting mongodb
const mongoose= require('mongoose')

function RunServer(){
    try{
        mongoose.connect('mongodb+srv://kulalmeghu:J2KgldxoQiGz8dRI@cluster0.p3kb7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
        console.log('MongoDB Connected')
    }catch(error){
        console.log('Not Connected')
    }
}
module.exports = RunServer;