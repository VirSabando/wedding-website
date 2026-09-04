import { weddingData } from './data';

function VenueCard({ title, date, time, venueName, address, mapsUrl }) {
  return (
    <article className="venue-card h-full flex flex-col transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-xl">
      <div className="mb-4">
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
        className="inline-block mt-4 text-sm font-medium px-4 py-2 rounded-lg transition-all duration-300 hover:opacity-80 hover:-translate-y-0.5"
        style={{ background: 'var(--surface-soft)', color: 'var(--sage)', border: '1px solid var(--border-color)' }}
      >
        Ver en el mapa →
      </a>
    </article>
  );
}

export default function WhenWhere() {
  const { ceremony, reception, dateDisplay } = weddingData;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6">
      <div className="text-center mb-10">
        <p className="section-label mb-2">Anotalo en el calendario</p>
        <h2 className="wedding-title text-4xl sm:text-5xl" style={{ color: 'var(--brown)' }}>
          Cuándo y Dónde
        </h2>
        <p className="mt-3 wedding-heading text-lg" style={{ color: 'var(--gold)' }}>{dateDisplay}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-8 items-stretch">
        <VenueCard
          title="Civil"
          date={ceremony.date}
          time={ceremony.time}
          venueName={ceremony.venueName}
          address={ceremony.address}
          mapsUrl={ceremony.mapsUrl}
        />
        {!reception.sameAsVenue && (
          <VenueCard
            title="Celebración"
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
