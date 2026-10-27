import Column from "./Column.jsx";
import {useState} from "react";
import TaskForm from "./TaskForm.jsx";

const Board = () => {

    const [tasks, setTasks] = useState([
        {
            id: 1,
            title: "Create task form",
            description: "Build a form for adding new tasks",
            status: "To Do"
        },
        {
            id: 2,
            title: "Build Kanban layout",
            description: "Create the board layout",
            status: "In Progress",
        },
        {
            id: 3,
            title: "Set up a database",
            description: "Configure PostgreSQL",
            status: "Done"
        }
    ])

    const addTask = (taskData) => {
        const taskIds =
            tasks.map(task => task.id)
        const nextId =
            taskIds.length > 0
                ? Math.max(...taskIds) + 1 : 1;
        console.log("New task ID:", nextId);

        const newTask = {
            id: nextId,
            title: taskData.title,
            description: taskData.description,
            priority: taskData.priority,
            status: taskData.status,

        }
        setTasks([...tasks, newTask]);
    }

    return (
        <>
            <h1>My Kanban Board</h1>
            <Column
                title={"To Do"}
                tasks={tasks.filter(task => task.status === "To Do")}
            />
            <Column
                title={"In Progress"}
                tasks={tasks.filter(task => task.status === "In Progress")}
            />
            <Column
                title={"Done"}
                tasks={tasks.filter(task => task.status === "Done")}
            />
            <br/>
            <TaskForm onAddTask={addTask} />
        </>

    )

}

export default Board;