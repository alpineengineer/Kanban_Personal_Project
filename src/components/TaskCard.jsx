const TaskCard = ({title, description, id, onDeleteTask, onUpdateTask}) => {
    return (
        <>
            <h3>{title}</h3>
            <p>{description}</p>
            <button onClick={() => onDeleteTask(id)}>Delete</button>
            <button onClick={() => onUpdateTask(id)}>Edit</button>
        </>
    )

}
export default TaskCard;