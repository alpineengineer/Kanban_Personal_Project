import {useEffect, useState, useRef} from "react";

function FoxCursor({onDisable}) {
    const [position, setPosition] = useState({
        x: -100,
        y: -100
    });
    const [particles, setParticles] = useState([]);
    const particleId = useRef(0);
    const lastParticleTime = useRef(0);

    useEffect(() => {
        function handleMouseMove(event) {
            const x = event.clientX;
            const y = event.clientY;

            setPosition({x, y});

            const now = performance.now();

            if (now - lastParticleTime.current < 35) {
                return;
            }

            lastParticleTime.current = now;

            const id = particleId.current++;

            const colors = [
                "#e84a27", // Autumn red
                "#f28c28", // Pumpkin orange
                "#ffca55", // Golden yellow
                "#b9412b"  // Deep red
            ];

            const newParticle = {
                id,
                x: x + (Math.random() - 0.5) * 20,
                y: y + 10,
                color: colors[Math.floor(Math.random() * colors.length)],
                symbol: Math.random() > 0.7 ? "🍂" : "✦",
                drift: (Math.random() - 0.5) * 70
            };

            setParticles(previous => [
                ...previous.slice(-35),
                newParticle
            ]);

            setTimeout(() => {
                setParticles(previous =>
                    previous.filter(particle => particle.id !== id)
                );
            }, 900);
        }

        function handleKeyDown(event) {
            if (event.key === "Escape") {
                onDisable();
            }
        }

        document.body.classList.add("fox-cursor-active");

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("keydown", handleKeyDown);

        return () => {
            document.body.classList.remove("fox-cursor-active");
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [onDisable]);

    return (
        <>
            {particles.map(particle => (
                <span
                    key={particle.id}
                    className="fox-particle"
                    style={{
                        left: particle.x,
                        top: particle.y,
                        color: particle.color,
                        "--drift": `${particle.drift}px`
                    }}
                    aria-hidden="true"
                >
                {particle.symbol}
            </span>
            ))}

            <div
                className="fox-cursor"
                style={{
                    left: position.x,
                    top: position.y
                }}
                aria-hidden="true"
            >
                <img
                    src="/fox-cursor.png"
                    alt=""
                    className="fox-cursor-image"
                    draggable="false"
                />
            </div>
        </>
    );
}

export default FoxCursor;