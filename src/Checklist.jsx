const essentials = [
  'Protector solar',
  'Lentes de sol',
  'Calzado cómodo',
  'Repelente',
  'Malla para la pile',
];

export default function Checklist() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-10">
        <p className="section-label mb-2">No te olvides de esto</p>
        <h2 className="wedding-title text-4xl sm:text-5xl" style={{ color: 'var(--brown)' }}>
          Checklist
        </h2>
        <p className="mt-3" style={{ color: 'var(--muted)' }}>
          Aquí te dejamos una listita de las cosas que no te pueden faltar para disfrutar la boda a pleno
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-4 lg:gap-5">
        {essentials.map((item, index) => (
          <article
            key={item}
            className="w-full sm:w-80 rounded-2xl p-5 sm:p-6 flex items-start gap-3 transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-xl"
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--border-color)',
              animation: `dressCardIn 620ms cubic-bezier(0.2, 0.7, 0.2, 1) ${120 + index * 70}ms both`,
            }}
          >
            <span
              aria-hidden
              className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm font-bold"
              style={{ background: 'var(--surface-soft)', color: 'var(--sage)' }}
            >
              ✓
            </span>
            <p className="text-base leading-relaxed" style={{ color: 'var(--brown-mid)' }}>
              {item}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}
