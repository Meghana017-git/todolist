import React from 'react'
import Header from './components/Header'
import AddToDo from './components/AddToDo'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ToDoList from './components/ToDoList';

const App = () => {
  return (
    <div>
        <Header/>
        <AddToDo/>
        <ToDoList/>
        <ToastContainer/>
    </div>
  )
}

export default App