import { weddingData } from './data';

export default function DressCode() {
  const { dressCode } = weddingData;

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
      <p className="section-label mb-2">Come looking gorgeous</p>
      <h2 className="wedding-title text-4xl sm:text-5xl mb-6" style={{ color: 'var(--brown)' }}>
        Dress Code
      </h2>

      <div
        className="rounded-2xl p-8 text-left"
        style={{ background: 'var(--surface)', border: '1px solid var(--border-color)' }}
      >
        <p className="leading-relaxed" style={{ color: 'var(--brown-mid)' }}>
          {dressCode.description}
        </p>

        {/* Color palette */}
        <div className="mt-8">
          <p className="section-label mb-4">Our palette</p>
          <div className="flex flex-wrap gap-4 items-center">
            {dressCode.palette.map(({ name, hex }) => (
              <div key={name} className="flex flex-col items-center gap-2">
                <div
                  className="color-swatch"
                  style={{ background: hex }}
                  title={name}
                  aria-label={name}
                />
                <span className="text-xs" style={{ color: 'var(--muted)', letterSpacing: '0.05em' }}>
                  {name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Avoid */}
        <div
          className="mt-6 p-4 rounded-xl"
          style={{ background: 'var(--surface-soft)', border: '1px solid var(--border-color)' }}
        >
          <p className="text-sm font-semibold mb-2" style={{ color: 'var(--brown)' }}>
            Please avoid:
          </p>
          <div className="flex gap-2 flex-wrap">
            {dressCode.avoid.map((color) => (
              <span
                key={color}
                className="text-xs px-3 py-1 rounded-full"
                style={{ background: 'var(--border-color)', color: 'var(--muted)' }}
              >
                {color}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
