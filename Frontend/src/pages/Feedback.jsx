import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, TrendingUp, Loader2, Sparkles } from 'lucide-react';
import api from '../api/axios';
import Waveform from '../components/Waveform';

function useCountUp(target, duration = 900) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    let frame;
    const start = performance.now();
    const from = 0;
    const tick = (now) => {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(from + (target - from) * eased);
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, duration]);
  return value;
}

export default function Feedback() {
  const { id } = useParams();
  const [interview, setInterview] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    api.get(`/interview/${id}`)
      .then((res) => setInterview(res.data))
      .catch((err) => setError(err.response?.data?.message || 'Could not load feedback'));
  }, [id]);

  // Hooks must run unconditionally, in the same order, on every render.
  // This was previously called after the early `return`s below, so the
  // first render (while `interview` is still null) executed fewer hooks
  // than the render right after data loaded, and React crashed the page.
  // Computing it here with a fallback of 0 keeps the hook count identical
  // on every render.
  const score = interview?.feedback?.score ?? 0;
  const animatedScore = useCountUp(score);

  if (error) return <p className="text-coral bg-coral/5 border border-coral/15 rounded-lg px-4 py-3">{error}</p>;
  if (!interview) return (
    <div className="flex items-center gap-2 text-ink/50 py-10 justify-center">
      <Loader2 size={18} className="animate-spin" /> Loading feedback...
    </div>
  );

  const { feedback, jobRole } = interview;
  const isStrong = score >= 7;
  const totalBars = 10;
  const litBars = Math.round((animatedScore / 10) * totalBars);

  return (
    <div className="animate-fade-up space-y-6" style={{ opacity: 1 }}>
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-ink/40 mb-1.5">Session recap</p>
        <h1 className="font-display font-bold text-3xl text-ink">Feedback &mdash; {jobRole}</h1>
      </div>

      {feedback ? (
        <>
          <div className="relative bg-ink rounded-2xl p-7 shadow-card overflow-hidden animate-rise-fade">
            <div className="pointer-events-none absolute -right-10 -top-10 w-40 h-40 rounded-full bg-gold/15 blur-[60px]" />
            {isStrong && [...Array(5)].map((_, i) => (
              <Sparkles
                key={i}
                size={12 + (i % 2) * 6}
                className="pointer-events-none absolute text-gold-soft animate-sparkle"
                style={{
                  left: `${18 + i * 14}%`,
                  top: `${10 + (i % 3) * 18}%`,
                  animationDelay: `${i * 0.35}s`,
                }}
              />
            ))}

            <div className="relative z-10 flex flex-col sm:flex-row sm:items-center gap-6">
              <div className="shrink-0">
                <div className="flex items-baseline gap-1 font-mono">
                  <span className="text-porcelain text-4xl font-semibold">{animatedScore.toFixed(score % 1 === 0 ? 0 : 1)}</span>
                  <span className="text-slate text-sm">/10</span>
                </div>
                {/* segmented signal-meter score visual */}
                <div className="flex items-end gap-1 mt-3 h-8">
                  {[...Array(totalBars)].map((_, i) => (
                    <span
                      key={i}
                      className={`w-2 rounded-full transition-all duration-500 ${
                        i < litBars ? 'bg-gradient-to-t from-gold to-coral shadow-glow' : 'bg-white/10'
                      }`}
                      style={{ height: `${30 + i * 6}%`, transitionDelay: `${i * 40}ms` }}
                    />
                  ))}
                </div>
              </div>
              <p className="relative text-porcelain/85 text-sm leading-relaxed">{feedback.summary}</p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="tilt-card bg-white rounded-2xl p-5 border border-ink/5 shadow-sm hover:shadow-card hover:border-teal/30 animate-rise-fade" style={{ animationDelay: '80ms' }}>
              <h2 className="font-semibold text-teal flex items-center gap-2 mb-3">
                <CheckCircle2 size={17} /> Strengths
              </h2>
              <ul className="space-y-2 text-sm text-ink/75">
                {feedback.strengths?.map((s, i) => (
                  <li key={i} className="flex gap-2 animate-rise-fade" style={{ animationDelay: `${150 + i * 60}ms`, opacity: 0 }}>
                    <span className="text-teal">&bull;</span>{s}
                  </li>
                ))}
              </ul>
            </div>

            <div className="tilt-card bg-white rounded-2xl p-5 border border-ink/5 shadow-sm hover:shadow-card hover:border-coral/30 animate-rise-fade" style={{ animationDelay: '140ms' }}>
              <h2 className="font-semibold text-coral flex items-center gap-2 mb-3">
                <TrendingUp size={17} /> Areas to improve
              </h2>
              <ul className="space-y-2 text-sm text-ink/75">
                {feedback.improvements?.map((s, i) => (
                  <li key={i} className="flex gap-2 animate-rise-fade" style={{ animationDelay: `${210 + i * 60}ms`, opacity: 0 }}>
                    <span className="text-coral">&bull;</span>{s}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </>
      ) : (
        <div className="flex items-center gap-3 text-ink/60 bg-white rounded-2xl border border-ink/5 px-5 py-4">
          <Waveform bars={4} className="h-4 text-gold" idle />
          This interview is still in progress.
        </div>
      )}

      <Link to="/dashboard" className="group inline-flex items-center gap-2 text-ink font-medium hover:text-gold transition-colors">
        Start another interview
        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
      </Link>
    </div>
  );
}
