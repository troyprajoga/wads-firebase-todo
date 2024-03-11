import React, { useState } from "react";
import "./TodoList.css";
import { toggleTodo, deleteTodo, handleEdit } from "./components/Todo";
import profileimage from "./components/profileimage.jpg";
import { Link } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import {db} from './firebase';
import { useEffect } from "react";

function TodoList() {
  //declare state
  const [todos, setTodos] = useState([]);
  //set another state for new item
  const [newItem, setNewItem] = useState("");
  const [filter, setFilter] = useState("all");

  const fetchPost = async () => {
       
    await getDocs(collection(db, "todos"))
        .then((querySnapshot)=>{               
            const newData = querySnapshot.docs
                .map((doc) => ({...doc.data(), id:doc.id }));
            setTodos(newData);                
            console.log(todos, newData);
        })
   
    }

    useEffect(()=>{
        fetchPost();
    }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    // for todo lists
    setTodos((currentTodos) => {
      return [
        ...currentTodos,
        { id: crypto.randomUUID(), title: newItem, completed: false },
      ];
    });
    try {
      const docRef = await addDoc(collection(db, "todos"), {
        todo: todo,    
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  const filteredTodos = todos.filter((todo) => {
    if (filter === "all") {
      return true; // Show all todos
    } else if (filter === "checked") {
      return todo.completed; // Show only completed todos
    } else if (filter === "unchecked") {
      return !todo.completed; // Show only incomplete todos
    }
  });

  return (
    <>
      <div class="content">
        <div className="image-container">
        <Link to="/account">
          <img src={profileimage} alt="Profile Image" width="100" height="100" />
          </Link>
        </div>
        <h1 className="header">Todo List</h1>
        <h2 className="sub-header">Name: Troy Poetra Prajoga</h2>
        <h2 className="sub-header">NIM: 2702291910</h2>
        <div>
          <form className="new-item-form">
            <div className="form-row">
              <label htmlFor="item" className="font-bold">
                New item
              </label>
              <input
                type="text"
                id="item"
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)}
              >
                {/*make event listener*/}
              </input>
            </div>

            <button className="btn" onClick={handleSubmit}>
              Add
            </button>
            {/*call function on click*/}
          </form>
        </div>
        <div>
          <label htmlFor="filter">Filter:</label>
          <select
            id="filter"
            className="filter-label"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="checked">Checked</option>
            <option value="unchecked">Unchecked</option>
          </select>
        </div>
        <ul className="list">
          {filteredTodos.map((todo) => (
            <div className="todo" key={todo.id}>
              <li>
                <label>
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={(e) =>
                      toggleTodo(todo.id, e.target.checked, setTodos, todos)
                    }
                  />
                  {todo.title}
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteTodo(todo.id, setTodos, todos)}
                  >
                    Delete
                  </button>
                  <button
                    className="btn btn-edit"
                    onClick={() => {
                      const newTitle = prompt("Enter new title:", todo.title);
                      if (newTitle !== null && newTitle !== "") {
                        handleEdit(todo.id, newTitle, setTodos, todos);
                      }
                    }}
                  >
                    Edit
                  </button>
                </label>
              </li>
            </div>
          ))}
        </ul>
      </div>
    </>
  );
}

export default TodoList;
