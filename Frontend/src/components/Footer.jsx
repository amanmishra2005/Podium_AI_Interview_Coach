import React from "react";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import Waveform from "./Waveform";

export default function Footer() {
  return (
    <footer className="relative bg-ink text-slate border-t border-ink-line py-12 px-6 overflow-hidden signal-grid">
      {/* Decorative blobs */}
      <div className="blob absolute top-0 left-1/4 w-[250px] h-[250px] bg-gold/10 blur-[80px] pointer-events-none" />
      <div className="blob absolute bottom-0 right-1/4 w-[200px] h-[200px] bg-coral/10 blur-[70px] pointer-events-none" style={{ animationDelay: '-4s' }} />

      <div className="mx-auto max-w-5xl relative z-10">
        {/* Main 4-Column Layout */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 pb-10 border-b border-ink-line/50">
          {/* Brand Column (Span 2 on desktop) */}
          <div className="col-span-2 space-y-4">
            <div className="group flex items-center gap-2.5 font-display text-lg font-bold text-porcelain w-fit">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gold/15 text-gold-soft group-hover:scale-110 transition-transform duration-300">
                <Waveform bars={4} className="h-3.5" />
              </span>
              Podium
            </div>
            <p className="text-xs text-slate leading-relaxed max-w-sm">
              Podium listens like a real interviewer. Upload your resume, pick
              a role, and rehearse out loud with an AI that scores your
              answers and tells you exactly what to fix.
            </p>
            {/* Developer Status Badge */}
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-teal/20 bg-teal/5 text-[10px] font-mono text-teal font-semibold hover:bg-teal/10 hover:border-teal/30 transition-colors duration-300 w-fit">
              <span className="h-1.5 w-1.5 rounded-full bg-teal animate-pulse" />
              AI coach is online
            </div>
          </div>

          {/* Navigation Column */}
          <div className="space-y-3">
            <h4 className="text-[10px] font-bold text-porcelain uppercase tracking-widest font-mono">
              Product
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="/#features"
                  className="link-underline hover:text-gold-soft transition-colors duration-200 inline-block"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="/#how-it-works"
                  className="link-underline hover:text-gold-soft transition-colors duration-200 inline-block"
                >
                  How it works
                </a>
              </li>
              <li>
                <Link
                  to="/dashboard"
                  className="link-underline hover:text-gold-soft transition-colors duration-200 inline-block"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to="/history"
                  className="link-underline hover:text-gold-soft transition-colors duration-200 inline-block"
                >
                  Interview history
                </Link>
              </li>
            </ul>
          </div>

          {/* Company/Support Column */}
          <div className="space-y-3 col-span-2 md:col-span-1">
            <h4 className="text-[10px] font-bold text-porcelain uppercase tracking-widest font-mono">
              Legal
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="/#contact"
                  className="link-underline hover:text-gold-soft transition-colors duration-200 inline-block"
                >
                  Contact support
                </a>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="link-underline hover:text-gold-soft transition-colors duration-200 inline-block"
                >
                  Terms of service
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="link-underline hover:text-gold-soft transition-colors duration-200 inline-block"
                >
                  Privacy policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright */}
        <div className="flex flex-col gap-4 pt-8 md:flex-row md:items-center md:justify-between">
          <p className="text-[11px] font-mono leading-relaxed">
            &copy; {new Date().getFullYear()} Podium. All rights reserved. Rehearsal
            for the interview that actually matters.
          </p>

          <div className="flex items-center gap-4 text-xs font-mono">
            <span className="flex items-center gap-1 text-[10px]">
              Built with{" "}
              <Heart
                size={10}
                className="text-coral fill-coral animate-pulse"
              />{" "}
              for job seekers
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
