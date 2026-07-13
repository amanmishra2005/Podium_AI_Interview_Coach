import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UploadCloud, ListChecks, MessagesSquare, Gauge, ArrowRight, AlertCircle } from 'lucide-react';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import Waveform from '../components/Waveform';

const STEPS = [
  { icon: UploadCloud, label: 'Upload your resume' },
  { icon: ListChecks, label: 'Choose the role you want' },
  { icon: MessagesSquare, label: 'Answer live interview questions' },
  { icon: Gauge, label: 'Get a real score + feedback' },
];

export default function Register() {
  const [name, setName] = useState('');
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
      const { data } = await api.post('/auth/register', { name, email, password });
      login(data.user, data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-ink signal-grid relative overflow-hidden flex flex-col lg:flex-row">
      <div className="blob pointer-events-none absolute left-1/4 top-0 w-[600px] h-[600px] bg-gold/15" />
      <div className="blob pointer-events-none absolute right-0 bottom-0 w-[450px] h-[450px] bg-coral/15" style={{ animationDelay: '-4s' }} />

      {/* left: brand + steps */}
      <div className="relative z-10 lg:w-1/2 flex flex-col justify-center px-8 md:px-16 py-16">
        <Link to="/" className="group inline-flex items-center gap-2.5 font-display font-bold text-2xl text-porcelain mb-10 w-fit">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-gold-soft group-hover:scale-105 transition-transform duration-300">
            <Waveform bars={4} className="h-3.5" />
          </span>
          Podium
        </Link>
        <h1 className="font-display font-bold text-porcelain text-4xl md:text-5xl leading-tight mb-4 animate-fade-up" style={{ opacity: 0 }}>
          Your first rehearsal
          <br /><span className="text-gradient-gold">starts here.</span>
        </h1>
        <p className="text-slate mb-10 max-w-sm animate-fade-up" style={{ animationDelay: '0.1s', opacity: 0 }}>
          Create an account and here&rsquo;s exactly what happens next:
        </p>
        <ol className="space-y-4 max-w-sm">
          {STEPS.map((s, i) => (
            <li
              key={s.label}
              className="group flex items-center gap-4 card-glass rounded-xl px-4 py-3.5 animate-fade-up hover:border-gold/40 hover:-translate-y-0.5 hover:shadow-glow transition-all duration-300"
              style={{ animationDelay: `${0.2 + i * 0.12}s`, opacity: 0 }}
            >
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gold/15 text-gold-soft font-mono text-sm shrink-0 group-hover:scale-110 group-hover:bg-gold/25 transition-all duration-300">
                {i + 1}
              </span>
              <s.icon size={18} className="text-coral-soft shrink-0 group-hover:rotate-12 transition-transform duration-300" />
              <span className="text-porcelain/90 text-sm">{s.label}</span>
            </li>
          ))}
        </ol>
      </div>

      {/* right: form */}
      <div className="relative z-10 lg:w-1/2 flex items-center justify-center px-6 py-16">
        <div
          onMouseMove={handleMouseMove}
          className="cursor-spotlight gradient-ring always-on w-full max-w-sm bg-ink-soft/80 card-glass rounded-2xl shadow-card-dark p-8 animate-pop-in relative"
        >
          <h2 className="font-display font-bold text-2xl text-porcelain mb-1">Create your account</h2>
          <p className="text-slate text-sm mb-6">No card, no commitment &mdash; just practice.</p>

          {error && (
            <div className="flex items-center gap-2 text-sm text-coral-soft bg-coral/10 border border-coral/20 rounded-lg px-3 py-2 mb-4">
              <AlertCircle size={15} /> {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div>
              <label className="block text-xs text-slate mb-1.5">Name</label>
              <input type="text" placeholder="Full name" value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-ink border border-ink-line rounded-lg px-3.5 py-2.5 text-porcelain placeholder:text-slate/60 focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold/50 focus:shadow-glow transition-all duration-300"
                required />
            </div>
            <div>
              <label className="block text-xs text-slate mb-1.5">Email</label>
              <input type="email" placeholder="you@example.com" value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-ink border border-ink-line rounded-lg px-3.5 py-2.5 text-porcelain placeholder:text-slate/60 focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold/50 focus:shadow-glow transition-all duration-300"
                required />
            </div>
            <div>
              <label className="block text-xs text-slate mb-1.5">Password</label>
              <input type="password" placeholder="At least 6 characters" value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-ink border border-ink-line rounded-lg px-3.5 py-2.5 text-porcelain placeholder:text-slate/60 focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold/50 focus:shadow-glow transition-all duration-300"
                required />
            </div>
            <button type="submit" disabled={loading}
              className="btn-sheen group w-full flex items-center justify-center gap-2 bg-gold text-white font-semibold py-2.5 rounded-lg hover:-translate-y-0.5 transition-all duration-300 shadow-glow disabled:opacity-50 disabled:hover:translate-y-0 mt-2">
              {loading ? (
                <span className="flex items-center gap-2">
                  <Waveform bars={4} className="h-3.5" />
                  Creating account...
                </span>
              ) : 'Create account'}
              {!loading && <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />}
            </button>
          </form>

          <p className="mt-5 text-sm text-slate text-center">
            Already have an account? <Link to="/login" className="text-gold-soft hover:text-coral-soft">Log in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
