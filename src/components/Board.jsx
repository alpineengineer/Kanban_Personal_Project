import Column from "./Column.jsx";
import {useState, useEffect} from "react";
import TaskForm from "./TaskForm.jsx";
import {getTasks, createTask, getColumns, deleteTask, updateTask, getTaskDetails} from "../api/taskApi.js";
import EditTaskForm from "./EditTaskForm.jsx";

const Board = () => {

    useEffect(() => {
        getTasks().then(data => {
            setTasks(data);
        })
        getColumns().then(data => {
            setColumns(data);
        });
        getTaskDetails().then(data => {
            setTaskDetails(data);
        })

    }, []);


    const [columns, setColumns] = useState([]);

    const [editingTask, setEditingTask] = useState(null);

    const [tasks, setTasks] = useState([])

    const [searchTerm, setSearchTerm] = useState("");

    const [taskDetails, setTaskDetails] = useState([])


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
            getTaskDetails().then(data => {
                setTaskDetails(data);
            })
        })
    }
    const handleDeleteTask = (taskId) => {
        deleteTask(taskId).then(() => {
            setTasks(previousTasks => previousTasks.filter(task => task.id !== taskId));
            getTaskDetails().then(data => {
                setTaskDetails(data);
            })
        })
    }
    const handleUpdateTask = (taskId) => {
        const selectedTask = tasks.find(task => task.id === taskId);
        setEditingTask(selectedTask);

    }


    const handleSaveTask = (taskId, updatedTaskData) => {
        const selectedColumn = columns.find(column => column.name === updatedTaskData.status);
        if (!selectedColumn) {
            alert("Column not found")
            return;
        }
        const taskToUpdate = {
            title: updatedTaskData.title,
            description: updatedTaskData.description,
            priority: updatedTaskData.priority,
            column: {id: selectedColumn.id}
        }
        updateTask(taskId, taskToUpdate).then(data => {
            setTasks(previousTasks => previousTasks.map(task => task.id === taskId
                ? data
                : task))
            setEditingTask(null);
            getTaskDetails().then(data => {
                setTaskDetails(data);
            })
        });
    }
    const filteredTasks = tasks.filter(task => task.title.toLowerCase().includes(searchTerm.toLowerCase()));


    return (
        <>
            <h1>My Kanban Board</h1>
            <label
                htmlFor="taskSearch"
            ></label>
            <input
                id="taskSearch"
                type="text"
                placeholder="Search Tasks"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Column
                title={"To Do"}
                tasks={filteredTasks.filter(task => task.column?.name === "To Do")}
                onDeleteTask={handleDeleteTask}
                onUpdateTask={handleUpdateTask}
            />
            <Column
                title={"In Progress"}
                tasks={filteredTasks.filter(task => task.column?.name === "In Progress")}
                onDeleteTask={handleDeleteTask}
                onUpdateTask={handleUpdateTask}
            />
            <Column
                title={"Done"}
                tasks={filteredTasks.filter(task => task.column?.name === "Done")}
                onDeleteTask={handleDeleteTask}
                onUpdateTask={handleUpdateTask}
            />
            <table>
                <thead>
                <tr>
                    <th>Task Title</th>
                    <th>Column</th>
                    <th>Board</th>
                </tr>
                </thead>
                <tbody>
                {taskDetails.map((taskDetail) => (
                    <tr key={taskDetail.id}>
                        <td>{taskDetail.title}</td>
                        <td>{taskDetail.columnName}</td>
                        <td>{taskDetail.boardName}</td>
                    </tr>

                ))}
                </tbody>
            </table>
            <br/>
            <TaskForm onAddTask={addTask}/>
            {editingTask && <EditTaskForm task={editingTask} onSaveTask={handleSaveTask}/>}
        </>

    )


}

export default Board;