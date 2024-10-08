import React, {useEffect, useState} from 'react';
import {createRoot} from "react-dom/client";

const root = createRoot(document.getElementById("root"));
root.render(<TaskList/>);
function TaskList() {
    const [tasks, setTasks] = useState([]);
    const [description,setDescription] = useState();


    function loadTasks() {
        fetch("/api/tasks")
            .then(res => res.json())
            .then(tasks => setTasks(tasks));
    }

    useEffect(() => {
        loadTasks();
        },[]
    )


    function handleSubmit(e) {
        e.preventDefault();
        setTasks(old => [...old, {description, completed: false}])
        setDescription("")
    }
    return <div>
        <h2>Tasks</h2>
        {tasks.map(({id, description, completed}) => <label key={id}>
            <input type="checkbox" checked={completed} onChange={e => {
                setTasks(old => old.map (
                    task => task.id === id
                ? ({...task, completed: e.target.checked})
                : task
            ))
            }}/>
            {description}
        </label>)}
        <form onSubmit={handleSubmit}>
            <div>
                Task description: <input value={description} onChange={e => setDescription(e.target.value)}/>
            </div>
            <div><button disabled={!description}>Add task</button></div>
        </form>
    </div>;
}
