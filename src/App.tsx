import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import SettingsPage from './pages/Settings';
import AutoUpgrade from './components/AutoUpgrade';

export default function App() {
  return (
    <BrowserRouter>
      <div dir="rtl" className="min-h-screen bg-white text-black">
        <header className="sticky top-0 z-10 border-b bg-white/80 backdrop-blur">
          <nav className="max-w-4xl mx-auto flex gap-3 p-3">
            <Link to="/">לוח</Link>
            <Link to="/settings">הגדרות</Link>
          </nav>
        </header>

        <main className="max-w-4xl mx-auto py-6">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </main>

        <AutoUpgrade />
      </div>
    </BrowserRouter>
  );
}
