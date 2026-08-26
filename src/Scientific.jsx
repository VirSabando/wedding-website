import { scientificItems } from './data';

export default function Scientific() {
  return (
    <div className="max-w-6xl mx-auto px-4 w-full" style={{ boxSizing: 'border-box' }}>
      <div className="bg-white w-full p-6 shadow-md rounded-sm border-t-8 border-slate-900">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">Publications & Research</h2>
        <p className="text-slate-700 mb-6">Research is a longlife passion of mine. Here's the link to my papers and PhD thesis, in case you're curious!</p>

        <div className="sci-grid">
          {scientificItems.map((item) => (
            <a
              key={item.id}
              href={item.url}
              target="_blank"
              rel="noreferrer"
              className="sci-card group"
              style={{ backgroundImage: `url(${item.image})` }}
              aria-label={item.title}
            >
              <div className="sci-overlay">
                <h3 className="text-sm font-semibold text-white">{item.title}</h3>
                <p className="text-xs text-white mt-1">{item.desc}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}