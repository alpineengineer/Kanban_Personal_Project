import {Accordion} from "react-bootstrap"

function AboutPage({foxEnabled, setFoxEnabled}) {
    return (
        <main className="about-page">
            <h1>About Mosswire Kanban</h1>

            <p>
                Mosswire Kanban is a full-stack task management
                application built with React, Spring Boot,
                and PostgreSQL.
            </p>
            <section className="architecture-section">
                <h2>Application Architecture</h2>

                <div className="architecture-diagram">
                    <div className="architecture-box">
                        <strong>React Frontend</strong>
                        <p>User interface</p>
                    </div>

                    <div className="architecture-arrow">↓</div>

                    <div className="architecture-box">
                        <strong>Spring Boot REST API</strong>
                        <p>Application logic and data access</p>
                    </div>

                    <div className="architecture-arrow">↓</div>

                    <div className="architecture-box">
                        <strong>PostgreSQL</strong>
                        <p>Persistent database</p>
                    </div>
                </div>
            </section>
            <section className="faq-section">
                <h2>Frequently Asked Questions</h2>

                <Accordion>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>
                            Why does React communicate with Spring Boot?
                        </Accordion.Header>
                        <Accordion.Body>
                            React handles the user interface, while Spring Boot
                            manages application logic and database operations.
                            Keeping these responsibilities separate allows the
                            application to be maintained and expanded more easily.
                        </Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item eventKey="1">
                        <Accordion.Header>
                            How are tasks saved?
                        </Accordion.Header>
                        <Accordion.Body>
                            When a user creates a task, React sends an HTTP POST
                            request to the Spring Boot REST API. Spring Boot
                            processes the request and saves the task to PostgreSQL.
                            The API returns the saved task, allowing React to
                            update the Kanban board.
                        </Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item eventKey="2">
                        <Accordion.Header>
                            How does the application stay secure?
                        </Accordion.Header>
                        <Accordion.Body>
                            Cloudflare Tunnel provides public HTTPS access without
                            exposing router ports. Nginx routes incoming traffic,
                            while Authentik handles authentication before users
                            can access the application.
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </section>
            <div className="fox-easter-egg">
                <button
                    type="button"
                    className="fox-trigger"
                    onClick={() => setFoxEnabled(!foxEnabled)}
                    aria-label={
                        foxEnabled
                            ? "Disable fox cursor"
                            : "Enable fox cursor"
                    }
                    aria-pressed={foxEnabled}
                    title="A little woodland secret"
                >
                    <img
                        src="/fox-cursor.png"
                        alt=""
                        className="fox-cursor-image"
                        draggable="false"
                    />
                </button>
            </div>
        </main>
    );
}

export default AboutPage;