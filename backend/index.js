const express=require('express');
const cors =require('cors');
const RunServer = require('./database/connection');
const ToDoRouter = require('./routes/todoRouter');



const app=express();
const port = 5000;


//json:transmitting the data b/w client & server
app.use(express.json())

//backend port no:5000, frontend port no: 5173
//to connect we use cors.

app.use(cors())

app.use('/todolist', ToDoRouter)

RunServer()


app.listen(port, ()=>{
    console.log(`server is running on ${port} port`)
})