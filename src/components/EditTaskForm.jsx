import {useState} from "react";
import {Card, Button, Form} from "react-bootstrap";

const EditTaskForm = ({task, onSaveTask, onCancel}) => {

    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description ?? "");
    const [priority, setPriority] = useState(task.priority);
    const [status, setStatus] = useState(task.column.name)
    const [titleError, setTitleError] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
        if (title.trim() === "") {
            setTitleError("Task title is required");
            return;
        }
        const updatedTaskData = {
            title,
            description,
            priority,
            status
        }
        onSaveTask(task.id, updatedTaskData);
    }

    return (
        <Card className="mt-4 mb-4 shadow-sm">
            <Card.Body>
                <Form onSubmit={handleSubmit}>
                    <h2>Edit Task</h2>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="editTitle">Task Title</Form.Label>
                        <Form.Control
                            isInvalid={Boolean(titleError)}
                            type="text"
                            id="editTitle"
                            value={title}
                            onChange={(e) => {
                                setTitle(e.target.value);
                            setTitleError("")}}/>
                        <Form.Control.Feedback
                            type="invalid">{titleError}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3">

                        <Form.Label htmlFor="editDescription">Description</Form.Label>
                        <Form.Control as="textarea"
                                      rows={3}
                                      id="editDescription"
                                      value={description}
                                      onChange={(e) => setDescription(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className="mb-3">

                        <Form.Label htmlFor="editPriority">Priority</Form.Label>
                        <Form.Select
                            id="editPriority"
                            value={priority}
                            onChange={(e) => setPriority(e.target.value)}
                        >
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3">


                        <Form.Label htmlFor="editStatus">Status</Form.Label>
                        <Form.Select
                            id="editStatus"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}>
                            <option value="To Do">To Do</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Done">Done</option>
                        </Form.Select>
                    </Form.Group>
                    <Button variant="primary" type="submit">Save Changes</Button>
                    <Button variant="secondary" type="button" onClick={onCancel}>Cancel</Button>
                </Form>
            </Card.Body>
        </Card>
    )
}
export default EditTaskForm;