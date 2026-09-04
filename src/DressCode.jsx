const placeholder = '/dresscode/placeholder.svg';
const pinterestBoardUrl = 'https://www.pinterest.com/';

const subsections = [
  {
    id: 'summer-chic',
    title: 'Dress code',
    text: 'Summer chic: fresque, elegante y cómode. Podés elegir los colores y estampados que más te representen; pensá que celebramos de día y en pleno verano.',
    ideas: [
      { src: placeholder, label: 'Lino liviano', note: 'Camisa, vestido o conjunto ligero' },
      { src: placeholder, label: 'Estampados suaves', note: 'Floral, rayas o tonos cálidos' },
      { src: placeholder, label: 'Chic relajado', note: 'Elegante sin perder comodidad' },
    ],
  },
  {
    id: 'pool-party',
    title: 'Es una pool party',
    text: 'Es una pool party, así que vení preparade para mojarte: traé malla, calzado cómode, lentes de sol y protector solar. Sí, la pile es parte del plan.',
    ideas: [
      { src: placeholder, label: 'Malla lista', note: 'Enteriza o short de baño debajo' },
      { src: placeholder, label: 'Calzado cómodo', note: 'Sandalias o zapatillas livianas' },
      { src: placeholder, label: 'Sol de verano', note: 'Lentes y protector infaltables' },
    ],
  },
  {
    id: 'celebracion',
    title: 'Nuestra celebración',
    text: 'Queremos que vivas este día con libertad y alegría: armá un look que te haga sentir bien, te deje moverte con comodidad y te acompañe desde el brindis hasta el último baile.',
    ideas: [
      { src: placeholder, label: 'Mood del día', note: 'Alegre, canchero y relajado' },
      { src: placeholder, label: 'Detalle personal', note: 'Sumá tu estilo sin miedo' },
      { src: placeholder, label: 'Look final', note: 'Pensado para bailar y disfrutar' },
    ],
  },
];

function InspirationCard({ src, label, note, delay }) {
  return (
    <article
      className="dress-fade-in group rounded-xl p-3 sm:p-4 border shadow-md transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-2xl"
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
          className="w-full aspect-[4/5] object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          loading="lazy"
        />
      </div>
      <p className="mt-3 wedding-heading text-lg" style={{ color: 'var(--brown)' }}>{label}</p>
      <p className="text-sm" style={{ color: 'var(--muted)' }}>{note}</p>
    </article>
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
        Inspiración para venir espectacular, cómode y liste para disfrutar todo el día. ¿Necesitás inspiración? Mirá nuestro{' '}
        <a
          href={pinterestBoardUrl}
          target="_blank"
          rel="noreferrer"
          className="underline underline-offset-4 transition-opacity hover:opacity-75"
          style={{ color: 'var(--sage)' }}
        >
          board de Pinterest
        </a>
        .
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
                  note={idea.note}
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
