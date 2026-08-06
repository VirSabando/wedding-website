import { useState, useEffect } from 'react';
import { professionalItems } from './data';

export default function Professional() {
  const [modal, setModal] = useState({ open: false, src: null, title: '' });

  function BetweenArrow({ topIndex }) {
    const [pointUp, setPointUp] = useState(false);

    useEffect(() => {
      const topEl = document.getElementById(`prof-${topIndex}`);
      const bottomEl = document.getElementById(`prof-${topIndex + 1}`);
      if (!topEl || !bottomEl) return;

      const obs = new IntersectionObserver(
        (entries) => {
          // if bottom element is more than 40% visible, show up arrow
          const bottomEntry = entries.find((e) => e.target === bottomEl);
          if (bottomEntry) setPointUp(bottomEntry.intersectionRatio > 0.4);
        },
        { threshold: [0, 0.1, 0.25, 0.4, 0.6, 0.9, 1] }
      );

      obs.observe(bottomEl);
      return () => obs.disconnect();
    }, [topIndex]);

    return (
      <div className="between-arrow relative flex justify-center -mt-6 -mb-6 z-50">
        <button
          onClick={() => {
            const target = document.getElementById(`prof-${pointUp ? topIndex : topIndex + 1}`);
            target?.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }}
          aria-label={pointUp ? 'Scroll to previous' : 'Scroll to next'}
          className="relative z-50 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-slate-700 opacity-60 hover:opacity-100 pointer-events-auto"
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
      if (e.key === 'Escape') setModal({ open: false, src: null, title: '' });
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4">
      <div className="bg-white w-full p-6 shadow-md rounded-sm border-t-8 border-slate-900">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">Professional Portfolio</h2>
        <p className="text-slate-700 mb-6">Selected recent projects with brief descriptions.</p>

        <div className="prof-list">
          {(() => {
            const nodes = [];
            professionalItems.forEach((item, i) => {
              nodes.push(
                <section id={`prof-${i}`} key={item.id} className={`prof-item relative ${i % 2 === 1 ? 'reverse' : ''}`}>
                  <div className="prof-inner max-w-6xl mx-auto flex flex-col sm:flex-row items-center gap-6 py-8 px-4">
                    <div className="prof-image w-full sm:w-1/2">
                      <button
                        className="w-full h-full block"
                        onClick={() => setModal({ open: true, src: item.image, title: item.title })}
                      >
                        <img src={item.image} alt={item.title} className="w-full h-auto rounded-md shadow-md prof-img" />
                      </button>
                    </div>

                    <div className="prof-text w-full sm:w-1/2">
                      <h2 className="text-2xl font-semibold text-slate-900">{item.title}</h2>
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
          <div className="modal-backdrop absolute inset-0 bg-black/60" onClick={() => setModal({ open: false, src: null, title: '' })}></div>
          <div className="modal-content relative z-10 max-w-[90vw] max-h-[90vh]">
            <img src={modal.src} alt={modal.title} className="w-auto max-w-full max-h-[80vh] rounded-md shadow-xl" />
            <div className="mt-3 text-center text-white">{modal.title}</div>
          </div>
        </div>
      )}
    </div>
  );
}
