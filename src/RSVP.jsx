import { useEffect, useState } from 'react';
import { weddingData } from './data';

const makeGuest = (name = '') => ({
  name,
  attending: '',
  dietary: 'ninguno',
  allergyDetails: '',
  bus: '',
});

const DIETARY_OPTIONS = [
  { value: 'vegetariano', label: 'Vegetariano' },
  { value: 'vegano', label: 'Vegano' },
  { value: 'celiaco', label: 'Celíaco' },
  { value: 'alergias', label: 'Alergias' },
  { value: 'ninguno', label: 'Ninguno' },
];

function normalizeText(value) {
  if (!value) return '';
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .toLowerCase()
    .trim();
}

function compactText(value) {
  return normalizeText(value).replace(/\s+/g, '');
}

function parseCsvLine(line) {
  const result = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i += 1) {
    const char = line[i];
    const next = line[i + 1];

    if (char === '"') {
      if (inQuotes && next === '"') {
        current += '"';
        i += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (char === ',' && !inQuotes) {
      result.push(current);
      current = '';
      continue;
    }

    current += char;
  }

  result.push(current);
  return result.map((cell) => cell.trim());
}

function parseCsv(text) {
  const lines = text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  if (!lines.length) return [];
  const headers = parseCsvLine(lines[0]);
  return lines.slice(1).map((line) => {
    const values = parseCsvLine(line);
    return headers.reduce((acc, header, index) => {
      acc[header] = values[index] || '';
      return acc;
    }, {});
  });
}

function getCell(row, keys) {
  for (const key of keys) {
    if (row[key] && String(row[key]).trim()) return String(row[key]).trim();
  }
  return '';
}

function buildInvitationsFromRows(rows) {
  const groups = new Map();

  rows.forEach((row, index) => {
    const fullName = getCell(row, ['full_name', 'name', 'guest_name', 'invitado', 'nombre']);
    if (!fullName) return;

    const groupId =
      getCell(row, ['group_id', 'group', 'family_id', 'invitation_id', 'grupo']) ||
      `single-${normalizeText(fullName)}-${index}`;

    if (!groups.has(groupId)) {
      groups.set(groupId, { id: groupId, members: [] });
    }
    groups.get(groupId).members.push(fullName);
  });

  return Array.from(groups.values()).filter((group) => group.members.length > 0);
}

function formatDietaryRestriction(guest) {
  if (guest.dietary === 'alergias') {
    const details = String(guest.allergyDetails || '').trim();
    return details ? `Alergias: ${details}` : 'Alergias';
  }

  const selected = DIETARY_OPTIONS.find((option) => option.value === guest.dietary);
  if (!selected || selected.value === 'ninguno') return 'None';
  return selected.label;
}

export default function RSVP() {
  const [invitations, setInvitations] = useState(weddingData.rsvpInvitations || []);
  const [loadingInvitations, setLoadingInvitations] = useState(false);
  const [invitationSourceError, setInvitationSourceError] = useState('');
  const [lookupName, setLookupName] = useState('');
  const [lookupTried, setLookupTried] = useState(false);
  const [lookupResults, setLookupResults] = useState([]);
  const [matchedInvitation, setMatchedInvitation] = useState(null);
  const [guests, setGuests] = useState([makeGuest()]);
  const [formError, setFormError] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | success | error

  useEffect(() => {
    const csvUrl = weddingData.rsvpSpreadsheetCsvUrl;
    if (!csvUrl) return;

    let cancelled = false;

    async function loadInvitationsFromSpreadsheet() {
      setLoadingInvitations(true);
      setInvitationSourceError('');
      try {
        const res = await fetch(csvUrl, { cache: 'no-store' });
        if (!res.ok) throw new Error('No se pudo leer el CSV de invitados.');
        const csvText = await res.text();
        const rows = parseCsv(csvText);
        const fromSheet = buildInvitationsFromRows(rows);
        if (!fromSheet.length) throw new Error('No se encontraron invitados en el CSV.');
        if (!cancelled) setInvitations(fromSheet);
      } catch (error) {
        if (!cancelled) {
          setInvitationSourceError(error instanceof Error ? error.message : 'Error al leer invitados.');
        }
      } finally {
        if (!cancelled) setLoadingInvitations(false);
      }
    }

    loadInvitationsFromSpreadsheet();

    return () => {
      cancelled = true;
    };
  }, []);

  function selectInvitation(invitation) {
    setMatchedInvitation(invitation);
    setLookupResults([]);
    setGuests(invitation.members.map((member) => makeGuest(member)));
    setFormError('');
  }

  function runLookup() {
    setStatus('idle');
    setFormError('');
    const query = normalizeText(lookupName);
    setLookupTried(true);
    if (!query) {
      setMatchedInvitation(null);
      setLookupResults([]);
      setGuests([makeGuest()]);
      return;
    }

    const compactQuery = compactText(lookupName);

    const matches = invitations.filter((invitation) =>
      invitation.members.some((member) => {
        const normalizedMember = normalizeText(member);
        const compactMember = compactText(member);
        return (
          normalizedMember.includes(query) ||
          compactMember.includes(compactQuery)
        );
      })
    );

    if (!matches.length) {
      setMatchedInvitation(null);
      setLookupResults([]);
      setGuests([makeGuest()]);
      return;
    }

    if (matches.length === 1) {
      selectInvitation(matches[0]);
      return;
    }

    setMatchedInvitation(null);
    setLookupResults(matches);
    setGuests([makeGuest()]);
  }

  function updateGuest(index, field, value) {
    setGuests((prev) =>
      prev.map((guest, guestIndex) =>
        guestIndex === index
          ? {
              ...guest,
              [field]: value,
              ...(field === 'dietary' && value !== 'alergias' ? { allergyDetails: '' } : {}),
              ...(field === 'attending' && value === 'no' ? { bus: 'no' } : {}),
            }
          : guest
      )
    );
  }

  function buildPayload() {
    const payload = {
      validation_mode: 'strict-sheet',
      submitted_at: new Date().toISOString(),
      lookup_name: lookupName.trim(),
      invitation_id: matchedInvitation?.id || 'not-found',
      guest_count: guests.length,
      guests: guests.map((guest, index) => ({
        number: index + 1,
        name: guest.name.trim(),
        attending: guest.attending,
        dietary_restrictions: formatDietaryRestriction(guest),
        needs_bus: guest.attending === 'yes' ? guest.bus : 'no',
      })),
    };

    guests.forEach((guest, index) => {
      const num = index + 1;
      payload[`guest_${num}_name`] = guest.name.trim();
      payload[`guest_${num}_attending`] = guest.attending;
      payload[`guest_${num}_dietary`] = formatDietaryRestriction(guest);
      payload[`guest_${num}_needs_bus`] = guest.attending === 'yes' ? guest.bus : 'no';
    });

    return payload;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!matchedInvitation) {
      setFormError('Primero buscá y seleccioná una invitación válida.');
      return;
    }

    if (guests.length !== matchedInvitation.members.length) {
      setFormError('La cantidad de personas no coincide con la invitación cargada.');
      return;
    }

    const namesValid = guests.every(
      (guest, index) => normalizeText(guest.name) === normalizeText(matchedInvitation.members[index])
    );
    if (!namesValid) {
      setFormError('Los nombres deben coincidir exactamente con la invitación.');
      return;
    }

    const submitEndpoint =
      weddingData.rsvpSubmitEndpoint?.trim() || weddingData.rsvpFormEndpoint?.trim();
    if (!submitEndpoint || submitEndpoint.includes('YOUR_FORM_ID')) {
      setFormError('Falta configurar el endpoint para guardar respuestas en la planilla.');
      return;
    }

    setStatus('loading');
    setFormError('');
    try {
      const payload = buildPayload();
      const isGoogleAppsScript = /script\.google\.com\/macros\/s\//i.test(submitEndpoint);

      if (isGoogleAppsScript) {
        const body = new URLSearchParams({ payload: JSON.stringify(payload) }).toString();
        await fetch(submitEndpoint, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
          body,
        });

        setStatus('success');
        setLookupName('');
        setLookupTried(false);
        setLookupResults([]);
        setMatchedInvitation(null);
        setGuests([makeGuest()]);
        return;
      }

      const res = await fetch(submitEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      });
      let apiOk = true;
      try {
        const data = await res.json();
        if (typeof data?.ok === 'boolean') apiOk = data.ok;
      } catch {
        // Some endpoints return empty/non-JSON responses.
      }

      if (res.ok && apiOk) {
        setStatus('success');
        setLookupName('');
        setLookupTried(false);
        setLookupResults([]);
        setMatchedInvitation(null);
        setGuests([makeGuest()]);
      } else {
        setFormError('No pudimos guardar tu respuesta en la planilla. Intentá nuevamente en unos segundos.');
        setStatus('error');
      }
    } catch {
      setFormError('No pudimos conectar con la planilla de respuestas. Verificá la conexión e intentá otra vez.');
      setStatus('error');
    }
  }

  const isValid = matchedInvitation && guests.length > 0 && guests.every((guest) => {
    const hasName = guest.name.trim().length > 0;
    const hasAttendance = guest.attending === 'yes' || guest.attending === 'no';
    const hasDietaryOption = DIETARY_OPTIONS.some((option) => option.value === guest.dietary);
    const allergiesComplete = guest.dietary !== 'alergias' || String(guest.allergyDetails || '').trim().length > 0;
    const busOk = guest.attending === 'no' || guest.bus === 'yes' || guest.bus === 'no';
    return hasName && hasAttendance && hasDietaryOption && allergiesComplete && busOk;
  });

  return (
    <div className="max-w-xl mx-auto px-4 sm:px-6">
      <div className="text-center mb-10">
        <p className="section-label mb-2">¡No te olvides!</p>
        <h2 className="wedding-title text-4xl sm:text-5xl" style={{ color: 'var(--brown)' }}>
          Confirmación
        </h2>
        <p className="mt-3 text-sm" style={{ color: 'var(--muted)' }}>
          Por favor confirmá antes del <strong style={{ color: 'var(--brown)' }}>31 de octubre 2026</strong>
        </p>
        {status !== 'success' && (
          <p className="mt-4 text-sm" style={{ color: 'var(--muted)' }}>
            Buscá tu nombre para cargar la invitación. La confirmación es estricta y solo acepta nombres del listado oficial.
          </p>
        )}
      </div>

      {status === 'success' ? (
        <div
          className="rounded-2xl p-10 text-center"
          style={{ background: 'var(--surface)', border: '1px solid var(--border-color)' }}
        >
          <p style={{ fontSize: '3rem' }}>🌿</p>
          <h3 className="wedding-heading text-2xl mt-4 mb-2" style={{ color: 'var(--brown)' }}>
            ¡Gracias!
          </h3>
          <p style={{ color: 'var(--muted)' }}>Tu respuesta quedó registrada.</p>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl p-8"
          style={{ background: 'var(--surface)', border: '1px solid var(--border-color)' }}
        >
          {loadingInvitations && (
            <p className="text-sm mb-4" style={{ color: 'var(--muted)' }}>
              Cargando invitados desde la planilla…
            </p>
          )}

          {invitationSourceError && (
            <p className="text-sm mb-4 px-3 py-2 rounded-lg" style={{ background: '#FEF3C7', color: '#92400E' }}>
              {invitationSourceError}
            </p>
          )}

          <div className="mb-6">
            <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--brown)' }}>
              Buscador de invitación
            </label>
            <div className="rsvp-inline-row">
              <input
                type="text"
                value={lookupName}
                onChange={(e) => setLookupName(e.target.value)}
                placeholder="Escribí tu nombre o apellido"
                className="rsvp-input"
                autoComplete="name"
              />
              <button type="button" onClick={runLookup} className="rsvp-secondary-btn">
                Buscar
              </button>
            </div>

            {lookupResults.length > 1 && (
              <div className="rsvp-results mt-3">
                <p className="text-sm mb-2" style={{ color: 'var(--muted)' }}>
                  Encontramos varias coincidencias. Elegí tu invitación:
                </p>
                {lookupResults.map((invitation) => (
                  <button
                    type="button"
                    key={invitation.id}
                    className="rsvp-result-item"
                    onClick={() => selectInvitation(invitation)}
                  >
                    {invitation.members.join(' · ')}
                  </button>
                ))}
              </div>
            )}

            {matchedInvitation && (
              <p className="mt-2 text-sm" style={{ color: 'var(--sage)' }}>
                Invitación encontrada: {matchedInvitation.members.length} persona/s.
              </p>
            )}
            {lookupTried && !matchedInvitation && lookupName.trim() && (
              <p className="mt-2 text-sm" style={{ color: '#B45309' }}>
                No encontramos ese nombre en la planilla. Verificá ortografía o contactanos.
              </p>
            )}
          </div>

          <div className="mb-6">
            <p className="text-sm" style={{ color: 'var(--muted)' }}>
              Confirmaciones a completar: {matchedInvitation ? guests.length : 0}
            </p>
          </div>

          {matchedInvitation && guests.map((guest, index) => (
            <div key={index} className="rsvp-guest-card mb-5">
              <p className="text-sm font-semibold mb-4" style={{ color: 'var(--brown)' }}>
                Invitadx {index + 1}
              </p>

              <div className="mb-5">
                <label className="block text-sm font-semibold mb-1.5" style={{ color: 'var(--brown)' }}>
                  Nombre completo <span style={{ color: 'var(--sage)' }}>*</span>
                </label>
                <input
                  type="text"
                  value={guest.name}
                  readOnly
                  className="rsvp-input"
                  required
                  autoComplete="name"
                />
              </div>

              <div className="mb-5">
                <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--brown)' }}>
                  ¿Vas a venir? <span style={{ color: 'var(--sage)' }}>*</span>
                </label>
                <div className="rsvp-radio-group">
                  <label className="rsvp-radio-option">
                    <input
                      type="radio"
                      name={`attending-${index}`}
                      value="yes"
                      checked={guest.attending === 'yes'}
                      onChange={(e) => updateGuest(index, 'attending', e.target.value)}
                      required
                    />
                    <span>🥂 ¡Sí!</span>
                  </label>
                  <label className="rsvp-radio-option">
                    <input
                      type="radio"
                      name={`attending-${index}`}
                      value="no"
                      checked={guest.attending === 'no'}
                      onChange={(e) => updateGuest(index, 'attending', e.target.value)}
                    />
                    <span>😢 No voy a poder ir</span>
                  </label>
                </div>
              </div>

              <div className="mb-5">
                <label className="block text-sm font-semibold mb-1.5" style={{ color: 'var(--brown)' }}>
                  Restricciones alimentarias
                  <span style={{ color: 'var(--sage)' }}> *</span>
                </label>
                <div className="rsvp-radio-group flex-wrap">
                  {DIETARY_OPTIONS.map((option) => (
                    <label className="rsvp-radio-option" key={option.value}>
                      <input
                        type="radio"
                        name={`dietary-${index}`}
                        value={option.value}
                        checked={guest.dietary === option.value}
                        onChange={(e) => updateGuest(index, 'dietary', e.target.value)}
                        required
                      />
                      <span>{option.label}</span>
                    </label>
                  ))}
                </div>

                {guest.dietary === 'alergias' && (
                  <div className="mt-3">
                    <input
                      type="text"
                      value={guest.allergyDetails || ''}
                      onChange={(e) => updateGuest(index, 'allergyDetails', e.target.value)}
                      placeholder="Detallá alergias"
                      className="rsvp-input"
                      required
                    />
                  </div>
                )}
              </div>

              {guest.attending === 'yes' && (
                <div className="mb-2">
                  <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--brown)' }}>
                    ¿Necesitás lugar en el micro? <span style={{ color: 'var(--sage)' }}>*</span>
                  </label>
                  <div className="rsvp-radio-group">
                    <label className="rsvp-radio-option">
                      <input
                        type="radio"
                        name={`bus-${index}`}
                        value="yes"
                        checked={guest.bus === 'yes'}
                        onChange={(e) => updateGuest(index, 'bus', e.target.value)}
                        required
                      />
                      <span>🚌 Sí, por favor</span>
                    </label>
                    <label className="rsvp-radio-option">
                      <input
                        type="radio"
                        name={`bus-${index}`}
                        value="no"
                        checked={guest.bus === 'no'}
                        onChange={(e) => updateGuest(index, 'bus', e.target.value)}
                      />
                      <span>No, voy por mi cuenta</span>
                    </label>
                  </div>
                </div>
              )}
            </div>
          ))}

          {formError && (
            <p className="text-sm mb-4 px-3 py-2 rounded-lg" style={{ background: '#FEE2E2', color: '#B91C1C' }}>
              {formError}
            </p>
          )}

          {status === 'error' && (
            <p className="text-sm mb-4 px-3 py-2 rounded-lg" style={{ background: '#FEE2E2', color: '#B91C1C' }}>
              Algo salió mal. Por favor intentá de nuevo o contactanos directamente.
            </p>
          )}

          <button
            type="submit"
            disabled={!isValid || status === 'loading'}
            className="rsvp-submit w-full"
          >
            {status === 'loading' ? 'Enviando…' : 'Confirmar asistencia'}
          </button>
        </form>
      )}
    </div>
  );
}
