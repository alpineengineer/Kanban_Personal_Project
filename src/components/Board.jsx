import Column from "./Column.jsx";
import {useState, useEffect} from "react";
import TaskForm from "./TaskForm.jsx";
import {getTasks, createTask, getColumns, deleteTask, updateTask} from "../api/taskApi.js";
import EditTaskForm from "./EditTaskForm.jsx";

const Board = () => {

    useEffect(() => {
        getTasks().then(data => {
            setTasks(data);
        })
        getColumns().then(data => {
            setColumns(data);
        });

    }, []);


    const [columns, setColumns] = useState([]);

    const [editingTask, setEditingTask] = useState(null);

    const [tasks, setTasks] = useState([])

    const addTask = (taskData) => {
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
            setTasks(previousTasks => [...previousTasks, data]);
        })
    }
    const handleDeleteTask = (taskId) => {
        deleteTask(taskId).then(() => {
            setTasks(previousTasks => previousTasks.filter(task => task.id !== taskId));
        })
    }
    const handleUpdateTask = (taskId) => {
        const selectedTask = tasks.find(task => task.id === taskId);
        setEditingTask(selectedTask);
    }

    const handleSaveTask = (taskId, updatedTaskData) => {
        updateTask(taskId, updatedTaskData).then(data => {
            setTasks(previousTasks => previousTasks.map(task => task.id === taskId
                ? data
                : task))
            setEditingTask(null);
        });
    }


    return (
        <>
            <h1>My Kanban Board</h1>
            <Column
                title={"To Do"}
                tasks={tasks.filter(task => task.column?.name === "To Do")}
                onDeleteTask={handleDeleteTask}
                onUpdateTask={handleUpdateTask}
            />
            <Column
                title={"In Progress"}
                tasks={tasks.filter(task => task.column?.name === "In Progress")}
                onDeleteTask={handleDeleteTask}
                onUpdateTask={handleUpdateTask}
            />
            <Column
                title={"Done"}
                tasks={tasks.filter(task => task.column?.name === "Done")}
                onDeleteTask={handleDeleteTask}
                onUpdateTask={handleUpdateTask}
            />
            <br/>
            <TaskForm onAddTask={addTask}/>
            {editingTask && <EditTaskForm task={editingTask} onSaveTask={handleSaveTask}/>}
        </>

    )


}

export default Board;