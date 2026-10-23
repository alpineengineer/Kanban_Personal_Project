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
                tasks={tasks}
            />
            <Column
                title={"In Progress"}
                tasks={tasks}
            />
            <Column
                title={"Done"}
                tasks={tasks}

            />
        </>
    )
}

export default Board;