import './App.css'
import Board from "./components/Board.jsx";
import {useState} from "react";
import {Button, Navbar, Container} from "react-bootstrap";

function App() {

    const [theme, setTheme] = useState("light");
    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
    }
    return (
        <div className="App"
             data-bs-theme={theme}>
            <Navbar className="mosswire-navbar border-bottom mb-4">
                <Container className="d-flex justify-content-between align-items-center">
                    <Navbar.Brand>Mosswire Kanban</Navbar.Brand>
                    <Button onClick={toggleTheme} variant="outline-success" size="sm">
                        {theme === "light" ? "Dark Mode" : "Light Mode"}</Button>
                </Container>
            </Navbar>
            <Board/>
        </div>
    )
}

export default App
