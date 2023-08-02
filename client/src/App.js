import { useState, useEffect } from "react";
import axios from 'axios';

function App() {
  const [todos, setTodos] = useState([]);
  const [popupActive, setPopupActive] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [text,setText] = useState("");
  const [todoId, setTodoId] = useState("");
//  const [updatePopupActive, setUpdatePopupActive] = useState(false);
//  const [newTodo, setNewTodo] = useState("");
  

  useEffect(() => {

    const fetchTodos = async ()=> {
        try{
          const response = await axios.get("http://localhost:3001/todos");
          setTodos(response.data);
        }catch(err){
          console.error(err);
        }
    }
    fetchTodos();
  }, []);

  const addTodo = async () => {
    try{
      const response = await axios.post("http://localhost:3001/todos/new",{"text":text}, {headres:{"Content-Type": "application/json"}});
      setTodos([...todos,response.data]);
      // setPopupActive(false);
      setIsUpdating(false);
      setPopupActive(false);
      setText("");
    }catch(err){
      console.error(err);
    }
    
  }

  const completeTodo = async (id) =>{
    try{
      const response = await axios.put("http://localhost:3001/todos/complete", {id});
      setTodos(todos => todos.map(todo => {
        if (todo._id === response.data._id) {
          todo.complete = response.data.complete;
        }
        return todo;
      }));
    }catch(err){
      console.error(err);
    }
  }

  const deleteTodo = async (id) => {
    const response = await axios.delete(`http://localhost:3001/todos/delete/${id}`);
    setTodos(todos => todos.filter(todo => todo._id !== response.data._id));  
  }

  const updateTodo = async (id) => {
    try{
      const response = await axios.put("http://localhost:3001/todos/update", {id,"text":text});
      console.log(response);
      setTodos(todos => todos.map(todo => {
        if (todo._id === response.data._id) {
          todo.text = response.data.text;
        }
        return todo;
      }));

      // setUpdatePopupActive(false);
      setIsUpdating(false);
      setPopupActive(false);
      setText("");
    }catch(err){
      console.error(err);
    }
  }

  const updateMode = (id, text) =>{
    // setUpdatePopupActive(true);
    setIsUpdating(true);
    setPopupActive(true);
    setText(text);
    setTodoId(id);
  }

  const closePopup = () =>{
    setIsUpdating(false);
    setPopupActive(false);
    setText("");
  }

  return (
    <div className="App">
      <h1>Welcome, Supun</h1>
      {todos.length > 0 ? <h4>Your Tasks</h4> : <h4>You have no Tasks</h4>}
      <div className="todos">
        {todos.map((todo) => (
          <div 
            className={"todo " + (todo.complete ? "is-complete" : "")} 
            key={todo._id} 
            >

              <div className="box" onClick={() =>completeTodo(todo._id)}>
                <div className="checkbox"></div>

                <div id = "text" className="text">{todo.text}</div>
              </div>
            <div className="controls">                  
              <div 
                className="update-todo"
                onClick={()=> updateMode(todo._id, todo.text)}               
              >../</div>
              <div 
                className="delete-todo" 
                onClick={() => deleteTodo(todo._id)}
              >x</div> 
            </div>           
        </div>
        ))}        
      </div>

      <div 
        className="addPopup" 
        onClick={() => setPopupActive(true)}
        >+</div>

      {popupActive ? (
        <div className="popup">
          <div className="closePopup" 
            onClick={()=> closePopup()}
            >x</div>
          <div className="content">
            {isUpdating ? 
              <h3>Update Task</h3> 
              : <h3>Add Task</h3>
            }
            
            <input 
              type="text" 
              className="add-todo-input"
              value = {text} 
              onChange = {(event) => setText(event.target.value)}            
              />
            <div 
              className="button" 
              onClick={isUpdating ? () =>updateTodo(todoId) : addTodo}>
                {isUpdating ? "Update Task" : "Create Task"}</div>
          </div>
        </div>
      ): ""}

      {/* {popupActive ? (
        <div className="popup">
          <div className="closePopup" 
            onClick={() => setPopupActive(false)}
            >x</div>
          <div className="content">
            <h3>Add Task</h3>
            <input 
              type="text" 
              className="add-todo-input"
              onChange={(event) => setNewTodo(event.target.value)}
              value = {newTodo}
              />
              <div className="button" onClick={addTodo}>Create Task</div>
          </div>
        </div>
      ): ""}
      
      {updatePopupActive ? (
        <div className="popup">
          <div className="closePopup" 
            onClick={() => setUpdatePopupActive(false)}
            >x</div>
          <div className="content">
            <h3>Update Task</h3>
            <input 
              type="text" 
              className="add-todo-input"
              value = {text}
              onChange={(event) => setText(event.target.value)}
              />
              <div className="button" onClick={() =>updateTodo(todoId)}>Update Task</div>
          </div>
        </div>
      ): ""} */}
    </div>
  );
}

export default App;
