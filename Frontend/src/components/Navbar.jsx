import { Link, NavLink, useNavigate } from 'react-router-dom';
import { History as HistoryIcon, LayoutDashboard, LogOut, HelpCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Waveform from './Waveform';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const linkClass = ({ isActive }) =>
    `flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
      isActive
        ? 'bg-gold text-white shadow-glow'
        : 'text-ink/60 hover:text-ink hover:bg-ink/5 hover:-translate-y-0.5'
    }`;

  return (
    <nav className="sticky top-0 z-40 bg-porcelain/90 backdrop-blur-md border-b border-ink/[0.06]">
      <div className="max-w-5xl mx-auto flex items-center justify-between px-6 py-3.5">
        <Link to={user ? '/dashboard' : '/'} className="group flex items-center gap-2.5 font-display text-xl font-bold text-ink">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-ink text-gold-soft group-hover:scale-105 transition-transform duration-300">
            <Waveform bars={4} className="h-3.5" />
          </span>
          <span className="relative">
            Podium
            <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-gradient-to-r from-gold to-coral group-hover:w-full transition-all duration-300" />
          </span>
        </Link>
        <div className="flex gap-1.5 items-center">
          {user ? (
            <>
              <NavLink to="/dashboard" className={linkClass}>
                <LayoutDashboard size={15} /> Dashboard
              </NavLink>
              <NavLink to="/history" className={linkClass}>
                <HistoryIcon size={15} /> History
              </NavLink>
              <a href="/#contact" className="link-underline flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-sm font-medium text-ink/60 hover:text-ink hover:bg-ink/5 transition-all duration-300 hover:-translate-y-0.5">
                <HelpCircle size={15} /> Contact
              </a>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 ml-2 px-3.5 py-1.5 rounded-full text-sm font-medium bg-ink/5 text-ink/70 hover:bg-coral/10 hover:text-coral transition-all duration-300 hover:-translate-y-0.5"
              >
                <LogOut size={15} /> Log out
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="link-underline px-3.5 py-1.5 text-sm font-medium text-ink/70 hover:text-ink transition-colors">Log in</Link>
              <Link to="/register" className="btn-sheen px-4 py-1.5 text-sm font-semibold rounded-full bg-ink text-white hover:-translate-y-0.5 hover:shadow-glow transition-all duration-300">Sign up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
