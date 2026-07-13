import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock, CheckCircle2, ChevronRight, Inbox, ArrowRight } from 'lucide-react';
import api from '../api/axios';
import Waveform from '../components/Waveform';

export default function History() {
  const [interviews, setInterviews] = useState([]);

  useEffect(() => {
    api.get('/interview/history').then((res) => setInterviews(res.data));
  }, []);

  return (
    <div className="animate-fade-up" style={{ opacity: 1 }}>
      <div className="mb-6">
        <p className="text-xs uppercase tracking-[0.2em] text-ink/40 mb-1.5">Your sessions</p>
        <h1 className="font-display font-bold text-3xl text-ink">Interview history</h1>
      </div>

      {interviews.length === 0 && (
        <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-ink/15 animate-rise-fade">
          <Inbox className="mx-auto text-ink/25 mb-3 animate-float" size={28} />
          <p className="text-ink/50">No interviews yet &mdash; time for your first rehearsal.</p>
          <Link to="/dashboard" className="group inline-flex items-center gap-1 mt-4 text-gold font-medium hover:text-coral transition-colors">
            Start an interview <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      )}

      <div className="space-y-3">
        {interviews.map((iv, i) => (
          <Link
            key={iv._id}
            to={iv.status === 'completed' ? `/feedback/${iv._id}` : `/interview/${iv._id}`}
            className="tilt-card group flex items-center justify-between bg-white border border-ink/5 rounded-xl p-4 hover:border-gold/40 hover:shadow-card transition-all animate-pop-in"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <div className="flex items-center gap-3">
              <span className="hidden sm:flex h-9 w-9 rounded-lg bg-ink/[0.04] items-center justify-center text-ink/30 group-hover:text-gold group-hover:bg-gold/10 transition-colors">
                <Waveform bars={3} className="h-3" idle={iv.status !== 'completed'} />
              </span>
              <div>
                <p className="font-medium text-ink group-hover:text-gold transition-colors">{iv.jobRole}</p>
                <p className="text-xs text-ink/45 flex items-center gap-1.5 mt-1">
                  <Clock size={12} /> {new Date(iv.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {iv.status === 'completed' ? (
                <span className="flex items-center gap-1.5 text-sm font-mono text-teal bg-teal/10 rounded-full px-3 py-1 group-hover:bg-teal/20 transition-colors">
                  <CheckCircle2 size={14} /> {iv.feedback?.score ?? '-'}/10
                </span>
              ) : (
                <span className="text-xs font-medium text-gold bg-gold/10 rounded-full px-3 py-1 group-hover:bg-gold/20 transition-colors">In progress</span>
              )}
              <ChevronRight size={16} className="text-ink/25 group-hover:text-gold group-hover:translate-x-1 transition-all duration-300" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
