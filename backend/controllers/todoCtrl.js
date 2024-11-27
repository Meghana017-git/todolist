const Todo = require("../model/todo");

const createToDo = async(req, res) => {
    const { message } = req.body;

    if(req.body.message == ""){
        return res.status(401).json({ errorMessage: "Message cannot be empty"});
    }


    //Validation : check if message is empty or does not meet the length requirements
    if(!message || message.length < 4 || message.length> 20){
        return res.status(400).json({ errorMessage: "Message must be between 4 and 20 characters." });
    }

   try {
    const addToDo = await Todo.create({message});
    res.status(200).json({ success : "created", data:addToDo });
   }catch(error){
     console.log(error);
     res.status(500).json({ error: "Internal server Error"});
   }
};

const getAllToDo = async (req,res) => {
    try{
        const getToDo = await Todo.find({});
        res.status(200).json({ data: getToDo});
    } catch(error){
        console.log(error);
    }
};

// When you see an empty {} object passed to the .find() method, it means that the function is reqesting all the documents from the collection.

const deleteToDo = async(req, res) => {
    try{
        const deleted =await Todo.findByIdAndDelete(req.params.id);
        res.status(200).json({ success : "deleted" });
    }catch(error){
        console.log(error)
    }
};

//findByIdAndDelete(): This is a mongoose method that performs two actions in one step:
// Find a document by its _id field.
// Delete that document from the collection.

// req.params.id refers to the ID of the ToDo item that you want to delete, which is passed in the URL. 
// For example: if the route is / delete/:id, req.params.id will contain the value of that id.

// A client makes a request to an endpoint like:
// Delete /todo/12345abcdef
// where 12345abcdef is the ID of the ToDo item to be deleted.

// Route Handler:
// The Id (12345abcdef) gets assigned to req.params.id.

//Mongoose Operation:
// findByAndDelete(req.params.id) runs and looks for the document with _id: 12345abcdef in Mongoose Collection. 

//Deletion Outcome:
// If found, the document is deleted and returned to the deleted variable.
// If not found, the deleted will be null.

const updateToDo = async(req,res) => {
    try {
        const updatedToDo = await Todo.findByIdAndUpdate(req.params.id,
            {
                message: req.body.message,
            },
            { new: true }
        );
        if( updatedToDo){
            res.json({ success: "updated", data: updatedToDo });
        }else{
            res.status(404).json({ error: "ToDo not found "});
        }   
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// { new: true}: This option tells mongoose to return the updated document instead of the old one.
// without { new:true }, Mongoose would return the document as it was before the update.
// This ensures that the newly updated version of the document is returned.
 
module.exports = {
    createToDo,
    getAllToDo,
    deleteToDo,
    updateToDo,
};

