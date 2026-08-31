import { useState } from 'react';
import { weddingData } from './data';

const INITIAL = { name: '', attending: '', dietary: '', bus: '' };

export default function RSVP() {
  const [form, setForm] = useState(INITIAL);
  const [status, setStatus] = useState('idle'); // idle | loading | success | error

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch(weddingData.rsvpFormEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: form.name,
          attending: form.attending,
          dietary_restrictions: form.dietary || 'None',
          needs_bus: form.bus,
        }),
      });
      if (res.ok) {
        setStatus('success');
        setForm(INITIAL);
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  const isValid = form.name.trim() && form.attending && form.bus;

  return (
    <div className="max-w-xl mx-auto px-4 sm:px-6">
      <div className="text-center mb-10">
        <p className="section-label mb-2">Don't forget!</p>
        <h2 className="wedding-title text-4xl sm:text-5xl" style={{ color: 'var(--brown)' }}>
          RSVP
        </h2>
        <p className="mt-3 text-sm" style={{ color: 'var(--muted)' }}>
          Please respond by <strong style={{ color: 'var(--brown)' }}>TODO: deadline</strong>
        </p>
      </div>

      {status === 'success' ? (
        <div
          className="rounded-2xl p-10 text-center"
          style={{ background: 'var(--surface)', border: '1px solid var(--border-color)' }}
        >
          <p style={{ fontSize: '3rem' }}>🌿</p>
          <h3 className="wedding-heading text-2xl mt-4 mb-2" style={{ color: 'var(--brown)' }}>
            Thank you!
          </h3>
          <p style={{ color: 'var(--muted)' }}>We can't wait to celebrate with you.</p>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl p-8"
          style={{ background: 'var(--surface)', border: '1px solid var(--border-color)' }}
        >
          {/* Name */}
          <div className="mb-5">
            <label className="block text-sm font-semibold mb-1.5" style={{ color: 'var(--brown)' }}>
              Full Name <span style={{ color: 'var(--sage)' }}>*</span>
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your name"
              className="rsvp-input"
              required
              autoComplete="name"
            />
          </div>

          {/* Attending */}
          <div className="mb-5">
            <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--brown)' }}>
              Will you attend? <span style={{ color: 'var(--sage)' }}>*</span>
            </label>
            <div className="rsvp-radio-group">
              <label className="rsvp-radio-option">
                <input type="radio" name="attending" value="yes" checked={form.attending === 'yes'} onChange={handleChange} required />
                <span>🥂 Yes, I'll be there!</span>
              </label>
              <label className="rsvp-radio-option">
                <input type="radio" name="attending" value="no" checked={form.attending === 'no'} onChange={handleChange} />
                <span>😢 Can't make it</span>
              </label>
            </div>
          </div>

          {/* Dietary */}
          <div className="mb-5">
            <label className="block text-sm font-semibold mb-1.5" style={{ color: 'var(--brown)' }}>
              Dietary Restrictions
              <span className="ml-1 font-normal text-xs" style={{ color: 'var(--muted)' }}>(optional)</span>
            </label>
            <textarea
              name="dietary"
              value={form.dietary}
              onChange={handleChange}
              placeholder="Allergies, vegetarian, vegan, gluten-free…"
              className="rsvp-textarea"
            />
          </div>

          {/* Bus */}
          <div className="mb-7">
            <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--brown)' }}>
              Do you need a shuttle bus seat? <span style={{ color: 'var(--sage)' }}>*</span>
            </label>
            <div className="rsvp-radio-group">
              <label className="rsvp-radio-option">
                <input type="radio" name="bus" value="yes" checked={form.bus === 'yes'} onChange={handleChange} required />
                <span>🚌 Yes please!</span>
              </label>
              <label className="rsvp-radio-option">
                <input type="radio" name="bus" value="no" checked={form.bus === 'no'} onChange={handleChange} />
                <span>I have my own ride</span>
              </label>
            </div>
          </div>

          {status === 'error' && (
            <p className="text-sm mb-4 px-3 py-2 rounded-lg" style={{ background: '#FEE2E2', color: '#B91C1C' }}>
              Something went wrong. Please try again or reach out to us directly.
            </p>
          )}

          <button
            type="submit"
            disabled={!isValid || status === 'loading'}
            className="rsvp-submit w-full"
          >
            {status === 'loading' ? 'Sending…' : 'Send RSVP'}
          </button>
        </form>
      )}
    </div>
  );
}
