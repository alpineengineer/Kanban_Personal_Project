import TaskCard from "./TaskCard.jsx";
import {Card} from "react-bootstrap"


const Column = ({title, tasks, onDeleteTask, onUpdateTask}) => {


    return (
        <Card
        className="kanban-column h-100"
        >
            <Card.Body>
                <Card.Title className="mb-3">{title}</Card.Title>
                {tasks.map(task => (
                    <TaskCard
                        key={task.id}
                        title={task.title}
                        description={task.description}
                        onDeleteTask={onDeleteTask}
                        onUpdateTask={onUpdateTask}
                        id={task.id}
                        priority={task.priority}
                    />)
                )}
            </Card.Body>
        </Card>
    )
}
export default Column;