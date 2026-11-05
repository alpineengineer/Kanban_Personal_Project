import TaskCard from "./TaskCard.jsx";


const Column = ({title, tasks, onDeleteTask, onUpdateTask}) => {


    return (
        <>
            <h2>{title}</h2>
            {tasks.map(task => (
                <TaskCard
                    key={task.id}
                    title={task.title}
                    description={task.description}
                    onDeleteTask={onDeleteTask}
                    onUpdateTask={onUpdateTask}
                    id={task.id}
                />)
            )}
        </>
    )
}
export default Column;