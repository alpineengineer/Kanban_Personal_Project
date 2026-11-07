
import { useState } from "react";
import { Form, Button, Card, Row, Col } from "react-bootstrap";

const TaskForm = ({ onAddTask }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("Medium");
    const [status, setStatus] = useState("To Do");
    const [titleError, setTitleError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (title.trim() === "") {
            setTitleError("Task title is required");
            return;
        }

        setTitleError("");

        const newTaskData = {
            title: title.trim(),
            description,
            priority,
            status
        };

        onAddTask(newTaskData);

        // Restore default form values
        setTitle("");
        setDescription("");
        setPriority("Medium");
        setStatus("To Do");
    };

    return (
        <Card className="mt-4 mb-4 shadow-sm">
            <Card.Body className="p-4">
                <Card.Title className="mb-4">
                    Create New Task
                </Card.Title>

                <Form onSubmit={handleSubmit}>

                    {/* Task title */}
                    <Form.Group className="mb-3" controlId="taskTitle">
                        <Form.Label>Task Title</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter task title"
                            value={title}
                            isInvalid={Boolean(titleError)}
                            onChange={(e) => {
                                setTitle(e.target.value);
                                setTitleError("");
                            }}
                        />
                        <Form.Control.Feedback type="invalid">
                            {titleError}
                        </Form.Control.Feedback>
                    </Form.Group>

                    {/* Description */}
                    <Form.Group className="mb-3" controlId="taskDescription">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            placeholder="Describe the task..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </Form.Group>

                    <Row className="mb-4">
                        {/* Priority radio buttons */}
                        <Col xs={12} md={6} className="mb-3 mb-md-0">
                            <fieldset>
                                <legend className="fs-6 mb-2">
                                    Priority
                                </legend>

                                {["Low", "Medium", "High"].map((level) => (
                                    <Form.Check
                                        key={level}
                                        type="radio"
                                        id={`priority-${level.toLowerCase()}`}
                                        name="priority"
                                        label={level}
                                        value={level}
                                        checked={priority === level}
                                        onChange={(e) =>
                                            setPriority(e.target.value)
                                        }
                                    />
                                ))}
                            </fieldset>
                        </Col>

                        {/* Task status */}
                        <Col xs={12} md={6}>
                            <Form.Group controlId="taskStatus">
                                <Form.Label>Status</Form.Label>
                                <Form.Select
                                    value={status}
                                    onChange={(e) =>
                                        setStatus(e.target.value)
                                    }
                                >
                                    <option value="To Do">To Do</option>
                                    <option value="In Progress">
                                        In Progress
                                    </option>
                                    <option value="Done">Done</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                    </Row>

                    <div className="d-grid d-sm-flex justify-content-sm-end">
                        <Button variant="primary" type="submit">
                            Create Task
                        </Button>
                    </div>

                </Form>
            </Card.Body>
        </Card>
    );
};

export default TaskForm;
