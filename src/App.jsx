import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Todo from './pages/Todo';
import Pomodoro from './pages/Pomodoro';
import Habit from './pages/Habit';
import Auth from './pages/Auth';

function App() {
  const theme = localStorage.getItem("theme") || "light";
  document.documentElement.className = theme;

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-white transition-colors duration-300">
      <BrowserRouter>
        <Navbar />
        <div className="pt-28 px-4 pb-10"> {/* Adjust top padding for navbar */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/todo" element={<Todo />} />
            <Route path="/pomodoro" element={<Pomodoro />} />
            <Route path="/habit" element={<Habit />} />
            <Route path="/auth" element={<Auth />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;