import { useState, useEffect } from 'react';
import { professionalItems } from './data';

export default function Professional() {
  const [modal, setModal] = useState({ open: false, src: null, title: '' });

  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') setModal({ open: false, src: null, title: '' });
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4">
      <div className="bg-white p-6 shadow-md rounded-sm">
        <h1 className="text-3xl font-bold text-slate-900 mb-6">Professional Portfolio</h1>

        <div className="prof-list">
          {professionalItems.map((item, i) => (
            <section key={item.id} className={`prof-item ${i % 2 === 1 ? 'reverse' : ''}`}>
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
                  <p className="text-slate-700 mt-4">{item.desc}</p>
                  <div className="mt-4">
                    <a href={item.url} target="_blank" rel="noreferrer" className="text-sm text-blue-600 hover:underline">Open project</a>
                  </div>
                </div>
              </div>
            </section>
          ))}
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
