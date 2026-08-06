import { scientificItems } from './data';

export default function Scientific() {
  return (
    <div className="max-w-6xl mx-auto px-4">
      <h1 className="text-3xl font-bold text-slate-900 mb-6">Scientific Portfolio</h1>

      <div className="bg-white p-6 shadow-md rounded-sm">
        <h2 className="text-xl font-bold text-slate-800 mb-6">Publications & Research</h2>

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