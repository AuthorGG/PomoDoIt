import { useEffect, useState } from "react";

function Timer({ initialMinutes }) {
  const [secondsLeft, setSecondsLeft] = useState(initialMinutes * 60);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    setSecondsLeft(initialMinutes * 60);
    setIsRunning(false);
  }, [initialMinutes]);
  const resetTimer = () => {
    setSecondsLeft(initialMinutes * 60);
    setIsRunning(false);
  };

  const formatTime = (secs) => {
    const minutes = Math.floor(secs / 60);
    const seconds = secs % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  useEffect(() => {
    let interval = null;
    if (isRunning) {
      interval = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev === 0) {
            clearInterval(interval);
            setIsRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning]);

  const toggleTimer = () => {
    setIsRunning((prev) => !prev); // !prev es lo mismo que !isRunning
  };

  return (
    <section className="timer-section">
      <h2>{formatTime(secondsLeft)}</h2>
      <p>{isRunning ? "En curso" : "Pausado"}</p>
      <div className="controls">
        <button onClick={toggleTimer}>
          {isRunning ? "Pausar" : "Iniciar"}
        </button>
        <button onClick={resetTimer}>Resetear</button>
      </div>
    </section>
  );
}

export default Timer;
