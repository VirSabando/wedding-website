import { weddingData } from './data';

function VenueCard({ title, icon, date, time, venueName, address, mapsUrl }) {
  return (
    <div className="venue-card">
      <div className="flex items-center gap-3 mb-4">
        <span style={{ fontSize: '1.5rem' }}>{icon}</span>
        <div>
          <p className="section-label">{title}</p>
          <p className="wedding-heading text-xl" style={{ color: 'var(--brown)' }}>{date}</p>
          <p className="text-sm" style={{ color: 'var(--muted)' }}>{time}</p>
        </div>
      </div>
      <p className="font-semibold" style={{ color: 'var(--brown)' }}>{venueName}</p>
      <p className="text-sm mt-1" style={{ color: 'var(--muted)' }}>{address}</p>
      <a
        href={mapsUrl}
        target="_blank"
        rel="noreferrer"
        className="inline-block mt-4 text-sm font-medium px-4 py-2 rounded-lg transition-opacity hover:opacity-70"
        style={{ background: 'var(--surface-soft)', color: 'var(--sage)', border: '1px solid var(--border-color)' }}
      >
        Ver en el mapa →
      </a>
    </div>
  );
}

export default function WhenWhere() {
  const { ceremony, reception, dateDisplay } = weddingData;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6">
      <div className="text-center mb-10">
        <p className="section-label mb-2">Anotalo en el calendario</p>
        <h2 className="wedding-title text-4xl sm:text-5xl" style={{ color: 'var(--brown)' }}>
          Cuándo y Dónde
        </h2>
        <p className="mt-3 wedding-heading text-lg" style={{ color: 'var(--gold)' }}>{dateDisplay}</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-5 mb-8">
        <VenueCard
          title="Civil"
          icon="📋"
          date={ceremony.date}
          time={ceremony.time}
          venueName={ceremony.venueName}
          address={ceremony.address}
          mapsUrl={ceremony.mapsUrl}
        />
        {!reception.sameAsVenue && (
          <VenueCard
            title="Celebración"
            icon="🎉"
            date={reception.date}
            time={reception.time}
            venueName={reception.venueName}
            address={reception.address}
            mapsUrl={reception.mapsUrl}
          />
        )}
      </div>
    </div>
  );
}
