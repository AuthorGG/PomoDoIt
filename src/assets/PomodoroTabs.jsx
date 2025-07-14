import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

const tabs = [
  { icon: "🍅", label: "Pomodoro", value: "pomodoro" },
  { icon: "🧘‍♂️", label: "Descanso corto", value: "shortBreak" },
  { icon: "🛌", label: "Descanso largo", value: "longBreak" },
];

function PomodoroTabs({ currentMode, onModeChange }) {
  const [selectedTab, setSelectedTab] = useState(
    tabs.find((t) => t.value === currentMode) || tabs[0]
  );

  useEffect(() => {
    setSelectedTab(tabs.find((t) => t.value === currentMode));
  }, [currentMode]);

  const handleTabClick = (tab) => {
    if (tab.value !== currentMode) {
      setSelectedTab(tab);
      onModeChange(tab.value);
    }
  };

  return (
    <div style={container}>
      <nav style={nav}>
        <ul style={tabsContainer}>
          {tabs.map((item) => (
            <motion.li
              key={item.label}
              initial={false}
              animate={{
                backgroundColor: item === selectedTab ? "#eee" : "#eee0",
              }}
              style={tab}
              onClick={() => handleTabClick(item)}
            >
              {`${item.icon} ${item.label}`}
              {item === selectedTab ? (
                <motion.div
                  style={underline}
                  layoutId="underline"
                  id="underline"
                />
              ) : null}
            </motion.li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

const container = {
  width: "100%",
  borderRadius: "10px",
  background: "transparent",
  marginBottom: "1.5rem",
};

const nav = {
  display: "flex",
  justifyContent: "center",
};

const tabsStyles = {
  listStyle: "none",
  padding: 0,
  margin: 0,
  fontWeight: 500,
  fontSize: 14,
};

const tabsContainer = {
  display: "flex",
  padding: "0.25rem",
  backgroundColor: "#2e2e2e",
  borderRadius: "999px",
  listStyle: "none",
  gap: "0.5rem",
};

const tab = {
  border: "none",
  padding: "0.6rem 1rem",
  borderRadius: "999px",
  cursor: "pointer",
  color: "white",
  fontWeight: "500",
  fontSize: "0.9rem",
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
  position: "relative",
  backgroundColor: "transparent",
};

const underline = {
  position: "absolute",
  inset: 0,
  backgroundColor: "#f05454",
  borderRadius: "999px",
  zIndex: -1,
};

export default PomodoroTabs;
