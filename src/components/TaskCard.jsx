import {Badge, Card, Button} from "react-bootstrap"


const TaskCard = ({title, description, id, onDeleteTask, onUpdateTask, priority}) => {
    const priorityColor =
        priority === "Low" ? "success" :
            priority === "Medium" ? "warning" : "danger";
    return (
        <Card className="kanban-task mb-3">
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Badge bg={priorityColor}>{priority}</Badge>
                <Card.Text>{description}</Card.Text>
                <div className="d-flex flex-wrap gap-2 mt-3">
                <Button variant="primary" onClick={() => onUpdateTask(id)}>Edit</Button>
                <Button variant="outline-danger" onClick={() => onDeleteTask(id)}>Delete</Button>
                </div>
            </Card.Body>
        </Card>
    )

}
export default TaskCard;