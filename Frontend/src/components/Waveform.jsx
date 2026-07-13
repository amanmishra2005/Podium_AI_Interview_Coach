// Signature visual motif: a small animated audio waveform.
// Used in the logo mark, loading states, and anywhere the product
// wants to say "I'm listening" — grounded in this being a spoken
// interview coach rather than a generic dashboard.
export default function Waveform({ bars = 5, className = '', idle = false }) {
  return (
    <span className={`waveform ${idle ? 'is-idle' : ''} ${className}`}>
      {Array.from({ length: bars }).map((_, i) => (
        <span key={i} />
      ))}
    </span>
  );
}
