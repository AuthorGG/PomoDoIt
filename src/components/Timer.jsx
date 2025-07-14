import { useEffect, useState } from "react";

function Timer({ initialMinutes }) {
  const [mode, setMode] = useState("pomodoro"); // 'pomodoro', 'shortBreak', 'longBreak'
  const [sessionStep, setSessionStep] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(initialMinutes.pomodoro * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);
  const [hasStartedOnce, setHasStartedOnce] = useState(false); // para evitar que se inicie solo al principio

  const formatTime = (secs) => {
    const minutes = Math.floor(secs / 60);
    const seconds = secs % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  const resetTimer = () => {
    setSecondsLeft(initialMinutes[mode] * 60);
    setIsRunning(false);
    setHasFinished(false);
    setHasStartedOnce(false);
    setMode("pomodoro");
    setSessionStep(0);
  };

  const toggleTimer = () => {
    if (!isRunning && !hasStartedOnce) {
      setHasStartedOnce(true);
    }
    setIsRunning((prev) => !prev);
  };

  useEffect(() => {
    let interval = null;

    if (isRunning) {
      interval = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev === 0) {
            clearInterval(interval);
            setIsRunning(false);

            const nextStep = sessionStep + 1;
            setSessionStep(nextStep);

            switch (nextStep) {
              case 1:
              case 3:
                setMode("shortBreak");
                break;
              case 2:
              case 4:
              case 6:
                setMode("pomodoro");
                break;
              case 5:
                setMode("longBreak");
                break;
              case 7:
                setMode("pomodoro");
                setHasFinished(true); // ✅ mostrar modal al FINAL del ciclo
                setSessionStep(0); // reiniciar para próxima vuelta
                break;
              default:
                setMode("pomodoro");
            }

            return 0;
          }

          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, mode]);

  useEffect(() => {
    const durationMap = {
      pomodoro: initialMinutes.pomodoro,
      shortBreak: initialMinutes.shortBreak,
      longBreak: initialMinutes.longBreak,
    };

    setSecondsLeft(durationMap[mode] * 60);

    // Solo auto-iniciar si ya empezó el ciclo
    if (hasStartedOnce) {
      setIsRunning(true);
    }
  }, [mode, initialMinutes, hasStartedOnce]);

  return (
    <section className="timer-section">
      <p className="mode-label">
        {mode === "pomodoro" && "Pomodoro"}
        {mode === "shortBreak" && "Descanso corto"}
        {mode === "longBreak" && "Descanso largo"}
      </p>

      <h2>{formatTime(secondsLeft)}</h2>
      <p>{isRunning ? "En curso" : "Pausado"}</p>

      <div className="controls">
        <button onClick={toggleTimer}>
          {isRunning ? "Pausar" : "Iniciar"}
        </button>
        <button onClick={resetTimer}>Resetear</button>
      </div>

      {hasFinished && (
        <div className="modal-backdrop">
          <div className="modal">
            <h3>🎉 ¡Ciclo completo terminado!</h3>
            <p>¿Quieres empezar otro?</p>
            <div className="modal-buttons">
              <button onClick={resetTimer}>🔁 Reiniciar ciclo</button>
              <button onClick={() => setHasFinished(false)}>❌ Cerrar</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default Timer;
