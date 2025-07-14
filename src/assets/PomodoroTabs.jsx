import { useState, useEffect } from "react";
import { motion } from "framer-motion";

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
          {tabs.map((item) => {
            const isSelected = item === selectedTab;
            return (
              <motion.li
                key={item.label}
                initial={false}
                animate={{ color: isSelected ? "#fff" : "#f05454" }}
                style={{
                  ...tab,
                  fontWeight: isSelected ? 700 : 500,
                }}
                onClick={() => handleTabClick(item)}
              >
                <span
                  style={{ zIndex: 1 }}
                >{`${item.icon} ${item.label}`}</span>
                {isSelected && (
                  <motion.div
                    layoutId="underline"
                    style={underline}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </motion.li>
            );
          })}
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

const tabsContainer = {
  display: "flex",
  padding: "0.25rem",
  backgroundColor: "#05050531",
  borderRadius: "999px",
  listStyle: "none",
  gap: "0.5rem",
  boxShadow: "0 0 10px rgba(234, 228, 228, 0.31)",
};

const tab = {
  border: "none",
  padding: "0.6rem 1rem",
  borderRadius: "999px",
  cursor: "pointer",
  fontSize: "0.9rem",
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
  position: "relative",
  backgroundColor: "transparent",
  overflow: "hidden",
};

const underline = {
  position: "absolute",
  inset: 0,
  backgroundColor: "#f05454",
  borderRadius: "999px",
  zIndex: 0,
};

export default PomodoroTabs;
