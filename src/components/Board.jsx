import Column from "./Column.jsx";


const Board = () => {
    const tasks = [
        {
            id: 1,
            title: "Create task form",
            description: "Build a form for adding new tasks"
        },
        {
            id: 2,
            title: "Build Kanban layout",
            description: "Create the board layout"
        },
        {
            id: 3,
            title: "Set up a database",
            description: "Configure PostgreSQL"
        }
    ]

    return (
        <>
            <h1>My Kanban Board</h1>
            <Column
                title={"To Do"}
                taskTitle={tasks[0].title}
                taskDescription={tasks[0].description}
            />
            <Column
                title={"In Progress"}
                taskTitle={tasks[1].title}
                taskDescription={tasks[1].description}
            />
            <Column
                title={"Done"}
                taskTitle={tasks[2].title}
                taskDescription={tasks[2].description}
            />
        </>
    )
}

export default Board;