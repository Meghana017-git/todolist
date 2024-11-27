import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';

export default function AddToDo() {
    const[message, setMessage] = useState('');

    const createToDo = async () => {
        //validate message
        if(message === ''){
            toast.error('cannot add an empty message');
            return;
        }
        if(message.length<4 || message.length>20){
            toast.error('Message must be between 4 and 20 characters');
            return;
        }
        try {
            const response = await axios.post('http://localhost:5000/todolist',{
                message: message,
            });
            if(response.data.success === 'created'){
                window.location.reload();
            }        
        } catch (error) {
            console.log(error);
        }
    };
  return (
   
    <div className="bg-gray-100 flex items-center justify-center">
  <div className="bg-white shadow-lg rounded-lg p-8 mt-10 mb-10 w-full max-w-md"> 
        <input type="text" placeholder="Add Task here" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" onChange={(e) => setMessage(e.target.value)}/>
        <button onClick={createToDo} className="mt-2 w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">ADD</button>
    </div>
    </div>
   
  );
}
