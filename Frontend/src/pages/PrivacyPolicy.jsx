import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Shield } from 'lucide-react';
import Footer from '../components/Footer';
import Waveform from '../components/Waveform';

export default function PrivacyPolicy() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-ink signal-grid relative overflow-hidden flex flex-col justify-between">
      <div className="blob pointer-events-none absolute left-1/4 top-1/4 w-[400px] h-[400px] bg-gold/8" />
      <div className="blob pointer-events-none absolute right-1/4 bottom-1/4 w-[350px] h-[350px] bg-coral/8" style={{ animationDelay: '-3s' }} />

      <main className="mx-auto w-full max-w-3xl px-6 py-10 flex-grow relative z-10">
        {/* Back Link */}
        <div className="mb-6 animate-fade-up" style={{ opacity: 0 }}>
          <button
            onClick={() => navigate(-1)}
            className="group flex items-center gap-2 text-sm text-slate hover:text-porcelain transition-colors duration-200"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform duration-300" /> Back
          </button>
        </div>

        {/* Brand Link */}
        <div className="mb-8 flex items-center gap-2.5 font-display font-bold text-xl text-porcelain animate-fade-up" style={{ opacity: 0, animationDelay: '0.08s' }}>
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-gold-soft">
            <Waveform bars={4} className="h-3" />
          </span>
          Podium Legal
        </div>

        {/* Document Header */}
        <div className="mb-10 animate-fade-up" style={{ opacity: 0, animationDelay: '0.16s' }}>
          <span className="inline-flex items-center gap-1 text-[10px] uppercase font-mono tracking-widest text-gold-soft font-semibold mb-2">
            <Shield size={12} /> privacy & security
          </span>
          <h1 className="font-display text-3xl font-bold text-porcelain md:text-4xl">
            Privacy Policy
          </h1>
          <p className="mt-2 text-xs font-mono text-slate">
            Last Updated: July 12, 2026
          </p>
        </div>

        {/* Document Body */}
        <div className="bg-ink-soft/80 card-glass rounded-2xl shadow-card-dark p-6 sm:p-8 space-y-6 text-sm text-slate leading-relaxed animate-rise-fade hover:shadow-glow transition-shadow duration-500" style={{ opacity: 0, animationDelay: '0.24s' }}>
          <section className="space-y-2">
            <h3 className="font-display font-semibold text-porcelain text-base">1. Information We Collect</h3>
            <p>
              We collect information that is strictly necessary to run mock interview simulations:
            </p>
            <ul className="list-disc list-inside ml-2 space-y-1.5 text-slate/95">
              <li><strong>Profile Information</strong>: Your name, email address, and encrypted password hash on register.</li>
              <li><strong>Resume Content</strong>: Parsed text contents of the resume files you upload to build role-specific interview questions.</li>
              <li><strong>Interview Rehearsals</strong>: Chat histories, interview question transcripts, typed answers, and grading reports.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h3 className="font-display font-semibold text-porcelain text-base">2. How We Use and Process Your Data</h3>
            <p>
              Your data is processed to:
            </p>
            <ul className="list-disc list-inside ml-2 space-y-1.5 text-slate/95">
              <li>Analyze your resume profile against your chosen job role.</li>
              <li>Generate interactive AI interview questions tailored specifically to your experience.</li>
              <li>Provide score reports, improvement bullet points, and dashboard practice logs.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h3 className="font-display font-semibold text-porcelain text-base">3. API Processing Policy</h3>
            <p>
              To evaluate your answers and build the questions, we securely forward the parsed resume text and interview messages to the Google Gemini API. **Your password, email address, and authentication tokens are never shared with AI models.** Your resume content is never sold or used for marketing networks.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="font-display font-semibold text-porcelain text-base">4. Data Management & Retention</h3>
            <p>
              Your passwords are encrypted using bcrypt. You can view, read, and delete your historical mock interviews from your dashboard at any time. If you wish to delete your account and all associated resumes entirely, contact our support team to clear your database records.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
