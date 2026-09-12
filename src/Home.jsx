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
  const backgroundPositionStyle = useMobileVerticalBg
    ? { backgroundPosition: 'center 56%' }
    : { backgroundPosition: 'center center' };

  const backgroundOverlayStyle = useMobileVerticalBg
    ? {
        background: [
          'linear-gradient(180deg, rgba(255, 242, 227, 0.02) 0%, rgba(255, 242, 227, 0.04) 34%, rgba(71, 47, 31, 0.58) 70%, rgba(71, 47, 31, 0.94) 100%)',
          'radial-gradient(circle at 50% 18%, rgba(255, 242, 227, 0.06) 0%, rgba(255, 242, 227, 0) 58%)',
        ].join(', '),
      }
    : {
        background: [
          'linear-gradient(90deg, rgba(255, 242, 227, 0.00) 0%, rgba(255, 242, 227, 0.04) 20%, rgba(71, 47, 31, 0.34) 56%, rgba(71, 47, 31, 0.82) 100%)',
          'linear-gradient(180deg, rgba(255, 250, 244, 0.03) 0%, rgba(255, 250, 244, 0.03) 100%)',
        ].join(', '),
      };

  const units = [
    { value: timeLeft.days,    label: 'Días' },
    { value: timeLeft.hours,   label: 'Horas' },
    { value: timeLeft.minutes, label: 'Minutos' },
    { value: timeLeft.seconds, label: 'Segundos' },
  ];
  const isCountdownComplete = units.every(({ value }) => value === 0);
  const titleSizeClass = useMobileVerticalBg ? 'text-4xl sm:text-7xl md:text-8xl' : 'text-6xl sm:text-7xl md:text-8xl';
  const dateSizeClass = useMobileVerticalBg ? 'text-base sm:text-2xl' : 'text-xl sm:text-2xl';
  const titleStyle = useMobileVerticalBg
    ? { color: '#fff8ef', fontSize: 'clamp(4.15rem, 16vw, 5.4rem)', lineHeight: 0.9, letterSpacing: '0.01em' }
    : { color: '#fff8ef' };
  const countdownRowClass = useMobileVerticalBg
    ? 'flex w-full flex-nowrap justify-center gap-1.5'
    : 'flex gap-2 sm:gap-5 flex-wrap justify-center';
  const countdownBoxStyle = useMobileVerticalBg
    ? { minWidth: 0, width: 'calc((100% - 4.5rem) / 4)', padding: '0.65rem 0.2rem' }
    : undefined;
  const countdownNumberStyle = useMobileVerticalBg
    ? { fontSize: '1.55rem' }
    : undefined;
  const countdownLabelStyle = useMobileVerticalBg
    ? { fontSize: '0.42rem', letterSpacing: '0.12em' }
    : undefined;

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
          className={`absolute inset-0 bg-center bg-cover lg:bg-position-[center_35%] bg-no-repeat transition-all ease-out ${bgVisible ? 'opacity-80 scale-100' : 'opacity-0 scale-100'}`}
          style={{ backgroundImage: `url(${backgroundImageUrl})`, transitionDuration: '1800ms', ...backgroundPositionStyle }}
          aria-hidden
        />
      )}

      <div
        className={`absolute inset-0 transition-opacity duration-1000 ${bgVisible ? 'opacity-100' : 'opacity-0'}`}
        style={backgroundOverlayStyle}
        aria-hidden
      />

      <div className={`relative z-10 w-full flex flex-col items-center text-center ${useMobileVerticalBg ? 'min-h-svh justify-start pb-8 pt-0' : 'pt-10 pb-10 md:pt-0 md:pb-12'}`}>
      {useMobileVerticalBg && <div className="md:hidden h-[56svh] w-full" aria-hidden />}
      <div className="w-full flex flex-col items-center text-center lg:w-[44%] lg:ml-auto lg:mr-8 xl:mr-10">
      <div style={{ color: '#fff8ef' }}>
      {/* Ornament top */}
      <p className="ornament mb-3 md:mb-6" style={{ color: '#fff8ef' }}>✦ ✦ ✦</p>

      {/* Label */}
      <p className="section-label mb-2 md:mb-4" style={{ color: '#fff8ef' }}>¡Nos casamos!</p>

      {/* Names */}
      <h1
        className={`wedding-title ${titleSizeClass} mb-1 md:mb-2`}
        style={titleStyle}
      >
        {weddingData.couple.person1}
        <span className="couple-ampersand" style={{ color: 'var(--sage-light)', margin: '0 0.3em' }}>&amp;</span>
        {weddingData.couple.person2}
      </h1>

      {/* Date */}
      <p
        className={`wedding-heading ${dateSizeClass} mt-2 mb-6 md:mt-4 md:mb-10`}
        style={{ color: '#fff8ef', letterSpacing: '0.12em' }}
      >
        {weddingData.dateDisplay}
      </p>

      {/* Divider */}
      <div
        className="w-20 md:w-24 h-px mb-6 md:mb-10"
        style={{ background: 'linear-gradient(90deg, transparent, var(--sage), transparent)' }}
      />

      {/* Countdown */}
      <p className="section-label mb-3 md:mb-5" style={{ color: '#fff8ef' }}>La cuenta regresiva</p>
      {isCountdownComplete ? (
        <p
          className="wedding-heading text-lg sm:text-3xl px-4 py-3 md:px-6 md:py-4 rounded-2xl border animate-pulse"
          style={{
            color: '#fff8ef',
            background: 'rgba(71, 47, 31, 0.34)',
            borderColor: 'var(--border-color)',
          }}
        >
          ¡Llegó el gran día!
        </p>
      ) : (
        <div className={countdownRowClass}>
          {units.map(({ value, label }) => (
            <div key={label} className="countdown-box px-3 py-3 md:px-5 md:py-4" style={countdownBoxStyle}>
              <span className="countdown-number" style={countdownNumberStyle}>
                {String(value).padStart(2, '0')}
              </span>
              <span className="countdown-label" style={countdownLabelStyle}>{label}</span>
            </div>
          ))}
        </div>
      )}

      {/* CTA */}
      <a
        href="#rsvp"
        className="mt-8 md:mt-12 inline-block px-7 md:px-8 py-2.5 md:py-3 rounded-full text-sm font-semibold tracking-widest transition-all hover:opacity-80 hover:-translate-y-0.5"
        style={{
          background: 'var(--sage)',
          color: '#fff8ef',
          textTransform: 'uppercase',
          letterSpacing: '0.15em',
        }}
      >
        Confirmar asistencia
      </a>

      {/* Ornament bottom */}
      <p className="ornament mt-6 md:mt-14" style={{ color: '#fff8ef' }}>✦ ✦ ✦</p>
      </div>
      </div>
      </div>
    </div>
  );
}
