export default function ImportantInfo() {
  const infoCards = [
    {
      icon: '🧡',
      title: 'Celebración sin niñes',
      text: 'El espacio no está adaptado a niñes y queremos que todes puedan disfrutar sin preocupaciones. Civil: niñes bienvenides. ¡Gracias por entender!',
    },
    {
      icon: '🚌',
      title: 'Micro',
      text: 'La celebración es en Punta Alta, por lo que vamos a poner a disposición colectivos para quienes deseen ir ida y vuelta, desde un punto de encuentro hasta el salón de eventos. En función de las reservas definiremos el precio del pasaje y lo comunicaremos pronto.',
    },
    {
      icon: '🎁',
      title: 'Regalos',
      text: 'Tu presencia es el mejor regalo. Si querés contribuir con algo más, tenemos un fondo de luna de miel. Alias: viejo.vir.2027',
    },
    {
      icon: '🚗',
      title: 'Estacionamiento',
      text: 'Hay estacionamiento en el salón de eventos de la celebración. Si vas a tomar, no manejes.',
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-10">
        <p className="section-label mb-2">Algunas cositas a tener en cuenta</p>
        <h2 className="wedding-title text-4xl sm:text-5xl" style={{ color: 'var(--brown)' }}>
          Info importante
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {infoCards.map(({ icon, title, text }) => (
          <div
            key={title}
            className="rounded-2xl p-6 sm:p-7 flex gap-4 w-full"
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
    </div>
  );
}
