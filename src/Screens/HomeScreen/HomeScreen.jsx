import React, { useState } from "react";

import "./HomeScreen.css";





const HomeScreen = () => {
    const [tasks, setTasks] = useState([]);
    const [taskInput, setTaskInput] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        if (taskInput.trim()) {
            addTask(taskInput);
            setTaskInput(""); 
        }
    };

    const addTask = (task) => {
        setTasks((prevTasks) => [
            ...prevTasks,
            { id: Date.now(), text: task, completed: false },
        ]);
    };

    const toggleTaskCompletion = (id) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id === id ? { ...task, completed: !task.completed } : task
            )
        );
    };

    const deleteTask = (id) => {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    };

    const pendingTasksCount = tasks.filter((task) => !task.completed).length;
    const completedTasksCount = tasks.filter((task) => task.completed).length;

    return (
        <div className="App">
            <h1>To Do List</h1>
            <form onSubmit={handleSubmit} id="userInput">
                <input
                    type="text"
                    placeholder="Escribe tu tarea aquí..."
                    value={taskInput}
                    onChange={(e) => setTaskInput(e.target.value)}
                />
                <button type="submit" id="addBtn">+</button>
            </form>

            <div id="list" className="list-container">
                {tasks.length === 0 ? (
                    <div className="empty-state">
                        No hay tareas. ¡Agrega una para comenzar!
                    </div>
                ) : (
                    tasks.map((task) => (
                        <div 
                            className={`task-container ${task.completed ? 'completed' : ''}`} 
                            key={task.id}
                        >
                            <label>
                                <input
                                    type="checkbox"
                                    checked={task.completed}
                                    onChange={() => toggleTaskCompletion(task.id)}
                                />
                                <span>{task.text}</span>
                            </label>
                            <button
                                className="closeBtn"
                                onClick={() => deleteTask(task.id)}
                                aria-label="Eliminar tarea"
                                type="button"
                            >
                                <svg 
                                    viewBox="0 0 24 24" 
                                    fill="none" 
                                    stroke="currentColor" 
                                    strokeWidth="2" 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round"
                                >
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                            </button>
                        </div>
                    ))
                )}
            </div>

            {tasks.length > 0 && (
                <div className="stats">
                    <p>
                        <span>{pendingTasksCount}</span> pendiente{pendingTasksCount !== 1 ? 's' : ''} • {' '}
                        <span>{completedTasksCount}</span> completada{completedTasksCount !== 1 ? 's' : ''}
                    </p>
                </div>
            )}
        </div>
    )

}



export default HomeScreen;