import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Timer from "./components/Timer";
import Settings from "./components/Settings";

function App() {
  const [settings, setSettings] = useState({
    pomodoro: 25,
    shortBreak: 5,
    longBreak: 15,
  });
  const handleSettingsSave = (newSettings) => {
    console.log("🧠 Configuración guardada:", newSettings);
    setSettings(newSettings);
  };

  return (
    <div className="app-container">
      <Header />
      <main>
        <Settings onSave={handleSettingsSave} />
        <Timer initialMinutes={settings} />
      </main>
    </div>
  );
}

export default App;
