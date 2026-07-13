import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowRight, AlertCircle } from 'lucide-react';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import Waveform from '../components/Waveform';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { data } = await api.post('/auth/login', { email, password });
      login(data.user, data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-ink signal-grid relative overflow-hidden flex items-center justify-center px-6">
      <div className="blob pointer-events-none absolute left-1/2 top-1/3 -translate-x-1/2 w-[600px] h-[600px] bg-gold/15" />
      <div className="blob pointer-events-none absolute right-1/4 bottom-0 translate-x-1/2 w-[350px] h-[350px] bg-coral/15" style={{ animationDelay: '-4s' }} />

      <div className="relative z-10 w-full max-w-sm">
        <Link to="/" className="group flex items-center justify-center gap-2.5 font-display font-bold text-2xl text-porcelain mb-8">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-gold-soft group-hover:scale-105 transition-transform duration-300">
            <Waveform bars={4} className="h-3.5" />
          </span>
          Podium
        </Link>

        <div
          onMouseMove={handleMouseMove}
          className="cursor-spotlight gradient-ring always-on bg-ink-soft/80 card-glass rounded-2xl shadow-card-dark p-8 animate-pop-in relative"
        >
          <h1 className="font-display font-bold text-2xl text-porcelain mb-1">Welcome back</h1>
          <p className="text-slate text-sm mb-6">Ready for another rehearsal?</p>

          {error && (
            <div className="flex items-center gap-2 text-sm text-coral-soft bg-coral/10 border border-coral/20 rounded-lg px-3 py-2 mb-4">
              <AlertCircle size={15} /> {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div>
              <label className="block text-xs text-slate mb-1.5">Email</label>
              <input type="email" placeholder="you@example.com" value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-ink border border-ink-line rounded-lg px-3.5 py-2.5 text-porcelain placeholder:text-slate/60 focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold/50 focus:shadow-glow transition-all duration-300"
                required />
            </div>
            <div>
              <label className="block text-xs text-slate mb-1.5">Password</label>
              <input type="password" placeholder="Your password" value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-ink border border-ink-line rounded-lg px-3.5 py-2.5 text-porcelain placeholder:text-slate/60 focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold/50 focus:shadow-glow transition-all duration-300"
                required />
            </div>
            <button type="submit" disabled={loading}
              className="btn-sheen group w-full flex items-center justify-center gap-2 bg-gold text-white font-semibold py-2.5 rounded-lg hover:-translate-y-0.5 transition-all duration-300 shadow-glow disabled:opacity-50 disabled:hover:translate-y-0 mt-2">
              {loading ? (
                <span className="flex items-center gap-2">
                  <Waveform bars={4} className="h-3.5" />
                  Logging in...
                </span>
              ) : 'Log in'}
              {!loading && <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />}
            </button>
          </form>

          <p className="mt-5 text-sm text-slate text-center">
            No account? <Link to="/register" className="text-gold-soft hover:text-coral-soft">Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
