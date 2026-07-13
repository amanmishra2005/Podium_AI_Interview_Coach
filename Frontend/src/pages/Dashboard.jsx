import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  UploadCloud, FileText, X, ArrowRight, Radio,
  Code2, LayoutTemplate, Server, Layers, BarChart3, FlaskConical,
  Cpu, Compass, GitBranch, PenTool, Bug, Briefcase, ShieldCheck, Cloud,
} from 'lucide-react';
import api from '../api/axios';
import Waveform from '../components/Waveform';

const ROLES = [
  { name: 'Software Engineer', icon: Code2 },
  { name: 'Frontend Developer', icon: LayoutTemplate },
  { name: 'Backend Developer', icon: Server },
  { name: 'Full Stack Developer', icon: Layers },
  { name: 'Data Analyst', icon: BarChart3 },
  { name: 'Data Scientist', icon: FlaskConical },
  { name: 'ML Engineer', icon: Cpu },
  { name: 'Product Manager', icon: Compass },
  { name: 'DevOps Engineer', icon: GitBranch },
  { name: 'UI/UX Designer', icon: PenTool },
  { name: 'QA Engineer', icon: Bug },
  { name: 'Business Analyst', icon: Briefcase },
  { name: 'Cybersecurity Analyst', icon: ShieldCheck },
  { name: 'Cloud Engineer', icon: Cloud },
];

export default function Dashboard() {
  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [jobRole, setJobRole] = useState(ROLES[0].name);
  const [customRole, setCustomRole] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const acceptFile = (f) => {
    if (!f) return;
    const okType = /\.(pdf|docx)$/i.test(f.name);
    if (!okType) {
      setError('Please upload a PDF or DOCX file');
      return;
    }
    setError('');
    setFile(f);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    acceptFile(e.dataTransfer.files?.[0]);
  };

  const handleStart = async (e) => {
    e.preventDefault();
    setError('');
    if (!file) return setError('Please upload your resume (PDF or DOCX)');

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('resume', file);
      const uploadRes = await api.post('/resume/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const role = customRole.trim() || jobRole;
      const startRes = await api.post('/interview/start', {
        resumeId: uploadRes.data.resumeId,
        jobRole: role,
      });

      navigate(`/interview/${startRes.data.interviewId}`, {
        state: { firstQuestion: startRes.data.question, questionNumber: 1 },
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-fade-up" style={{ opacity: 1 }}>
      <div className="mb-7">
        <p className="text-xs uppercase tracking-[0.2em] text-ink/40 mb-1.5 flex items-center gap-1.5">
          <Radio size={13} className="text-gold" /> New session
        </p>
        <h1 className="font-display font-bold text-3xl text-ink">Start a mock interview</h1>
      </div>

      {error && (
        <p className="text-coral bg-coral/5 border border-coral/15 rounded-lg px-3.5 py-2.5 mb-5 text-sm">{error}</p>
      )}

      <form onSubmit={handleStart} className="space-y-7">
        {/* Resume dropzone */}
        <div>
          <label className="block mb-2 font-semibold text-ink">Upload your resume</label>
          <div
            onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
            onDragLeave={() => setDragActive(false)}
            onDrop={handleDrop}
            onClick={() => inputRef.current?.click()}
            className={`relative cursor-pointer rounded-2xl border-2 border-dashed transition-all duration-200 px-6 py-10 text-center
              ${dragActive ? 'border-gold bg-gold/5 scale-[1.01]' : 'border-ink/15 hover:border-gold/50 hover:bg-ink/[0.02]'}`}
          >
            <input
              ref={inputRef}
              type="file"
              accept=".pdf,.docx"
              className="hidden"
              onChange={(e) => acceptFile(e.target.files[0])}
            />
            {!file ? (
              <>
                <div className={`w-14 h-14 mx-auto rounded-full bg-ink flex items-center justify-center mb-4 shadow-glow transition-transform duration-300 ${dragActive ? 'scale-110 animate-ring-pulse' : 'animate-float'}`}>
                  <UploadCloud size={24} className="text-gold-soft" />
                </div>
                <p className="text-ink font-medium">Drag & drop your resume here</p>
                <p className="text-sm text-ink/50 mt-1">or click to browse &middot; PDF or DOCX</p>
              </>
            ) : (
              <div className="flex items-center justify-center gap-3 animate-pop-in">
                <div className="w-11 h-11 rounded-xl bg-teal/15 flex items-center justify-center shrink-0">
                  <FileText size={20} className="text-teal" />
                </div>
                <div className="text-left">
                  <p className="text-ink font-medium truncate max-w-[220px]">{file.name}</p>
                  <p className="text-xs text-ink/50">{(file.size / 1024).toFixed(0)} KB &middot; ready to go</p>
                </div>
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); setFile(null); }}
                  className="p-1.5 rounded-full hover:bg-coral/10 text-ink/40 hover:text-coral transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Role picker */}
        <div>
          <label className="block mb-2 font-semibold text-ink">Which role are you rehearsing for?</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {ROLES.map((r, i) => {
              const active = !customRole && jobRole === r.name;
              return (
                <button
                  type="button"
                  key={r.name}
                  onClick={() => { setJobRole(r.name); setCustomRole(''); }}
                  className={`animate-rise-fade flex items-center gap-2 px-3 py-2.5 rounded-xl border text-sm transition-all duration-300 hover:-translate-y-0.5
                    ${active
                      ? 'border-gold bg-ink text-porcelain shadow-glow scale-[1.02]'
                      : 'border-ink/10 text-ink/70 hover:border-gold/40 hover:bg-ink/[0.03] hover:shadow-card'}`}
                  style={{ opacity: 0, animationDelay: `${i * 25}ms` }}
                >
                  <r.icon size={16} className={`${active ? 'text-gold-soft' : 'text-ink/40'} transition-transform duration-300 ${active ? 'scale-110' : ''}`} />
                  <span className="truncate">{r.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Custom role */}
        <div>
          <label className="block mb-1.5 font-medium text-ink/70 text-sm">Not on the list? Type your own</label>
          <input type="text" placeholder="e.g. Site Reliability Engineer"
            value={customRole} onChange={(e) => setCustomRole(e.target.value)}
            className="w-full border border-ink/15 rounded-lg px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold/50 transition-all" />
        </div>

        <button type="submit" disabled={loading}
          className="btn-sheen group w-full flex items-center justify-center gap-2 bg-ink text-porcelain font-semibold py-3.5 rounded-xl hover:bg-ink/90 hover:-translate-y-0.5 transition-all duration-300 shadow-glow disabled:opacity-50 disabled:hover:translate-y-0">
          {loading ? (
            <span className="flex items-center gap-2">
              <Waveform bars={5} className="h-4 text-gold-soft" />
              Preparing your interview...
            </span>
          ) : 'Start interview'}
          {!loading && <ArrowRight size={17} className="text-gold-soft group-hover:translate-x-1 transition-transform" />}
        </button>
      </form>
    </div>
  );
}
