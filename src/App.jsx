
import './App.css';
import Board from "./components/Board.jsx";
import {useState} from "react";
import {Navbar, Container} from "react-bootstrap";

function App() {
    const [theme, setTheme] = useState("green");

    return (
        <div className="kanban-app" data-theme={theme}>
            <Navbar className="mosswire-navbar border-bottom mb-4">
                <Container className="d-flex justify-content-between align-items-center">
                    <Navbar.Brand>Mosswire Kanban</Navbar.Brand>
                    <div className="d-flex gap-2">
                        <button onClick={() => setTheme("green")}>Green</button>
                        <button onClick={() => setTheme("blue")}>Blue</button>
                        <button onClick={() => setTheme("orange")}>Orange</button>
                    </div>
                </Container>
            </Navbar>

            <Board theme={theme}/>
        </div>
    );
}

export default App;
