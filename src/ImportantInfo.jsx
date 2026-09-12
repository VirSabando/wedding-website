export default function ImportantInfo() {
  const infoCards = [
    {
      icon: '🌴',
      title: 'Boda al aire libre + pool party',
      text: 'Preparate para el calor: traé tu malla y elegí ropa fresca, cómoda y elegante para celebrar con nosotrxs.',
    },
    {
      icon: '🧡',
      title: 'Celebración sin niñxs',
      text: 'El espacio no está adaptado a infancias y queremos que todxs puedan disfrutar sin preocupaciones. ¡Gracias por entender!',
    },
    {
      icon: '🚌',
      title: 'Micro',
      text: 'Pondremos a disposición colectivos ida y vuelta desde Bahía Blanca (punto de encuentro a definir) hasta el salón. El precio dependerá de la cantidad de reservas, ¡acordate de avisarnos en el formulario de confirmación si vas a usarlo!',
    },
    {
      icon: '🎁',
      title: 'Regalos',
      text: (
        <>
          Tu presencia es el mejor regalo. Si querés ayudarnos con nuestra luna de miel, podés hacernos una transferencia a esta cuenta: <strong>viejo.vir.4ever</strong>
        </>
      ),
    },
    {
      icon: '🚗',
      title: 'Estacionamiento',
      text: 'El salón cuenta con estacionamiento libre y privado. ¡Si vas a tomar, no manejes!',
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
              <p className="font-normal mb-1" style={{ color: 'var(--brown)' }}>{title}</p>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>{text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
