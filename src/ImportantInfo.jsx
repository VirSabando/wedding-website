import { weddingData } from './data';

export default function ImportantInfo() {
  const { bus } = weddingData;
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6">
      <div className="text-center mb-10">
        <p className="section-label mb-2">Algunas cositas a tener en cuenta</p>
        <h2 className="wedding-title text-4xl sm:text-5xl" style={{ color: 'var(--brown)' }}>
          Info importante
        </h2>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {weddingData.importantInfo.map(({ icon, title, text }) => (
          <div
            key={title}
            className="rounded-2xl p-6 flex gap-4"
            style={{ background: 'var(--surface)', border: '1px solid var(--border-color)' }}
          >
            <div className="info-icon flex-shrink-0">{icon}</div>
            <div>
              <p className="font-semibold mb-1" style={{ color: 'var(--brown)' }}>{title}</p>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>{text}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Bus card */}
      <div
        className="rounded-2xl p-6 flex gap-4 mt-4"
        style={{ background: 'var(--surface)', border: '1px solid var(--border-color)' }}
      >
        <div className="info-icon flex-shrink-0">🚌</div>
        <div>
          <p className="font-semibold mb-1" style={{ color: 'var(--brown)' }}>Micro</p>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
            El micro va a salir desde <strong style={{ color: 'var(--page-text)' }}>{bus.pickupLocation}</strong> a las{' '}
            <strong style={{ color: 'var(--page-text)' }}>{bus.pickupTime}</strong>.
            El regreso desde el salón va a ser a las{' '}
            <strong style={{ color: 'var(--page-text)' }}>{bus.returnTime}</strong>.
            ¡Avisanos en el formulario si necesitás un lugar!
          </p>
        </div>
      </div>
    </div>
  );
}
