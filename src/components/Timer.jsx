import { useEffect, useState } from "react";
import PomodoroTabs from "../assets/PomodoroTabs"; // Asegúrate de que la ruta sea correcta
import { AnimatePresence, motion } from "framer-motion";
function Timer({ initialMinutes }) {
  const [mode, setMode] = useState("pomodoro");
  const [sessionStep, setSessionStep] = useState(0); // 0–7
  const [secondsLeft, setSecondsLeft] = useState(initialMinutes.pomodoro * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);
  const [hasStartedOnce, setHasStartedOnce] = useState(false);

  const formatTime = (secs) => {
    const minutes = Math.floor(secs / 60);
    const seconds = secs % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  const resetTimer = () => {
    setSecondsLeft(initialMinutes.pomodoro * 60);
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
                setHasFinished(true); // solo mostrar modal al final de todo
                setSessionStep(0);
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
  }, [isRunning, sessionStep]);

  useEffect(() => {
    const durationMap = {
      pomodoro: initialMinutes.pomodoro,
      shortBreak: initialMinutes.shortBreak,
      longBreak: initialMinutes.longBreak,
    };

    setSecondsLeft(durationMap[mode] * 60);
    if (hasStartedOnce) {
      setIsRunning(true);
    }
  }, [mode, initialMinutes, hasStartedOnce]);

  return (
    <section className="timer-section">
      <PomodoroTabs
        currentMode={mode}
        onModeChange={(newMode) => {
          setMode(newMode);
          setIsRunning(false);
          setHasStartedOnce(false);
        }}
      />

      <AnimatePresence mode="wait">
        <motion.h2
          key={`${mode}-${secondsLeft}`}
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -10, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {formatTime(secondsLeft)}
        </motion.h2>
      </AnimatePresence>
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
            <h3>🎉 ¡Ciclo Pomodoro completo!</h3>
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
