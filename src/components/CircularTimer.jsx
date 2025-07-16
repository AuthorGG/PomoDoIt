const RADIUS = 45;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

function CircularTimer({ timeLeft, totalTime, mode }) {
  const percentage = timeLeft / totalTime;
  const strokeDashoffset = CIRCUMFERENCE * (1 - percentage);

  const formatTime = (secs) => {
    const minutes = Math.floor(secs / 60);
    const seconds = secs % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  const modeColors = {
    pomodoro: "#f05454",
    shortBreak: "#4caf50",
    longBreak: "#2196f3",
  };

  const strokeColor = modeColors[mode] || "#f05454";

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "250px",
        aspectRatio: "1 / 1",
        margin: "1rem auto",
        position: "relative",
      }}
    >
      <svg viewBox="0 0 100 100" style={{ width: "100%", height: "100%" }}>
        <circle
          cx="50"
          cy="50"
          r={RADIUS}
          fill="none"
          stroke="#ddd"
          strokeWidth="8"
        />
        <circle
          cx="50"
          cy="50"
          r={RADIUS}
          fill="none"
          stroke={strokeColor}
          strokeWidth="8"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          transform="rotate(-90 50 50)"
          style={{ transition: "stroke-dashoffset 1s linear" }}
        />
      </svg>
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontSize: "2em",
          fontWeight: "bold",
          color: "#fff",
        }}
      >
        {formatTime(timeLeft)}
      </div>
    </div>
  );
}

export default CircularTimer;
