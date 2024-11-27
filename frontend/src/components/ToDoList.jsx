import { AiFillDelete } from "react-icons/ai"; 
import { AiFillEdit } from "react-icons/ai"; 
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

const ToDoList = () => {
    const[todos, setTodos] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentTodo, setCurrentTodo] = useState({_id:null, message: ''});

    const getAllTodos = async () => {
        try{
            const response = await axios.get('http://localhost:5000/todolist/getall');
            setTodos(response.data.data);
        }catch(error){
            console.log(error);
        }
    };
    useEffect(() => {
        getAllTodos();
    }, []);
    // The useEffect hook is an essential part of this React Component. It is used to perform side effects in functional components,
    // such as fetching data, subscribing events, or manually updating the DOM.

    // In this component, the useEffect is used to fetch the initial list of to-dos from backend when the component is first rendered.

    // In this case , getAllTodos() is called inside this function to fetch the list of to-dos.

    //The empty array([]) is a dependency array.
    // It specifies whenn the effect should re-run.
    // An empty array means the effect will run only once after the initial render of the component.
    // If dependencies are added (e.g [todos]), the effect will run every time those dependencies change.

    const handleDelete = async(id) => {
        try{
            const result = await axios.delete(`http://localhost:5000/todolist/deleteToDo/${id}`);
            if(result.data.success === 'deleted'){
                toast.success('Todo deleted successfully');
                getAllTodos();
            }
        }catch(error) {
            console.log(error);
            toast.error('Failed to delete todo.');
        }
    };

    const handleEditInputChange = (e) =>  {
        setCurrentTodo({ ...currentTodo,message: e.target.value });
    };

    //{ ..currentTodo } means "create a new object and copy all properties of currentTodo into it."

    //Example Workflow
    // Initial State:

    //isEditing = false
    // currentTodo ={_id:null, message:'' }
    // The user is not editing any todo yet.

    //user clicks the edit button for the to-do: let's say the user clicks the edit button for to-do.

    // {_id: '123', message: 'buy groceries'}
    //handleEdit is called:

    // handleEdit({_id: '123', message: 'buy groceries'});
    // setIsEditing(true) changes isEditing to true.
    // setCurrentTodo({_id: '123', message: 'buy groceries' }) updated currentTodo to:

    //{_id:'123', message" 'Buy Groceries' }
    //UI updates:

    // The component detects isEditing = true and switches to the edit view.
    // The input field is pre-filled with the text "Buy Grocerires" from currentTodo.message.

    const handleEdit = (todo) => {
        setIsEditing(true);
        setCurrentTodo({_id: todo._id, message: todo.message });
    };

    const handleUpdate = async() => {
        //validate the msg before updating
        if(currentTodo.message.length<4 || currentTodo.message.length>20){
            toast.error('Message must be between 4 and 20 characters.');
            return; //block the update if validation fails
        }
        try{
            const result = await axios.put(`http://localhost:5000/todolist/updateToDo/${currentTodo._id}`,{
                message: currentTodo.message
            });
            if(result.data.success === 'updated'){
                toast.success('todo updated successfully!');
                getAllTodos();
                setIsEditing(false);
                setCurrentTodo({_id: null, message: '' });
            }
        }
        catch(error){
            console.error(error);
            toast.error('failed to update todo');
        }
    };
    const handleCancelEdit = () => {
        setIsEditing(false);
        setCurrentTodo({_id: null, message: ''});
    };
  return (
    <div>
        {isEditing ?(
            <div>
                <input className="flex-grow p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 w-full mb-2 ml-2" value={currentTodo.message} onChange={handleEditInputChange}/>
                <button className="px-4 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 ml-2 mr-2" onClick={handleUpdate}>update</button>
                <button className="px-4 py-2 bg-gray-500 text-white font-semibold rounded-lg hover:bg-gray-600" onClick={handleCancelEdit}>Cancel</button>
            </div>    
        ) : (
            <ul className="space-y-2 mt-10">
                {todos.map((todo) => (
                    <li className="flex justify-between items-center p-2 m-5 bg-gray-100 border rounded-lg" key={todo._id}>
                        {todo.message}
                       <AiFillEdit className="text-blue-500 hover:text-blue-600 cursor-pointer"  onClick={() => handleEdit(todo)}/>
                       <AiFillDelete className="text-red-500 hover:text-red-600 cursor-pointer" onClick={() => handleDelete(todo._id)}/>
                    </li>
                ))}
            </ul>
        )}
    </div>
  );
};

export default ToDoList