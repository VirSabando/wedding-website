import { useEffect, useRef, useState } from 'react';
import { professionalItems } from './data';

export default function Professional() {
  const [modal, setModal] = useState({ open: false, src: null, title: '' });
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const pointerRef = useRef({ x: 0, y: 0 });
  const imageRef = useRef(null);

  function clampPan(nextPan, nextZoom = zoom) {
    const img = imageRef.current;
    if (!img || nextZoom <= 1) {
      return { x: 0, y: 0 };
    }

    const maxX = Math.max(0, (img.offsetWidth * (nextZoom - 1)) / 2);
    const maxY = Math.max(0, (img.offsetHeight * (nextZoom - 1)) / 2);

    return {
      x: Math.min(maxX, Math.max(-maxX, nextPan.x)),
      y: Math.min(maxY, Math.max(-maxY, nextPan.y)),
    };
  }

  function closeModal() {
    setModal({ open: false, src: null, title: '' });
    setZoom(1);
    setPan({ x: 0, y: 0 });
    setDragging(false);
  }

  function openModal(item) {
    setModal({ open: true, src: item.image, title: item.title });
    setZoom(1);
    setPan({ x: 0, y: 0 });
  }

  function updateZoom(nextZoom) {
    const safeZoom = Math.min(4, Math.max(1, Number(nextZoom.toFixed(2))));
    setZoom(safeZoom);
    setPan((currentPan) => clampPan(currentPan, safeZoom));
  }

  function resetView() {
    setZoom(1);
    setPan({ x: 0, y: 0 });
    setDragging(false);
  }

  function BetweenArrow({ topIndex }) {
    const [pointUp, setPointUp] = useState(false);

    useEffect(() => {
      const topEl = document.getElementById(`prof-${topIndex}`);
      const bottomEl = document.getElementById(`prof-${topIndex + 1}`);
      if (!topEl || !bottomEl) return;

      let frame = null;

      function updateDirection() {
        const viewportCenter = window.innerHeight / 2;
        const topRect = topEl.getBoundingClientRect();
        const bottomRect = bottomEl.getBoundingClientRect();

        const topCenter = topRect.top + topRect.height / 2;
        const bottomCenter = bottomRect.top + bottomRect.height / 2;

        // Point up when the next card is already closer to viewport center.
        const nextIsCloser = Math.abs(bottomCenter - viewportCenter) < Math.abs(topCenter - viewportCenter);
        setPointUp(nextIsCloser);
      }

      function onScrollOrResize() {
        if (frame !== null) return;
        frame = window.requestAnimationFrame(() => {
          frame = null;
          updateDirection();
        });
      }

      updateDirection();
      window.addEventListener('scroll', onScrollOrResize, { passive: true });
      window.addEventListener('resize', onScrollOrResize);

      return () => {
        window.removeEventListener('scroll', onScrollOrResize);
        window.removeEventListener('resize', onScrollOrResize);
        if (frame !== null) {
          window.cancelAnimationFrame(frame);
        }
      };
    }, [topIndex]);

    return (
      <div className="between-arrow relative flex justify-center -mt-6 -mb-6 z-50">
        <button
          onClick={() => {
            const target = document.getElementById(`prof-${pointUp ? topIndex : topIndex + 1}`);
            target?.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }}
          aria-label={pointUp ? 'Scroll to previous' : 'Scroll to next'}
          className="relative z-50 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-slate-700 opacity-60 hover:opacity-100 transition-opacity duration-200 pointer-events-auto"
        >
          {pointUp ? (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 15l-6-6-6 6" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 9l6 6 6-6" />
            </svg>
          )}
        </button>
      </div>
    );
  }

  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') closeModal();
      if (!modal.open) return;
      if (e.key === '+' || e.key === '=') updateZoom(zoom + 0.35);
      if (e.key === '-') updateZoom(zoom - 0.35);
      if (e.key === '0') resetView();
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [modal.open, zoom]);

  useEffect(() => {
    if (!modal.open) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [modal.open]);

  function handlePointerDown(event) {
    if (zoom <= 1) return;
    pointerRef.current = { x: event.clientX, y: event.clientY };
    setDragging(true);
    event.currentTarget.setPointerCapture?.(event.pointerId);
  }

  function handlePointerMove(event) {
    if (!dragging || zoom <= 1) return;

    const deltaX = event.clientX - pointerRef.current.x;
    const deltaY = event.clientY - pointerRef.current.y;
    pointerRef.current = { x: event.clientX, y: event.clientY };

    setPan((currentPan) => clampPan({ x: currentPan.x + deltaX, y: currentPan.y + deltaY }));
  }

  function handlePointerUp(event) {
    if (!dragging) return;
    event.currentTarget.releasePointerCapture?.(event.pointerId);
    setDragging(false);
  }

  function handleWheelZoom(event) {
    event.preventDefault();
    const step = event.deltaY < 0 ? 0.25 : -0.25;
    updateZoom(zoom + step);
  }

  return (
    <div className="max-w-6xl mx-auto px-4">
      <div className="bg-white w-full p-6 shadow-md rounded-sm border-t-8 border-slate-900">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">Professional Portfolio</h2>
        <p className="text-slate-700 mb-6">Here's a collection of selected recent projects that I have worked on as Solutions Architect.</p>

        <div className="prof-list">
          {(() => {
            const nodes = [];
            professionalItems.forEach((item, i) => {
              nodes.push(
                <section id={`prof-${i}`} key={item.id} className={`prof-item relative ${i % 2 === 1 ? 'reverse' : ''}`}>
                  <div className="prof-inner max-w-6xl mx-auto flex flex-col sm:flex-row items-center gap-6 py-8 px-4">
                    <div className={`prof-image w-full sm:w-1/2 ${item.id === 2 ? 'prof-image-featured' : ''}`}>
                      <button
                        type="button"
                        className={`prof-image-card w-full h-full block ${item.id === 2 ? 'is-large-preview' : ''}`}
                        onClick={() => openModal(item)}
                        aria-label={`Open ${item.title} image preview`}
                      >
                        <img src={item.image} alt={item.title} className="w-full h-auto rounded-md shadow-md prof-img" />
                      </button>
                    </div>

                    <div className="prof-text w-full sm:w-1/2">
                      <h2 className="text-2xl font-semibold text-slate-900">{item.title}</h2>
                      {item.role && (
                        <p className="text-sm font-medium tracking-wide uppercase text-slate-500 mt-1">{item.role}</p>
                      )}
                      {item.desc.split('\n').map((para, pidx) => (
                        <p key={pidx} className="text-slate-700 mt-4">{para}</p>
                      ))}
                    </div>
                  </div>
                </section>
              );

              if (i < professionalItems.length - 1) {
                nodes.push(<BetweenArrow topIndex={i} key={`between-${i}`} />);
              }
            });
            return nodes;
          })()}
        </div>
      </div>

      {modal.open && (
        <div className="prof-modal fixed inset-0 z-50 flex items-center justify-center p-6">
          <div className="modal-backdrop absolute inset-0 bg-black/60" onClick={closeModal}></div>
          <div className="modal-shell relative z-10 w-[min(96vw,1600px)] h-[min(92vh,980px)] rounded-[28px] overflow-hidden">
            <div className="modal-toolbar flex items-center justify-between gap-4 px-4 py-3">
              <div>
                <div className="modal-title text-base font-semibold">{modal.title}</div>
                <div className="modal-subtitle text-sm">Zoom up to 4x and drag to pan.</div>
              </div>

              <div className="modal-controls flex items-center gap-2">
                <button type="button" className="modal-control" onClick={() => updateZoom(zoom - 0.35)} aria-label="Zoom out">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 20l-3.5-3.5M7 11h6M10 18a8 8 0 100-16 8 8 0 000 16z" />
                  </svg>
                </button>
                <button type="button" className="modal-control" onClick={() => updateZoom(zoom + 0.35)} aria-label="Zoom in">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 20l-3.5-3.5M10 8v6m-3-3h6m-3 7a8 8 0 100-16 8 8 0 000 16z" />
                  </svg>
                </button>
                <button type="button" className="modal-control modal-zoom-readout" onClick={resetView} aria-label="Reset zoom and pan">
                  {Math.round(zoom * 100)}%
                </button>
                <button type="button" className="modal-control" onClick={closeModal} aria-label="Close image preview">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 6l12 12M18 6L6 18" />
                  </svg>
                </button>
              </div>
            </div>

            <div
              className={`modal-stage ${zoom > 1 ? 'is-zoomed' : ''} ${dragging ? 'is-dragging' : ''}`}
              onWheel={handleWheelZoom}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
            >
              <img
                ref={imageRef}
                src={modal.src}
                alt={modal.title}
                className="modal-image"
                style={{ transform: `translate3d(${pan.x}px, ${pan.y}px, 0) scale(${zoom})` }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
