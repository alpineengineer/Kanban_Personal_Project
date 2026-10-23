import TaskCard from "./TaskCard.jsx";


const Column = ({title, tasks}) => {


    return (
        <>
            <h2>{title}</h2>
            {tasks.map(task => (
                <TaskCard
                    title={task.title}
                    description={task.description}
                />)
            )}
        </>
    )
}
export default Column;