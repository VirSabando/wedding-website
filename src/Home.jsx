import { useEffect, useRef, useState } from 'react';
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
  const countdownTarget = weddingData.countdownTarget || weddingData.date;
  const desktopBackgroundImageUrl = weddingData.homeBackgroundImageDesktopUrl;
  const mobileVerticalBackgroundImageUrl = weddingData.homeBackgroundImageMobileVerticalUrl;
  const [timeLeft, setTimeLeft] = useState(() => calculateTimeLeft(countdownTarget));
  const [bgVisible, setBgVisible] = useState(false);
  const [useMobileVerticalBg, setUseMobileVerticalBg] = useState(false);
  const hasFiredConfettiRef = useRef(false);

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft(countdownTarget)), 1000);
    return () => clearInterval(timer);
  }, [countdownTarget]);

  useEffect(() => {
    const timer = setTimeout(() => setBgVisible(true), 40);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mql = window.matchMedia('(max-width: 767px) and (orientation: portrait)');
    const update = () => setUseMobileVerticalBg(mql.matches);
    update();

    if (mql.addEventListener) {
      mql.addEventListener('change', update);
    } else {
      mql.addListener(update);
    }
    window.addEventListener('resize', update);

    return () => {
      if (mql.removeEventListener) {
        mql.removeEventListener('change', update);
      } else {
        mql.removeListener(update);
      }
      window.removeEventListener('resize', update);
    };
  }, []);

  const backgroundImageUrl = useMobileVerticalBg && mobileVerticalBackgroundImageUrl
    ? mobileVerticalBackgroundImageUrl
    : desktopBackgroundImageUrl;

  const units = [
    { value: timeLeft.days,    label: 'Días' },
    { value: timeLeft.hours,   label: 'Horas' },
    { value: timeLeft.minutes, label: 'Minutos' },
    { value: timeLeft.seconds, label: 'Segundos' },
  ];
  const isCountdownComplete = units.every(({ value }) => value === 0);

  useEffect(() => {
    if (!isCountdownComplete || hasFiredConfettiRef.current) return;
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    hasFiredConfettiRef.current = true;
    import('canvas-confetti').then(({ default: confetti }) => {
      const defaults = { origin: { y: 0.6 } };
      const fire = (particleRatio, options) => {
        confetti({
          ...defaults,
          ...options,
          particleCount: Math.floor(160 * particleRatio),
        });
      };

      fire(0.25, { spread: 26, startVelocity: 55 });
      fire(0.2, { spread: 60 });
      fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
      fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.1 });
      fire(0.1, { spread: 120, startVelocity: 45 });
    });
  }, [isCountdownComplete]);

  return (
    <div
      className="relative min-h-screen flex flex-col items-center justify-start md:justify-center px-4 pt-16 pb-12 md:py-20 text-center overflow-hidden"
      style={{ background: 'linear-gradient(160deg, var(--page-bg) 0%, var(--surface-soft) 100%)' }}
    >
      {backgroundImageUrl && (
        <div
          className={`absolute inset-0 bg-top bg-contain md:bg-center md:bg-cover bg-no-repeat transition-all duration-[1800ms] ease-out ${bgVisible ? 'opacity-60 scale-100' : 'opacity-0 scale-105'}`}
          style={{ backgroundImage: `url(${backgroundImageUrl})` }}
          aria-hidden
        />
      )}

      <div
        className={`absolute inset-0 transition-opacity duration-1000 ${bgVisible ? 'opacity-100' : 'opacity-0'}`}
        style={{ background: 'linear-gradient(160deg, rgba(245, 237, 217, 0.46) 0%, rgba(237, 224, 196, 0.56) 100%)' }}
        aria-hidden
      />

      <div className="relative z-10 flex flex-col items-center text-center pt-2 md:pt-0">
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
        <span className="couple-ampersand" style={{ color: 'var(--sage)', margin: '0 0.3em' }}>&amp;</span>
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
      {isCountdownComplete ? (
        <p
          className="wedding-heading text-2xl sm:text-3xl px-6 py-4 rounded-2xl border animate-pulse"
          style={{
            color: 'var(--brown)',
            background: 'var(--surface)',
            borderColor: 'var(--border-color)',
          }}
        >
          ¡Llegó el gran día!
        </p>
      ) : (
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
      )}

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
    </div>
  );
}
