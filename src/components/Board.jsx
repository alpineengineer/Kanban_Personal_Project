import Column from "./Column.jsx";
import {useState, useEffect} from "react";
import TaskForm from "./TaskForm.jsx";
import {getTasks, createTask, getColumns, deleteTask, updateTask} from "../api/taskApi.js";
import EditTaskForm from "./EditTaskForm.jsx";
import {Container, Row, Col, Modal} from "react-bootstrap";

const Board = ({theme}) => {


    const [columns, setColumns] = useState([]);

    const [editingTask, setEditingTask] = useState(null);

    const [tasks, setTasks] = useState([])

    const [searchTerm, setSearchTerm] = useState("");

    const [viewToggle, setViewToggle] = useState(false);

    const [showTaskModal, setShowTaskModal] = useState(false);

    useEffect(() => {
        getTasks().then(data => {
            setTasks(data);
        }).catch(error => {
            console.error(error);
            alert("Failed to load tasks");
        })
        getColumns().then(data => {
            setColumns(data);
        }).catch(error => {
            console.error(error);
            alert("Failed to load columns");
        })

    }, []);





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
            handleCloseModal();

        }).catch(error => {
            console.error(error);
            alert("Failed to create task");
        })
    }
    const handleDeleteTask = (taskId) => {
        deleteTask(taskId).then(() => {
            setTasks(previousTasks => previousTasks.filter(task => task.id !== taskId));
        }).catch(error => {
            console.error(error);
            alert("Failed to delete task");
        })
    }
    const handleUpdateTask = (taskId) => {
        const selectedTask = tasks.find(task => task.id === taskId);
        setEditingTask(selectedTask);
        setShowTaskModal(true);
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
            handleCloseModal();

        }).catch(error => {
            console.error(error);
            alert("Failed to update task");
        })
    }

    const handleCancelEdit = () => {
        handleCloseModal();
    }

    const filteredTasks = tasks.filter(task => task.title.toLowerCase().includes(searchTerm.toLowerCase()));

    const handleCloseModal = () => {
        setShowTaskModal(false);
        setEditingTask(null);
    }


    return (

        <Container>
            <button className="accent-button"
                    onClick={() => {
                        setEditingTask(null);
                        setShowTaskModal(true);
                    }}>
                New Task
            </button>
            <Modal
                show={showTaskModal}
                onHide={handleCloseModal}
                className={`mosswire-modal theme-${theme}`}

            >
                <Modal.Header closeButton>
                    <Modal.Title>{editingTask ? "Edit Task" : "Create New Task"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {editingTask ? (
                        <EditTaskForm
                            task={editingTask}
                            onSaveTask={handleSaveTask}
                            onCancel={handleCancelEdit}
                        />) : (<TaskForm onAddTask={addTask}></TaskForm>)}
                </Modal.Body>
            </Modal>

            <h1>My Kanban Board</h1>
            <label
                htmlFor="taskSearch"
            ></label>
            <div className="board-controls">
                <input
                    id="taskSearch"
                    type="text"
                    placeholder="Search Tasks"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button onClick={() => setViewToggle(!viewToggle)}>
                    {viewToggle ? "Show Board" : "Show All Tasks"}
                </button>
            </div>
            {!viewToggle && (
                <Row
                    className="g-3"
                >
                    <Col xs={12} md={4}>
                        <Column
                            title={"To Do"}
                            tasks={filteredTasks.filter(task => task.column?.name === "To Do")}
                            onDeleteTask={handleDeleteTask}
                            onUpdateTask={handleUpdateTask}
                        />
                    </Col>
                    <Col xs={12} md={4}>
                        <Column
                            title={"In Progress"}
                            tasks={filteredTasks.filter(task => task.column?.name === "In Progress")}
                            onDeleteTask={handleDeleteTask}
                            onUpdateTask={handleUpdateTask}
                        />
                    </Col>

                    <Col xs={12} md={4}>
                        <Column
                            title={"Done"}
                            tasks={filteredTasks.filter(task => task.column?.name === "Done")}
                            onDeleteTask={handleDeleteTask}
                            onUpdateTask={handleUpdateTask}
                        />
                    </Col>

                </Row>
            )}
            {viewToggle && (
                <table className="task-table">
                    <thead>
                    <tr>
                        <th>Task Title</th>
                        <th>Column</th>
                        <th>Description</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredTasks.map((task) => (
                        <tr key={task.id}>
                            <td>{task.title}</td>
                            <td>{task.column?.name}</td>
                            <td>{task.description}</td>
                        </tr>

                    ))}
                    </tbody>
                </table>
            )}
            <br/>
        </Container>

    )
}


export default Board;