import Column from "./Column.jsx";
import {useState} from "react";

const Board = () => {

    const [tasks, setTasks] = useState( [
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

    const addTask = () => {
        const newTask = {
            id: 4,
            title: "Test new Task",
            description: "Added using React state",
            status: "To Do"
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
            <button onClick={addTask}>Add Task</button>
        </>
    )
}

export default Board;