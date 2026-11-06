import {useState} from "react";

const EditTaskForm = ({task, onSaveTask}) => {

    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description ?? "");
    const [priority, setPriority] = useState(task.priority);
    const [status, setStatus] = useState(task.column.name)
    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedTaskData = {
            title,
            description,
            priority,
            status
        }
        onSaveTask(task.id, updatedTaskData);
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Edit Task</h2>
            <label htmlFor="editTitle">Task Title</label>
            <input
                type="text"
                id="editTitle"
                value={title}
                onChange={(e) => setTitle(e.target.value)}/>
            <label htmlFor="editDescription">Description</label>
            <textarea
                id="editDescription"
                value={description}
                onChange={(e) => setDescription(e.target.value)}/>
            <label htmlFor="editPriority">Priority</label>
            <select
                id="editPriority"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
            >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
            </select>

            <label htmlFor="editStatus">Status</label>
            <select
                id="editStatus"
                value={status}
                onChange={(e) => setStatus(e.target.value)}>
                <option value="To Do">To Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Done">Done</option>
            </select>

            <button type="submit">Save Changes</button>
        </form>
    )
}
export default EditTaskForm;