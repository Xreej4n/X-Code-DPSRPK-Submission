import { useState } from 'react';

export default function Habit() {
  const [habits, setHabits] = useState(["Read", "Exercise"]);
  const [tracked, setTracked] = useState({});
  const [newHabit, setNewHabit] = useState("");
  const [weekStart, setWeekStart] = useState(getCurrentMonday());
  const [weekHistory, setWeekHistory] = useState([]);
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  function getCurrentMonday() {
    const today = new Date();
    const day = today.getDay();
    const diff = today.getDate() - day + (day === 0 ? -6 : 1);
    const monday = new Date(today.setDate(diff));
    return monday.toISOString().split("T")[0];
  }

  const toggleDay = (habit, day) => {
    setTracked(prev => ({
      ...prev,
      [habit]: {
        ...prev[habit],
        [day]: !prev[habit]?.[day]
      }
    }));
  };

  const addHabit = () => {
    if (newHabit.trim()) {
      setHabits([...habits, newHabit.trim()]);
      setNewHabit("");
    }
  };

  const calculateStreak = (habit) => {
    return days.reduce((count, day) => tracked[habit]?.[day] ? count + 1 : count, 0);
  };

  const startNewWeek = () => {
    const snapshot = { weekStart, habits: tracked };
    setWeekHistory([...weekHistory, snapshot]);
    setTracked({});
    setWeekStart(getCurrentMonday());
  };

  return (
    <div className="page-content min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-950 text-white px-4 py-10 flex justify-center">
      <div className="habit-wrapper">

        {/* 🌟 Heading */}
        <h2 className="habit-title">🔥 Habit Tracker</h2>

        {/* ➕ Add Habit */}
        <div className="habit-input-row">
          <input
            value={newHabit}
            onChange={(e) => setNewHabit(e.target.value)}
            placeholder="Add a new habit..."
            className="habit-input"
          />
          <button onClick={addHabit} className="habit-button">Add Habit</button>
        </div>

        <div className="habit-week-info">
          Current Week Starting: <span>{weekStart}</span>
        </div>

        {/* ✅ Habit Table */}
        <div className="habit-table-container">
          <table className="habit-table">
            <thead>
              <tr>
                <th>Habit</th>
                {days.map(day => <th key={day}>{day}</th>)}
              </tr>
            </thead>
            <tbody>
              {habits.map(habit => (
                <tr key={habit}>
                  <td>
                    {habit} <span className="streak">({calculateStreak(habit)}🔥)</span>
                  </td>
                  {days.map(day => (
                    <td key={day}>
                      <input
                        type="checkbox"
                        checked={tracked[habit]?.[day] || false}
                        onChange={() => toggleDay(habit, day)}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <button className="habit-button mt-6" onClick={startNewWeek}>
          Save & Start New Week
        </button>

        {/* 📜 History */}
        <h3 className="habit-history-title">📆 Past Weeks</h3>
        <ul className="habit-history-list">
          {weekHistory.map((week, i) => (
            <li key={i} className="habit-history-card">
              <p>Week Starting: {week.weekStart}</p>
              {Object.keys(week.habits).map(habit => (
                <p key={habit} className="history-entry">
                  {habit} → {days.filter(day => week.habits[habit][day]).join(", ") || "No entries"}
                </p>
              ))}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}