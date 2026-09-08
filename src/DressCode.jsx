const subsections = [
  {
    id: 'summer-chic',
    title: 'Dress Code: Summer Chic',
    text: 'Vestite con un estilo fresco, elegante y cómodo para un día de verano. Elegí los colores y estampados que más te gusten, con telas livianas y calzado cómodo para celebrar al aire libre. Tené en cuenta que es una pool party, así que no olvides traer tu malla!',
    ideas: [
      {
        src: '/photos/vestidos.jpg',
        label: 'Vestidos, enteritos y conjuntos',
        href: 'https://pin.it/4frI81A6P',
      },
      {
        src: '/photos/de_traje.jpg',
        label: 'De traje',
        href: 'https://pin.it/7IAuqkof3',
      },
      {
        src: '/photos/accesorios.jpg',
        label: 'Accesorios y calzado',
        href: 'https://pin.it/8gsNbmjKo',
      },
    ],
  },
];

function InspirationCard({ src, label, href, delay }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={`Abrir Pinterest board ${label}`}
      className="dress-fade-in group block rounded-xl p-3 sm:p-4 border shadow-md transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
      style={{
        background: 'var(--surface)',
        borderColor: 'var(--border-color)',
        animationDelay: `${delay}ms`,
      }}
    >
      <div className="rounded-md overflow-hidden border" style={{ borderColor: 'var(--border-color)' }}>
        <img
          src={src}
          alt={label}
          className="w-full aspect-4/5 object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          loading="lazy"
          decoding="async"
        />
      </div>
      <p className="mt-3 wedding-heading text-lg" style={{ color: 'var(--brown)' }}>{label}</p>
    </a>
  );
}

export default function DressCode() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <p className="section-label mb-2">Guía de estilo</p>
      <h2 className="wedding-title text-4xl sm:text-5xl lg:text-6xl mb-4" style={{ color: 'var(--brown)' }}>
        Dress code
      </h2>
      <p className="max-w-3xl mx-auto mb-12" style={{ color: 'var(--muted)' }}>
        ¿No sabés qué ponerte? Te dejamos algunas ideas para inspirarte y armar un look cómodo, fresco y en sintonía con la celebración.
      </p>

      <div className="space-y-14 text-left">
        {subsections.map((section, sectionIndex) => (
          <section
            key={section.id}
            className="rounded-2xl p-5 sm:p-7 lg:p-9 border"
            style={{
              background: 'linear-gradient(160deg, var(--surface) 0%, var(--surface-soft) 100%)',
              borderColor: 'var(--border-color)',
            }}
          >
            <h3 className="wedding-heading text-2xl sm:text-3xl mb-3" style={{ color: 'var(--brown)' }}>
              {section.title}
            </h3>
            <p className="text-base sm:text-lg leading-relaxed mb-6" style={{ color: 'var(--brown-mid)' }}>
              {section.text}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-7">
              {section.ideas.map((idea, ideaIndex) => (
                <InspirationCard
                  key={`${section.id}-${ideaIndex}`}
                  src={idea.src}
                  label={idea.label}
                  href={idea.href}
                  delay={120 + sectionIndex * 140 + ideaIndex * 90}
                />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
