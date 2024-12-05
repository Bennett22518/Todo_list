import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header';
// import logo from './assets/pexels-pixabay-531880.jpg'

function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editTask, setEditTask] = useState("");-

  // Fetch tasks from the backend
  useEffect(() => {
    axios.get('http://localhost:5000/tasks')
      .then((response) => {
        setTasks(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching tasks:", error);
      });
  }, []);

  // Handle input change
  const handleInputChange = (e) => {
    setNewTask(e.target.value);
  };

  // Add new task
  const handleAddTask = () => {
    if (newTask.trim()) {
      axios.post('http://localhost:5000/tasks', { text: newTask })
        .then((response) => {
          setTasks([...tasks, response.data]);
          setNewTask(""); // Clear input
        })
        .catch((error) => {
          console.error("There was an error adding the task:", error);
        });
    }
  };

  // Edit task
  const handleEditTask = (index) => {
    setEditIndex(index);
    setEditTask(tasks[index].text);
  };

  // Save edited task
  const handleSaveEdit = () => {
    axios.put(`http://localhost:5000/tasks/${tasks[editIndex]._id}`, { text: editTask })
      .then((response) => {
        const updatedTasks = tasks.map((task, index) =>
          index === editIndex ? response.data : task
        );
        setTasks(updatedTasks);
        setEditTask(""); // Clear edit input
        setEditIndex(null); // Reset edit state
      })
      .catch((error) => {
        console.error("There was an error updating the task:", error);
      });
  };

  // Delete task
  const handleDeleteTask = (index) => {
    axios.delete(`http://localhost:5000/tasks/${tasks[index]._id}`)
      .then(() => {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
      })
      .catch((error) => {
        console.error("There was an error deleting the task:", error);
      });
  };

  return <div className='home bg-dark text-black vh-100' style={{
    height: '92vh',
    // backgroundImage: `url(${logo})`, // Use imported image
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }}>
    <Header />
    <div className="container mt-5">
      <h2>Enter your To-Do List</h2>

      {/* Input and Button to add new task */}
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Enter task"
          value={newTask}
          onChange={handleInputChange}
        />
        <button className="btn btn-primary mt-3" onClick={handleAddTask}>
          Add Task
        </button>
      </div>

      {/* Input for editing a task */}
      {editIndex !== null && (
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Edit task"
            value={editTask}
            onChange={(e) => setEditTask(e.target.value)}
          />
          <button className="btn btn-success mt-3" onClick={handleSaveEdit}>
            Save Edit
          </button>
        </div>
      )}

      {/* Table to display tasks */}
      <table className="table table-striped">
        <thead>
          <tr>
            <th>So.no</th>
            <th>Task</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, index) => (
            <tr key={task._id}>
              <td>{index + 1}</td>
              <td>{task.text}</td>
              <td>
                <button
                  className="btn btn-warning"
                  onClick={() => handleEditTask(index)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger ms-2"
                  onClick={() => handleDeleteTask(index)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
}

export default TodoList;
