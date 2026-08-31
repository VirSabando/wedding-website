import { weddingData } from './data';

function VenueCard({ title, icon, time, venueName, address, mapsUrl }) {
  return (
    <div className="venue-card">
      <div className="flex items-center gap-3 mb-4">
        <span style={{ fontSize: '1.5rem' }}>{icon}</span>
        <div>
          <p className="section-label">{title}</p>
          <p className="wedding-heading text-xl" style={{ color: 'var(--brown)' }}>{time}</p>
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
        View on map →
      </a>
    </div>
  );
}

export default function WhenWhere() {
  const { ceremony, reception, bus, dateDisplay } = weddingData;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6">
      <div className="text-center mb-10">
        <p className="section-label mb-2">Save the date</p>
        <h2 className="wedding-title text-4xl sm:text-5xl" style={{ color: 'var(--brown)' }}>
          When &amp; Where
        </h2>
        <p className="mt-3 wedding-heading text-lg" style={{ color: 'var(--gold)' }}>{dateDisplay}</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-5 mb-8">
        <VenueCard
          title="Ceremony"
          icon="💒"
          time={ceremony.time}
          venueName={ceremony.venueName}
          address={ceremony.address}
          mapsUrl={ceremony.mapsUrl}
        />
        {!reception.sameAsVenue && (
          <VenueCard
            title="Reception"
            icon="🥂"
            time={reception.time}
            venueName={reception.venueName}
            address={reception.address}
            mapsUrl={reception.mapsUrl}
          />
        )}
      </div>

      {/* Bus section */}
      <div
        className="rounded-2xl p-6"
        style={{ background: 'var(--surface)', border: '1px solid var(--border-color)' }}
      >
        <div className="flex items-center gap-3 mb-3">
          <span style={{ fontSize: '1.5rem' }}>🚌</span>
          <div>
            <p className="section-label">Shuttle Bus</p>
            <p className="wedding-heading text-lg" style={{ color: 'var(--brown)' }}>We've got you covered</p>
          </div>
        </div>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
          A shuttle bus will depart from <strong style={{ color: 'var(--page-text)' }}>{bus.pickupLocation}</strong> at{' '}
          <strong style={{ color: 'var(--page-text)' }}>{bus.pickupTime}</strong>.
          The return trip will leave the venue at{' '}
          <strong style={{ color: 'var(--page-text)' }}>{bus.returnTime}</strong>.
          Let us know if you need a spot in the RSVP form!
        </p>
      </div>
    </div>
  );
}
