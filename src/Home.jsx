import { useEffect, useState } from 'react';
import { weddingData } from './data';

function calculateTimeLeft(targetDate) {
  const diff = new Date(targetDate) - new Date();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export default function Home() {
  const [timeLeft, setTimeLeft] = useState(() => calculateTimeLeft(weddingData.date));

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft(weddingData.date)), 1000);
    return () => clearInterval(timer);
  }, []);

  const units = [
    { value: timeLeft.days,    label: 'Días' },
    { value: timeLeft.hours,   label: 'Horas' },
    { value: timeLeft.minutes, label: 'Minutos' },
    { value: timeLeft.seconds, label: 'Segundos' },
  ];

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 py-20 text-center"
      style={{ background: 'linear-gradient(160deg, var(--page-bg) 0%, var(--surface-soft) 100%)' }}
    >
      {/* Ornament top */}
      <p className="ornament mb-6">✦ ✦ ✦</p>

      {/* Label */}
      <p className="section-label mb-4">¡Nos casamos!</p>

      {/* Names */}
      <h1
        className="wedding-title text-6xl sm:text-7xl md:text-8xl mb-2"
        style={{ color: 'var(--brown)' }}
      >
        {weddingData.couple.person1}
        <span style={{ color: 'var(--sage)', margin: '0 0.3em', fontStyle: 'italic' }}>&amp;</span>
        {weddingData.couple.person2}
      </h1>

      {/* Date */}
      <p
        className="wedding-heading text-xl sm:text-2xl mt-4 mb-10"
        style={{ color: 'var(--gold)', letterSpacing: '0.12em' }}
      >
        {weddingData.dateDisplay}
      </p>

      {/* Divider */}
      <div
        className="w-24 h-px mb-10"
        style={{ background: 'linear-gradient(90deg, transparent, var(--gold), transparent)' }}
      />

      {/* Countdown */}
      <p className="section-label mb-5">La cuenta regresiva</p>
      <div className="flex gap-3 sm:gap-5 flex-wrap justify-center">
        {units.map(({ value, label }) => (
          <div key={label} className="countdown-box">
            <span className="countdown-number">
              {String(value).padStart(2, '0')}
            </span>
            <span className="countdown-label">{label}</span>
          </div>
        ))}
      </div>

      {/* CTA */}
      <a
        href="#rsvp"
        className="mt-12 inline-block px-8 py-3 rounded-full text-sm font-semibold tracking-widest transition-all hover:opacity-80 hover:-translate-y-0.5"
        style={{
          background: 'var(--sage)',
          color: '#FEFAF3',
          textTransform: 'uppercase',
          letterSpacing: '0.15em',
        }}
      >
        Confirmar asistencia
      </a>

      {/* Ornament bottom */}
      <p className="ornament mt-14">✦ ✦ ✦</p>
    </div>
  );
}
