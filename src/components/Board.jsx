import Column from "./Column.jsx";
import {useState, useEffect} from "react";
import TaskForm from "./TaskForm.jsx";
import {getTasks, createTask, getColumns} from "../api/taskApi.js";

const Board = () => {

    useEffect(() => {
        getTasks().then(data => {
            setTasks(data);
        })
        getColumns().then(data => {
            console.log("columns received from API: ",data);
            setColumns(data);
        });
    }, []);

    const [columns, setColumns] = useState([]);

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
        console.log("available columns: ",columns);
        console.log("selected status: ", taskData.status);
        const selectedColumn =
            columns.find(column => column.name === taskData.status);
        if (!selectedColumn) {
            alert("Column not found")
            return;
        }

        const newTask = {
            title: taskData.title,
            description: taskData.description,
            priority: taskData.priority,
            column:
                {
                    id: selectedColumn.id
                }
        }
        createTask(newTask).then(data => {
            console.log(data);
        })
    }

    return (
        <>
            <h1>My Kanban Board</h1>
            <Column
                title={"To Do"}
                tasks={tasks.filter(task => task.column?.name === "To Do")}
            />
            <Column
                title={"In Progress"}
                tasks={tasks.filter(task => task.column?.name === "In Progress")}
            />
            <Column
                title={"Done"}
                tasks={tasks.filter(task => task.column?.name === "Done")}
            />
            <br/>
            <TaskForm onAddTask={addTask}/>
        </>

    )


}

export default Board;