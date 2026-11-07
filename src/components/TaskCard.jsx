import {Card, Button} from "react-bootstrap"

const TaskCard = ({title, description, id, onDeleteTask, onUpdateTask}) => {
    return (
        <Card className="mb-3">
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>{description}</Card.Text>
                <Button variant="danger" onClick={() => onDeleteTask(id)}>Delete</Button>
                <Button variant="primary" onClick={() => onUpdateTask(id)}>Edit</Button>
            </Card.Body>
        </Card>
    )

}
export default TaskCard;