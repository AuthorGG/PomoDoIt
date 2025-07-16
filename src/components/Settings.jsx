import { useState } from "react";

function Settings({ onSave }) {
  const [isOpen, setIsOpen] = useState(false);
  const [pomodoro, setPomodoro] = useState(25);
  const [shortBreak, setshortBreak] = useState(5);
  const [longBreak, setlongBreak] = useState(15);

  const toggleSettings = () => {
    setIsOpen(!isOpen);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ pomodoro, shortBreak, longBreak });
  };

  return (
    <div>
      {!isOpen && (
        <button className="settings-toggle" onClick={toggleSettings}>
          ⚙️
        </button>
      )}

      <aside className={`settings-panel ${isOpen ? "open" : ""}`}>
        <button className="close-settings" onClick={toggleSettings}>
          ✖
        </button>
        <h2>Ajustes</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Pomodoro (min):
            <input
              type="number"
              value={pomodoro}
              onChange={(e) => setPomodoro(e.target.value)}
            />
          </label>
          <label>
            Descanso corto (min):
            <input
              type="number"
              value={shortBreak}
              onChange={(e) => setshortBreak(e.target.value)}
            />
          </label>
          <label>
            Descanso largo (min):
            <input
              type="number"
              value={longBreak}
              onChange={(e) => setlongBreak(e.target.value)}
            />
          </label>
          <button type="submit">Guardar</button>
        </form>
      </aside>
    </div>
  );
}
export default Settings;
