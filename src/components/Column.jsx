import TaskCard from "./TaskCard.jsx";


const Column = ({title, taskTitle, taskDescription}) => {


    return (
        <>
            <h2>{title}</h2>
            <TaskCard
                title={taskTitle}
                description={taskDescription}
            />
        </>
    )

}
export default Column;