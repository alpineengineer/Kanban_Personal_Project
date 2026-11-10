import './App.css';
import Board from "./components/Board.jsx";
import {useState} from "react";
import {Navbar, Container} from "react-bootstrap";
import AboutPage from "./components/AboutPage";
import FoxCursor from "./components/FoxCursor";

function App() {
    const [theme, setTheme] = useState("green");
    const [currentPage, setCurrentPage] = useState("board");
    const [foxEnabled, setFoxEnabled] = useState(false);

    return (
        <div className="kanban-app" data-theme={theme}>
            <Navbar className="mosswire-navbar border-bottom mb-4">
                <Container className="d-flex justify-content-between align-items-center">
                    <Navbar.Brand
                        as="button"
                        type="button"
                        onClick={() => setCurrentPage("board")}
                        className="border-0 bg-transparent"
                    >
                        Mosswire Kanban
                    </Navbar.Brand>
                    <div className="d-flex gap-2">
                        <button onClick={() => setTheme("green")}>Green</button>
                        <button onClick={() => setTheme("blue")}>Blue</button>
                        <button onClick={() => setTheme("orange")}>Orange</button>
                    </div>
                </Container>
            </Navbar>
            {currentPage === "board" ? (
                <Board theme={theme}/>) : (<AboutPage
                    foxEnabled={foxEnabled}
                    setFoxEnabled={setFoxEnabled}
                />
            )}
            <footer className="mosswire-footer text-center mt-4 mb-3">
                <button
                    type="button"
                    className="footer-link"
                    onClick={() => setCurrentPage(
                        currentPage === "board" ? "about" : "board"
                    )}
                >
                    {currentPage === "board"
                        ? "About & FAQ"
                        : "Back to Board"}
                </button>
            </footer>
            {foxEnabled && (
                <FoxCursor onDisable={() => setFoxEnabled(false)} />
            )}
        </div>
    );
}

export default App;
