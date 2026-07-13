import { useState, useEffect, useRef } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { Mic, Send, Bot, User, Square } from 'lucide-react';
import api from '../api/axios';
import Waveform from '../components/Waveform';

export default function Interview() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [chat, setChat] = useState(
    location.state?.firstQuestion
      ? [{ role: 'question', content: location.state.firstQuestion }]
      : []
  );
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);
  const bottomRef = useRef(null);
  const recognitionRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chat, loading]);

  // Optional voice input via Web Speech API (Chrome-based browsers)
  const toggleListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Voice input is not supported in this browser. Try Chrome.');
      return;
    }

    if (listening) {
      recognitionRef.current?.stop();
      setListening(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setAnswer((prev) => (prev ? prev + ' ' + transcript : transcript));
    };
    recognition.onend = () => setListening(false);

    recognitionRef.current = recognition;
    recognition.start();
    setListening(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!answer.trim()) return;

    const userAnswer = answer;
    setChat((prev) => [...prev, { role: 'answer', content: userAnswer }]);
    setAnswer('');
    setLoading(true);

    try {
      const { data } = await api.post(`/interview/${id}/respond`, { answer: userAnswer });

      if (data.done) {
        navigate(`/feedback/${id}`);
      } else {
        setChat((prev) => [...prev, { role: 'question', content: data.question }]);
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const questionCount = chat.filter((m) => m.role === 'question').length;

  return (
    <div className="rounded-2xl overflow-hidden shadow-card flex flex-col h-[78vh] bg-white border border-ink/5">
      {/* header */}
      <div className="bg-ink px-5 py-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="relative w-9 h-9 rounded-full bg-gold/15 flex items-center justify-center animate-ring-pulse">
            <Bot size={18} className="text-gold-soft" />
          </div>
          <div>
            <p className="text-porcelain font-medium text-sm leading-tight">Podium Interviewer</p>
            <p className="text-slate text-xs flex items-center gap-1.5">
              <span className="relative flex w-1.5 h-1.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-teal animate-ping opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-teal" />
              </span> live session
            </p>
          </div>
        </div>
        <span className="font-mono text-xs text-gold-soft border border-gold/25 rounded-full px-3 py-1 transition-all duration-300 animate-pop-in" key={questionCount}>
          Q{questionCount || 1}
        </span>
      </div>

      {/* chat body */}
      <div className="flex-1 overflow-y-auto px-4 md:px-6 py-5 space-y-4 bg-porcelain">
        {chat.map((msg, i) => (
          <div
            key={i}
            className={`flex items-end gap-2.5 animate-pop-in ${msg.role === 'answer' ? 'flex-row-reverse' : ''}`}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
              msg.role === 'question' ? 'bg-ink' : 'bg-gold/15'
            }`}>
              {msg.role === 'question'
                ? <Bot size={15} className="text-gold-soft" />
                : <User size={15} className="text-ink" />}
            </div>
            <span className={`inline-block px-4 py-2.5 rounded-2xl max-w-[75%] text-sm leading-relaxed shadow-sm transition-all duration-300 hover:shadow-card ${
              msg.role === 'question'
                ? 'bg-white border border-ink/5 text-ink rounded-bl-sm'
                : 'bg-ink text-porcelain rounded-br-sm'
            }`}>
              {msg.content}
            </span>
          </div>
        ))}

        {loading && (
          <div className="flex items-end gap-2.5 animate-pop-in">
            <div className="w-8 h-8 rounded-full bg-ink flex items-center justify-center shrink-0">
              <Bot size={15} className="text-gold-soft" />
            </div>
            <span className="inline-flex items-center bg-white border border-ink/5 rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm">
              <Waveform bars={4} className="h-3 text-ink/40" />
            </span>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* input bar */}
      <form onSubmit={handleSubmit} className="p-3.5 border-t border-ink/5 bg-white flex gap-2 shrink-0">
        <button
          type="button"
          onClick={toggleListening}
          className={`relative flex items-center justify-center w-11 h-11 rounded-full shrink-0 transition-all duration-300 hover:scale-105 ${
            listening ? 'bg-coral text-white' : 'bg-ink/5 text-ink/60 hover:bg-ink/10'
          }`}
          title={listening ? 'Stop recording' : 'Speak your answer'}
        >
          {listening && <span className="absolute inset-0 rounded-full bg-coral/40 animate-ping" />}
          {listening ? <Square size={15} /> : <Mic size={17} />}
        </button>
        <input value={answer} onChange={(e) => setAnswer(e.target.value)}
          placeholder="Type your answer..."
          className="flex-1 border border-ink/10 rounded-full px-4 focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold/50 focus:shadow-glow transition-all duration-300"
          disabled={loading} />
        <button type="submit" disabled={loading || !answer.trim()}
          className={`flex items-center justify-center w-11 h-11 rounded-full bg-ink text-gold-soft hover:bg-ink/90 disabled:opacity-40 transition-all duration-300 shrink-0 ${
            answer.trim() && !loading ? 'shadow-glow hover:scale-105' : ''
          }`}>
          <Send size={16} className="group-hover:translate-x-0.5 transition-transform" />
        </button>
      </form>
    </div>
  );
}
