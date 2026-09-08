export default function ImportantInfo() {
  const infoCards = [
    {
      icon: '🌴',
      title: 'Boda al aire libre + pool party',
      text: 'Va a hacer calor, así que traé la malla y elegí ropa cómoda, fresca y elegante para celebrar con nosotres.',
    },
    {
      icon: '🧡',
      title: 'Celebración sin niñxs',
      text: 'El espacio no está adaptado a infancias y queremos que todxs puedan disfrutar sin preocupaciones. ¡Gracias por entender!',
    },
    {
      icon: '🚌',
      title: 'Micro',
      text: 'La celebración es en Punta Alta, por lo que vamos a poner a disposición colectivos ida y vuelta para quienes deseen ir desde Bahía Blanca, desde un punto de encuentro hasta el salón de eventos. En función de las reservas definiremos el precio del pasaje y lo comunicaremos pronto.',
    },
    {
      icon: '🎁',
      title: 'Regalos',
      text: 'Tu presencia es el mejor regalo que podemos pedir 🤍 Si querés contribuir, tenemos un fondo de luna de miel al que podés transferir. Alias: viejo.vir.2027',
    },
    {
      icon: '🚗',
      title: 'Estacionamiento',
      text: 'El salón de eventos de la celebración cuenta con estacionamiento libre. Si vas a tomar, no manejes!',
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
            <div className="info-icon shrink-0">{icon}</div>
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
