import {useState} from "react";


const TaskForm = ({onAddTask}) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("Medium");
    const [status, setStatus] = useState("To Do");
    const handleSubmit = (e) => {
        e.preventDefault()
        //input validation for an empty title
        if (title.trim() === "") {
            alert("Task title is required");
            return;
        }
        const newTaskData={
            title: title,
            description: description,
            priority: priority,
            status: status,
        }
        onAddTask(newTaskData);
        //restores default values after form submission
        setTitle("");
        setDescription("");
        setPriority("Medium");
        setStatus("To Do");
    }


    return (
        <form onSubmit={handleSubmit}>

            <label htmlFor="title">Task Title </label>
            <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            <label htmlFor="description">Description</label>
            <input
                id="description"
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />

            <label htmlFor="low">Low</label>
            <input
                id="low"
                type="radio"
                name="priority"
                value="Low"
                checked={priority === "Low"}
                onChange={(e) => setPriority(e.target.value)}
            />

            <label htmlFor="medium">Medium</label>
            <input
                id="medium"
                type="radio"
                name="priority"
                value="Medium"
                checked={priority === "Medium"}
                onChange={(e) => setPriority(e.target.value)}
            />

            <label htmlFor="high">High</label>
            <input
                id="high"
                type="radio"
                name="priority"
                value="High"
                checked={priority === "High"}
                onChange={(e) => setPriority(e.target.value)}
            />

            <label htmlFor="taskStatus">Task Status</label>
            <select
                id="taskStatus"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
            >
                <option value="To Do">To Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Done">Done</option>
            </select>

            <button type="submit">Submit</button>
        </form>
    );

};
export default TaskForm;